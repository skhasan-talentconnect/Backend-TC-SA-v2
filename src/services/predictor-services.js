import School from '../models/school-model.js';
import Activities from '../models/activities-model.js';
import { parseFeeRange,parseClassLevel } from '../utils/fee-parsing.js';

export const predictSchoolsService = async (filters) => {
  const {
    board,
    state,
    city,
    schoolMode,
    genderType,
    shifts = [],
    feeRange,
    upto,
    specialist = [], //Optional
    languageMedium = [],
    transportAvailable,
    activities = []
  } = filters;

  const query = {
    status: 'accepted',
    ...(board && { board }),
    ...(state && { state }),
    ...(city && { city }),
    ...(schoolMode && { schoolMode }),
    ...(genderType && { genderType }),
    ...(shifts.length > 0 && { shifts: { $in: shifts } }),
    ...(specialist.length > 0 && { specialist: { $in: specialist } }),
    ...(languageMedium.length > 0 && { languageMedium: { $in: languageMedium } }),
    ...(transportAvailable && { transportAvailable })
  };

  let matchedSchools = await School.find(query);
  if (upto) {
  const userClassLevel = parseClassLevel(upto);

  matchedSchools = matchedSchools.filter((school) => {
    const schoolClassLevel = parseClassLevel(school.upto);
    return schoolClassLevel && schoolClassLevel >= userClassLevel;
  });
}


  if (feeRange) {
  const userRange = parseFeeRange(feeRange);
 
  matchedSchools = matchedSchools.filter((school) => {
    const schoolRange = parseFeeRange(school.feeRange);
   
    if (!schoolRange) return false;
    return (
      schoolRange.max >= userRange.min && schoolRange.min <= userRange.max
    );
  });
}


  if (activities.length > 0) {
    const activityDocs = await Activities.find({
      activities: { $in: activities },
      schoolId: { $in: matchedSchools.map((s) => s._id) },
    });

     const schoolIdsWithActivities = activityDocs.map((a) =>
      a.schoolId.toString()
    );

    matchedSchools = matchedSchools.filter((s) =>
      schoolIdsWithActivities.includes(s._id.toString())
    );
  }

  return matchedSchools;
};

// import School from '../models/school-model.js';
// import Activities from '../models/activities-model.js';
// import { parseFeeRange, parseClassLevel } from '../utils/fee-parsing.js';

// export const predictSchoolsService = async (filters) => {
//   const {
//     board,
//     state,
//     city,
//     schoolMode,
//     genderType,
//     shifts = [],
//     feeRange,
//     upto,
//     specialist = [],
//     languageMedium = [],
//     transportAvailable,
//     activities = []
//   } = filters;

//   // Build OR query correctly
//   const orConditions = [];
  
//   if (board) orConditions.push({ board });
//   if (state) orConditions.push({ state });
//   if (city) orConditions.push({ city });
//   if (schoolMode) orConditions.push({ schoolMode });
//   if (genderType) orConditions.push({ genderType });
//   if (shifts.length > 0) orConditions.push({ shifts: { $in: shifts } });
//   if (specialist.length > 0) orConditions.push({ specialist: { $in: specialist } });
//   if (languageMedium.length > 0) orConditions.push({ languageMedium: { $in: languageMedium } });
//   if (transportAvailable !== undefined && transportAvailable !== null) {
//     orConditions.push({ transportAvailable });
//   }

//   const query = { status: 'accepted' };
//   if (orConditions.length > 0) query.$or = orConditions;

//   try {
//     let matchedSchools = await School.find(query);

//     // Class level filter
//     if (upto) {
//       const userClassLevel = parseClassLevel(upto);
//       matchedSchools = matchedSchools.filter((school) => {
//         const schoolClassLevel = parseClassLevel(school.upto);
//         return schoolClassLevel && schoolClassLevel >= userClassLevel;
//       });
//     }

//     // Fee range filter
//     if (feeRange) {
//       const userRange = parseFeeRange(feeRange);
//       matchedSchools = matchedSchools.filter((school) => {
//         const schoolRange = parseFeeRange(school.feeRange);
//         if (!schoolRange) return false;
//         return schoolRange.max >= userRange.min && schoolRange.min <= userRange.max;
//       });
//     }

//     // Activities filter
//     if (activities.length > 0) {
//       const activityDocs = await Activities.find({
//         activities: { $in: activities },
//         schoolId: { $in: matchedSchools.map((s) => s._id) },
//       });

//       const schoolIdsWithActivities = activityDocs.map((a) => a.schoolId.toString());
//       matchedSchools = matchedSchools.filter((s) =>
//         schoolIdsWithActivities.includes(s._id.toString())
//       );
//     }

//     return matchedSchools;
//   } catch (error) {
//     throw error;
//   }
// };

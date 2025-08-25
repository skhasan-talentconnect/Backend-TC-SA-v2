import School from "../models/school-model.js";
import Amenities from "../models/amenities-model.js";
import Activities from "../models/activities-model.js";

export const compareSchoolsService = async (schoolId1, schoolId2) => {
  const [school1, school2] = await Promise.all([
    School.findById(schoolId1),
    School.findById(schoolId2),
  ]);

  if (!school1 || !school2) {
    throw{status:400, message:"One or both schools not found"};
  }

  const [amenities1, amenities2] = await Promise.all([
    Amenities.findOne({ schoolId: school1._id }),
    Amenities.findOne({ schoolId: school2._id }),
  ]);

  const [activities1, activities2] = await Promise.all([
    Activities.findOne({ schoolId: school1._id }),
    Activities.findOne({ schoolId: school2._id }),
  ]);

  return {
    school1: {
      name: school1.name,
      board: school1.board,
      feeRange: school1.feeRange,
      schoolMode: school1.schoolMode,
      shifts: school1.shifts,
      predefinedAmenities: amenities1?.predefinedAmenities || [],
      activities: activities1?.activities || [],
    },
    school2: {
      name: school2.name,
      board: school2.board,
      feeRange: school2.feeRange,
      schoolMode: school2.schoolMode,
      shifts: school2.shifts,
      predefinedAmenities: amenities2?.predefinedAmenities || [],
      activities: activities2?.activities || [],
    },
  };
};

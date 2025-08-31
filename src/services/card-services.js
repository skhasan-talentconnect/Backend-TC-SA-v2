import School from "../models/school-model.js";
import Review from "../models/reviews-model.js";

export const getSchoolCardDataService = async (schoolId) => {
  const school = await School.findById(schoolId);

  if (!school) {
    throw new Error("School not found");
  }

  const review = await Review.findOne({schoolId: school._id});

  const cardData = {
    schoolId: school._id,
    name: school.name,
    feeRange: school.feeRange,
    location: `${school.city},${school.state}`,
    board: school.board,
    genderType: school.genderType,
    shifts: school.shifts,
    schoolMode:school.schoolMode,
    ratings: review.ratings || 0,
  };

  return cardData;
};

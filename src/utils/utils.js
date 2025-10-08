import Review from '../models/reviews-model.js';
import Amenities from '../models/amenities-model.js';
import { getSchoolScoreById } from '../controllers/school-controllers.js';

export const toSchoolCardModel = (school, ratings = 0, amenities = [], schoolScore) => {
    return {
        schoolId: school._id,
        name: school.name,
        feeRange: school.feeRange,
        location: `${school.city}, ${school.state}`,
        board: school.board,
        genderType: school.genderType,
        shifts: school.shifts,
        schoolMode: school.schoolMode,
        latitude: school.latitude,
        longitude: school.longitude,
        score: schoolScore || 0,
        amenities,
        ratings,
    };
};

export const toSchoolCardModels = async (schools = []) => {
    let mapped = Promise.all(
        schools.map(async (school) => {
            const score = await getSchoolScoreById(school._id);
            const review = await Review.findOne({ schoolId: school._id });
            const amenities = await Amenities.findOne({ schoolId: school._id });
            return toSchoolCardModel(school, review?.ratings || 0, amenities?.predefinedAmenities || amenities?.customAmenities || [], score);
        })
    );
    return mapped;
};

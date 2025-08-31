import Review from '../models/reviews-model.js'; // make sure you have this model imported

export const toSchoolCardModel = (school, ratings = 0) => {
    return {
        schoolId: school._id,
        name: school.name,
        feeRange: school.feeRange,
        location: `${school.city}, ${school.state}`,
        board: school.board,
        genderType: school.genderType,
        shifts: school.shifts,
        schoolMode: school.schoolMode,
        ratings,
    };
};

export const toSchoolCardModels = async (schools = []) => {
    let mapped = Promise.all(
        schools.map(async (school) => {
            const review = await Review.findOne({ schoolId: school._id });
            return toSchoolCardModel(school, review?.ratings || 0);
        })
    );
    return mapped;
};

const getNormalizedScore = (score) => {
    if (!score || score === 0) return 1;

    if (score > 5) score = 5;
    if (score < 1) score = 1;

    const min = 1;
    const max = 5;
    const minPercent = 20; 
    const maxPercent = 100; 

    return ((score - min) / (max - min)) * (maxPercent - minPercent) + minPercent;
};

const calculateAcademic = (boardResults = 0, avgMks = 0, examScore = 0) => {
    const obtMarks = (0.4 * boardResults) + (0.2 * avgMks) + (0.4 * examScore);
    return obtMarks * 0.2;
};

const calculateFacultyQuality = (avgExperience = 0, qualification = 0, teacherStudentRatio = 0) =>{
    const obtMarks = (0.3 * avgExperience) + (0.5 * qualification) + (0.2 * teacherStudentRatio);
    return obtMarks * 0.15;
};

const calculateInfrastructure = (labsType = 0, librarySize = 0, sportsGround = 0, smartClassrooms = 0) =>{
    const obtMarks = (0.3 * labsType) + (0.4 * librarySize) + (0.2 * sportsGround) + (0.1 * smartClassrooms);
    return obtMarks * 0.10;
};

const calculateSafety = (cctvCoverage = 0, medicalFacility = 0, transportSafety = 0) => {
    const obtMarks = (0.4 * cctvCoverage) + (0.3 * medicalFacility) + (0.3 * transportSafety);
    return obtMarks * 0.10;
};

const calculateFees = (feeTransparency = 0, scholarships = 0) => {
    const obtMarks = (0.5 * feeTransparency) + (0.5 * scholarships);
    return obtMarks * 0.10;
};

const calculateDiversity = (genderRatio = 0, scholarships = 0, specialNeedsSupport = 0) => {
    const obtMarks = (0.3 * genderRatio) + (0.3 * scholarships) + (0.4 * specialNeedsSupport);
    return obtMarks * 0.05;
};

const calculateReviews = (avgRating = 0, verifiedComments = 0) => {
    const obtMarks = (0.7 * avgRating) + (0.3 * verifiedComments);
    return obtMarks * 0.05;
};

const calculateTechAdoption = (smartClassroomPercent = 0, eLearningPlatform = 0) => {
    const obtMarks = (0.5 * smartClassroomPercent) + (0.5 * eLearningPlatform);
    return obtMarks * 0.05;
};

const calculateExposure = (exchangePrograms = 0, globalTieUps = 0) => {
    const obtMarks = (0.5 * exchangePrograms) + (0.5 * globalTieUps);
    return obtMarks * 0.05;
};

const calculateOutcomes = (alumniSuccess = 0) => {
    return alumniSuccess * 0.10; 
};

const calculateActivities = (activities = 0) => {
    return activities * 0.05; 
};

const calculateMedicalFacility = (medicalFacility = {}) => {
    let score = 0;
    if (medicalFacility?.doctorAvailability) score += 10;
    if (medicalFacility?.medkitAvailable) score += 10;
    if (medicalFacility?.ambulanceAvailable) score += 10;

    return score;
};

const calculateTransportSafety = (transportSafety = {}) => {
    let score = 0;
    if (transportSafety?.gpsTrackerAvailable) score += 15;
    if (transportSafety?.driversVerified) score += 15;

    return score;
};

const calculateScore = (
    alumni = {}, 
    academics = {}, 
    infrastructure = {}, 
    safetyAndSecurity = {}, 
    feesAndScholarships = {}, 
    technologyAdoption = {}, 
    InternationalExposure = {}, 
    otherDetails = {}
) => {
    let totalScore = 0;

    const academicScore = calculateAcademic(
        academics?.averageClass12Result || academics?.averageClass10Result || 0,
        academics?.averageSchoolMarks || 0,
        getNormalizedScore(academics?.specialExamsTraining?.length || 0)
    );

    const facultyQualityScore = calculateFacultyQuality(60,60,60); // static placeholder

    const infrastructureScore = calculateInfrastructure(
        getNormalizedScore(infrastructure?.labs?.length || 0),
        getNormalizedScore(infrastructure?.libraryBooks?.length || 0),
        getNormalizedScore(infrastructure?.sportsGrounds?.length || 0),
        getNormalizedScore(infrastructure?.smartClassrooms?.length || 0)
    );

    const safetyAndSecurityScore = calculateSafety(
        safetyAndSecurity?.cctvCoveragePercentage || 0,
        getNormalizedScore(calculateMedicalFacility(safetyAndSecurity?.medicalFacility)),
        getNormalizedScore(calculateTransportSafety(safetyAndSecurity?.transportSafety))
    );

    const feesScore = calculateFees(
        getNormalizedScore(feesAndScholarships?.feesTransparency || 0),
        getNormalizedScore(feesAndScholarships?.scholarships?.length || 0)
    );

    const diversityScore = calculateDiversity(
        ((otherDetails?.genderRatio?.male || 0) + 
         (otherDetails?.genderRatio?.female || 0) + 
         (otherDetails?.genderRatio?.others || 0)) / 3,
        otherDetails?.scholarshipDiversity?.studentsCoveredPercentage || 0,
        otherDetails?.specialNeedsSupport != null ? 100 : 0
    );

    const reviewsScore = calculateReviews(60,60); // static placeholder

    const techAdoptionScore = calculateTechAdoption(
        technologyAdoption?.smartClassroomsPercentage || 0,
        getNormalizedScore(technologyAdoption?.eLearningPlatforms?.length || 0)
    );

    const exposureScore = calculateExposure(
        getNormalizedScore(InternationalExposure?.exchangePrograms?.length || 0),
        getNormalizedScore(InternationalExposure?.globalTieUps?.length || 0)
    );

    const outcomesScore = calculateOutcomes(
        getNormalizedScore(alumni?.famousAlumnies?.length || 0)
    );

    const activitiesScore = calculateActivities(
        getNormalizedScore(academics?.extraCurricularActivities?.length || 0)
    );

    // console.log('Scores:', {
    //     academicScore,
    //     facultyQualityScore,
    //     infrastructureScore,
    //     safetyAndSecurityScore,
    //     feesScore,
    //     diversityScore,
    //     reviewsScore,
    //     techAdoptionScore,
    //     exposureScore,
    //     outcomesScore,
    //     activitiesScore
    // });

    totalScore = academicScore + facultyQualityScore + infrastructureScore +
        safetyAndSecurityScore + feesScore + diversityScore + reviewsScore +
        techAdoptionScore + exposureScore + outcomesScore + activitiesScore;

    totalScore = Math.round(totalScore);

    return totalScore;
};

export default calculateScore;
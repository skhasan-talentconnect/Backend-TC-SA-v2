calculateScore = (alumni, academics, infrastructure, safetyAndSecurity, feesAndScholarships, technologyAdoption, InternationalExposure, otherDetails) => {
    let totalScore = 0;

    const academicScore = calculateAcademic(academics.averageClass12Result || academics.averageClass10Result || 0, academics.averageSchoolMarks, getNormalizedScore(academics.specialExamsTraining.length));
    const facultyQualityScore = 50; //No implementation yet, STATIC VALUE
    const infrastructureScore = calculateInfrastructure(getNormalizedScore(infrastructure.labsType.length), getNormalizedScore(infrastructure.librarySize.length), getNormalizedScore(infrastructure.sportsGround.length), getNormalizedScore(infrastructure.smartClassrooms.length));
    const safetyAndSecurityScore = calculateSafety(safetyAndSecurity.cctvCoverage, getNormalizedScore(calculateMedicalFacility(safetyAndSecurity.medicalFacility)), getNormalizedScore(calculateTransportSafety(safetyAndSecurity.transportSafety)));
    const feesScore = calculateFees(getNormalizedScore(feesAndScholarships.feeTransparency), getNormalizedScore(feesAndScholarships.scholarships.length));
    const diversityScore = calculateDiversity((otherDetails.genderRatio.male + otherDetails.genderRatio.female + otherDetails.genderRatio.others)/3, otherDetails.scholarshipDiversity.studentsCoveredPercentage, otherDetails.specialNeedsSupport != null ? 100 : 0);
    const reviewsScore = 50; //No implementation yet, STATIC VALUE
    const techAdoptionScore = calculateTechAdoption(technologyAdoption.smartClassroomsPercentage, getNormalizedScore(technologyAdoption.eLearningPlatforms.length));
    const exposureScore = calculateExposure(getNormalizedScore(InternationalExposure.exchangePrograms.length), getNormalizedScore(InternationalExposure.globalTieUps.length));
    const outcomesScore = calculateOutcomes(getNormalizedScore(alumni.famousAlumnies.length));
    const activitiesScore = calculateActivities(getNormalizedScore(otherDetails.extraCurricularActivities.length));

    totalScore = academicScore + facultyQualityScore + infrastructureScore + safetyAndSecurityScore + feesScore + diversityScore + reviewsScore + techAdoptionScore + exposureScore + outcomesScore + activitiesScore;

    return totalScore;
}

getNormalizedScore = (score) => {

    if(score === 0) return 1;

    if(score > 5) score = 5;
    if(score < 1) score = 1;

    const min = 1;
    const max = 5;
    const minPercent = 20; 
    const maxPercent = 100; 

    return ((score - min) / (max - min)) * (maxPercent - minPercent) + minPercent;
}

calculateAcademic = (boardResults, avgMks, examScore) => {
    const obtMarks = (0.4 * boardResults) + (0.2 * avgMks) + (0.4 * examScore);
    return obtMarks * 0.2;
}

calculateFacultyQuality = (avgExperience, qualification, teacherStudentRatio) =>{
    const obtMarks = (0.3 * avgExperience) + (0.5 * qualification) + (0.2 * teacherStudentRatio);
    return obtMarks * 0.15;
}

calculateInfrastructure = (labsType, librarySize, sportsGround, smartClassrooms) =>{
    const obtMarks = (0.3 * labsType) + (0.4 * librarySize) + (0.2 * sportsGround) + (0.1 * smartClassrooms);
    return obtMarks * 0.10;
}

calculateSafety = (cctvCoverage, medicalFacility, transportSafety) => {
    const obtMarks = (0.4 * cctvCoverage) + (0.3 * medicalFacility) + (0.3 * transportSafety);
    return obtMarks * 0.10;
}

calculateFees = (feeTransparency, scholarships) => {
    const obtMarks = (0.5 * feeTransparency) + (0.5 * scholarships);
    return obtMarks * 0.10;
}

calculateDiversity = (genderRatio, scholarships, specialNeedsSupport) => {
    const obtMarks = (0.3 * genderRatio) + (0.3 * scholarships) + (0.4 * specialNeedsSupport);
    return obtMarks * 0.05;
}

calculateReviews = (avgRating, verifiedComments) => {
    const obtMarks = (0.7 * avgRating) + (0.3 * verifiedComments);
    return obtMarks * 0.10;
}

calculateTechAdoption = (smartClassroomPercent, eLearningPlatform) => {
    const obtMarks = (0.5 * smartClassroomPercent) + (0.5 * eLearningPlatform);
    return obtMarks * 0.05;
}

calculateExposure = (exchangePrograms, globalTieUps) => {
    const obtMarks = (0.5 * exchangePrograms) + (0.5 * globalTieUps);
    return obtMarks * 0.05;
}

calculateOutcomes = (alumniSuccess) => {
    return alumniSuccess * 0.10; 
}

calculateActivities = (activities) => {
    const obtMarks = activities;
    return obtMarks * 0.05; 
}

calculateMedicalFacility = (medicalFacility) => {
    let score = 0;
    if(medicalFacility.doctorAvailability) score += 1;
    if(medicalFacility.medkitAvailable) score += 1;
    if(medicalFacility.ambulanceAvailable) score += 1;

    return score;
}

calculateTransportSafety = (transportSafety) => {
    let score = 0;
    if(transportSafety.gpsTrackerAvailable) score += 1;
    if(transportSafety.driversVerified) score += 1;

    return score;
}
// services/application-services.js
import StudentApplication from '../models/application-model.js';

export const addStudApplications = async (data) => {
  const studentApplication = new StudentApplication(data);
  return await studentApplication.save();
};

export const getAllStudApplications = async () => {
  return await StudentApplication.find();
};

// Return ALL applications for a studId (previously returned a single application)
export const getStudApplicationsByStudId = async (studId) => {
  return await StudentApplication.find({ studId }).sort({ createdAt: -1 });
};

// Get a single application by applicationId (the _id of StudentApplication)
export const getStudApplicationById = async (applicationId) => {
  return await StudentApplication.findById(applicationId);
};

// Update a specific application by its applicationId
export const updateStudApplicationById = async (applicationId, data) => {
  return await StudentApplication.findByIdAndUpdate(applicationId, data, { new: true });
};

// Delete a specific application by applicationId
export const deleteStudApplicationById = async (applicationId) => {
  return await StudentApplication.findByIdAndDelete(applicationId);
};

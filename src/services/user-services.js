import Student from "../models/user-model.js";
import Auth from "../models/auth-model.js";

// Add a new student
export const addStudentService = async (data) => {
  const { authId } = data;

  const existingStudent = await Student.findOne({ authId });
  if (existingStudent) {
    throw {status:400, message:"Student Already Exists"};
  }

  const newStudent = new Student(data);
  return await newStudent.save();
};
// Count total students


// Update student
export const updateStudentService = async (authId, updates) => {
  const updatedStudent = await Student.findOneAndUpdate(
    { authId },
    updates,
    { new: true }
  );

  if (!updatedStudent) {
    throw {status:400, message:"Student Not Found"};
  }

  return updatedStudent;
};

export const deleteStudentService = async (email, password) => {
  // Find student by email
  const auth = await Auth.findOne({ email });
  if (!auth) {
    throw { status: 404, message: "Student not found" };
  }

  // Verify password
  const isPasswordMatch = password === auth.password; 
  if (!isPasswordMatch) {
    throw { status: 401, message: "Incorrect password" };
  }

  console.log(auth); 
  
  const student = await Student.findOne({ email });
  if (!student) {
    throw { status: 404, message: "Student not found" };
  }

  // Delete student
  const deletedStudent = await Student.deleteOne({ authId: student.authId });
  if (!deletedStudent) {
    throw { status: 400, message: "Failed to delete student" };
  }

  return deletedStudent;
};

// Get student
export const getStudentService = async (authId) => {
  const student = await Student.findOne({ authId });

  if (!student) {
    throw {status:400, message:"Student Not Found"};
  }

  return student;
};

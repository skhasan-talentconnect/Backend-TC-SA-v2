import StudentPdf from "../models/student-pdf-model.js";
import { generateStudentPDFBuffer } from "../utils/pdf-generator.js";
import { getStudApplicationsByStudId } from "./application-services.js";

// Save or update PDF buffer for a student
export const saveStudentPdf = async (studId, pdfBuffer, applicationId) => {
  return await StudentPdf.findOneAndUpdate(
    { studId, applicationId },  // store uniquely for this application!
    {
      studId,
      applicationId,
      pdfFile: {
        data: pdfBuffer,
        contentType: "application/pdf",
      },
    },
    { upsert: true, new: true }
  );
};

export const getStudentPDFBuffer = async (studId, applicationId) => {
  const record = await StudentPdf.findOne({ studId, applicationId });

  if (!record?.pdfFile?.data) {
    throw new Error("PDF not found for this application");
  }

  return record.pdfFile.data;
};



// Get saved PDF document from DB
export const getStudentPdf = async (studId, applicationId) => {
  return await StudentPdf.findOne({ studId, applicationId });
};


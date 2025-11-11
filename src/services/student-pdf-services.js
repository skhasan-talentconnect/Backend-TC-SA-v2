import StudentPdf from "../models/student-pdf-model.js";
import { generateStudentPDFBuffer } from "../utils/pdf-generator.js";
import { getStudApplicationsByStudId } from "./application-services.js";

// Save or update PDF buffer for a student
export const saveStudentPdf = async (studId, pdfBuffer) => {
  return await StudentPdf.findOneAndUpdate(
    { studId },
    {
      studId,
      pdfFile: {
        data: pdfBuffer,
        contentType: "application/pdf",
      },
    },
    { upsert: true, new: true }
  );
};

// Get PDF buffer (used for inline viewing)
export const getStudentPDFBuffer = async (studId) => {
  const application = await getStudApplicationsByStudId(studId);

  if (!application) {
    throw new Error("Student application not found");
  }

  const pdfBuffer = await generateStudentPDFBuffer(application);
  return pdfBuffer;
};

// Get saved PDF document from DB
export const getStudentPdf = async (studId) => {
  return await StudentPdf.findOne({ studId });
};

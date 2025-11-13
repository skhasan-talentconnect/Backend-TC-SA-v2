import StudentPdf from "../models/student-pdf-model.js";
import { generateStudentPDFBuffer } from "../utils/pdf-generator.js";
import { getStudApplicationsByStudId } from "./application-services.js";


export const listStudentPdfsByStudId = async (studId) => {
  const docs = await StudentPdf.find({ studId }).select("_id studId applicationId createdAt updatedAt").sort({ createdAt: -1 });
  // convert to plain objects (optional)
  return docs.map((d) => ({
    _id: d._id,
    studId: d.studId,
    applicationId: d.applicationId,
    createdAt: d.createdAt,
    updatedAt: d.updatedAt,
  }));
};
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


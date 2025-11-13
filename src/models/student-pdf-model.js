// models/studentPdf-model.js
import mongoose from "mongoose";

const StudentPdfSchema = new mongoose.Schema({
  studId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "students", // Reference to the student profile
    required: true,
  },
    applicationId: {
      type: String,
      required: true,   // store pdf per application
    },
  pdfFile: {
    data: Buffer,
    contentType: { type: String, default: "application/pdf" },
  },
}, { timestamps: true });
StudentPdfSchema.index({ studId: 1, applicationId: 1 }, { unique: true });

const StudentPdf = mongoose.model("pdfs", StudentPdfSchema);
export default StudentPdf;

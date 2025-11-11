import { generateStudentPDFBuffer } from "../utils/pdf-generator.js";
import { saveStudentPdf, getStudentPdf, getStudentPDFBuffer } from "../services/student-pdf-services.js";
import { getStudApplicationById } from "../services/application-services.js";

export const generateAndSaveStudentPdf = async (req, res) => {
  try {
    const { studId, applicationId } = req.params;

    // Fetch that ONE specific application
    const application = await getStudApplicationById(applicationId);
    if (!application) {
      return res.status(404).json({ message: "Application not found for this ID" });
    }

    // Generate PDF for that single application
    const pdfBuffer = await generateStudentPDFBuffer(application);

    // Save it linked to that student and application
    const saved = await saveStudentPdf(studId, pdfBuffer, applicationId);

    return res.status(201).json({
      message: "PDF generated successfully for this application",
      pdfId: saved._id,
    });
  } catch (err) {
    console.error("PDF generation error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const downloadStudentPdf = async (req, res) => {
  try {
    const { studId, applicationId } = req.params;
    const record = await getStudentPdf(studId, applicationId);

    if (!record || !record.pdfFile?.data) {
      return res.status(404).json({ message: "PDF not found for this application" });
    }

    res.set("Content-Type", "application/pdf");
    res.set("Content-Disposition", `attachment; filename=student_${studId}_${applicationId}.pdf`);
    return res.send(record.pdfFile.data);
  } catch (err) {
    console.error("Download error:", err);
    return res.status(500).json({ message: "Failed to download PDF" });
  }
};

export const viewStudentPDF = async (req, res) => {
  try {
    const { studId, applicationId } = req.params;
    const pdfBuffer = await getStudentPDFBuffer(studId, applicationId);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename=student-application-${applicationId}.pdf`,
      "Content-Length": pdfBuffer.length,
    });

    res.send(pdfBuffer);
  } catch (err) {
    console.error("PDF View Error:", err.message);
    res.status(500).json({ status: "error", message: err.message });
  }
};

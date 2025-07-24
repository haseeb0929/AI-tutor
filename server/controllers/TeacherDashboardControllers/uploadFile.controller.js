const Pdf = require("../../models/pdf.model");

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const existingPdf = await Pdf.findOne({ fileName: req.file.originalname });
    if (existingPdf) {
      return res.status(409).json({ message: "File already exists in database" });
    }
    const pdf = new Pdf({
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      size: req.file.size,
    });

    await pdf.save();

    return res.status(200).json({
      message: "File uploaded and saved to DB",
      pdf,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ message: "Server error during file upload" });
  }
};

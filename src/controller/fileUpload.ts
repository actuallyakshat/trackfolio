import { Request, Response, NextFunction, RequestHandler } from "express";
import { UploadedFile } from "express-fileupload";
import cloudinary from "../config/cloudinary";
import Application from "../model/Application";

// Upload Resume Handler
export const uploadResume: any = async (req: any, res: any, next: any) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Application ID is required" });
    }

    const typedReq = req as Request & { files?: { resume?: UploadedFile } };

    console.log("Incoming Files:", typedReq.files);

    if (!typedReq.files?.resume) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const uploadedFile = typedReq.files.resume;
    if (!uploadedFile.mimetype.includes("pdf")) {
      return res.status(400).json({ error: "Please upload a PDF file" });
    }

    const result = await cloudinary.uploader.upload(uploadedFile.tempFilePath, {
      resource_type: "auto",
      folder: "resumes",
      public_id: `resume-${id}-${Date.now()}`,
    });

    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      { resumeUploaded: result.secure_url },
      { new: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({ error: "Application not found" });
    }

    res.status(200).json({
      message: "Resume uploaded successfully",
      url: result.secure_url,
      application: updatedApplication,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      error: "Failed to upload resume",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Delete Resume Handler
export const deleteResume = async (req: any, res: any, next: any) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Application ID is required" });
    }

    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    if (application.resumeUploaded === null) {
      return res.status(400).json({
        error: "Resume is not uploaded yet",
      });
    }

    const resumeUrlParts = application.resumeUploaded.split("/");
    const resumeIdWithExtension = resumeUrlParts.pop();

    if (!resumeIdWithExtension) {
      return res.status(400).json({ error: "Invalid resume URL" });
    }

    const resumeId =
      resumeUrlParts.slice(-1)[0] + "/" + resumeIdWithExtension.split(".")[0];

    console.log("Resume ID:", resumeId);

    const response = await cloudinary.uploader.destroy(resumeId);
    console.log("CLOUDINARY DELETION RESPONSE: ", response);

    if (response.result !== "ok") {
      return res
        .status(500)
        .json({ error: "Failed to delete resume from Cloudinary" });
    }

    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      { resumeUploaded: null },
      { new: true }
    );

    if (!updatedApplication) {
      return res.status(404).json({ error: "Application not found" });
    }

    res.status(200).json({
      message: "Resume deleted successfully",
      application: updatedApplication,
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({
      error: "Failed to delete resume",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

import { Router } from "express";
import {
  createApplication,
  deleteApplication,
  getApplication,
  getApplications,
  updateApplication,
} from "../controller/applicationController";
import { deleteResume, uploadResume } from "../controller/fileUpload";

const applicationsRouter = Router();

applicationsRouter.post("/", createApplication);
applicationsRouter.get("/", getApplications);
applicationsRouter.get("/:id", getApplication);
applicationsRouter.delete("/:id", deleteApplication);
applicationsRouter.patch("/:id", updateApplication);
applicationsRouter.post("/:id/resume", uploadResume);
applicationsRouter.delete("/:id/resume", deleteResume);

export default applicationsRouter;

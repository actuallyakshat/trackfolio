import { Router } from "express";
import {
  createApplication,
  deleteApplication,
  getApplication,
  getApplications,
  updateApplication,
} from "../controller/applicationController";

const applicationsRouter = Router();

applicationsRouter.post("/", createApplication);
applicationsRouter.get("/", getApplications);
applicationsRouter.get("/:id", getApplication);
applicationsRouter.delete("/:id", deleteApplication);
applicationsRouter.patch("/:id", updateApplication);

export default applicationsRouter;

import { Router } from "express";
import {
  createApplication,
  getApplication,
  getApplications,
} from "../controller/applicationController";

const applicationsRouter = Router();

applicationsRouter.post("/", createApplication);
applicationsRouter.get("/", getApplications);
applicationsRouter.get("/:id", getApplication);

export default applicationsRouter;

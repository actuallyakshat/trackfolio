import { Request, Response } from "express";
import Application from "../model/Application";
import User from "../model/User";

export async function getApplications(
  req: Request,
  res: Response
): Promise<any> {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const applications = await Application.find({
      userId: req.user._id,
    });

    return res.status(200).json({ applications });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
}

export async function getApplication(
  req: Request,
  res: Response
): Promise<any> {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const application = await Application.findOne({
      userId: req.user._id,
      _id: req.params.id,
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    return res.status(200).json({ application });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
}

export async function createApplication(
  req: Request,
  res: Response
): Promise<any> {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const application = await Application.create({
      name: req.body.name,
      position: req.body.position,
      salary: req.body.salary,
      jobType: req.body.jobType,
      status: req.body.status,
      applicationDate: req.body.applicationDate,
      notes: req.body.notes,
      openingUrl: req.body.openingUrl,
      userId: req.user._id,
    });

    await User.findByIdAndUpdate(req.user._id, {
      $push: { applications: application._id },
    });

    return res.status(201).json({ application });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
}

export async function updateApplication(
  req: Request,
  res: Response
): Promise<any> {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const application = await Application.findOne({
      userId: req.user._id,
      _id: req.params.id,
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    const { name, position, salary, jobType, status, applicationDate, notes } =
      req.body;

    if (name) {
      application.name = name;
    }

    if (position) {
      application.position = position;
    }

    if (salary) {
      application.salary = salary;
    }

    if (jobType) {
      application.jobType = jobType;
    }

    if (status) {
      application.status = status;
    }

    if (applicationDate) {
      application.applicationDate = applicationDate;
    }

    if (notes) {
      application.notes = notes;
    }

    await application.save();

    return res.status(200).json({ application });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
}

export async function deleteApplication(
  req: Request,
  res: Response
): Promise<any> {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const application = await Application.findOne({
      userId: req.user._id,
      _id: req.params.id,
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    await Application.findByIdAndDelete(req.params.id);

    return res
      .status(200)
      .json({ message: "Application deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
}

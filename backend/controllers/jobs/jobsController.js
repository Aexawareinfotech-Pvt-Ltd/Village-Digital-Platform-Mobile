import Job from "../../models/Job/Job.js";
import JobApplication from "../../models/Job/JobApplication.js";
import User from "../../models/User/User.js";
import { sendSuccess, sendError } from "../../utils/response.js";

export const getAllJobs = async (req, res) => {
  try {
    const { category, jobType, isGovernment, search, page = 1, limit = 10 } = req.query;
    const filter = { isActive: true, status: "approved" };
    if (category) filter.category = category;
    if (jobType) filter.jobType = jobType;
    if (isGovernment !== undefined) filter.isGovernment = isGovernment === "true";
    if (search) filter.$or = [{ title: { $regex: search, $options: "i" } }, { organization: { $regex: search, $options: "i" } }];
    const skip = (Number(page) - 1) * Number(limit);
    const [jobs, total] = await Promise.all([
      Job.find(filter).sort({ postedDate: -1 }).skip(skip).limit(Number(limit)),
      Job.countDocuments(filter),
    ]);
    return res.json({ success: true, data: jobs, pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / limit) } });
  } catch (err) { return sendError(res, err.message); }
};

export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return sendError(res, "Job not found", 404);
    let isApplied = false, isSaved = false;
    if (req.user) {
      const [app, user] = await Promise.all([
        JobApplication.findOne({ jobId: req.params.id, userId: req.user.id }),
        User.findById(req.user.id),
      ]);
      isApplied = !!app;
      isSaved = user?.savedJobs?.map(String).includes(req.params.id) || false;
    }
    return sendSuccess(res, "Job fetched", { ...job.toObject(), isApplied, isSaved });
  } catch (err) { return sendError(res, err.message); }
};

export const applyForJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job || !job.isActive) return sendError(res, "Job not found or inactive", 404);
    if (job.deadlineDate && new Date() > new Date(job.deadlineDate)) return sendError(res, "Application deadline passed", 400);
    const exists = await JobApplication.findOne({ jobId: req.params.id, userId: req.user.id });
    if (exists) return sendError(res, "Already applied for this job", 409);
    const { name, email, phone, experience, coverLetter } = req.body;
    const resumeUrl = req.file ? req.file.path : "";
    const application = await JobApplication.create({ jobId: req.params.id, userId: req.user.id, name, email, phone, experience, coverLetter, resumeUrl });
    return sendSuccess(res, "Application submitted successfully", application, 201);
  } catch (err) { return sendError(res, err.message); }
};

export const getMyApplications = async (req, res) => {
  try {
    const applications = await JobApplication.find({ userId: req.user.id })
      .populate("jobId", "title organization jobType location salary postedDate deadlineDate")
      .sort({ createdAt: -1 });
    return sendSuccess(res, "Applications fetched", applications);
  } catch (err) { return sendError(res, err.message); }
};

export const toggleSaveJob = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const jobId = req.params.id;
    const saved = user.savedJobs.map(String);
    const idx = saved.indexOf(jobId);
    if (idx > -1) user.savedJobs.splice(idx, 1);
    else user.savedJobs.push(jobId);
    await user.save();
    return sendSuccess(res, idx === -1 ? "Job saved" : "Job unsaved", { saved: idx === -1 });
  } catch (err) { return sendError(res, err.message); }
};

export const getJobCategories = async (req, res) => {
  try {
    const categories = await Job.distinct("category", { isActive: true, status: "approved" });
    return sendSuccess(res, "Categories fetched", ["All", ...categories.filter(Boolean)]);
  } catch (err) { return sendError(res, err.message); }
};

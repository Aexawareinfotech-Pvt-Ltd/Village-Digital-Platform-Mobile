import LocalService from "../../models/LocalService/LocalService.js";
import { sendSuccess, sendError } from "../../utils/response.js";

export const getAllServices = async (req, res) => {
  try {
    const { search, category } = req.query;
    const filter = {};
    if (category && category !== "All") filter.category = category;
    if (search) filter.$or = [{ name: { $regex: search, $options: "i" } }, { services: { $regex: search, $options: "i" } }];
    const services = await LocalService.find(filter).sort({ category: 1, name: 1 });
    return sendSuccess(res, "Services fetched", services);
  } catch (err) { return sendError(res, err.message); }
};

export const getServicesByCategory = async (req, res) => {
  try {
    const services = await LocalService.find({ category: req.params.category }).sort({ name: 1 });
    return sendSuccess(res, "Services fetched", services);
  } catch (err) { return sendError(res, err.message); }
};

export const getServiceById = async (req, res) => {
  try {
    const service = await LocalService.findById(req.params.id);
    if (!service) return sendError(res, "Service not found", 404);
    return sendSuccess(res, "Service fetched", service);
  } catch (err) { return sendError(res, err.message); }
};

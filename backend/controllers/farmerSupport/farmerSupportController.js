import CropAdvisory from "../../models/Agriculture/CropAdvisory.js";
import MandiPrice from "../../models/Agriculture/MandiPrice.js";
import GovernmentScheme from "../../models/Agriculture/GovernmentScheme.js";
import Irrigation from "../../models/Agriculture/Irrigation.js";
import SoilTestingCenter from "../../models/Agriculture/SoilTestingCenter.js";
import { sendSuccess, sendError } from "../../utils/response.js";

// CROP ADVISORY
export const getCropAdvisories = async (req, res) => {
  try {
    const { season, search } = req.query;
    const filter = { isActive: true };
    if (season) filter.season = season;
    if (search) filter.cropName = { $regex: search, $options: "i" };
    const advisories = await CropAdvisory.find(filter).sort({ createdAt: -1 });
    return sendSuccess(res, "Crop advisories fetched", advisories);
  } catch (err) { return sendError(res, err.message); }
};

export const getCropAdvisoryById = async (req, res) => {
  try {
    const advisory = await CropAdvisory.findById(req.params.id);
    if (!advisory) return sendError(res, "Advisory not found", 404);
    return sendSuccess(res, "Advisory fetched", advisory);
  } catch (err) { return sendError(res, err.message); }
};

// MANDI PRICES
export const getMandiPrices = async (req, res) => {
  try {
    const { market, cropName } = req.query;
    const filter = {};
    if (market) filter.market = { $regex: market, $options: "i" };
    if (cropName) filter.$or = [{ cropName: { $regex: cropName, $options: "i" } }, { cropNameHindi: { $regex: cropName, $options: "i" } }];
    const prices = await MandiPrice.find(filter).sort({ date: -1 }).limit(100);
    return sendSuccess(res, "Mandi prices fetched", prices);
  } catch (err) { return sendError(res, err.message); }
};

// GOVERNMENT SCHEMES
export const getGovernmentSchemes = async (req, res) => {
  try {
    const { search } = req.query;
    const filter = { isActive: true };
    if (search) filter.$or = [{ schemeName: { $regex: search, $options: "i" } }, { benefit: { $regex: search, $options: "i" } }];
    const schemes = await GovernmentScheme.find(filter).sort({ createdAt: -1 });
    return sendSuccess(res, "Schemes fetched", schemes);
  } catch (err) { return sendError(res, err.message); }
};

export const getSchemeById = async (req, res) => {
  try {
    const scheme = await GovernmentScheme.findById(req.params.id);
    if (!scheme) return sendError(res, "Scheme not found", 404);
    return sendSuccess(res, "Scheme fetched", scheme);
  } catch (err) { return sendError(res, err.message); }
};

// IRRIGATION
export const getIrrigationAdvice = async (req, res) => {
  try {
    const { cropName } = req.query;
    const filter = cropName ? { cropName: { $regex: cropName, $options: "i" } } : {};
    const advice = await Irrigation.find(filter).sort({ createdAt: -1 });
    return sendSuccess(res, "Irrigation advice fetched", advice);
  } catch (err) { return sendError(res, err.message); }
};

// SOIL TESTING CENTERS
export const getSoilTestingCenters = async (req, res) => {
  try {
    const centers = await SoilTestingCenter.find().sort({ name: 1 });
    return sendSuccess(res, "Soil testing centers fetched", centers);
  } catch (err) { return sendError(res, err.message); }
};

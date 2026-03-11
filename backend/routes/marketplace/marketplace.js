import express from "express";
import { getAllListings, getListingById, createListing, updateListing, deleteListing, getMyListings, toggleSaveListing, getSavedListings, getSellerContact, getCategories } from "../../controllers/marketplace/marketplaceController.js";
import authMiddleware from "../../middlewares/authMiddleware.js";
import { uploadMarketplace } from "../../middlewares/upload.js";
const router = express.Router();
// Public
router.get("/",           getAllListings);
router.get("/categories", getCategories);
router.get("/:id",        getListingById);
// Auth
router.use(authMiddleware);
router.post("/",                     uploadMarketplace.array("images", 5), createListing);
router.put("/:id",                   uploadMarketplace.array("images", 5), updateListing);
router.delete("/:id",                deleteListing);
router.post("/:id/save",             toggleSaveListing);
router.get("/:id/contact",           getSellerContact);
router.get("/my/listings",           getMyListings);
router.get("/my/saved",              getSavedListings);
export default router;

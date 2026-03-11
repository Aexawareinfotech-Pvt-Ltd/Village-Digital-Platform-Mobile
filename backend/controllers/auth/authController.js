import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../../models/User/User.js";
import { sendResetEmail, sendWelcomeEmail } from "../../utils/email.js";
import {
  registerSchema,
  loginSchema,
  resetPasswordSchema,
} from "../../utils/validators.js";
import { sendSuccess, sendError } from "../../utils/response.js";

const sign = (user) =>
  jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

// REGISTER
export const register = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body, { abortEarly: false });
    if (error)
      return res
        .status(400)
        .json({
          success: false,
          message: "Validation failed",
          errors: error.details.map((e) => e.message),
        });
    const { name, email, phone, password, village, address, pincode } =
      req.body;
    const exists = await User.findOne({ $or: [{ email }, { phone }] });
    if (exists)
      return sendError(
        res,
        "User with this email or phone already exists",
        409,
      );
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      phone,
      passwordHash,
      village: village || "",
      address: address || "",
      pincode: pincode || "",
      role: "User",
    });
    try {
      await sendWelcomeEmail({ to: user.email, name: user.name });
    } catch {}
    const token = sign(user);
    return res
      .status(201)
      .json({
        success: true,
        message: "Account created successfully",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          profilePicture: user.profilePicture,
        },
      });
  } catch (err) {
    return sendError(res, err.message);
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) return sendError(res, error.details[0].message, 400);
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return sendError(res, "Invalid credentials", 401);
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return sendError(res, "Invalid credentials", 401);
    user.lastActive = new Date();
    await user.save();
    const token = sign(user);
    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profilePicture: user.profilePicture,
        village: user.village,
        bio: user.bio,
        address: user.address,
        pincode: user.pincode,
      },
    });
  } catch (err) {
    return sendError(res, err.message);
  }
};

// GET ME
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-passwordHash -resetPasswordToken -resetPasswordExpire",
    );
    if (!user) return sendError(res, "User not found", 404);
    return sendSuccess(res, "Profile fetched", user);
  } catch (err) {
    return sendError(res, err.message);
  }
};

// LOGOUT
export const logout = async (req, res) =>
  sendSuccess(res, "Logged out successfully");

// FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return sendSuccess(
        res,
        "If the email exists, a reset link has been sent",
      );
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    try {
      await sendResetEmail({ to: user.email, resetUrl });
    } catch {}
    return sendSuccess(res, "If the email exists, a reset link has been sent");
  } catch (err) {
    return sendError(res, err.message);
  }
};

// RESET PASSWORD
export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password)
      return sendError(res, "Token and password required", 400);
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) return sendError(res, "Invalid or expired token", 400);
    user.passwordHash = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return sendSuccess(res, "Password reset successful");
  } catch (err) {
    return sendError(res, err.message);
  }
};

// CHANGE PASSWORD
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) return sendError(res, "Current password is incorrect", 400);
    user.passwordHash = await bcrypt.hash(newPassword, 10);
    await user.save();
    return sendSuccess(res, "Password changed successfully");
  } catch (err) {
    return sendError(res, err.message);
  }
};

import mongoose from "mongoose";
const { Schema, model, models } = mongoose

// Model: OTP
const otpSchema = new Schema({
    phone: {
        type: String,
        required: true,
    },
    codeHash: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
});
export default models.Otp || model("otpSchema", otpSchema);

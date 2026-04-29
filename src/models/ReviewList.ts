import mongoose from "mongoose";
const { Schema, model, models } = mongoose

// Model: ReviewList
const reviewListSchema = new Schema({
    reviewText: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    rating: {
        type: Number, // Assuming Float in Prisma maps to Number in Mongoose
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    reviewOwn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    ownerId: { // Redundant if 'reviewOwn' is properly set up as a ref
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});
export default models.ReviewList || model("ReviewList", reviewListSchema);

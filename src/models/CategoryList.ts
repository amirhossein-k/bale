import mongoose from "mongoose";
const { Schema, model, models } = mongoose



// Model: CategoryList
const categoryListSchema = new Schema({
    category: {
        type: String,
        required: true,
    },
    categoryOwn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    ownerId: { // Redundant if 'categoryOwn' is properly set up as a ref
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});

export default models.CategoryList || model("CategoryList", categoryListSchema);

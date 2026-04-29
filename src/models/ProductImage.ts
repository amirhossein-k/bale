import mongoose from "mongoose";
const { Schema, model, models } = mongoose

// Model: ProductImage
const productImageSchema = new Schema({
    defaultImage: {
        type: Boolean,
        default: false,
    },
    childImage: {
        type: String,
        required: true,
    },
    fileKey: {
        type: String,
    },
    imageOwn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    ownerId: { // Redundant if 'imageOwn' is properly set up as a ref
        type: mongoose.Schema.Types.ObjectId,
    },
    //   Products: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    //   productId: String
});


export default models.ProductImage || model("ProductImage", productImageSchema);

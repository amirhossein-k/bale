import mongoose from "mongoose";
const { Schema, model, models } = mongoose

// Model: Product
const productSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number, // Assuming Float in Prisma maps to Number in Mongoose
        required: true,
    },
    priceWithProfit: {
        type: Number, // Assuming Float in Prisma maps to Number in Mongoose
    },
    content: {
        type: String,
    },
    tableContent: {
        type: String,
    },
    count: {
        type: Number, // Assuming Float in Prisma maps to Number in Mongoose
        required: true,
    },
    countproduct: {
        type: Number, // Assuming Float in Prisma maps to Number in Mongoose
        required: true,
    },
    priceOffer: {
        type: Number, // Assuming Float in Prisma maps to Number in Mongoose
    },
    listProperty: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ListProperty',
    }],
    tags: {
        type: [String],
        default: [],
    },
    colors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Colors',
    }],
    review: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ReviewList',
    }],
    productImage: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductImage',
    }],
    // selectedVariantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Variant' }, // ← This line is added
    published: {
        type: Boolean,
        default: false,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    authorId: { // Redundant if 'author' is properly set up as a ref
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    categoryList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategoryList',
    }],
    productVariants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductVariant',
    }],
    purchaseOrderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PurchaseOrderItem',
    }],
    lastUpdatedBySupplier: {
        type: Date,
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    supplierId: { // Redundant if 'supplier' is properly set up as a ref
        type: mongoose.Schema.Types.ObjectId,
    },
    discountDaysLeft: {
        type: Number, // Assuming Float in Prisma maps to Number in Mongoose
    },
    discountEndDate: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
});
// For @updatedAt in Mongoose
productSchema.pre('save', function (next) {
    this.updatedAt = new Date();
});

export default models.Product || model("ProductSchema", productSchema);

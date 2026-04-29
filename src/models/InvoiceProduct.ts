
import mongoose from "mongoose";

const { Schema, model, models } = mongoose

const invoiceProductSchema = new Schema({
    // order: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], // اقلام سبد خرید
    // idOrder: String,

    countOrder: {
        type: Number, // Assuming Float in Prisma maps to Number in Mongoose
        required: true,
    },
    total: {
        type: Number, // Assuming Float in Prisma maps to Number in Mongoose
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
    variantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Variant',
    },
    quantity: {
        type: Number,
        default: 1,
    },
    status: {
        type: String, // Assuming OrderStatus is an enum or string
        default: 'LOADING', // Default value for OrderStatus
    },
    invoiceOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        onDelete: 'CASCADE', // Mongoose doesn't directly support onDelete cascade in schema, needs to be handled in application logic or with specific plugins.
        onUpdate: 'CASCADE',
    },
    invoiceOwnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});
// For @updatedAt in Mongoose, you typically use a plugin like `mongoose-update-plugin` or handle it in your save logic.
// Here, we'll set updatedAt manually before saving if needed, or use a plugin.
invoiceProductSchema.pre('save', function (next) {
    // 'this' refers to the document being saved
    if (this.isModified()) { // Check if the document has been modified
        this.updatedAt = new Date();
    }
});
export default models.InvoiceProduct || model("InvoiceProduct", invoiceProductSchema);

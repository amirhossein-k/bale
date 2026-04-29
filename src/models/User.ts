// app\model\User.ts
import mongoose from "mongoose";

const { Schema, model, models } = mongoose
const userSchema = new Schema(
    {
        password: {
            type: String,
        },
        name: {
            type: String,
        },
        phoneNumber: {
            type: String,
            unique: true,
            required: true,
        },
        purchaseOrders: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PurchaseOrder',
        }],
        products: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        }],
        isVerified: {
            type: Boolean,
            default: false,
        },
        listOrderShop: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'InvoiceProduct',
        }],
        address: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address',
        }],
        admin: {
            type: Boolean,
            default: false,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

export default models.User || model("User", userSchema);

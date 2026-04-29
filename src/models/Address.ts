import mongoose from "mongoose";
const { Schema, model, models } = mongoose
// Model: Adress
const addressSchema = new Schema({
    location: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    zipcode: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    userId: { // This is redundant if 'user' field is properly set up as a ref, but keeping it as per Prisma schema.
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});
export default models.address || model("addressSchema", addressSchema);

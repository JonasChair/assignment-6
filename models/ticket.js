import mongoose from "mongoose";

const ticketSchema = mongoose.Schema({
    id: { type: String },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    departureLocation: { type: String, required: true },
    destination: { type: String, required: true },
    destinationPhotoUrl: { type: String, required: true }
});

export default mongoose.model("Ticket", ticketSchema);
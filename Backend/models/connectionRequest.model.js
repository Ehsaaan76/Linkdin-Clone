import mongoose from "mongoose";

const connectionRequest = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type:  String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending"
    },
}, {timestamps: true})

const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequest)
export default ConnectionRequest
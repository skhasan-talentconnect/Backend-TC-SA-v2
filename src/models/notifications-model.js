import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    authId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'auths',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: false,
    },
    notificationType:{
        type: String,
        enum: ['discovery', 'accepted', 'rejected', 'review', 'submitted'],
        required: false,
    },
    data: {
        type: Object,
        required: false,
    },
    is_read: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

const Notification = mongoose.model('notifications', notificationSchema);
export default Notification;
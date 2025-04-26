import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "",
    },
    bannerImage: {
        type: String,
        default: "",
    },
    headline: {
        type: String,
        default: "Linkdin User",
    },
    location: {
        type: String,
        default: 'Earth',
    },
    about: {
        type: String,
        default: "",
    },
    skills: {
        type: [String],
        default: [],
    },
    experience: [{
        title: {
            type: String,
            required: true,
        },
        company: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            default: "",
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            default: null,
        },
        description: {
            type: String,
            default: "",
        },
    }],
    education: [{
        school: {
            type: String,
            required: true,
        },
        degree: {
            type: String,
            required: true,
        },
        fieldOfStudy: {
            type: String,
            default: "",
        },
        startDate: {
            type: Number,
            required: true,
        },
        endDate: {
            type: Number,
            default: null,
        },
    }], 
        connections: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
}, {timestamps: true}); 

const User = mongoose.model('User', userSchema);

export default User;
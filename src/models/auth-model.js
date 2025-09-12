import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            sparse : true,
            required : false
        },
        phoneNumber: {
            type :String,
            required:false,
        },
        password: {
            type: String,
            required : false
        },
        isEmailVerified: {
            type: Boolean,
            required: false,
            default: false,
        },
        userType: {
            type: String,
            required: true,
            enum: ['student', 'parent', 'school'],
        },
        authProvider: {
            type: String,
            required: true,
            enum: ['google', 'email', 'mobile']
        },
        deviceToken:{
            type: String,
            required: false,
        }
    },
    {
        timestamps: true,
    }
);

const Auth = mongoose.model("auths", AuthSchema);
export default Auth;
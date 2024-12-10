//importer mongoose
import mongoose from "mongoose";
import validator from "validator";

const user = mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        minLength: [3,"Minimum 3 lettre"]
    },
    last_name: {
        type: String,
        required: true,
        minLength: [3,"Minimum 3 lettre"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Mail incorrect!!!"],
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: [4,"Minimum 3 caractere"]
    },
    role: {
        type: String,
        required: true,
        enum: ["Admin", "User"]
    },
    avatar: {
        type: String
    }
})

export const User = mongoose.model("User", user)
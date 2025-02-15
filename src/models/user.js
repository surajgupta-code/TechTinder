import mongoose from 'mongoose';
import validator from 'validator';
const userSchema = new mongoose.Schema(
    {
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20,
        match: [/^[a-zA-Z]+$/, "Invalid first name"]
    },
    lastName: {
        type: String,
        default: "",
        trim: true,
        match: [/^[a-zA-Z]+$/, "Invalid last name"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Invalid Email Format",
          ],    },

    password: {
        type: String,
        required: true,
        minLength: 6,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Invalid Password: Password must contain at least 1 lowercase, 1 uppercase, 1 number, 1 symbol and must be at least 8 characters long");
         } }
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        validate: {
            validator: function(value) {
                return ["male", "female", "other"].includes(value);
            },
            message: "Gender is invalid"
        }
    },
    photourl: {
        type: String,
        default: "https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid URL");
         } }},
    about: {
        type: String,
        default: "Passionate tech enthusiast with a strong background in software development and problem-solving."
    },
    skills: {
        type: [String], // Array of strings
        validate: {
          validator: function (value) {
            return value.length <= 25; // Max 25 skills allowed
          },
          message: "You can add up to 25 skills only",
        },
      },
},
{
    timestamps: true,
}



);

const userModel = mongoose.model("User", userSchema);

export default userModel;

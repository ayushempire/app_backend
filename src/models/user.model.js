import mongoose, { Schema } from "mongoose";

import bcryptjs from "bcryptjs";

const UserSchema = new Schema(
    {
        user: {
            type: String,
            required: true,
            lowecase: true,
            unique: true,
            index: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true,
            trim: true,
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        avatar: {
            type: String, // cloudnary
            required: true,
        },
        coverimage: {
            type: String, //cloudnary
        },
        warchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video",
            },
        ],
        refreshToken: {
            type: String,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
    },
    { timestamps: true },
);

// hooks
UserSchema.pre("save", async function (next) {
    // checking the password is changed or not
    if (!this.isModified("password")) return next();
    // to hash password
    this.password = await bcryptjs.hashSync(this.password, 10);
    next();
});

export const user = mongoose.model("User", UserSchema);

import mongoose from "mongoose";
import { hash } from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    // User's email - must be unique, in lowercase, and trimmed of whitespace
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required!"],
      lowercase: true,
      trim: true,
    },

    // User's password - must be at least 8 characters, stored as a hash
    password: {
      type: String,
      required: [true, "Password is required!"],
      minlength: 8,
    },

    // User's first name - optional, max length 50 characters, trimmed of whitespace
    firstName: {
      type: String,
      trim: true,
      maxlength: 50,
    },

    // User's last name - optional, max length 50 characters, trimmed of whitespace
    lastName: {
      type: String,
      trim: true,
      maxlength: 50,
    },

    // Avatar URL - optional, defaults to null if not provided
    avatar: {
      type: String,
      default: null,
    },

    // User's color (e.g., for initials-based avatars) - optional
    color: {
      type: Number,
      required: false,
    },

    // User's theme preference - either "dark" or "light", defaults to "light"
    themePreference: {
      type: String,
      enum: ["dark", "light"],
      default: "light",
    },

    // Online status of the user - defaults to false
    isOnline: {
      type: Boolean,
      default: false,
    },

    // Timestamp of the user's last seen activity - optional, defaults to null
    lastSeen: {
      type: Date,
      default: null,
    },

    // User's bio - optional, max length 150 characters, trimmed of whitespace
    bio: {
      type: String,
      maxlength: 150,
      minlength: 10,
      trim: true,
    },

    // Whether the user has completed profile setup - defaults to false
    profileSetup: {
      type: Boolean,
      default: false,
      required: [true, "Profile setup is required!"],
    },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` fields automatically
  }
);

// Middleware to hash the user's password before saving the document
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    // Hash the password only if it has been modified
    this.password = await hash(this.password, 10);
  }
  next();
});

// Export the User model
export default mongoose.model("User", userSchema);

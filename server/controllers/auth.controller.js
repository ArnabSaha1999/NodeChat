import jwt from "jsonwebtoken";
import { jwtSecret } from "../environment.js";
import User from "../models/user.model.js";
import { compare } from "bcrypt";
import { v2 as cloudinary } from "cloudinary";

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, jwtSecret, {
    expiresIn: maxAge,
  });
};

export const signUp = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    email = email.trim();
    if (!email || !password) {
      return res.status(400).send("Email and password are required!");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email is already taken!");
    }

    const user = await User.create({ email, password });
    res.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });
    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error!");
  }
};

export const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    email = email.trim();
    if (!email || !password) {
      return res.status(400).send("Email and password are required!");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("Email or password is incorrect!");
    }
    const auth = await compare(password, user.password);
    if (!auth) {
      return res.status(404).send("Email or password is incorrect!");
    }

    res.cookie("jwt", createToken(email, user.id), {
      maxAge,
      secure: true,
      sameSite: "None",
    });
    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstName: user.firstName,
        lastName: user.lastName,
        color: user.color || 0,
        avatar: user.avatar || null,
        themePreference: user.themePreference,
        isOnline: user.isOnline,
        lastSeen: user.lastSeen,
        bio: user.bio || null,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error!");
  }
};

export const getUserInfo = async (req, res, next) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User with the given email not found!");
    }
    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstName: user.firstName,
        lastName: user.lastName,
        color: user.color || 0,
        avatar: user.avatar || null,
        themePreference: user.themePreference,
        isOnline: user.isOnline,
        lastSeen: user.lastSeen,
        bio: user.bio || null,
      },
    });
  } catch (error) {
    return res.status(500).send("Internal server error!");
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { userId } = req;
    let { firstName, lastName, bio } = req.body;
    firstName = firstName.trim();
    lastName = lastName.trim();
    bio = bio.trim();
    if (!firstName) {
      return res.status(400).send("First name is required!");
    } else if (firstName.length > 50) {
      return res.status(400).send("First name cannot exceed 50 character!");
    }

    if (!lastName) {
      return res.status(400).send("Last name is required!");
    } else if (lastName.length > 50) {
      return res.status(400).send("Last name cannot exceed 50 character!");
    }

    if (!bio) {
      return res.status(400).send("Tell us about you!");
    } else if (bio.length < 10) {
      return res.status(400).send("Bio must be at least 10 characters long!");
    } else if (bio.length > 150) {
      return res.status(400).send("Bio cannot exceed 150 characters!");
    }

    const isOnline = true;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        bio,
        profileSetup: true,
        isOnline,
      },
      { new: true, runValidators: true }
    );

    if (!user) {
      res.status(404).send("User not found!");
    }

    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstName: user.firstName,
        lastName: user.lastName,
        color: user.color || 0,
        avatar: user.avatar || null,
        themePreference: user.themePreference,
        isOnline: user.isOnline,
        lastSeen: user.lastSeen,
        bio: user.bio || null,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error!");
  }
};

export const addProfileAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send("File is required!");
    }

    const validImageTypes = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/svg",
      "image/webp",
    ];

    if (!validImageTypes.includes(req.file.mimetype)) {
      return res
        .status(400)
        .send("Invalid file type! Only image files are allowed.");
    }

    const maxSize = 10 * 1024 * 1024; // 5MB
    if (req.file.size > maxSize) {
      return res
        .status(400)
        .send(
          "File size exceeds the 10MB limit. Please upload a smaller file."
        );
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        avatar: req.file.filename,
      },
      { new: true, runValidators: true }
    );

    if (!user) {
      res.status(404).send("User not found!");
    }

    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstName: user.firstName,
        lastName: user.lastName,
        color: user.color || 0,
        avatar: user.avatar,
        themePreference: user.themePreference,
        isOnline: user.isOnline,
        lastSeen: user.lastSeen,
        bio: user.bio || null,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error!");
  }
};

export const updateProfileAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send("File is required!");
    }

    const validImageTypes = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/svg",
      "image/webp",
    ];

    if (!validImageTypes.includes(req.file.mimetype)) {
      return res
        .status(400)
        .send("Invalid file type! Only image files are allowed.");
    }

    const maxSize = 10 * 1024 * 1024; // 5MB
    if (req.file.size > maxSize) {
      return res
        .status(400)
        .send(
          "File size exceeds the 10MB limit. Please upload a smaller file."
        );
    }

    const user = await User.findById(req.userId);

    if (!user) {
      res.status(404).send("User not found!");
    }

    if (user.avatar) {
      try {
        await cloudinary.uploader.destroy(user.avatar);
      } catch (error) {
        console.log("Cloudinary Deletion Error: ", error);
      }
    }

    user.avatar = req.file.filename;

    await user.save();

    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstName: user.firstName,
        lastName: user.lastName,
        color: user.color || 0,
        avatar: user.avatar,
        themePreference: user.themePreference,
        isOnline: user.isOnline,
        lastSeen: user.lastSeen,
        bio: user.bio || null,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error!");
  }
};

export const removeProfileAvatar = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      res.status(404).send("User not found!");
    }
    if (user.avatar) {
      try {
        await cloudinary.uploader.destroy(user.avatar);
      } catch (error) {
        console.log("Cloudinary Deletion Error: ", error);
      }
    }
    user.avatar = null;
    await user.save();

    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstName: user.firstName,
        lastName: user.lastName,
        color: user.color || 0,
        avatar: user.avatar || null,
        themePreference: user.themePreference,
        isOnline: user.isOnline,
        lastSeen: user.lastSeen,
        bio: user.bio || null,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error!");
  }
};

export const chooseThemePreference = async (req, res, next) => {
  const { theme } = req.body;
  if (!theme) {
    return res.status(400).send("Please choose a theme!");
  }
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      res.status(404).send("User not found!");
    }
    if (theme !== user.themePreference) {
      user.themePreference = theme;
      await user.save();
    }
    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
        firstName: user.firstName,
        lastName: user.lastName,
        color: user.color || 0,
        avatar: user.avatar || null,
        themePreference: user.themePreference,
        isOnline: user.isOnline,
        lastSeen: user.lastSeen,
        bio: user.bio || null,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error!");
  }
};

export const changePassword = async (req, res, next) => {};

export const logOut = async (req, res, next) => {
  try {
    console.log("Log Out backend");
    res.cookie("jwt", {}, { maxAge: 1, secure: true, sameSite: "None" });
    return res.status(200).send("Log out successful!");
  } catch (error) {
    console.log({ error });
    return res.status(500).send("Internal Server Error!");
  }
};

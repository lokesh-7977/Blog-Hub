import User from "../models/user.schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { fullname, username, email, password } = req.body;
  if (!fullname || !username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
    return res.status(400).json({ message: "Invalid email" });
  }
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      fullname,
      username,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;

        res
          .cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
          })
          .header("Authorization", `Bearer ${token}`)
          .status(200)
          .json({ message: "User logged in successfully", user, token });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: "User not found" });
  }
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  if (!req.cookies.token) {
    return res.status(400).json({ message: "User not found" });
  }
  res.clearCookie("token").json({ message: "User logged out successfully" });
};

export const updateUser = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ message: "User not found" });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updates = {};
    const { fullname, username, email, password } = req.body;

    if (fullname) updates.fullname = fullname;
    if (username) updates.username = username;
    if (email) updates.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

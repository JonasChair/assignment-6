import UserModel from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const REGISTER_USER = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const user = new UserModel({
            name: req.body.name[0].toUpperCase() + req.body.name.slice(1),
            email: req.body.email,
            password: hash,
            moneyBalance: req.body.moneyBalance,
        });

        user.id = user._id;

        const response = await user.save();

        const token = jwt.sign(
            { email: user.email, userId: user._id, tokenType: "auth" },
            process.env.JWT_SECRET,
            { expiresIn: "2h" },
            { algorithm: "RS256" }
        )

        const refreshToken = jwt.sign(
            { email: user.email, userId: user._id, tokenType: "refresh" },
            process.env.JWT_SECRET,
            { expiresIn: "24h" },
            { algorithm: "RS256" }
        )

        return res
            .status(200)
            .json({ status: "User registered", response, token, refreshToken });
    }
    catch (err) {
        return res.status(500).json({ status: "Something went wrong" });
    }
};

const LOGIN = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(401).json({ message: "Bad authentication (email or password is wrong)" });
        }

        bcrypt.compare(req.body.password, user.password, (err, isPasswordMatch) => {
            if (!isPasswordMatch || err) {
                return res.status(401).json({ message: "Bad authentication (email or password is wrong)" });
            };

            const token = jwt.sign(
                { email: user.email, userId: user._id, tokenType: "auth" },
                process.env.JWT_SECRET,
                { expiresIn: "2h" },
                { algorithm: "RS256" }
            );

            const refreshToken = jwt.sign(
                { email: user.email, userId: user._id, tokenType: "refresh" },
                process.env.JWT_SECRET,
                { expiresIn: "24h" },
                { algorithm: "RS256" }
            );

            return res.status(200).json({ message: `${user.name} logged in.`, token, refreshToken });
        })

    } catch (err) {
        return res.status(401).json({ message: "Something went wrong" });
    }
}

const REFRESH_TOKEN = async (req, res) => {
    try {
        const user = await UserModel.findOne({ _id: req.body.userId });
        const token = jwt.sign(
            { email: user.email, userId: user._id, tokenType: "auth" },
            process.env.JWT_SECRET,
            { expiresIn: "2h" },
            { algorithm: "RS256" }
        );

        return res.status(200).json({ message: "New token aquired", token, refreshToken: req.body.refreshToken })
    }
    catch (err) {
        return res.status(401).json({ message: "Refresh failed, please relog" });
    }
}

const GET_ALL_USERS = async (req, res) => {
    try {
        const users = await UserModel.find();
        return res.status(201).json({ users: users.sort((a, b) => a.name.localeCompare(b.name)) });
    }
    catch (err) {
        return res.status(404).json({ message: "Something went wrong" });
    }
}

const GET_USER_BY_ID = async (req, res) => {
    try {
        const user = await UserModel.findOne( { _id: req.params.id  });
        return res.status(201).json({ user });
    }
    catch (err) {
        return res.status(404).json({ message: "Something went wrong" });
    }
}

const GET_ALL_USERS_WITH_TICKETS = async (req, res) => {
    try {
        const users = await UserModel.aggregate([
            {
                $lookup: {
                    from: "tickets",
                    localField: "boughtTickets",
                    foreignField: "_id",
                    as: "users_tickets",
                },
            }
        ]);
        return res.status(201).json({ users: users.sort((a, b) => a.name.localeCompare(b.name)) });
    }
    catch (err) {
        return res.status(404).json({ message: "Something went wrong here" });
    }
}

const GET_USER_BY_ID_WITH_TICKETS = async (req, res) => {
    try {
        const user = await UserModel.aggregate([
            {
                $lookup: {
                    from: "tickets",
                    localField: "boughtTickets",
                    foreignField: "_id",
                    as: "users_tickets",
                },
            },
            { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } }
        ]);
        return res.status(201).json({ user });
    }
    catch (err) {
        return res.status(404).json({ message: "Something went wrong here" });
    }
}

export { REGISTER_USER, LOGIN, REFRESH_TOKEN, GET_ALL_USERS, GET_USER_BY_ID, GET_ALL_USERS_WITH_TICKETS, GET_USER_BY_ID_WITH_TICKETS };
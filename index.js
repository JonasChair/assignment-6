import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/user.js";
import ticketRoute from "./routes/ticket.js";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoute);
app.use("/tickets", ticketRoute);

app.use((req, res) => {
    return res.status(404).json({ response: "Endpoint does not exist!" })
});

mongoose
    .connect(process.env.DB_CONNECTION)
    .then(() => console.log("DB CONNECTION ESTABLISHED!"))
    .catch((err) => {
        console.log(err);
    });

app.listen(process.env.PORT, () => {
    console.log(`App running on port: ${process.env.PORT}`);
})
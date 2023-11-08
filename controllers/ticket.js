import TicketModel from "../models/ticket.js";
import UserModel from "../models/user.js";

const ADD_TICKET = async (req, res) => {
    try {
        const ticket = new TicketModel({
            title: req.body.title,
            price: req.body.price,
            departureLocation: req.body.departureLocation,
            destination: req.body.destination,
            destinationPhotoUrl: req.body.destinationPhotoUrl
        })

        ticket.id = ticket._id;

        const response = await ticket.save();

        return res
            .status(200)
            .json({ status: "Ticket added", response });
    }
    catch (err) {
        return res.status(500).json({ message: "Something went wrong" });
    }
}

const BUY_TICKET = async (req, res) => {
    try {
        const user = await UserModel.findOne({ _id: req.body.userId });
        const ticket = await TicketModel.findOne({ _id: req.params.id });

        if (user.moneyBalance >= ticket.price) {
            const response = await UserModel.updateOne(
                { _id: req.body.userId },
                {
                    $push: { boughtTickets: ticket._id},
                    moneyBalance: (user.moneyBalance - ticket.price).toFixed(2)
                }
            );
            return res.status(200).json({ message: "Ticket bought" });
        } else {
            return res.status(400).json({ message: "Your balance is not enough to purchase the ticket." });
        }

    }
    catch (err) {
        return res.status(500).json({ message: "Something went wrong" , err});
    }
}

export { ADD_TICKET, BUY_TICKET };
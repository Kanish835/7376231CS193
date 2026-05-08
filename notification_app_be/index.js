const express = require("express");
const cors = require("cors");

const notifications = require("./notifications");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 4000;

app.get("/", (req, res) => {

    res.json({
        message: "Campus Notification Backend Running"
    });
});

app.get("/notifications", (req, res) => {

    res.json({
        total: notifications.length,
        notifications
    });
});

app.get("/notifications/:type", (req, res) => {

    const type = req.params.type.toLowerCase();

    const filtered = notifications.filter(
        n => n.type.toLowerCase() === type
    );

    res.json({
        total: filtered.length,
        notifications: filtered
    });
});

app.post("/notifications", (req, res) => {

    const { type, title, message } = req.body;

    const newNotification = {
        id: notifications.length + 1,
        type,
        title,
        message
    };

    notifications.push(newNotification);

    res.status(201).json({
        message: "Notification Added",
        notification: newNotification
    });
});

app.listen(PORT, () => {

    console.log(`Notification backend running on port ${PORT}`);
});
const express = require("express");
const axios = require("axios");

const optimizeTasks = require("./scheduler");

const Log = require("../logging_middleware/logger");

const app = express();

const PORT = 3000;

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJrYW5pc2guY3MyM0BiaXRzYXRoeS5hYy5pbiIsImV4cCI6MTc3ODIzODUyNiwiaWF0IjoxNzc4MjM3NjI2LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMGZiOTNjZjYtZjA0OC00ZTc5LTg0MjctZWZmMjk5ODMyODI0IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoia2FuaXNoIGIgbSIsInN1YiI6ImZiMGZjMzA0LWQxYTMtNDlmMy1iMWQ2LWYxMTU2ZDE5YTUwNCJ9LCJlbWFpbCI6ImthbmlzaC5jczIzQGJpdHNhdGh5LmFjLmluIiwibmFtZSI6ImthbmlzaCBiIG0iLCJyb2xsTm8iOiI3Mzc2MjMxY3MxOTMiLCJhY2Nlc3NDb2RlIjoidUthSmZtIiwiY2xpZW50SUQiOiJmYjBmYzMwNC1kMWEzLTQ5ZjMtYjFkNi1mMTE1NmQxOWE1MDQiLCJjbGllbnRTZWNyZXQiOiJrUEFtVldCZWp0Y1l3RkhRIn0.fXKjSoxUYyBGjmeO5v60rkMfuDpOemYDoLyPdgf2tRk";

app.get("/schedule/:depotId", async (req, res) => {

    try {

        await Log(
            "backend",
            "info",
            "route",
            "schedule api called"
        );

        const depotResponse = await axios.get(
            "http://4.224.186.213/evaluation-service/depots",
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            }
        );

        const vehicleResponse = await axios.get(
            "http://4.224.186.213/evaluation-service/vehicles",
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            }
        );

        const depots = depotResponse.data.depots;
        const vehicles = vehicleResponse.data.vehicles;

        const depotId = parseInt(req.params.depotId);

        const depot = depots.find(
            d => d.ID === depotId
        );

        if (!depot) {

            await Log(
                "backend",
                "error",
                "handler",
                "invalid depot id"
            );

            return res.status(404).json({
                message: "Depot not found"
            });
        }

        const result = optimizeTasks(
            vehicles,
            depot.MechanicHours
        );

        await Log(
            "backend",
            "info",
            "service",
            "optimization completed"
        );

        res.json({
            depotId: depot.ID,
            mechanicHours: depot.MechanicHours,
            maxImpact: result.maxImpact,
            selectedTasks: result.selectedTasks
        });

    } catch (err) {

        await Log(
            "backend",
            "fatal",
            "service",
            err.message
        );

        res.status(500).json({
            error: err.message
        });
    }
});

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);
});
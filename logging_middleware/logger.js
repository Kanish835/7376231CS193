const axios = require("axios");

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJrYW5pc2guY3MyM0BiaXRzYXRoeS5hYy5pbiIsImV4cCI6MTc3ODIzODUyNiwiaWF0IjoxNzc4MjM3NjI2LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiMGZiOTNjZjYtZjA0OC00ZTc5LTg0MjctZWZmMjk5ODMyODI0IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoia2FuaXNoIGIgbSIsInN1YiI6ImZiMGZjMzA0LWQxYTMtNDlmMy1iMWQ2LWYxMTU2ZDE5YTUwNCJ9LCJlbWFpbCI6ImthbmlzaC5jczIzQGJpdHNhdGh5LmFjLmluIiwibmFtZSI6ImthbmlzaCBiIG0iLCJyb2xsTm8iOiI3Mzc2MjMxY3MxOTMiLCJhY2Nlc3NDb2RlIjoidUthSmZtIiwiY2xpZW50SUQiOiJmYjBmYzMwNC1kMWEzLTQ5ZjMtYjFkNi1mMTE1NmQxOWE1MDQiLCJjbGllbnRTZWNyZXQiOiJrUEFtVldCZWp0Y1l3RkhRIn0.fXKjSoxUYyBGjmeO5v60rkMfuDpOemYDoLyPdgf2tRk";

async function Log(stack, level, packageName, message) {

    try {

        const response = await axios.post(
            "http://4.224.186.213/evaluation-service/logs",
            {
                stack,
                level,
                package: packageName,
                message
            },
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`
                }
            }
        );

        console.log("LOG SUCCESS");

    } catch (err) {

        console.log(
            err.response?.data || err.message
        );
    }
}

module.exports = Log;




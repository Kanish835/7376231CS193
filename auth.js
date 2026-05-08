const axios = require("axios");

async function auth() {
    try {
        const response = await axios.post(
            "http://4.224.186.213/evaluation-service/auth",
            {
                email: "kanish.cs23@bitsathy.ac.in",
                name: "kanish b m",
                rollNo: "7376231cs193",
                accessCode: "uKaJfm",

                clientID: "fb0fc304-d1a3-49f3-b1d6-f1156d19a504",

                clientSecret: "kPAmVWBejtcYwFHQ"
            }
        );

        console.log(response.data);

    } catch (err) {
        console.log(
            err.response?.data || err.message
        );
    }
}

auth();

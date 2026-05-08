const axios = require("axios");

async function register() {
	try {
		const response = await axios.post(
			"http://4.224.186.213/evaluation-service/register",
			{
				email: "kanish.cs23@bitsathy.ac.in",
				name: "Kanish B M",
				rollNo: "7376231CS193",
				mobileNo: "7845321555",
				githubUsername: "https://github.com/Kanish835",
				accessCode: "uKaJfm"
			}
		);

		console.log(response.data);

	} catch (err) {
		console.log(err.response?.data || err.message);
	}
}

register();

const express = require("express");
const app = express();
const fetch = require("node-fetch");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
require("dotenv").config();

app.use(cors({ origin: 'https://ip-address-tracker-hc4uwi8of.vercel.app' }));

app.get("/map", (req, res, next) => {
	const options = {
		attribution:
			'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 18,
		id: "mapbox/streets-v11",
		tileSize: 512,
		zoomOffset: -1,
		accessToken: process.env.MAPBOX,
	};
	res.send(options);
});

app.get("/ip/:ip", async (req, res, next) => {
	const ip = req.params.ip;
	const response = await fetch(
		`https://geo.ipify.org/api/v1?apiKey=${process.env.IPIFY}&ipAddress=${ip}`
	);
	const data = await response.json();
	res.send(data);
});

app.listen(PORT, () => console.log("Server listening"));

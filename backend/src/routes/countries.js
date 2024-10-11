import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/available-countries", async (req, res) => {
  try {
    const response = await axios.get(
      "https://date.nager.at/api/v3/AvailableCountries"
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching countries:", error.message);
    res.status(500).json({ message: "Error fetching countries" });
  }
});

router.get("/country-info/:code", async (req, res) => {
  const { code } = req.params;
  try {
    const response = await axios.get(
      `https://date.nager.at/api/v3/CountryInfo/${code}`
    );
    return res.json(response.data);
  } catch (error) {
    console.error(error);
  }
});

router.get("/population", async (req, res) => {
  try {
    const response = await axios.get(
      "https://countriesnow.space/api/v0.1/countries/population"
    );
    return res.json(response.data.data);
  } catch (error) {
    console.error(error);
  }
});

router.get("/flags", async (req, res) => {
  try {
    const response = await axios.get(
      "https://countriesnow.space/api/v0.1/countries/flag/images"
    );
    return res.json(response.data);
  } catch (error) {
    console.error(error);
  }
});

export default router;

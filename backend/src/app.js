import dotenv from "dotenv";
import express from "express";
import countryRoutes from "./routes/countries.js";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET",
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/countries", countryRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Country Info App Backend");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Make uploads folder public
app.use("/uploads", express.static("uploads"));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(" MongoDB connected");
}).catch(err => console.error("MongoDB error:", err));

// Routes
app.use("/api/resume", require("./routes/resume"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(` Server running at http://localhost:${PORT}`);
});


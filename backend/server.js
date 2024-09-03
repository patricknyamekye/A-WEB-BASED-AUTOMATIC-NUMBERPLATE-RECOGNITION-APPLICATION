const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const imgGeminiRoutes = require("./routes/imgGeminiRoutes");
const numberInput = require("./routes/imgGeminiRoutes")

app.use(express.json());
app.use(cors());

app.use("/api", imgGeminiRoutes);
app.use("/api",numberInput);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

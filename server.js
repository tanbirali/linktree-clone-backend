const express = require("express");
const cors = require("cors");
const { limiter } = require("./middleware/rate-limit.middleware");

require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const referralRoutes = require("./routes/referral.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(limiter);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", referralRoutes);

const PORT = process.env.PORT || 5000; // 5000 is the default port

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

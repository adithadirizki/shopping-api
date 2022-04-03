require("dotenv").config();
const express = require("express");
const userRoute = require("./routes/user");
const shoppingRoute = require("./routes/shopping");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", userRoute);
app.use("/api", shoppingRoute);

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});

const express = require("express");
const dotenv = require("dotenv");

const app = express();
const PORT = process.env.PORT || 8000;
dotenv.config();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

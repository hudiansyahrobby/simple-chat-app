const express = require("express");
const cors = require("cors");
const AppError = require("./errorHandler/AppError");
const { sendErrorDev, sendErrorProd } = require("./errorHandler/errorResponse");

const userRoute = require("./routes/userRoute");
const roomRoute = require("./routes/roomRoute");
const { connectDB } = require("./config/mongo");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1/users/", userRoute);

app.use("/api/v1/rooms/", roomRoute);

app.use("*", (req, res, next) => {
  next(
    new AppError(
      `Can't find ${req.originalUrl} on this server!`,
      404,
      "not-found"
    )
  );
});

app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    if (err?.response) {
      sendErrorDev(err.response.data, res);
    } else {
      err.status = err.status || 500;
      sendErrorDev(err, res);
    }
  } else if (process.env.NODE_ENV === "production") {
    sendErrorProd(err.response.data, res);
  } else {
    sendErrorProd(err, res);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Listening to port ${PORT}`);
});

const express = require("express");
const app = express();
const session = require("express-session"); // Import express-session
const passport = require("passport");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./utils/db.js");
const dotenv = require("dotenv");
dotenv.config({});

const userRoute = require("./routes/user.routes.js");
const companyRoute = require("./routes/company.routes.js");
const jobRoute = require("./routes/jobs.routes.js");
const applicationRoute = require("./routes/application.routes.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

// app.get("/", (req, res) => {
//   res.send("hello");
// });

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key", // Replace with a strong secret key
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Set to true if using https
  })
);

app.use(passport.initialize());
app.use(passport.session()); // Initialize Passport session support

const port = 3000;

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.listen(port, () => {
  connectDB();
  console.log(`app is listening on port ${port}`);
});

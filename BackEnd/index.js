const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
let path = require("path");
const fs = require("fs");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

// ✅ CORS: allow both local & Netlify frontend
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://expensetrackerui.netlify.app",
    ],
    credentials: true,
  })
);

// ✅ Handle preflight requests
app.options("*", cors());

// ✅ Serve static files
app.use(express.static("views"));

// ✅ Routers
const expenseTracker = require("./Router/ExpenseTracker/ExpenseTrackerRouter.js");
const expenseSummaryTracker = require("./Router/ExpenseTracker/ExpenseTrackerCatSummary.js");
const authLogin = require("./Router/UserRouter/UserRouter.js");
const categoryRoute = require("./Router/Category/CategoryRoute.js");
const incomeRouter = require("./Router/Income/IncomeRouter.js");

// ✅ DB connection
const dbConnection = require("./DataBase/DB.js");
dbConnection();

// ✅ Routes
app.use("/", authLogin);
app.use("/income", incomeRouter);
app.use("/expense", expenseTracker);
app.use("/summary", expenseSummaryTracker);
app.use("/category", categoryRoute);

// ✅ Error Handler + Logger
app.use((error, req, res, next) => {
  const logDir = path.join(__dirname, "Log");
  const logPath = path.join(logDir, "log.txt");

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  const logEntry = `[${new Date().toISOString()}] ${
    error.stack || error.message || error
  }\n`;

  fs.appendFile(logPath, logEntry, (err) => {
    if (err) {
      console.log("❌ Log Write Failed:", err);
    }
  });

  res.status(500).json({ message: error.message, error: "Internal Server Error" });
});

// ✅ View engine setup (if needed)
app.set("views", "./Views");
app.set("view engine", "pug");

// ✅ Server listen
let PORT = process.env.PORT || 3000;
let HOST_NAME = process.env.HOST_NAME;

app.listen(PORT, () => {
  console.log("ENV:", process.env.NODE_ENV);
  console.log(`✅ Server running on PORT: ${PORT}`);
});

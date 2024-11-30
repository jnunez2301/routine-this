const express = require('express');
const cors = require('cors');
const { PORT, FRONTEND_URL, JWT_SECRET_KEY } = require('./environment/environment');
const authRouter = require('./controller/auth/authController');
const { mongoConnect } = require('./mongoConnect');
const morgan = require('morgan')

const app = express();
if(!FRONTEND_URL){
  throw new Error("FRONTEND_URL must be set")
}
if(!JWT_SECRET_KEY){
  throw new Error("JWT_SECRET_KEY must be set")
}
if (!PORT) {
  throw new Error("PORT has to be assigned as a environment variable");
}
app.use(express.json());
app.use(cors(/* {
  origin: FRONTEND_URL
} */
))
app.use(morgan(":method :url :status :date"))

app.get('/', (req, res) => {
  res.json({
    message: "Routine this just made it to Init!\n v0.0.1"
  })
})

mongoConnect();
// Routes
app.use("/api/auth", authRouter);

app.listen(parseInt(PORT), () => {
  console.log(`Server running on \n http://localhost:${PORT}`)
})
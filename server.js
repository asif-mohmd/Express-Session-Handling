const express = require("express")
const session = require("express-session")
const app = express()
const path = require("path")
const hbs = require("hbs")

app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "./views"))
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }))


const PORT = process.env.PORT || 3000


app.listen(PORT, () => {
    console.log("server is running")
})


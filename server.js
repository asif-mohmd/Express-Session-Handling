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

const email = "asifasifpsps@gmail.com"
const password = "123"




app.get("/", checkLogin, (req, res) => {
    res.render("index", { name: req.session.user.id })
})

app.use("/", function (err, req, res, next) {
    console.log(err)

    res.render("login")
})

app.get("/login", (req, res) => {
    res.render("login")
})


app.post("/login", (req, res) => {
    console.log(req.session)
    console.log(req.body)

    if (!req.body.email || !req.body.password) {
   
        res.render("login", { message: "Please enter both email and password" })

    } else {

        if (user = req.body.email === email && req.body.password === password) {

            req.session.user = user
            res.redirect("/")

        }
        res.render("login", { message: "invalid credentials" })

    }
})

app.get("/logout", (req, res) => {
    req.session.destroy(function () {
        console.log("user logged out")
    })
    res.redirect("/login")
})



function checkLogin(req, res, next) {
    if (req.session.user) {
        next()
    } else {
        var err = new Error("user not logged in")
        next(err)
    }
}

app.listen(PORT, () => {
    console.log("server is running")
})


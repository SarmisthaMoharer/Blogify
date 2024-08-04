const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');

const Blog = require("./models/blog");

const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');

const { checkForAuthCookie } = require("./middlewares/auth");

const app = express();
const PORT = 8000;

mongoose.connect('mongodb://localhost:27017/bloga2z').then((e) => console.log("MongoDB Connected"));

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(checkForAuthCookie('token'));
app.use(express.static(path.resolve("./public")));


app.get("/", async (req,res) => {
    const allBlogs = await Blog.find({});
    res.render("home" , {
       
        user: req.user,
        blogs: allBlogs,
    });
});

app.use("/user" , userRouter);
app.use("/blog" , blogRouter);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));


const Promise = require("bluebird");
const mysql = require("mysql");

Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/pool").prototype);
const express = require("express");
const add = require("./adduser");
const app = express();
const cors = require("cors");
app.use(cors());

const bodyparser = require("body-parser");
app.use(bodyparser.json());

app.post("/adduser", async (req, res) => {
    try {
        // const input = req.query;
        const input = req.body;
        const resdata = await add.adduser(input);

        const json = { message: "sucessfully inserted", Id: resdata };
        res.json(json);

    } catch (err) {
        const json = { message: "error" };
        res.json(json);
    }
});

app.post("/addRating", async (req, res) => {
    try {
        // const input = req.query;
        const input = req.body;
        const resdata = await add.checkUser(input);
        console.log(resdata);

        // logic
        if (resdata != 0) {
            const r1 = await add.updateRating(input);
            console.log("updated");
            res.json(r1);
        } else {
            const r1 = await add.insertRating(input);
            console.log("Inserted");
            res.send(r1);
        }
    } catch (err) {
        const json = { message: "error" };
        res.json(json);
    }
});


app.post("/addcomment", async (req, res) => {
    try {
        // const input = req.query;
        const input = req.body;
        const resdata = await add.insertcomment(input);
        console.log("comment Inserted");
        res.send(resdata);

    } catch (err) {
        const json = { message: "error" };
        res.json(json);
    }
});

app.post("/getcomments", async (req, res) => {
    try {
        // const input = req.query;
        const input = req.body;
        const resdata = await add.getcomments(input);
        console.log("comments return successfully");
        res.send(resdata);

    } catch (err) {
        const json = { message: "error" };
        res.json(json);
    }
});

app.post("/validate", async (req, res) => {
    try {
        const input = req.body;
        const resdata = await add.validate(input);
        const json = { status: resdata };
        res.json(json);
    } catch (err) {
        const json = { message: "error" };
        res.json(json);
    }
});

app.post("/forgetpassword", async (req, res) => {
    try {

        const input = req.body;
        const resdata = await add.update(input);
        // const json = { status: resdata };
        res.json(resdata);

    } catch (err) {
        const json = { message: "error" };
        res.json(json);
    }
});

app.post("/checkemail", async (req, res) => {
    try {

        const input = req.body;
        const resdata = await add.checkEmail(input);
        // const jsonObj = { status: resdata.length };
        console.log(resdata);
        res.send(resdata);

    } catch (err) {
        const jsonObj = { message: "error" };
        res.json(jsonObj);
    }
});

app.post("/getAvgRat", async (req, res) => {
    try {
        const input = req.body;
        const avgRat = await add.getAvgRat(input);
        const json = { message: "return Average rating" };
        console.log(avgRat.avg);
        res.json(avgRat.avg);
    } catch (err) {
        const json = { message: "error" };
        res.send(err);
    }
});



app.get("/getid", async (req, res) => {
    try {
        // const input = req.query;
        const id = await add.getid();
        const json = { message: "sucessfully inserted" };
        res.json(id);
        console.log("server started");
    } catch (err) {
        const json = { message: "error" };
        res.send(err);
    }
});


app.listen(3000);
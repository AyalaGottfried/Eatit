"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

var cors = require("cors");

app.use(cors());

app.use("/resturants-details", require("./resturants"));
app.use("/costumers-details", require("./costumers"));
app.use("/orders", require("./orders"));

app.listen(4030, () => {
    console.log("running nodejs...");
});

/*
Sends an email message.

Parameters: email address, subject and text in the body.
Returns: an error message if failed.
*/
app.post("/sendEmail", (req, res) => {
    let fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    let nodemailer = require("nodemailer");
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: "eatitproj@gmail.com",
            pass: "eatit1000",
        },
    });
    let mailOptions = {
        from: "eatitproj@gmail.com",
        to: req.body.address,
        subject: req.body.subject,
        text: req.body.text,
    };
    transporter.sendMail(mailOptions, function (error) {
        if (error) {
            res.status(500).json({ error: error });
            console.log("POST", 500, fullUrl);
            return;
        } else {
            res.status(200).json({});
            console.log("POST", 200, fullUrl);
        }
    });
});

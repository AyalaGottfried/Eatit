"use strict";
var validations = require("./validations.js");

const express = require("express");
let router = express.Router();

const MongoClient = require("mongodb").MongoClient;
let db;
let costumersCollection;

MongoClient.connect(
    "mongodb+srv://ayalaEatit:eatit1000@cluster0.6k4zi.mongodb.net/test",
    { useUnifiedTopology: true },
    (err, client) => {
        if (err) return console.error(err);
        console.log("running mongodb...");
        db = client.db("eatit");
        costumersCollection = db.collection("costumers-details");
    }
);

/*
Update one field in a costumer document.

Parameters: costumer id in the params, property name and the new value in the body.
Returns: an error message if failed.
*/
router.put("/:id", async (req, res) => {
    let fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    if (!("property" in req.body) || !("detail" in req.body)) {
        res.status(400).json({ error: "property and detail required" });
        console.log("PUT", 400, fullUrl);
        return;
    }
    const properties = ["email", "name", "image", "cart"];
    if (!properties.includes(req.body.property)) {
        res.status(400).json({ error: "invalid property name" });
        console.log("PUT", 400, fullUrl);
        return;
    }
    if (req.body.property == "email") {
        if (validations.EmailAddressValidation(req.body.detail) != "") {
            res.status(400).json({ error: "invalid email" });
            console.log("PUT", 400, fullUrl);
            return;
        }
    }
    if (req.body.property == "name") {
        if (validations.nameValidation(req.body.detail) != "") {
            res.status(400).json({ error: "invalid name" });
            console.log("PUT", 400, fullUrl);
            return;
        }
    }
    if (req.body.property == "cart") {
        if (validations.cartValidation(req.body.detail) != "") {
            res.status(400).json({ error: "invalid cart" });
            console.log("PUT", 400, fullUrl);
            return;
        }
    }
    let user = await costumersCollection.findOne({
        id: Number(req.params.id),
    });
    if (user == null) {
        res.status(400).json({ error: "user not exists" });
        console.log("PUT", 400, fullUrl);
        return;
    }
    costumersCollection
        .updateOne(
            { id: Number(req.params.id) },
            { $set: { [req.body.property]: req.body.detail } }
        )
        .then(() => {
            res.status(200).send();
            console.log("PUT", 200, fullUrl);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: error });
            console.log("PUT", 500, fullUrl);
        });
});

/*
Finds a costumer in the database.

Parameters: costumer id in the params.
Returns: the document of the costumer if success, else an error message.
*/
router.get("/getOneUser/:id", (req, res) => {
    let fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    costumersCollection
        .findOne({ id: Number(req.params.id) })
        .then((result) => {
            if (result == null) {
                res.status(400).json({ error: "user not exists" });
                console.log("GET", 400, fullUrl);
                return;
            }
            res.status(200).json(result);
            console.log("GET", 200, fullUrl);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: error });
            console.log("GET", 500, fullUrl);
        });
});

/*
Finds a costumer in the database.

Parameters: costumer id in the params.
Returns: the name and the image of the costumer if success, else an error message.
*/
router.get("/getUserNameAndImage/:id", (req, res) => {
    let fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    costumersCollection
        .findOne(
            { id: Number(req.params.id) },
            { projection: { name: 1, image: 1, _id: 0 } }
        )
        .then((result) => {
            if (result == null) {
                res.status(400).json({ error: "user not exists" });
                console.log("GET", 400, fullUrl);
                return;
            }
            res.status(200).json(result);
            console.log("GET", 200, fullUrl);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: error });
            console.log("GET", 500, fullUrl);
        });
});

/*
Adds a costumer to the database.

Parameters: costumer email, password, name, image and cart in the body.
Returns: the id of the added costumer if success, else an error message.
*/
router.post("/", async (req, res) => {
    let fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    const properties = ["email", "password", "name", "image", "cart"];
    if (!properties.every((property) => property in req.body)) {
        res.status(400).json({
            error: "email, password, name, image and cart required",
        });
        console.log("POST", 400, fullUrl);
        return;
    }
    if (validations.EmailAddressValidation(req.body.email) != "") {
        res.status(400).json({ error: "invalid email" });
        console.log("POST", 400, fullUrl);
        return;
    }
    if (validations.nameValidation(req.body.name) != "") {
        res.status(400).json({ error: "invalid name" });
        console.log("POST", 400, fullUrl);
        return;
    }
    if (validations.passwordValidation(req.body.password) != "") {
        res.status(400).json({ error: "invalid password" });
        console.log("POST", 400, fullUrl);
        return;
    }
    if (validations.cartValidation(req.body.detail) != "") {
        res.status(400).json({ error: "invalid cart" });
        console.log("POST", 400, fullUrl);
        return;
    }
    if (!Object.keys(req.body).every((x) => properties.includes(x))) {
        res.status(400).json({ error: "there is a invalid key" });
        console.log("POST", 400, fullUrl);
        return;
    }
    let otherUser = await costumersCollection.findOne({
        email: req.body.email,
    });
    if (otherUser != null) {
        res.status(409).send("this email address is in use");
        console.log("POST", 409, fullUrl);
        return;
    }
    costumersCollection
        .distinct("id")
        .then((ids) => {
            if (ids.length == 0) return 1;
            return Math.max(...ids) + 1;
        })
        .then((id) => {
            costumersCollection
                .insertOne({ ...req.body, id: id })
                .then(() => {
                    res.status(200).send(String(id));
                    console.log("POST", 200, fullUrl);
                })
                .catch((error) => {
                    console.error(error);
                    res.status(500).json({ error: error });
                    console.log("POST", 500, fullUrl);
                });
        });
});

/*
If got email and passowrd - finds a costumer in the database by its email and password,
If got only email - finds a costumer in the database by its email,
Else - finds all costumers in the database.

Parameters: email and password in the url - optional.
Returns: the costumer id when found costumer, 
    or the data if all costumers (without their password) if found all costumers.
    If failed returns an error message.
*/
router.get("/", (req, res) => {
    let fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    if (req.query.email && req.query.password) {
        costumersCollection
            .findOne(
                { email: req.query.email, password: req.query.password },
                { projection: { id: 1, _id: 0 } }
            )
            .then((result) => {
                if (result == null) result = { id: -1 };
                res.status(200).json(result);
                console.log("GET", 200, fullUrl);
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ error: error });
                console.log("GET", 500, fullUrl);
            });
    } else if (req.query.email) {
        costumersCollection
            .findOne(
                { email: req.query.email },
                { projection: { id: 1, _id: 0 } }
            )
            .then((result) => {
                if (result == null) result = { id: -1 };
                res.status(200).json(result);
                console.log("GET", 200, fullUrl);
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ error: error });
                console.log("GET", 500, fullUrl);
            });
    } else {
        costumersCollection
            .find()
            .project({ password: 0 })
            .toArray()
            .then((result) => {
                res.status(200).json(result);
                console.log("GET", 200, fullUrl);
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ error: error });
                console.log("GET", 500, fullUrl);
            });
    }
});

/*
Finds a costumer cart in the database.

Parameters: costumer id in the params.
Returns: the cart of the costumer if success, else an error message.
*/
router.get("/getCart/:id", (req, res) => {
    let fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    costumersCollection
        .findOne(
            { id: Number(req.params.id) },
            { projection: { cart: 1, _id: 0 } }
        )
        .then((result) => {
            if (result == null) {
                res.status(400).json({ error: "user not exists" });
                console.log("GET", 400, fullUrl);
                return;
            }
            res.status(200).json(result.cart);
            console.log("GET", 200, fullUrl);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send({ error: error });
            console.log("GET", 500, fullUrl);
        });
});

module.exports = router;

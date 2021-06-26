"use strict";
const express = require("express");
let router = express.Router();
var validations = require("./validations.js");

const MongoClient = require("mongodb").MongoClient;
let db;
let ordersCollection;
let costumersCollection;
let resturantsCollection;

MongoClient.connect(
    "mongodb+srv://ayalaEatit:eatit1000@cluster0.6k4zi.mongodb.net/test",
    { useUnifiedTopology: true },
    (err, client) => {
        if (err) return console.error(err);
        console.log("running mongodb...");
        db = client.db("eatit");
        ordersCollection = db.collection("orders");
        costumersCollection = db.collection("costumers-details");
        resturantsCollection = db.collection("resturants-details");
    }
);

/*
If got resturant id - finds all the orders of the resturant,
If got costumer id - finds all the orders of the costumer

Parameters: resturant id or costumer id in the url - optional.
Returns: all of the orders of the user if success, else an error message.
*/
router.get("/", async (req, res) => {
    let fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    if (req.query.resturantId) {
        let user = await resturantsCollection.findOne({
            id: Number(req.query.resturantId),
        });
        if (user == null) {
            res.status(400).json({ error: "user not exists" });
            console.log("GET", 400, fullUrl);
            return;
        }
        ordersCollection
            .find({ resturantId: Number(req.query.resturantId) })
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
    if (req.query.costumerId) {
        let user = await costumersCollection.findOne({
            id: Number(req.query.costumerId),
        });
        if (user == null) {
            res.status(400).json({ error: "user not exists" });
            console.log("GET", 400, fullUrl);
            return;
        }
        ordersCollection
            .find({ costumerId: Number(req.query.costumerId) })
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
Adds an order to the database.

Parameters: order resturant id, costumer id, fee, type, status, date, order and address in the body.
Returns: an error message if failed.
*/
router.post("/", async (req, res) => {
    let fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    const properties = [
        "resturantId",
        "costumerId",
        "fee",
        "type",
        "status",
        "date",
        "order",
        "address",
    ];
    if (!properties.every((property) => property in req.body)) {
        res.status(400).json({
            error: "resturantId, costumerId, fee, type, status, date, order and address required",
        });
        console.log("POST", 400, fullUrl);
        return;
    }
    let costumer = await costumersCollection.findOne({
        id: Number(req.body.costumerId),
    });
    if (costumer == null) {
        res.status(400).json({ error: "costumer not exists" });
        console.log("POST", 400, fullUrl);
        return;
    }
    let resturant = await resturantsCollection.findOne({
        id: Number(req.body.resturantId),
    });
    if (resturant == null) {
        res.status(400).json({ error: "resturant not exists" });
        console.log("POST", 400, fullUrl);
        return;
    }
    if (isNaN(req.body.fee) || req.body.fee < 1) {
        res.status(400).json({ error: "invalid fee" });
        console.log("POST", 400, fullUrl);
        return;
    }
    if (req.body.type != "paypal" && req.body.type != "cash") {
        res.status(400).json({ error: "invalid type" });
        console.log("POST", 400, fullUrl);
        return;
    }
    if (validations.orderStatusValidation(req.body.status) != "") {
        res.status(400).json({ error: "invalid status" });
        console.log("POST", 400, fullUrl);
        return;
    }
    if (
        typeof req.body.order !== "object" ||
        !Object.keys(req.body.order).every(
            (key) => !isNaN(key) && !isNaN(req.body.order[key])
        )
    ) {
        res.status(400).json({ error: "invalid order" });
        console.log("POST", 400, fullUrl);
        return;
    }
    if (validations.orderAddressValidation(req.body.address) != "") {
        res.status(400).json({ error: "invalid address" });
        console.log("POST", 400, fullUrl);
        return;
    }
    if (!Object.keys(req.body).every((x) => properties.includes(x))) {
        res.status(400).json({ error: "there is a invalid key" });
        console.log("POST", 400, fullUrl);
        return;
    }
    ordersCollection
        .distinct("orderId")
        .then((ids) => {
            if (ids.length == 0) return 1;
            return Math.max(...ids) + 1;
        })
        .then((id) => {
            req.body.orderId = id;
            ordersCollection
                .insertOne(req.body)
                .then(() => {
                    res.status(200).end();
                    console.log("POST", 200, fullUrl);
                })
                .catch((error) => {
                    console.error(error);
                    res.status(500).json({ error: error });
                    console.log("POST", 500, fullUrl);
                });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: error });
            console.log("POST", 500, fullUrl);
        });
});

/*
Updates an order.

Parameters: the order id in the params, and a new order status in the body
Returns: an error message if failed.
*/
router.put("/:id", (req, res) => {
    let fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    if (!req.body.status) {
        res.status(400).json({ error: "status required" });
        console.log("PUT", 400, fullUrl);
        return;
    }
    if (validations.orderStatusValidation(req.body.status) != "") {
        res.status(400).json({ error: "invalid status" });
        console.log("PUT", 400, fullUrl);
        return;
    }
    ordersCollection
        .updateOne(
            { orderId: Number(req.params.id) },
            { $set: { status: req.body.status } }
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

module.exports = router;

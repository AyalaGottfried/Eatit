"use strict";
var validations = require("./validations.js");
const express = require("express");
let router = express.Router();

const MongoClient = require("mongodb").MongoClient;
let db;
let resturantsCollection;

MongoClient.connect(
    "mongodb+srv://ayalaEatit:eatit1000@cluster0.6k4zi.mongodb.net/test",
    { useUnifiedTopology: true },
    (err, client) => {
        if (err) return console.error(err);
        console.log("running mongodb...");
        db = client.db("eatit");
        resturantsCollection = db.collection("resturants-details");
    }
);

/*
Update one field in a costumer document.

Parameters: resturant id in the params, property name and the new value in the body.
Returns: an error message if failed.
*/
router.put("/:id", async (req, res) => {
    let fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    if (!("property" in req.body) || !("detail" in req.body)) {
        res.status(400).json({ error: "property and detail required" });
        console.log("PUT", 400, fullUrl);
        return;
    }
    const properties = [
        "email",
        "name",
        "image",
        "location",
        "phone",
        "type",
        "shipping-cost",
        "rating",
    ];
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
    if (req.body.property == "phone") {
        if (validations.phoneNumberValidation(req.body.detail) != "") {
            res.status(400).json({ error: "invalid phone" });
            console.log("PUT", 400, fullUrl);
            return;
        }
    }
    if (req.body.property == "type") {
        if (validations.typeValidation(req.body.detail) != "") {
            res.status(400).json({ error: "invalid type" });
            console.log("PUT", 400, fullUrl);
            return;
        }
    }
    if (req.body.property == "rating") {
        if (
            !Array.isArray(req.body.detail) ||
            !req.body.detail.every(
                (element) =>
                    typeof element === "number" && element > 0 && element < 6
            )
        ) {
            res.status(400).json({ error: "invalid rating" });
            console.log("PUT", 400, fullUrl);
            return;
        }
    }
    if (req.body.property == "shipping-cost") {
        if (validations.shippingCostValidation(req.body.detail) != "") {
            res.status(400).json({ error: "invalid shipping cost" });
            console.log("PUT", 400, fullUrl);
            return;
        }
    }
    if (req.body.property == "location") {
        if (validations.resturantAddressValidation(req.body.detail) != "") {
            res.status(400).json({ error: "invalid location" });
            console.log("PUT", 400, fullUrl);
            return;
        }
    }
    let user = await resturantsCollection.findOne({
        id: Number(req.params.id),
    });
    if (user == null) {
        res.status(400).json({ error: "user not exists" });
        console.log("PUT", 400, fullUrl);
        return;
    }
    resturantsCollection
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
Finds a resturant in the database.

Parameters: resturant id in the params.
Returns: the document of the resturant if success, else an error message.
*/
router.get("/getOneUser/:id", (req, res) => {
    let fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    resturantsCollection
        .findOne(
            { id: Number(req.params.id) },
            { projection: { password: 0, bankAccount: 0 } }
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
Finds a resturant in the database.

Parameters: resturant id in the params.
Returns: the name and the image of the resturant if success, else an error message.
*/
router.get("/getUserNameAndImage/:id", (req, res) => {
    let fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    resturantsCollection
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
Finds the types and the max shipping cost of the resturants in the database.

Returns: the types and the max shipping cost of the resturants if success, else an error message.
*/
router.get("/types", (req, res) => {
    let fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    resturantsCollection.distinct("type").then((types) => {
        resturantsCollection
            .distinct("shipping-cost")
            .then((costs) => {
                let cost = costs.length == 0 ? 0 : Math.max(...costs);
                res.status(200).json({
                    maxCost: cost,
                    types: types,
                });
                console.log("GET", 200, fullUrl);
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ error: error });
                console.log("GET", 500, fullUrl);
            });
    });
});

/*
Finds the resturants in the database for view.

Returns: the id, name, type, shipping cost, location and rating for all of the resturants if success, else an error message.
*/
router.get("/view", (req, res) => {
    let fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    resturantsCollection
        .find({ "courses.0": { $exists: true } })
        .project({
            _id: 0,
            id: 1,
            name: 1,
            type: 1,
            "shipping-cost": 1,
            location: 1,
            rating: 1,
        })
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
});

/*
Finds a resturants in the database.

Parameters: resturant id in the params.
Returns: the id, name, shipping cost, courses and rating of the resturant if success, else an error message.
*/
router.get("/minDetails/:id", (req, res) => {
    let fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    resturantsCollection
        .findOne(
            { id: Number(req.params.id) },
            {
                projection: {
                    _id: 0,
                    id: 1,
                    rating: 1,
                    courses: 1,
                    name: 1,
                    "shipping-cost": 1,
                },
            }
        )
        .then((result) => {
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
Finds the four resturants with the highest rating.

Returns: the id, name, type, shipping cost, location and rating for the four resturants with the highest rating if success, else an error message.
*/
router.get("/recommendedResturants", (req, res) => {
    let fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    resturantsCollection
        .aggregate([
            { $addFields: { ratingAvg: { $avg: "$rating" } } },
            {
                $project: {
                    _id: 0,
                    id: 1,
                    rating: 1,
                    courses: 1,
                    name: 1,
                    "shipping-cost": 1,
                    ratingAvg: 1,
                },
            },
        ])
        .sort({ ratingAvg: -1 })
        .limit(5)
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
});

/*
Adds a resturant to the database.

Parameters: resturant email, password, name, image, location,
    phone, type, shipping cost, rating, courses and bankAccount in the body.
Returns: the id of the added resturant if success, else an error message.
*/
router.post("/", async (req, res) => {
    let fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    const properties = [
        "email",
        "name",
        "password",
        "image",
        "location",
        "phone",
        "type",
        "shipping-cost",
        "rating",
        "courses",
        "bankAccount",
    ];
    if (!properties.every((property) => property in req.body)) {
        res.status(400).json({
            error: "email, password, name, image, location, phone, type, shipping cost, rating and courses required",
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
    if (validations.phoneNumberValidation(req.body.phone) != "") {
        res.status(400).json({ error: "invalid phone" });
        console.log("POST", 400, fullUrl);
        return;
    }
    if (validations.typeValidation(req.body.type) != "") {
        res.status(400).json({ error: "invalid type" });
        console.log("POST", 400, fullUrl);
        return;
    }
    if (validations.shippingCostValidation(req.body["shipping-cost"]) != "") {
        res.status(400).json({ error: "invalid shipping cost" });
        console.log("POST", 400, fullUrl);
        return;
    }
    if (
        !Array.isArray(req.body.rating) ||
        !req.body.rating.every(
            (element) =>
                typeof element === "number" && element > 0 && element < 6
        )
    ) {
        res.status(400).json({ error: "invalid rating" });
        console.log("POST", 400, fullUrl);
        return;
    }
    if (validations.coursesValidation(req.body.courses)) {
        res.status(400).json({ error: "invalid courses" });
        console.log("POST", 400, fullUrl);
        return;
    }
    if (!Object.keys(req.body).every((x) => properties.includes(x))) {
        res.status(400).json({ error: "there is a invalid key" });
        console.log("POST", 400, fullUrl);
        return;
    }
    let otherUser = await resturantsCollection.findOne({
        email: req.body.email,
    });
    if (otherUser != null) {
        res.status(409).send("this email address is in use");
        console.log("POST", 409, fullUrl);
        return;
    }
    resturantsCollection
        .distinct("id")
        .then((ids) => {
            if (ids.length == 0) return 1;
            return Math.max(...ids) + 1;
        })
        .then((id) => {
            resturantsCollection
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
        resturantsCollection
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
        resturantsCollection
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
        resturantsCollection
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
Deletes a course from a resturant.

Parameters: the resturant id in the params, and the course id in the body.
Returns: an error message if failed.
*/
router.delete("/deleteCourse/:resId", async (req, res) => {
    let fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    if (!("courseId" in req.body)) {
        res.status(400).json({ error: "course id required" });
        console.log("DELETE", 400, fullUrl);
        return;
    }
    let user = await resturantsCollection.findOne({
        id: Number(req.params.resId),
    });
    if (user == null) {
        res.status(400).json({ error: "resturant not exists" });
        console.log("DELETE", 400, fullUrl);
        return;
    }
    if (
        user.courses.find((course) => course.id == req.body.courseId) ==
        undefined
    ) {
        res.status(400).json({ error: "course not exists" });
        console.log("DELETE", 400, fullUrl);
        return;
    }
    resturantsCollection
        .updateOne(
            { id: Number(req.params.resId) },
            { $pull: { courses: { id: Number(req.body.courseId) } } }
        )
        .then(() => {
            res.status(200).send();
            console.log("DELETE", 200, fullUrl);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: error });
            console.log("DELETE", 500, fullUrl);
        });
});

/*
Adds a course to a resturant.

Parameters: the resturant id in the params, and the course name, price and image in the body.
Returns: an error message if failed.
*/
router.post("/addCourse/:resId", async (req, res) => {
    let fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    const properties = ["name", "price", "image"];
    if (!properties.every((x) => x in req.body)) {
        res.status(400).json({
            error: "course name, course image and course price required",
        });
        console.log("POST", 400, fullUrl);
        return;
    }
    if (validations.courseNameValidation(req.body.name) != "") {
        res.status(400).json({ error: "invalid course name" });
        console.log("POST", 400, fullUrl);
        return;
    }
    if (validations.coursePriceValidation(req.body.price) != "") {
        res.status(400).json({ error: "invalid course price" });
        console.log("POST", 400, fullUrl);
        return;
    }
    if (!Object.keys(req.body).every((x) => properties.includes(x))) {
        res.status(400).json({ error: "there is a invalid key" });
        console.log("POST", 400, fullUrl);
        return;
    }
    let user = await resturantsCollection.findOne({
        id: Number(req.params.resId),
    });
    if (user == null) {
        res.status(400).json({ error: "resturant not exists" });
        console.log("POST", 400, fullUrl);
        return;
    }
    resturantsCollection
        .distinct("courses.id", { id: Number(req.params.resId) })
        .then((ids) => {
            if (ids.length == 0) return 1;
            return Math.max(...ids) + 1;
        })
        .then((newId) => {
            req.body.id = newId;
            resturantsCollection
                .updateOne(
                    { id: Number(req.params.resId) },
                    { $push: { courses: req.body } }
                )
                .then(() => {
                    res.status(200).send();
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
Updates a course in a resturant.

Parameters: the resturant id in the params, and the course name, image and price in the body.
Returns: an error message if failed.
*/
router.put("/editCourse/:resId", async (req, res) => {
    let fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    const properties = ["name", "price", "image", "id"];
    if (!properties.every((x) => x in req.body)) {
        res.status(400).json({
            error: "course name, image and price required",
        });
        console.log("PUT", 400, fullUrl);
        return;
    }
    if (validations.courseNameValidation(req.body.name) != "") {
        res.status(400).json({ error: "invalid course name" });
        console.log("PUT", 400, fullUrl);
        return;
    }
    if (validations.coursePriceValidation(req.body.price) != "") {
        res.status(400).json({ error: "invalid course price" });
        console.log("PUT", 400, fullUrl);
        return;
    }
    if (!Object.keys(req.body).every((x) => properties.includes(x))) {
        res.status(400).json({ error: "there is a invalid key" });
        console.log("PUT", 400, fullUrl);
        return;
    }
    let user = await resturantsCollection.findOne({
        id: Number(req.params.resId),
    });
    if (user == null) {
        res.status(400).json({ error: "resturant not exists" });
        console.log("PUT", 400, fullUrl);
        return;
    }
    resturantsCollection
        .updateOne(
            {
                id: Number(req.params.resId),
                "courses.id": Number(req.body.id),
            },
            { $set: { "courses.$": req.body } }
        )
        .then(() => {
            res.status(200).send();
            console.log("POST", 200, fullUrl);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: error });
            console.log("POST", 500, fullUrl);
        });
});

module.exports = router;

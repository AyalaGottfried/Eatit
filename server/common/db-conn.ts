import {Collection, MongoClient} from "mongodb";
import IDBConn from "./db-conn-interface";
import { Customer } from "./types";

const MONGO_URL = "mongodb+srv://ayalaEatit:eatit1000@cluster0.6k4zi.mongodb.net/test";

const COLLECTIONS = {
    customers: {
        db: "eatit",
        name: "customers"
    },
    resturants: {
        db: "eatit",
        name: "resturants"
    },
    orders: {
        db: "eatit",
        name: "orders"
    }
}

export default class DBConn implements IDBConn {
    private mongo: MongoClient;

    constructor() {
        this.mongo = new MongoClient(MONGO_URL);
    }

    async init() {
        await this.mongo.connect();
    }

    getCustomersCollection(): Collection<Customer> {
        return this.mongo.db(COLLECTIONS.customers.db).collection(COLLECTIONS.customers.name);
    }

    getOrdersCollection() {
        return this.mongo.db(COLLECTIONS.orders.db).collection(COLLECTIONS.orders.name);
    }

    getResturantsCollection() {
        return this.mongo.db(COLLECTIONS.resturants.db).collection(COLLECTIONS.resturants.name);
    }
}
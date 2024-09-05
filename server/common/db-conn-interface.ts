import { Collection } from "mongodb";
import { Customer } from "./types";

export default interface IDBConn {
    init(): Promise<void>;
    getCustomersCollection(): Collection<Customer>;
    getOrdersCollection(): void;
    getResturantsCollection(): void;
}
interface IDBConn {
    init(): Promise<void>;
    getCustomersCollection(): void;
    getOrdersCollection(): void;
    getResturantsCollection(): void;
}
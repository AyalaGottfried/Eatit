import { Collection, ObjectId } from "mongodb";
import DBConn from "../common/db-conn";
import { Customer, CustomerForDisplay } from "../common/types";


export default class CustomersDAL {
    private customersCollection: Collection<Customer>;

    constructor(dbConn: DBConn) {
        this.customersCollection = dbConn.getCustomersCollection();
    }

    public async insertCustomer(customer: Customer): Promise<ObjectId> {
        const result = await this.customersCollection.insertOne(customer);
        return result.insertedId; // Return the MongoDB generated _id
    }

    public async findCustomerById(id: string): Promise<CustomerForDisplay | null> {
        return await this.customersCollection.findOne({ id });
    }

    public async findCustomerByEmail(email: string): Promise<CustomerForDisplay | null> {
        return await this.customersCollection.findOne({ email });
    }

    public async updateCustomerField(id: string, property: string, value: any): Promise<void> {
        await this.customersCollection.updateOne(
            { id },
            { $set: { [property]: value } }
        );
    }

    public async getCustomerNameAndImage(id: string): Promise<{ name: string; image: string } | null> {
        return await this.customersCollection.findOne(
            { id },
            { projection: { name: 1, image: 1, _id: 0 } }
        );
    }

    public async getCustomerCart(id: string): Promise<any | null> {
        const result = await this.customersCollection.findOne(
            { id },
            { projection: { cart: 1, _id: 0 } }
        );
        return result ? result.cart : null;
    }

    public async getAllCustomers(): Promise<CustomerForDisplay[]> {
        return await this.customersCollection
            .find()
            .project<CustomerForDisplay>({ password: 0 })
            .toArray();
    }

    public async isEmailInUse(email: string): Promise<boolean> {
        const result = await this.customersCollection.findOne({ email });
        return !!result;
    }
}
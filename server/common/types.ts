export type Customer = CustomerForDisplay & {
    password: string;
}

export type CustomerForDisplay = {
    id: string;
    email: string;
    name: string;
    image: string;
    cart: any;
}
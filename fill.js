use ykondrat;

db.customers.drop();
db.orders.drop();

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const customers = [];
const orders = [];

for (let i = 0; i < 2; i++) {
    const customer = {
        name: {
            first: `customer ${i}`,
            last:  `customer ${i}`,
        },
        balance: random(1000, 1500),
        created: new Date()
    };

    customers.push(customer);
}

const { insertedIds } = db.customers.insertMany(customers);
const length = insertedIds.length;

for (let i = 0; i < length; i++) {
    for (let j = 0; j < random(1, 10); j++) {
        const order = {
            customerId: insertedIds[i],
            count: random(1, 10),
            price: random(20, 100),
            discount: random(5, 30),
            title: `Title of product ${j}`,
            product: `Product ${j}`
        };

        orders.push({ insertOne : { document: order } });
    }
}

db.orders.bulkWrite(orders);

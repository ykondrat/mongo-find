use ykondrat;

const customers = db.customers.find();
const data = [];

while (customers.hasNext()) {
    const {
        _id,
        name : {
            first: fName,
            last: lName,
        }
    } = customers.next();
    const orders = db.orders.aggregate([
        {
            $match: {
                customerId: _id
            }
        },
        {
            $group: {
                _id: '$product',
                total: {
                    $sum: '$count'
                }
            }
        },
    ]);

    const customer = {
        fName,
        lName,
        orders: orders.toArray()
    };

    data.push(customer);
}

print(tojson(data));

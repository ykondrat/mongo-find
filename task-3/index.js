use ykondrat;

function pagination (size = 5, page = 0) {
    const customers = db.customers.find().skip(size * page).limit(size);
    const data = {
        customers: [],
        pagination: {
            size: db.customers.find().size(),
        }
    };

    print(customers.size());

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
            orders: orders.toArray(),
        };

        data.customers.push(customer);
    }

    return data;
}


print(tojson(pagination()));

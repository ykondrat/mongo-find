use ykondrat;

db.customers.aggregate([
    {
        $lookup: {
            from:         'orders',
            localField:   '_id',
            foreignField: 'customerId',
            as:           'orders'
        }
    }
]).pretty();

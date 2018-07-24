module.exports = {
    mongodb: 'mongodb://localhost:27017/',
    db_list: {
        test: {
            user: {
                schema: {
                    id: Number,
                    name: String,
                    password: String
                },
                index: {
                    name: 1,
                }
            },
            list: {
                schema: {
                    id: Number,
                    name: String,
                },
                index: {
                    name: 1,
                }
            },
        }
    },
};


module.exports = {
    apps: [{
            name: "server-api",
            script: "./backend/dist/main.js",
            env: {
                PORT: 3000,
                    NODE_ENV: "production"
            },
        },
        {
            name: "client",
            script: "serve",
                args: "./client/dist",
            env: {
                PORT: 3001,
                    NODE_ENV: "production"
            },
        },
        {
            name: "admin",
            script: "serve",
                args: "./admin/dist",
            env: {
                PORT: 3002,
                    NODE_ENV: "production"
            },
        }
    ]
};

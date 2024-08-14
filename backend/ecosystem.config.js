module.exports = {
    apps: [{
        name: "server-api",
        script: "dist/main.js",
        env: {
            "PORT": 3000,
            "NODE_ENV": "production"
        },
    },
    // client
    {
        name: "client",
        script: "cd client && npm start",
        env: {
            "PORT": 3001,
            "NODE_ENV": "production"
        },
    },
    // admin
    {
        name: "admin",
        script: "cd admin && npm start",
        env: {
            "PORT": 3002,
            "NODE_ENV": "production"
        },
    }
    ]
}
module.exports = {
    apps: [{
        name: "server-api",
        script: "dist/main.js",
        env: {
            "PORT": 3000,
            "NODE_ENV": "production"
        },
    },
    {
        name: "client",
        script: "cd client && npm run dev",
        env: {
            "PORT": 3001,
            "NODE_ENV": "production"
        },
    },
    {
        name: "admin",
        script: "cd admin && npm run dev",
        env: {
            "PORT": 3002,
            "NODE_ENV": "production"
        },
    }
    ]
}
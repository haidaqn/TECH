module.exports = {
    apps: [{
            name: "server-api",
            script: "./backend/dist/main.js",
            env: {
                "PORT": 3000,
                "NODE_ENV": "production"
            },
        },
        {
            name: "client",
            script: "./client/dist/index.html",
            env: {
                "PORT": 3001,
                "NODE_ENV": "production"
            },
        },
        {
            name: "admin",
            script: "./admin/dist/index.html",
            env: {
                "PORT": 3002,
                "NODE_ENV": "production"
            },
        }
    ]
}
module.exports = {
    apps: [{
        name: "server-api",
        script: "dist/main.js",
        env: {
            "PORT": 3000,
            "NODE_ENV": "production"
        },
    }]
}
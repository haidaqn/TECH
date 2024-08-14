module.exports = {
    apps: [{
        name: "server-api",
        script: "dist/main.ts",
        env: {
            "PORT": 3000,
            "NODE_ENV": "production"
        },
    }]
}
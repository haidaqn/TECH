const path = require('path');

module.exports = {
    apps: [{
            name: 'backend',
                script: 'npm',
                args: 'run start:dev',
                cwd: path.resolve(__dirname, 'backend'), // Đường dẫn đến thư mục chứa package.json của backend
            env: {
                NODE_ENV: 'development',
                    MONGODB_URL: 'mongodb+srv://haidang02032003:Haidang2003x@cluster0.ivbffxw.mongodb.net/tech_store',
                    JWT_SECRET: 'khoalahaidang2003x@@@@@abc',
                    EMAIL_APP: 'haidang02032003@gmail.com',
                    EMAIL_APP_PASSWORD: 'mrslqnbrabbredxr',
                    SECRETKEY: 'khoalahaidang2003x@@@@@abc',
                    EXPIRESIN: '259200000',
                    EXPIRESIN_REFRESH: '518400000',
                    SECRETKEY_REFRESH: 'khoalahaidang2003x@@@@@abccc',
            },
        },
        {
            name: 'client',
                script: 'npm',
                args: 'run dev',
                cwd: path.resolve(__dirname, 'client'), // Đường dẫn đến thư mục chứa package.json của client
            env: {
                NODE_ENV: 'development',
                    VITE_APP_VERSION: process.env.npm_package_version, // Lấy version từ package.json nếu có
            },
        },
        {
            name: 'admin',
                script: 'npm',
                args: 'run dev',
                cwd: path.resolve(__dirname, 'admin'), // Đường dẫn đến thư mục chứa package.json của admin
            env: {
                NODE_ENV: 'development',
                    VITE_APP_VERSION: process.env.npm_package_version, // Lấy version từ package.json nếu có
            },
        }, ],
};

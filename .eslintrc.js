module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "airbnb-base",
        "eslint:recommended",
        "prettier"
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        
        "semi": ["warn", "always"],
        "quotes": ["off", "double"],
        "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }]
        
    }
};

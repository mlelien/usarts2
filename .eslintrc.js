module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "rules": {
        "quotes": ["warn", "single"],
        "semi": ["warn", "never"],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "jsx-quotes": 0,
        "max-len": 0,
    },
    "plugins": [
        "only-warn"
    ],
    "globals": {
        "document": true,
        "window": true,
    }
};
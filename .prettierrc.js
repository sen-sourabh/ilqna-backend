module.exports = {
    "$schema": "http://json.schemastore.org/prettierrc",
    "arrowParens": "always",
    "bracketSpacing": true,
    "printWidth": 100,
    "proseWrap": 'always',
    "singleQuote": true,
    "tabWidth": 2,
    "trailingComma": "all", 
    "useTabs": false,
    "overrides": [
        {
            "files": "*.json",
            "options": {
                "parser": 'json'
            }
        }
    ]
};
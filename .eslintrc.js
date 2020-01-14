module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
    "indent": [ "error", 2 ],
    "quotes": [ "error", "double" ],
    "semi": [ "error", "always" ],
    "comma-dangle": [ "error", "always-multiline", ],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error", {
      "vars": "all",
      "args": "none",
      "ignoreRestSiblings": false
    }],
    "@typescript-eslint/explicit-function-return-type": ["error"]
  }
}

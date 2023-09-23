module.exports = {
  env: {
    browser: true,
    jest: true,
    es6: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  extends: ["airbnb", "plugin:prettier/recommended"],
  plugins: ["react", "babel"],
  parser: "babel-eslint",
  rules: {
    "class-methods-use-this": 0,
    "import/no-named-as-default": 0,
    "react/jsx-filename-extension": [
      "error",
      {
        extensions: [".js", ".jsx"]
      }
    ],
    "react/forbid-prop-types": ["error", { forbid: ["any", "array"] }],
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-wrap-multilines": "off",
    "no-shadow": "off",
    "react/destructuring-assignment": "off",
    "spaced-comment": "off",
    radix: ["error", "as-needed"],
    "import/prefer-default-export": "off",
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": "off",
    "no-cond-assign": [ 2, "except-parens" ]
  }
};

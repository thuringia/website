module.exports = {
  extends: ["airbnb", "prettier"],
  rules: {
    "react/jsx-filename-extension": "off",
    "react/require-default-props": "off",
    "react/jsx-props-no-spreading": "warn",
  },
  parser: "babel-eslint",
  env: {
    browser: true,
    node: true,
  },
};

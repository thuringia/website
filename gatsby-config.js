require("dotenv").config();

const manifestConfig = require("./manifest-config");

const { ACCESS_TOKEN, SPACE_ID, NODE_ENV } = process.env;

module.exports = {
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-manifest",
      options: manifestConfig,
    },
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: SPACE_ID,
        accessToken: ACCESS_TOKEN,
        environment: NODE_ENV === "production" ? "master" : "development",
      },
    },
    "gatsby-transformer-remark",
    "gatsby-plugin-offline",
  ],
};

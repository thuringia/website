const contentful = require("contentful");
const manifestConfig = require("./manifest-config");
require("dotenv").config();

const { ACCESS_TOKEN, SPACE_ID, ANALYTICS_ID } = process.env;

const client = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});

const getAboutEntry = (entry) => entry.sys.contentType.sys.id === "about";

module.exports = {
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-manifest",
      options: manifestConfig,
    },
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-plugin-google-fonts",
      options: {
        display: "swap",
        fonts: ["IBM Plex Sans:300,400,500,700"],
      },
    },
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: SPACE_ID,
        accessToken: ACCESS_TOKEN,
      },
    },
    "gatsby-transformer-remark",
    "gatsby-plugin-offline",
  ],
};

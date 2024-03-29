const path = require(`path`);

const config = require(`./src/utils/siteConfig`);
const generateRSSFeed = require(`./src/utils/rss/generate-feed`);

require('dotenv').config({
  path: `.env`,
});

let ghostConfig;

try {
  ghostConfig = require(`./.ghost`);
} catch (e) {
  console.log(`No .ghost config found`);
} finally {
  ghostConfig.production = {
    apiUrl: process.env.GHOST_API_URL,
    contentApiKey: process.env.GHOST_CONTENT_API_KEY,
  };

  const { apiUrl, contentApiKey } =
    process.env.NODE_ENV === `development`
      ? ghostConfig.development
      : ghostConfig.production;

  if (!apiUrl || !contentApiKey || contentApiKey.match(/<key>/)) {
    throw new Error(
      `GHOST_API_URL and GHOST_CONTENT_API_KEY are required to build. Check the README.`,
    ); // eslint-disable-line
  }
}

/**
 * This is the place where you can tell Gatsby which plugins to use
 * and set them up the way you want.
 *
 * Further info 👉🏼 https://www.gatsbyjs.org/docs/gatsby-config/
 *
 */
module.exports = {
  siteMetadata: {
    siteUrl: config.siteUrl,
  },
  plugins: [
    `gatsby-plugin-sass`,
    /**
     *  Content Plugins
     */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.join(__dirname, `src`, `pages`),
        name: `pages`,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`, // Needed for dynamic images
    {
      resolve: `gatsby-source-ghost`,
      options:
        process.env.NODE_ENV === `development`
          ? ghostConfig.development
          : ghostConfig.production,
    },
    /**
     *  Utility Plugins
     */
    {
      resolve: `gatsby-plugin-ghost-manifest`,
      options: {
        short_name: config.shortTitle,
        start_url: `/`,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: `minimal-ui`,
        icon: `static/${config.siteIcon}`,
        query: `
                {
                    allGhostSettings {
                        edges {
                            node {
                                title
                                description
                            }
                        }
                    }
                }
              `,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
                {
                    allGhostSettings {
                        edges {
                            node {
                                title
                                description
                            }
                        }
                    }
                }
              `,
        feeds: [generateRSSFeed(config)],
      },
    },
    {
      resolve: `gatsby-plugin-advanced-sitemap`,
      options: {
        query: `
                {
                    allGhostPost {
                        edges {
                            node {
                                id
                                slug
                                updated_at
                                created_at
                                feature_image
                            }
                        }
                    }
                    allGhostPage {
                        edges {
                            node {
                                id
                                slug
                                updated_at
                                created_at
                                feature_image
                            }
                        }
                    }
                    allGhostTag {
                        edges {
                            node {
                                id
                                slug
                                feature_image
                            }
                        }
                    }
                    allGhostAuthor {
                        edges {
                            node {
                                id
                                slug
                                profile_image
                            }
                        }
                    }
                }`,
        mapping: {
          allGhostPost: {
            sitemap: `posts`,
          },
          allGhostTag: {
            sitemap: `tags`,
          },
          allGhostAuthor: {
            sitemap: `authors`,
          },
          allGhostPage: {
            sitemap: `pages`,
          },
        },
        exclude: [
          `/dev-404-page`,
          `/404`,
          `/404.html`,
          `/offline-plugin-app-shell-fallback`,
        ],
        createLinkInHead: true,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GA_TRACKING_ID || 'dev',
      },
    },
    {
      resolve: `gatsby-plugin-mailchimp`,
      options: {
        endpoint: `https://masterylifeapp.us15.list-manage.com/subscribe/post?u=df48096ccab82ad6b4734e8fb&amp;id=d737f9a85e`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-force-trailing-slashes`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-emotion`,
  ],
};

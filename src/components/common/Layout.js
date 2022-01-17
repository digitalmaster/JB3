import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link, StaticQuery, graphql } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

// Styles
import '../../styles/app.scss';

/**
 * Main layout component
 *
 * The Layout component wraps around each page and template.
 * It also provides the header, footer as well as the main
 * styles, and meta data for each page.
 *
 */
const DefaultLayout = ({ data, children, bodyClass, isHome }) => {
  const site = data.allGhostSettings.edges[0].node;

  return (
    <>
      <Helmet>
        <html lang={site.lang} />
        <body className={bodyClass} />
      </Helmet>

      <div className="viewport">
        <div className="viewport-top">
          {/* The main header section on top of the screen */}
          <header className="site-head">
            <div className="container">
              <div className="site-mast">
                <Link to="/" className="logo-image">
                  <StaticImage
                    src="../../images/logo.png"
                    alt={site.title}
                    width={126}
                  />
                </Link>
              </div>
              {isHome ? (
                <div className="site-banner">
                  <h1 className="site-banner-title">{site.title}</h1>
                  <p className="site-banner-desc">{site.description}</p>
                </div>
              ) : null}
            </div>
          </header>

          <main className="site-main">
            {/* All the main content gets inserted here, index.js, post.js */}
            {children}
          </main>
        </div>

        <div className="viewport-bottom">
          {/* The footer at the very bottom of the screen */}
          <footer className="site-foot-wrapper">
            <div className="site-foot container">
              <div className="site-foot-left">
                <Link to="/">{site.title}</Link>
              </div>
              <div className="site-foot-right">
                © {new Date().getFullYear()} &mdash; Build with ♥ in
                <a href="https://www.instagram.com/stmaartentourism/">
                  St.Maarten
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
  bodyClass: PropTypes.string,
  isHome: PropTypes.bool,
  data: PropTypes.shape({
    allGhostSettings: PropTypes.object.isRequired,
  }).isRequired,
};

const DefaultLayoutSettingsQuery = (props) => (
  <StaticQuery
    query={graphql`
      query GhostSettings {
        allGhostSettings {
          edges {
            node {
              ...GhostSettingsFields
            }
          }
        }
      }
    `}
    render={(data) => <DefaultLayout data={data} {...props} />}
  />
);

export default DefaultLayoutSettingsQuery;

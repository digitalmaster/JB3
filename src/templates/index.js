import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';

import { Layout, PostCard, Pagination } from '../components/common';
import { MetaData } from '../components/common/meta';

const Link = styled.a`
  text-align: center;
  display: block;
`;

/**
 * Main index page (home page)
 *
 * Loads all posts from Ghost and uses pagination to navigate through them.
 * The number of posts that should appear per page can be setup
 * in /utils/siteConfig.js under `postsPerPage`.
 *
 */
const Index = ({ data, location, pageContext }) => {
  const posts = data.allGhostPost.edges;
  const [showCount, increseShowCount] = React.useState(5);

  return (
    <>
      <MetaData location={location} />
      <Layout isHome={true}>
        <div className="container">
          <div className="post-feed-header-wrapper">
            <h2 className="post-feed-header">Latest Posts</h2>
          </div>
          <section className="post-feed">
            {posts.map(
              ({ node }, index) =>
                index < showCount && (
                  // The tag below includes the markup for each post - components/common/PostCard.js
                  <PostCard key={node.id} post={node} />
                ),
            )}
          </section>
          {showCount < posts.length && (
            <Link onClick={() => increseShowCount(showCount + 5)}>
              show more
            </Link>
          )}
          <Pagination pageContext={pageContext} />
        </div>
      </Layout>
    </>
  );
};

Index.propTypes = {
  data: PropTypes.shape({
    allGhostPost: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  pageContext: PropTypes.object,
};

export default Index;

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
  query GhostPostQuery($limit: Int!, $skip: Int!) {
    allGhostPost(
      sort: { order: DESC, fields: [published_at] }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          ...GhostPostFields
        }
      }
    }
  }
`;

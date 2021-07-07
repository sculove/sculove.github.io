const path = require(`path`);
const _ = require('lodash');
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `content` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const categoryTemplate = path.resolve(`./src/pages/index.js`);
  const postTemplate = path.resolve(`./src/templates/blogPost.js`);
  const tagTemplate = path.resolve(`./src/templates/blogTag.js`);
  const result = await graphql(`
    {
      postsRemark: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(content/post)/" } }
        sort: { fields: frontmatter___date, order: DESC }
        limit: 2000
      ) {
        edges {
          node {
            frontmatter {
              tags
            }
            fields {
              slug
            }
          }
        }
      }
      categoriesGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___category) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  const posts = result.data.postsRemark.edges;

  posts.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: postTemplate,
      context: {
        slug: node.fields.slug,
      },
    });
  });

  const categories = result.data.categoriesGroup.group;

  categories.forEach((category) => {
    createPage({
      path: `/category/${_.kebabCase(category.fieldValue)}/`,
      component: categoryTemplate,
      context: {
        category: category.fieldValue,
      },
    });
  });

  const doubleTags = posts.reduce((acc, { node }) => {
    return acc.concat(node.frontmatter.tags || []);
  }, []);

  const tagsMap = doubleTags.reduce((acc, tag) => {
    if (acc.has(tag)) {
      acc.set(tag, {
        name: tag,
        count: acc.get(tag).count + 1,
      });
    } else {
      acc.set(tag, {
        name: tag,
        count: 1,
      });
    }
    return acc;
  }, new Map());

  const tags = Array.from(tagsMap.values()).sort(
    (prev, cur) => cur.count - prev.count
  );
  tags.forEach((tag) => {
    createPage({
      path: `/tag/${_.kebabCase(tag.name)}/`,
      component: tagTemplate,
      context: {
        tag: tag.name,
        tags,
      },
    });
  });
};

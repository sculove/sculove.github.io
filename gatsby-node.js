const path = require(`path`);
const _ = require('lodash');
const { createFilePath } = require(`gatsby-source-filesystem`);

function createPostPage(posts, createPage) {
  const postTemplate = path.resolve(`./src/templates/blogPost.js`);
  posts.forEach(({ node }, index) => {
    const next = index === posts.length - 1 ? null : posts[index + 1].node;
    const previous = index === 0 ? null : posts[index - 1].node;

    createPage({
      path: node.fields.slug,
      component: postTemplate,
      context: {
        slug: node.fields.slug,
        previous,
        next,
      },
    });
  });
}

function createCategoryPage(categories, createPage) {
  const categoryTemplate = path.resolve(`./src/pages/index.js`);
  categories.forEach((category) => {
    createPage({
      path: `/category/${_.kebabCase(category.fieldValue)}/`,
      component: categoryTemplate,
      context: {
        category: category.fieldValue,
      },
    });
  });
}

function createTagMap(posts) {
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
  return tagsMap;
}

function createTagPage(posts, createPage) {
  const tagTemplate = path.resolve(`./src/templates/blogTag.js`);
  const tagsMap = createTagMap(posts);
  const tags = Array.from(tagsMap.values()).sort((prev, cur) => cur.count - prev.count);
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
}

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
  const result = await graphql(`
    {
      postsRemark: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(content/post)/" } }
        sort: { fields: frontmatter___date, order: DESC }
        limit: 2000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              tags
              title
              category
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

  createPostPage(posts, createPage);
  createTagPage(posts, createPage);
  createCategoryPage(result.data.categoriesGroup.group, createPage);
};

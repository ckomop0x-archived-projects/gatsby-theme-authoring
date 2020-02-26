const fs = require("fs");

// 1. Make sure the data directory exists
exports.onPreBootstrap = ({ reporter }, options) => {
  const contentPath = options.contentPath || "data";

  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`);
    fs.mkdirSync(contentPath);
  }
};

// 2. define event type
exports.sourceNodes = ({ actions }) => {
  actions.createTypes(`
    type Event implements Node @dontInfer {
      id: ID!
      name: String!
      location: String!
      startDate: Date! @dateformat @proxy(from: "start_date")
      endDate: Date! @dateformat @proxy(from: "end_date")
      url: String!
      slug: String!
    }
  `);
};

// 3. Define resolvers for custom fields
exports.createResolvers = ({ createResolvers }, options) => {
  const basePath = options.basePath || "/";

  // Quick-and-dirty helper to convert strings into URL-friendly slugs.
  const slugify = str => {
    const slug = str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    return `/${basePath}/${slug}`.replace(/\/\/+/g, "/");
  };

  createResolvers({
    Event: {
      slug: {
        resolve: source => slugify(source.name)
      }
    }
  });
};

// 4. Query for events and create pages
exports.createPages = async ({ actions, graphql, reporter }, options) => {
  const basePath = options.basePath || "/";

  actions.createPage({
    path: basePath,
    component: require.resolve("./src/templates/events.jsx")
  });

  const result = await graphql(`
    query {
      allEvent(sort: { fields: startDate, order: ASC }) {
        nodes {
          id
          slug
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic("error loading events", reporter.errors);
    return;
  }

  const events = result.data.allEvent.nodes;

  events.forEach(event => {
    const slug = event.slug;

    actions.createPage({
      path: slug,
      component: require.resolve("./src/templates/event.jsx"),
      context: {
        eventID: event.id
      }
    });
  });
};

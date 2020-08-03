const MarkdownIt = require('markdown-it');
const markdownRenderer = new MarkdownIt();
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

function newestFirst (items) {
  return items.sort((a, b) => a.date > b.date ? -1 : 1);
}

module.exports = (config) => {
  // Copy public CSS and fonts
  config.addPassthroughCopy({ 'public/css': 'css' });
  config.addPassthroughCopy({ 'public/fonts': 'fonts' });

  // Add syntax highlighting
  config.addPlugin(syntaxHighlight);

  // Returns the time to read in minutes
  config.addFilter('read_time', content => {
    const words = content.split(' ').filter(Boolean).length;
    
    return words / 180;
  });

  // Converts some content into markdown
  // TODO: (when required) markdownify-inline
  config.addFilter('markdownify', content => {
    return markdownRenderer.render(content);
  });

  // returns all posts under /src/posts/*.md
  config.addCollection('posts', collection => {
    const posts = collection
      .getFilteredByGlob('./src/posts/*.md');

    return newestFirst(posts);
  });

  // returns all pages under /src/*.md
  config.addCollection('pages', collection => {
    const pages = collection
      .getFilteredByGlob('./src/*.md')
      .sort();

    return pages;
  });

  // Return a list of collections and thier posts
  config.addCollection('categoriesAndPosts', collection => {
    const posts = collection
      .getFilteredByGlob('./src/posts/*.md');

    let allCategories = posts.flatMap(post => post.data.categories);
    allCategories = Array.from(new Set(allCategories)).sort();

    const categoriesToPostMap = allCategories.map(category => ({
      category,
      posts: newestFirst(posts.filter(post => post.data.categories.includes(category))),
    }));

    return categoriesToPostMap;
  });

  // Return a list of years and thier posts
  config.addCollection('yearToPosts', collection => {
    const posts = collection.getFilteredByGlob('./src/posts/*.md');

    let allYears = posts.map((post) => post.date.getUTCFullYear());
    allYears = Array.from(new Set(allYears)).sort().reverse();

    const years = allYears.map((year) => ({
      year,
      posts: newestFirst(
        posts.filter((post) => post.date.getUTCFullYear() === year)
      ),
    }));

    return years;
  });

  return {
    pathPrefix: '/blog/',

    dir: {
      input: 'src',
      output: 'blog',
      includes: '_includes',
      layouts: '_layouts',
    },
  };
};

export default function(eleventyConfig) {
  eleventyConfig.addCollection("projects", function (collectionApi) {
    return collectionApi
      .getAll()
      .filter((page) => page.data.layout === 'project')
      .sort((a,b) => a.date - b.date);
  });

  eleventyConfig.addCollection("tour", function (collectionApi) {
    return collectionApi
      .getAll()
      .filter((page) => page.data.project && page.data.layout === 'slides')
      .sort((a,b) => a.date - b.date);
  });
}

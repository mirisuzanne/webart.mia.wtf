import pluginWebc from "@11ty/eleventy-plugin-webc";
import { eleventyImagePlugin } from "@11ty/eleventy-img";
import markdownIt from "markdown-it";

export default function(eleventyConfig) {
  eleventyConfig.addFilter('getStyles', (slide, allow) => {
    const props = allow || ['background', 'color'];
    const style = [];

    props.forEach((prop) => {
      if (slide[prop]) {
        style.push(`--slide-${prop}: ${slide[prop]};`);
      }
    });

    return style
      ? style.join('')
      : null;
  });

  eleventyConfig.addCollection("parts", function (collectionApi) {
    return collectionApi
      .getAll()
      .filter((page) => page.data.pt)
      .sort((a,b) => a.data.pt - b.data.pt);
  });

  eleventyConfig.addPlugin(pluginWebc, {
    components: [
      "src/_includes/**/*.webc",
      "src/_includes/**/*.svg",
      "npm:@11ty/eleventy-img/*.webc",
    ],
  });

  eleventyConfig.addPlugin(eleventyImagePlugin, {
    // Set global default options
    formats: ["avif", "jpeg"],
    outputDir: "./_site/img/",

    // Notably `outputDir` is resolved automatically
    // to the project output directory

    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
    },
  });

  eleventyConfig.addPassthroughCopy({
    './src/_css': 'css',
    './src/_fonts': 'fonts',
  });

  // markdown
  let options = {
    html: true,
    breaks: false,
    typographer: true,
  };

  const md = markdownIt(options).disable('code');
  const block = (content) => (content ? md.render(content.trim()) : '');
  const inline = (content) => (content ? md.renderInline(content.trim()) : '');

  eleventyConfig.addFilter('md', block);
  eleventyConfig.addFilter('mdI', inline);
  eleventyConfig.setLibrary("md", md);

  // Return your Object options:
  return {
    dir: {
      input: "src",
      output: "_site",
      layouts: "_layouts",
    }
  }
};

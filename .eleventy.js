import pluginWebc from "@11ty/eleventy-plugin-webc";
import { eleventyImagePlugin } from "@11ty/eleventy-img";

import { load } from 'js-yaml';

import collections from './config/collections.js';
import filters from './config/filters.js';

export default function(eleventyConfig) {
  eleventyConfig.addPlugin(collections);
  eleventyConfig.addPlugin(filters);

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

  eleventyConfig.addDataExtension('yml, yaml', (contents) => load(contents));

  // Return your Object options:
  return {
    dir: {
      input: "src",
      output: "_site",
      layouts: "_layouts",
    }
  }
};

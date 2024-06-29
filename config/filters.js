import markdownIt from "markdown-it";

const md = markdownIt({
  html: true,
  breaks: false,
  typographer: true,
}).disable('code');

const block = (content) => (content ? md.render(content.trim()) : '');
const inline = (content) => (content ? md.renderInline(content.trim()) : '');

const slideStyles = (slide, props) => {
  const css = props || ['background', 'color'];
  const style = [];

  css.forEach((prop) => {
    if (slide[prop]) {
      style.push(`--slide-${prop}: ${slide[prop]};`);
    }
  });

  return style
    ? style.join('')
    : null;
}

export default function(eleventyConfig) {
  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addFilter('md', block);
  eleventyConfig.addFilter('mdI', inline);

  eleventyConfig.addFilter('slideStyles', slideStyles);
}

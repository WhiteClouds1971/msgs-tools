import { parse, setOptions } from 'marked';

const marked = {
  install(app) {
    setOptions({
      highlight: null,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false,
    });
  },
};

const mdToHtml = text => parse(text);

export { marked, mdToHtml };

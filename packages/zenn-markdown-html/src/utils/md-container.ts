import { escapeHtml } from 'markdown-it/lib/common/utils';

// containers
// ref: https://github.com/markdown-it/markdown-it-container

// ::: details Detail
//   summary comes here
// :::
export const containerDetailsOptions = {
  validate: function (params: string) {
    return params.trim().match(/^details\s+(.*)$/);
  },
  render: function (tokens: any[], idx: number) {
    const m = tokens[idx].info.trim().match(/^details\s+(.*)$/);
    if (tokens[idx].nesting === 1) {
      // opening tag
      return (
        '<details><summary>' +
        escapeHtml(m[1]) +
        '</summary><div class="details-content">'
      );
    } else {
      // closing tag
      return '</div></details>\n';
    }
  },
};
// ::: message alert
//   text
// :::
const msgClassRegex = /^message\s*([0-9a-z -_]{0,15})$/;

export const containerMessageOptions = {
  validate: function (params: string) {
    return params.trim().match(msgClassRegex);
  },
  render: function (tokens: any[], idx: number) {
    const m = tokens[idx].info.trim().match(msgClassRegex);

    if (tokens[idx].nesting === 1) {
      // opening tag
      return '<div class="msg ' + escapeHtml(m[1]) + '">';
    } else {
      // closing tag
      return '</div>\n';
    }
  },
};

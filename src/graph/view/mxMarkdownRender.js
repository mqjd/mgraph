import hljs from 'highlight.js/lib/core'
import sql from 'highlight.js/lib/languages/sql'
import bash from 'highlight.js/lib/languages/bash'
hljs.registerLanguage('sql', sql)
hljs.registerLanguage('bash', bash)

import markdownit from 'markdown-it'

function replaceAttr(token, env) {
  token.attrs.push(['onclick', "window.dispatchEvent(new CustomEvent('open_link', {detail: {event: event}}))"])
}

const replace = (md, opts) => {
  md.core.ruler.after('inline', 'replace-link', function (state) {
    state.tokens.forEach(function (blockToken) {
      if (blockToken.type === 'inline' && blockToken.children) {
        blockToken.children.forEach(function (token) {
          const type = token.type
          if (type === 'link_open') {
            replaceAttr(token, state.env)
          }
        })
      }
    })
    return false
  })
}

const markdownRender = markdownit({
  html: true, // Enable HTML tags in source
  xhtmlOut: false, // Use '/' to close single tags (<br />)
  breaks: true, // Convert '\n' in paragraphs into <br>
  langPrefix: 'language-', // CSS language prefix for fenced blocks
  linkify: true, // autoconvert URL-like texts to links
  typographer: true, // Enable smartypants and other sweet transforms
  sourceMap: true, // Enable source map
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre><code class="hljs">' + hljs.highlight(str, { language: lang, ignoreIllegals: true }).value + '</code></pre>'
      } catch (__) {}
    }

    return '<pre><code class="hljs">' + markdownRender.utils.escapeHtml(str) + '</code></pre>'
  }
}).use(replace)

export default markdownRender

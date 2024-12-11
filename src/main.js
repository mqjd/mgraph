import './assets/main.css'
import * as mGraph from './editor'
import 'highlight.js/styles/github.min.css'

const { EditorUi, Editor } = mGraph

Object.entries(mGraph).forEach((v) => (window[v[0]] = v[1]))

window.editorUi = new EditorUi(new Editor(), document.querySelector('#app'))
window.editor = window.editorUi.editor
window.graph = window.editor.graph
let parent = window.graph.getDefaultParent()
window.graph.getModel().beginUpdate()
try {
  const md = '# 用户\n \n | 姓名   | 性别 | 年龄 | 电话        |\n |------|-----|------|-------------|\n | 张三   | 男   | 25   | 13800000001 |\n | 李四   | 女   | 30   | 13800000002 |\n | 王五   | 男   | 28   | 13800000003 |\n | 赵六   | 女   | 35   | 13800000004 |\n | 钱七   | 男   | 22   | 13800000005 |\n | 孙八   | 女   | 29   | 13800000006 |\n | 周九   | 男   | 40   | 13800000007 |\n | 吴十   | 女   | 33   | 13800000008 |\n | 郑十一 | 男   | 27   | 13800000009 |\n | 冯十二 | 女   | 31   | 13800000010 |'
  let v1 = window.graph.insertVertex(parent, null, md, 20, 20, 300, 300,
    'rounded=0;whiteSpace=wrap;html=1;md=1;align=left;verticalAlign=top;shadow=1;strokeColor=none;')
  let v2 = window.graph.insertVertex(parent, null, 'World!', 600, 150, 80, 40)
  let e1 = window.graph.insertEdge(parent, null, '', v1, v2)
} finally {
  window.graph.getModel().endUpdate()
}

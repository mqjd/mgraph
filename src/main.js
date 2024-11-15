import './assets/main.css'
import * as mGraph from './editor'
const { EditorUi, Editor } = mGraph

Object.entries(mGraph).forEach((v) => (window[v[0]] = v[1]))

window.editorUi = new EditorUi(new Editor(), document.querySelector('#app'))
window.editor = editorUi.editor
window.graph = editor.graph
var parent = graph.getDefaultParent()
graph.getModel().beginUpdate()
try {
  var v1 = graph.insertVertex(parent, null, '# Hello,', 20, 20, 80, 30, 'md=1;html=1')
  var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30)
  var e1 = graph.insertEdge(parent, null, '', v1, v2)
} finally {
  graph.getModel().endUpdate()
}

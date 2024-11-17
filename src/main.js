import './assets/main.css'
import * as mGraph from './editor'
import 'highlight.js/styles/github.min.css'
const { EditorUi, Editor, useCanvasViewerActions, mxCell, mxGeometry } = mGraph

const defaultStyle = 'md=1;html=1;align=left;verticalAlign=top;whiteSpace=wrap;rounded=0;spacing=0;dropTarget=0;'

const themes = {
  1: 'fillColor=#e57373;strokeColor=#c62828;strokeWidth=3;opacity=50;', // red
  2: 'fillColor=#ffb74d;strokeColor=#ef6c00;strokeWidth=3;opacity=50;', // orange
  3: 'fillColor=#fff176;strokeColor=#f9a825;strokeWidth=3;opacity=50;', // yellow
  4: 'fillColor=#81c784;strokeColor=#2e7d32;strokeWidth=3;opacity=50;', // green
  5: 'fillColor=#4dd0e1;strokeColor=#00838f;strokeWidth=3;opacity=50;', // cyan
  6: 'fillColor=#ba68c8;strokeColor=#6a1b9a;strokeWidth=3;opacity=50;' // purple
}

const jsonToCell = (json) => {
  const { x, y, width, height, text, id, color } = json
  const themeKey = color
  const cell = new mxCell(text, new mxGeometry(x, y, +width, +height), defaultStyle + (themes[themeKey] || ''))
  cell.vertex = true
  cell.id = id
  return cell
}

const jsonToEdge = (json, cellMap) => {
  const { label, fromNode, toNode, id } = json
  const edge = new mxCell(label, new mxGeometry())
  edge.setId(id)
  edge.setEdge(true)
  edge.geometry.relative = true
  edge.source = cellMap[fromNode]
  edge.target = cellMap[toNode]
  return edge
}

const jsonToCells = (json) => {
  const root = new mxCell()
  root.id = 'root'
  const defaultParent = new mxCell()
  defaultParent.id = 'default'
  root.insert(defaultParent)

  const { nodes, edges } = json
  const cells = nodes.map(jsonToCell)
  const cellMap = Object.fromEntries(cells.map((v) => [v.id, v]))

  return cells.concat(
    edges.map((edge) => {
      return jsonToEdge(edge, cellMap)
    })
  )
}

const chunkArray = (array, chunkSize) => {
  const result = []
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize)
    result.push(chunk)
  }
  return result
}

window.initGraph = function (element, jsonCanvas) {
  window.editorUi = new EditorUi(new Editor(), element)
  useCanvasViewerActions(editorUi)
  window.editor = editorUi.editor
  window.graph = editor.graph
  if (jsonCanvas) {
    const cells = jsonToCells(JSON.parse(jsonCanvas))
    chunkArray(cells, 50).forEach((array) => graph.addCells(array))
  }
}

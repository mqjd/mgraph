import './assets/main.css'
import * as mGraph from './editor'
import "highlight.js/styles/github.min.css"
const { EditorUi, Editor } = mGraph

Object.entries(mGraph).forEach((v) => (window[v[0]] = v[1]))

window.editorUi = new EditorUi(new Editor(), document.querySelector('#app'))
window.editor = editorUi.editor
window.graph = editor.graph
var parent = graph.getDefaultParent()
graph.getModel().beginUpdate()
const markdown = `
## Output: Students
#### Job: Load Students
#### Type: DB2ConnectorPX
#### AutoGenerateSQL: false

| Name         | SqlType | Precision | Nullable | DataType |   |
|--------------|---------|-----------|----------|----------|---|
| user_id      | 12      | 255       | 0        | VARCHAR  | 1 |
| user_name    | 12      | 50        | 1        | VARCHAR  | 2 |
| class_id     | 12      | 25        | 1        | VARCHAR  | 3 |
| class_name   | 12      | 255       | 1        | VARCHAR  | 4 |
| school_id    | 12      | 30        | 1        | VARCHAR  | 5 |
| schlool_name | 12      | 25        | 1        | VARCHAR  | 6 |

\`\`\`sql
select
  a.id   as user_id,
  a.name as user_name,
  b.id   as class_id,
  b.name as class_name,
  c.id   as school_id,
  c.name as schlool_name,
from student a
inner join class b 
  on a.class_id = b.id
inner join school c 
  on a.school_id = c.id
where c.name = '向日葵幼儿园'
\`\`\`

\`\`\`bash
rm -rf *
\`\`\`
`
try {
  var v1 = graph.insertVertex(parent, null, markdown, 20, 20, 400, 400, 'md=1;rounded=0;whiteSpace=wrap;html=1;align=left;verticalAlign=top;')
  var v2 = graph.insertVertex(parent, null, 'World!', 600, 150, 80, 30)
  var e1 = graph.insertEdge(parent, null, '', v1, v2)
} finally {
  graph.getModel().endUpdate()
}

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
## Output: lnk_Common_DB1
#### Job: BPM_AcxiomRefresh_Table_Load_CA
#### Type: DB2ConnectorPX
#### AutoGenerateSQL: false

| Name                     | SqlType | Precision | Nullable | DataType |     |
| ------------------------ | ------- | --------- | -------- | -------- | --- |
| TRANSACTION_ID           | 12      | 255       | 0        | VARCHAR  | 1   |
| CITY                     | 12      | 50        | 1        | VARCHAR  | 2   |
| GIVEN_NAME1              | 12      | 25        | 1        | VARCHAR  | 3   |
| HOME_PHONE               | 12      | 255       | 1        | VARCHAR  | 4   |
| LAST_NAME                | 12      | 30        | 1        | VARCHAR  | 5   |
| MIDDLE_NAME              | 12      | 25        | 1        | VARCHAR  | 6   |
| PRIMARY_EMAIL            | 12      | 255       | 1        | VARCHAR  | 7   |
| PROVINCE                 | 12      | 28        | 1        | VARCHAR  | 8   |
| ZIPCODE                  | 12      | 20        | 1        | VARCHAR  | 9   |
| ACX_RM_NEW_INDIV_ID_CMMN | 12      | 16        | 1        | VARCHAR  | 10  |
| ACX_RM_OLD_INDIV_ID_CMMN | 12      | 16        | 1        | VARCHAR  | 11  |

\`\`\`sql
SELECT 
cast(a.transaction_id  as varchar(100)) TRANSACTION_ID,
A.ACX_RM_OLD_INDIV_ID AS ACX_RM_OLD_INDIV_ID_Cmmn,
A.ACX_RM_NEW_INDIV_ID AS ACX_RM_NEW_INDIV_ID_Cmmn,
A.GIVEN_NAME1,
A.MIDDLE_NAME,
A.LAST_NAME,
A.ADDRESS_LINE1,
A.CITY,
A.ACX_ENHANCED_STATE_ABREV as PROVINCE,
A.ZIPCODE,
A.PRIMARY_EMAIL,
A.HOME_PHONE from #$ev_CDMSCHM#COMMON_DB_MBCAN A inner join #$ev_CDMSCHM#ACXIOM_RETURN B on Transaction_id = Customer_transaction_id  
where B.ACX_RM_TRANS_REPO_FLAG = 'R' and Transaction_status not in(9)
   and B.ACX_CDI_CHANGE_FLAG='Y'
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

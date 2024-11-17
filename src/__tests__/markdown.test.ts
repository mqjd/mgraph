import { assert, describe, it } from 'vitest'
import markdownRender from '../graph/view/mxMarkdownRender'

const markdown =
  "```sql\n\nselect a <> 1\n```\n"

describe('skipped suite', () => {
  it('math is easy', ({ expect }) => {
    console.log(markdownRender.render(markdown))
  })
})

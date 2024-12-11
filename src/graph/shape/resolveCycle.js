import mxUtils from '../util/mxUtils'
import mxConstants from '../util/mxConstants'

import mxText from './mxText'
import mxShape from './mxShape'

/**
 * Function: getTextRotation
 *
 * Returns the rotation for the text label.
 * 
 * @m-graph from mxShape.js
 */
mxShape.prototype.getTextRotation = function () {
  var rot = this.getRotation()

  if (mxUtils.getValue(this.style, mxConstants.STYLE_HORIZONTAL, 1) != 1) {
    rot += mxText.prototype.verticalTextRotation
  }

  return rot
}

import mxUtils from './mxUtils'
import mxConstants from './mxConstants'
import mxSvgCanvas2D from './mxSvgCanvas2D'

/**
 * Function: getSizeForString
 * from: mxUtil.js @m-graph
 *
 * Returns an <mxRectangle> with the size (width and height in pixels) of
 * the given string. The string may contain HTML markup. Newlines should be
 * converted to <br> before calling this method. The caller is responsible
 * for sanitizing the HTML markup.
 *
 * Example:
 *
 * (code)
 * var label = graph.getLabel(cell).replace(/\n/g, "<br>");
 * var size = graph.getSizeForString(label);
 * (end)
 *
 * Parameters:
 *
 * text - String whose size should be returned.
 * fontSize - Integer that specifies the font size in pixels. Default is
 * <mxConstants.DEFAULT_FONTSIZE>.
 * fontFamily - String that specifies the name of the font family. Default
 * is <mxConstants.DEFAULT_FONTFAMILY>.
 * textWidth - Optional width for text wrapping.
 * fontStyle - Optional font style.
 */
mxUtils.getSizeForString = function (text, fontSize, fontFamily, textWidth, fontStyle) {
  fontSize = fontSize != null ? fontSize : mxConstants.DEFAULT_FONTSIZE
  fontFamily = fontFamily != null ? fontFamily : mxConstants.DEFAULT_FONTFAMILY
  var div = document.createElement('div')

  // Sets the font size and family
  div.style.fontFamily = fontFamily
  div.style.fontSize = Math.round(fontSize) + 'px'
  div.style.lineHeight = mxConstants.ABSOLUTE_LINE_HEIGHT
    ? fontSize * mxConstants.LINE_HEIGHT + 'px'
    : mxConstants.LINE_HEIGHT * mxSvgCanvas2D.prototype.lineHeightCorrection

  // Sets the font style
  if (fontStyle != null) {
    if ((fontStyle & mxConstants.FONT_BOLD) == mxConstants.FONT_BOLD) {
      div.style.fontWeight = 'bold'
    }

    if ((fontStyle & mxConstants.FONT_ITALIC) == mxConstants.FONT_ITALIC) {
      div.style.fontStyle = 'italic'
    }

    var txtDecor = []

    if ((fontStyle & mxConstants.FONT_UNDERLINE) == mxConstants.FONT_UNDERLINE) {
      txtDecor.push('underline')
    }

    if ((fontStyle & mxConstants.FONT_STRIKETHROUGH) == mxConstants.FONT_STRIKETHROUGH) {
      txtDecor.push('line-through')
    }

    if (txtDecor.length > 0) {
      div.style.textDecoration = txtDecor.join(' ')
    }
  }

  // Disables block layout and outside wrapping and hides the div
  div.style.position = 'absolute'
  div.style.visibility = 'hidden'
  div.style.display = 'inline-block'
  div.style.zoom = '1'

  if (textWidth != null) {
    div.style.width = textWidth + 'px'
    div.style.whiteSpace = 'normal'
  } else {
    div.style.whiteSpace = 'nowrap'
  }

  // Adds the text and inserts into DOM for updating of size
  div.innerHTML = text
  document.body.appendChild(div)

  // Gets the size and removes from DOM
  var size = new mxRectangle(0, 0, div.offsetWidth, div.offsetHeight)
  document.body.removeChild(div)

  return size
}

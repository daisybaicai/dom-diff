import { PATCH_ACTION } from "./constant";
import { setAttr, createDom } from "./element";

let allPatches;
let index = 0; // 默认哪个需要打补丁
function patch(node, patches) {
  allPatches = patches;
  walk(node);
  // 给某个元素打补丁
}

/**
 * 遍历
 * @param {*} node
 */
function walk(node) {
  let currentPatch = allPatches[index];
  var len = node.childNodes ? node.childNodes.length : 0;
  // 深度遍历子节点
  for (var i = 0; i < len; i++) {
    var child = node.childNodes[i];
    index++;
    walk(child);
  }
  //   let childNodes = node.childNodes;
  //   childNodes.forEach((child) => walk(child));
  if (currentPatch) {
    doPatch(node, currentPatch);
  }
}

/**
 * 处理 patch
 * @param {*} node
 * @param {*} currentPatch
 */
function doPatch(node, currentPatch) {
  currentPatch.forEach((patch) => {
    switch (patch.type) {
      case PATCH_ACTION.PROPS:
        for (const attrs in patch.attrs) {
          if (!attrs.value) {
            node.removeAttribute(attrs);
          } else {
            setAttr(node, attrs, patch[attrs]);
          }
        }
        break;
      case PATCH_ACTION.TEXT:
        node.textContent = patch.text;
        break;
      case PATCH_ACTION.REPLACE:
        let newNode =
          patch.newNode instanceof Element
            ? createDom(patch.newNode)
            : document.createTextNode(patch.newNode);
        node.parentNode.replaceChild(newNode, node);
        break;
      case PATCH_ACTION.REMOVE:
        node.parentNode.removeChild(node);
        break;
      default:
        break;
    }
  });
}

export default patch;

import { isString } from "./utils";
import {PATCH_ACTION } from './constant'
let Index = 0;

/**
 * 比较新老节点，返回一个patch包
 * @param {*} oldVdom
 * @param {*} newVdom
 */
function diff(oldVdom, newVdom) {
  let patches = {};
  let index = 0;
  dfsWalk(oldVdom, newVdom, index, patches);
  return patches;
}

/**
 * 深度优先比较oldVdom 和newVdom之间的区别，得到补丁包
 * @param {*} oldVdom
 * @param {*} newVdom
 * @param {*} index
 * @param {*} patches
 */
function dfsWalk(oldVdom, newVdom, index, patches) {
  let currentPatch = [];
  if (oldVdom && !newVdom) {
    // console.log('new', oldVdom);
    // 如果是移除
    currentPatch.push({ type: PATCH_ACTION.REMOVE, oldVdom, index });
  } else if (isString(oldVdom) && isString(newVdom)) {
    if (oldVdom !== newVdom) {
      currentPatch.push({ type: PATCH_ACTION.TEXT, text: newVdom });
    }
  } else if ((!oldVdom && newVdom) || oldVdom.type !== newVdom.type) {
    // 新增， 没有原oldVdom ，只有新Vdom 或者两者类型不同
    currentPatch.push({ type: PATCH_ACTION.REPLACE, newVdom });
  } else {
    // type 相同
    // 更新属性
    const attrs = diffAttrs(oldVdom.props, newVdom.props);
    if (Object.keys(attrs).length > 0) {
      currentPatch.push({ type: PATCH_ACTION.PROPS, attrs });
    }
    diffChildren(oldVdom.children, newVdom.children, patches);
  }

  if (currentPatch.length > 0) {
    // 当前元素确实有补丁
    // 将元素和补丁对应起来 放到大补丁包中
    patches[index] = currentPatch;
  }
}

/**
 * children 比较
 * @param {*} oldVChildren 
 * @param {*} newVChildren 
 * @param {*} patches 
 */
function diffChildren(oldVChildren, newVChildren, patches) {
  oldVChildren = Array.isArray(oldVChildren) ? oldVChildren : [oldVChildren];
  newVChildren = Array.isArray(newVChildren) ? newVChildren : [newVChildren];
  let maxLength = Math.max(oldVChildren.length, newVChildren.length);
  for (let i = 0; i < maxLength; i++) {
    dfsWalk(oldVChildren[i], newVChildren[i], ++Index, patches);
  }
}

/**
 * 比较属性
 * @param {*} oldProps
 * @param {*} newProps
 * @param {*} patches
 */
function diffAttrs(oldProps, newProps) {
  let patches = {};
  // 如果相同的key 但不同的值，需要更新props
  for (const key in oldProps) {
    if (oldProps[key] !== newProps[key]) {
      // 属性值更新的props
      patches[key] = newProps[key];
    }
  }
  // 可能是新增属性
  for (const key in newProps) {
    if (!oldProps[key]) {
      patches[key] = newProps[key];
    }
  }
  return patches;
}

export default diff;

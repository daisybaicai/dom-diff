class Element {
    constructor(type,props,children) {
        this.type = type;
        this.props = props;
        this.children = children;
    }
}


Element.prototype.render = function() {
    // console.log('this', this);
    // vdom
    const vdom = this; // 谁调用谁就是那个vdom
    const trueDom = createDom(vdom)
    return trueDom;
}

/**
 * 创建dom
 * @param {*} vdom 
 */
function createDom(vdom) {
    let dom;
    const {type, props, children = []} = vdom;
    if(type) {
        dom = document.createElement(type)
    }
    if(props) {
        updateProps(dom, props);
    }
    if(children) {
        children.forEach(child => {
            const childNode = child instanceof Element ? createDom(child) : document.createTextNode(child);
            dom.appendChild(childNode);
        })
    }
    return dom;
}

/**
 * 更新props属性
 * @param {*} dom 
 * @param {*} props 
 */
function updateProps(dom, props) {
    for (const key in props) {
        setAttr(dom, key, props[key]);
    }
}

/**
 * 设置属性
 * @param {*} dom 
 * @param {*} key 
 * @param {*} value 
 */
function setAttr(dom, key, value) {
    switch (key) {
        case 'class': 
            dom.className = value;
            break;
        case 'style':
            if(typeof value === 'string') {
                dom.style.cssText = value;
            }
            break;
        default: 
            dom[key] =value;
    }
}


function createElement(type, props, children) {
    return new Element(type, props, children);
}

export default createElement;
# dom-diff

dom-diff的例子学习


## 题目
```javascript
const el = require('./element.js')
const ul = el('ul', {id: 'list'}, [
  el('li', {class: 'item'}, ['Item 1']),
  el('li', {class: 'item'}, ['Item 2']),
  el('li', {class: 'item'}, ['Item 3'])
])
const ulRoot = ul.render();
document.body.appendChild(ulRoot);

<ul id='list'>
  <li class='item'>Item 1</li>
  <li class='item'>Item 2</li>
  <li class='item'>Item 3</li>
</ul>

```

## diff
diff比较时，需要得到一个patch 补丁包，其中patch如何得到需要，通过深度优先遍历这棵树，其中每一个元素上会有一个数组，数组里面有多个小补丁，可能该元素的属性props变化了，有可能该元素被移除了等等。

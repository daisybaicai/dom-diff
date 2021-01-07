// const el = require('./element.js')
import el from './element';
import diff from './diff';
import patch from './patch';

const ul = el('ul', {id: 'list'}, [
  el('li', {class: 'item', style: "color:red"}, ['Item 1']),
  el('li', {class: 'item'}, ['Item 2']),
  el('li', {class: 'item'}, ['Item 3']),
])

let ulV2 = el('ul', { class: 'list-group' }, [
  el('li', { class: 'item' }, ['2']),
  el('li', { class: 'item' }, ['1']),
  el('li', { class: 'item' }, ['1']),
]);

const ulRoot = ul.render();
const patches = diff(ul, ulV2);
console.log('patches', patches);
patch(ulRoot, patches);
document.body.appendChild(ulRoot);
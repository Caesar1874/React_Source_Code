
## info
* React源代码位置： /react_source_code/src

## 代码结构
- addons
- isomorphic
- shared
- test
- umd
- renderers: 核心
  - dom:  
	  - shared
		  - setInnerHTML.js
		  - setTextCotent.js

    - stack / client
      - DOMLazyTree.js 
    - stack / server

  - shared: 
	  - shared / event
	  - stack / reconciler

## setInnerHTML.js
```javascript
var setInnerHTML = function(node, html) {
    node.innerHTML = html;
}
```

## setTextContent.js
```javascript
var setTextContent = function(node, html) {
    if(true) {
    // node 只包含一个 文本节点
      node.firstChild.nodeValue = text;
    }
    node.textContent = text;
}
```
## DOMLazyTree.js
```javascript
// DOMLazyTree 类： node是实际包含的 node 节点
function DOMLazyTree(node) {
    return {
        node: node,
        children: [],
        html: null,
        text: null,
        toString, 
    }
}

function toString() {
    return this.node.nodeName;
}

DOMLazyTree.insertTreeBefore = insertTreeBefore;
DOMLazyTree.replaceChildWithTree = replaceChildWithTree;
DOMLazyTree.queureChild = queueChild;
DOMLazyTree.queueHTML = queueHTML;
DOMLazyTree.queueText = queueText;

// 这两个函数生成 documentFragment 
// tree 是 DOMLazyTree 的实例
function insertTreeChildren(tree) {
}
function insertTreeBefore(tree) {
}

// 插入节点
function queueChild(parentTree, childTree) {
    parendTree.node.appendChild(childTree.node)
}

// 改变 tree 的innerHTML
function queueHTML(tree, html) {
    setInerHTML(tree.node, html)
}

// 改变 tree 的 textContent
function queueText(tree, text) {
    setTextContent(tree.node, text);
}
```

git test


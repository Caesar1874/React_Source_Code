
## info
* React源代码位置： /react_source_code/src

## 代码结构
- addons
- isomorphic
  - /classic/class
    - ReactClass.js
      - ReactClass
      - ReactClassInterface
  - /modern/class
    - ReactBaseClasses.js
    - ReactNoopUpdateQueue.js
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
      - DOMChildrenOperation.js
    - stack / server

  - shared: 
	  - shared / event
	  - stack / reconciler
	    - ReactUpdates.js
	    - ReactDefaultBatchingStrategy.js
	    - Transaction.js




git test


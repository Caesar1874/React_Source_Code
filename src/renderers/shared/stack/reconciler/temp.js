// instantiateReactComponent
function instantiateReactComponent(ndoe, shouldHaveDebugID) {
  // 组件实例
  var instance;

  // node 不存在，初始化空组件
  if (node === null || node === false) {
    instance = ReactEmptyComponent.create(instantiateReactComponent);
  } else if (typeof node === "string" || typeof node === "number") {
    instance = ReactHostComponent.createInstanceForText(node);
  } else if (typeof node === "object") {

    // node.type 为 string, 初始化 DOM组件( internalComponent)
    if (typeof node.type === "string") {
      instance = ReactHostComponent.createInternalComponent(element);
    } else if (isInternalComponentType(element.type)) {
      // node.type 为 function 而且满足isInternalComponentType，不能处理 TODO： 非字符串表示的自定义组件
      instance = new node.type(node);
    } else {
      // node.type 为 function 的其他情况： 初始化 自定义组件(compositeConponent)
      instance = new ReactCompositeComponentWrapper(element);
    }
  }

  return instance;
}


// ReactClass.createClass
// 基于给定的 类spec 创建 composite component类
// composite组件是组合其他composite 或 host 组件的高级组件(high-level)；
// spec 遵循一个特定的协议， 该协议由ReactClassInterface 定义， 除此之外的属性和方法可以通过原型获得；
// spec的形式
spec = {
  propType: {},
  getDefaultProps: function () {
  },
  getInitialState: function () {
  },
  eventHandler: function () {
  },
  // render 是必选的
  render: function () {
  }
};

ReactClass.createClass = function (spec) {
  // 定义组件
  var Constructor = function (prosp, context, updater) {
    // 这里的 this 是谁， 也就是组件由谁调用
    this.props = props;
    this.context = context;
    this.updater = updater || ReactNoopUpdateQueue;

    this.refs = emptyObject;
    this.state = null;

    // ReactClass 没有构造函数， 由 getInitialState 和 componentWillMount 进行初始化
    // getInitialState 与 getInitialState() 是什么关系
    this.state = this.getInitialState();
  };

  // 组件的原型是 ReactClassComponent 的实例
  Constructor.prototype = new ReactClassComponent();
  Constructor.prototype.constructor = Constructor;

  // 初始化 defaultProps 属性 (静态属性)
  Constructor.defaultProps = Constructor.getDefaultProps();

  return Constructor;
  // 返回的 Constructor 就是定义的组件Box，由ReactDOM.render 渲染，或者在其他组件中使用
  // var Box = React.createClass(spec)
};

// ReactUpdateQueue
// 设置一系列state
// 该方法存在是因为 _pendingState 是内部方法；
ReactUpdateQueue.enqueueSetState = function(publicInstance, partialState, callback, callerName) {
  // publicInstance 是 ReactClass 实例

  // 获取 publicIntance 的内部表示
  var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'setState');

  // 获取更新队列
  var queue = internalInstance._pendingStateQueue || (internalInstance._pendingStateQueue = []);

  // 将待更新的state 对象添加到队列
  queue.push(partialState);

  // 处理callback 的逻辑

  ReactUpdates.enqueueUpdate(internalInstance);
};


// 辅助方法
function getInternalInstanceReadyForUpdate(publicInstance, callerName) {
  // 获取 publicIntance 的内部表示， 也就是publicInstance._reactInternalInstance
  // 不知道该属性在何处定义, 猜测这个实例时composite component
  var internalInstance = ReactInstanceMap.get(publicInstance);
  return internalInstance;
}

// 相关模块
// ReactInstanceMap
// 该模块建立 公共的状态实例(key) 与 内部表征(value) 之间的映射
var ReactInstanceMap = {
  // 这里的key是 publicInstance
  // _reactInternalInstance 是什么
  remove: function(key) {
    key._reactInternalInstance = undefined;
  },

  get: function(key) {
    return key._reactInternalInstance;
  },

  has: function(key) {
    return key._reactInternalInstance !== undefined;
  },

  set: function(key, value) {
    key._reactInternalInstance = value;
  },
};



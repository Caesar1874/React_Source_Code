
// 测试 下面的代码 constructor定义在Wrapper的原型上
/*
var ReactCompositeComponentWrapper = function (element) {
  // ???????????? what?
  this.construct(element);
};*/

var Wrapper = function(ele) {
  this.construct(ele);
  // this.prop = "qinge"
}


var composite = {
  construct: function(ele) {
    this._ele = ele;
  }
};

Object.assign(Wrapper.prototype, composite);


var wrapper = new Wrapper("123");
console.log(wrapper);

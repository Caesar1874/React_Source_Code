// 定义事务
var MyTransaction = function () {
//
};

Object.assign(MyTransaction.prototype, Transation.Mixin, {
  // 获取 前置方法 和 收尾方法
  getTransactionWrappers: function () {
    return [{
      initialize: function () {
        //
      },
      close: function() {
      //
      }
    }];
  }
});

// 实例化
var transaction = new MyTransaction();
var textMethod = function() {
//
};
transaction.perform(textMethod);



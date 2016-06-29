/**
 * Created by tgzhao on 2016/6/28.
 */


/**
 * 如何实现一个EventEmitter
 */
/*var util = require('util');
var EventEmitter = require('events').EventEmitter;

function MyEmitter() {
    EventEmitter.call(this);
} // 构造函数

util.inherits(MyEmitter, EventEmitter); // 继承

var em = new MyEmitter();
em.on('hello', function(data) {
    console.log('收到事件hello的数据:', data);
}); // 接收事件，并打印到控制台
em.emit('hello', 'EventEmitter传递消息真方便!');*/


/**
 * 捕获EventEmitter的错误事件
 */
var domain = require('domain');
var myDomain = domain.create();
myDomain.on('error', function(err){
    console.log('domain接收到的错误事件:', err);
}); // 接收事件并打印
myDomain.run(function(){
    var emitter1 = new MyEmitter();
    emitter1.emit('error', '错误事件来自emitter1');
    emitter2 = new MyEmitter();
    emitter2.emit('error', '错误事件来自emitter2');
});
/**
 * Created by tgzhao on 16/6/26.
 */
var redis = require("redis");

var config = require('../config');
var client = redis.createClient(config.redisPort, config.redisHost);

client.on("connect", function () {
    console.log("redis connect");
});

client.on("error", function (err) {
    console.log("error" + err);
});

client.set("clienttest", "testval", redis.print);
// client.hset("hashkey", "hashkeysub", "hash value", function (err, reply) {
//     if (err) {
//         console.log("err:" + err);
//     } else {
//         console.log("reply:" + reply);
//         reply.forEach(function (rep, i) {
//             console.log("key" + i + ":" + rep);
//         })
//     }
//     // client.quit();
// });

client.hset("hashkey", "hashkeysub2", "hash value2", redis.print);

client.hkeys("hashkey", function (err, reply) {
    if (err) {
        console.log("err:" + err);
    } else {
        console.log("reply:" + reply);
        reply.forEach(function (rep, i) {
            console.log("key" + i + ":" + rep);
        })
    }
});

var info = {};
info.baidu = 'www.baidu.com';
info.sina  = 'www.sina.com';
info.qq    = 'www.qq.com';
client.hmset('site', info, function(error, res){
    if(error) {
        console.log(error);
    } else {
        console.log(res);
    }

    // 关闭链接
    // client.end();
});

//
// client.sadd(key,value1,...valuen,[callback])：集合操作，向集合key中添加N个元素，已存在元素的将忽略；redis2.4版本前只能添加一个值
//
// sismember(key,value,[callback])：元素value是否存在于集合key中，存在返回1，不存在返回0
//
// smembers(key,[callback])：返回集合 key 中的所有成员，不存在的集合key也不会报错，而是当作空集返回
//
// client.quit()：与之对应的还有一个client.end()方法，相对比较暴力；client.quit方法会接收到所有响应后发送quit命令，而client.end则是直接关闭；都是触发end事件
//
console.log("multi exec test:")
var key = 'skills';
client.sadd(key, 'C#','java',redis.print);
client.sadd(key, 'nodejs');
client.sadd(key, "MySQL");

client.multi()
    .sismember(key,'C#')
    .smembers(key)
    .exec(function (err, replies) {
        console.log("MULTI got " + replies.length + " replies");
        replies.forEach(function (reply, index) {
            console.log("Reply " + index + ": " + reply.toString());
        });
        client.quit();
    });
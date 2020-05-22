### JavaScript Code Line

1. 赋值和深浅拷贝

   - 赋值

     1. 基本数据类型：赋值，赋值之后两个变量互不影响
     2. 引用数据类型：赋址，两个变量具有相同的引用，指向同一个对象，相互之间有影响

   - 浅拷贝

     1. 浅拷贝只解决了第一层问题，拷贝第一层的基本数据类型，以及第一层的引用类型地址

        ![](http://resource.muyiy.cn/image/2019-07-24-060221.png)
        

     2. 使用场景

        - `Object.assgin()`
          1. 将所有可枚举属性的值从一个或多个源对象复制到目标对象，返回目标对象
        - `Array.prototype.slice()`
        - `Array.prototype.cocat()`

     3. `Object.assign()`的模拟实现

        1. 判断`原生Object`是否支持该函数，如果不存在的话创建一个`assign`，并使用`Object.defineProperty`将该函数绑定到`Object`上。
        2. 判断参数是否正确（目标对象不能为空，我们可以直接设置`{}`传递过去，但必须设置值）
        3. 使用`Object()`转成对象，并保存`to`，最后返回这个对象`to`
        4. 使用`for..in `循环遍历出所有可枚举的自由属性。并复制给新的目标对象（使用`hasOwnProperty`获取自由属性，即非原型链上的属性）

   - 深拷贝

     1. 深拷贝会拷贝所有属性，并拷贝属性指向的动态分配的内存。当对象和它所引用的对象一起拷贝时，即发生深拷贝。

        ![](http://resource.muyiy.cn/image/2019-07-24-060222.png)

        

     2. 使用场景

        1. `JSON.parse(JSON.stringify(object))`
           - 存在的问题
             1. 会忽略`undefined`
             2. 会忽略`Symbol`
             3. 不能序列化函数
             4. 不能解决循环引用的问题
             5.  不能正确处理`new Date()`的问题
             6. 不能处理正则

     3. 模拟实现

        1. 简单实现（浅拷贝+递归）
        2. 拷贝数组
        3. 循环引用
           - 使用哈希表（WeakMap）
           - 使用数组
        4. 拷贝symbol
           - `Object.getOwnPropertySymbols(...)`
           - `Reflect.ownKeys(...)`
        5. 递归爆栈问题

   


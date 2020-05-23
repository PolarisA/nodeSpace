### JavaScript Code Line

##### 原型、原型链、构造函数

1. 原型链

   - 每个对象都拥有一个原型对象，通过`__proto__`指针指向上一个原型，并从中继承方法和属性，同时原型对象也可能用于原型，这样一层一层，最终指向`null`，这就是原型链。

2. 原型

   - `prototype`

     1. 每个对象拥有一个原型对象，对象以其为模板，从原型继承方法和属性。这些属性和方法定义在对象的构造器函数的`prototype`属性上，而非对象实例本身。

     ![](http://resource.muyiy.cn/image/2019-07-24-60302.jpg)

     2. 从上图可以看出，`Parent`对象有一个原型对象 `Parent.prototype`,其上有两个属性，分别是`constructor`和`__proto__`,其中`__proto__`已经被弃用。
     3. 构造函数`Parent`有一个指向原型的指针，原型`Parent.prototype` 有一个指向构造函数的指针`Parent.prototype.constructor`，其实就是循环引用。

     ![](http://resource.muyiy.cn/image/2019-07-24-060303.jpg)

     

   - `__proto__`

     1. `__proto__`是一个访问器属性（即getter函数和setter函数），通过它可以访问对象的内部`[[Prototype]]`(一个对象或者null)

     ![](http://resource.muyiy.cn/image/2019-07-24-060304.jpg)

     2. `p.__proto__`获取对象的原型，`__proto__`是每个实例上都有的属性，`prototype`是构造函数的属性，这两个并不一样。但是 `p.__proto__` 和 `Parent.prototype` 指向同一个原型。
     3. 构造函数`Parent`，`Parent.prototype`和`p`的关系

     ![](http://resource.muyiy.cn/image/2019-07-24-060305.jpg)

     

   - 注意点

     1. `__proto__`是每个实例上都有的属性，`prototype`是构造函数的属性，这两个并不一样，但`p.__proto__`和`Parent.prototype`指向同一个对象
     2. `__proto__`属性在ES6时被标准化，但因为性能问题并不推荐使用，推荐使用`Object.getPrototypeOf()`

3. 构造函数

   - 什么是构造函数
     1. 返回创建实例对象时构造函数的引用。此属性的值是对函数本身的引用，而不是一个包含函数名称的字符串。
     2. 构造函数本身就是一个函数，与普通函数没有任何区别，为了规范一般将其首字母大写。
     3. 构造函数和普通函数的区别在于，使用new生成实例的函数就是构造函数，直接调用的就是普通函数。
   - `Symbol`是构造函数吗
     1. `Symbol`作为构造函数来说并不完整，因为其不能实现`new Symbol()`,但其原型上拥有`constructor`属性，即`Symbol.prototype.constructor`
   - `constructor`值只读吗
     1. **引用类型**constructor属性值**可以修改**，但是对于**基本类型**来说是**只读**的，当然**null和undefined没有constructor属性**。
   - 模拟实现new

   
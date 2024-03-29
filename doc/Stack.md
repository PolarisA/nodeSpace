### JavaScript Code Line

1. ##### 垃圾回收算法 （通常也被叫做「标记清除」）

   - 垃圾回收器创建一个‘roots’列表。roots通常是代码中全局变量的引用。JavaScript中，‘window’对象是一个全局变量，被当做root。window对象总是存在，因此垃圾回收器可以检查它和它的所有子对象是否存在（即不是垃圾）。
   - 所有的‘roots’被检查和标记为激活（即不是垃圾）。所有的子对象也被递归的检查。从roots开始的所有对象如果是可达的，它就不是垃圾。
   - 所有的未被标记的内存会被当做垃圾，收集器现在可以释放内存，归还给操作系统了。

2. #####JavaScript常见的内存泄露

   - 意外的全局变量
     1. 函数内部的没有使用定义变量的关键字 ，会挂接到全局对象上
     2. 函数内部直接定义全局变量 window.xxx
     3. 函数内部使用 this.xxx 指定的变量，this将指向全局变量window

   > 解决方法：
   >
   > 1. 在JavaScript文件头部加上 **‘use strict’**,使用严格模式避免意外的全局变量。此刻上列中的this指向undefined。
   > 2. 如果必须使用全局变量存储大量数据时，确保用完以后把它设置为null或者重新定义。

   - 被遗忘的计时器或者回调函数
   - 脱离的DOM引用
   - 闭包

3. #####从内存来看null和undefined本质的区别

   - 给一个全局变量赋值为null，相当于将这个变量的指针对象以及值清空
   - 给对象的属性赋值为null，或者局部变量赋值为null，相当于给这个属性分配了一个空的内存，然后值为null，js会回收全局对象为null的对象。
   - null 是特指对象的值未设置，他是JavaScript基本类型之一。
   - null 是一个字面量，不像undefined是全局对象的一个属性，表示缺少标识，指示变量未指向任何对象。
   - 给一个全局变量赋值为undefined，相当于将这个对象的值清空，但是这个对象依旧存在。
   - 给一个对象的属性赋值为undefined，说明这个值为空值


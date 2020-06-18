### Code review

> 异步系列

1. setTimeout、 Promise、 async/await的区别

   - JS上下文执行栈 —— Event Loop（事件循环），Task Queue（任务队列），Microtask（微任务），Macrotask/Task（宏任务）知识体系

   ![](https://user-gold-cdn.xitu.io/2019/7/2/16bb15648a210761?imageslim)

   

   ![](https://user-gold-cdn.xitu.io/2020/2/27/170847d202084604?imageslim)

   > 栈：先进后出
   >
   > 队列：先进先出

   

   - **MicroTask（微任务）优先于Macrotask/Task（宏任务）执行**：

     1. 宏任务：script（全局任务），setTimeout，setInterval，setImmediate，I/O（包括鼠标事件），UI rendering（UI渲染）
     2. 微任务：process.nextTick，Promise，Object.observer（已废弃）,callBack

   - 同时，如果JavaScript引擎在执行MicroTask（微任务）队列的时候，如果期间又加入了新的MicroTask，则该MicroTask会加入到之前MicroTask队列的尾部，保证MicroTask优先于Task队列执行

     1. 先执行栈中的整个script（宏任务）
     2. 遇到微任务和宏任务，分别添加到微任务和宏任务队列中去
     3. 当前宏任务执行完毕，立即执行微任务队列中的任务
     4. 当前微任务队列中的任务执行完毕，检查渲染，GUI线程接管渲染
     5. 继续执行下一个宏任务从事件队列中取

   - setTimeout 是Task Queue（任务队列）的任务，执行完MicroTask（微任务）队列的时候的时候，检查Task Queue（任务队列）中是否还有setTimeout，然后安装延迟时间依次执行。如果延迟时间相同，那么按照进入队列的顺序依次执行，setTimeout总是不是严格按照延迟的时间去执行任务，而是通常大于设定的延迟时间执行内部的回调函数。

   - Promise 是目前比较流行的异步解决方案之一。

   - async/await 是Promise + Generator的语法糖。从字面上看await就是等待，等待的是一个表达式，这个表达式的值可以是一个Promise对象也可以是其他值。

     1. 很多人会认为await会一直等待后面的表达式执行完成后才会继续执行后面的代码，实际上await是一个让出线程的标志。await后面的表达式会先执行一遍，将await后面的代码加入的MicroTask中，然后就会跳出整个async 函数执行后面的代码。

     

     



2. JS异步解决方案的优缺点
   1. 回调函数（callBack）
      - 回调地狱
      - 不能用try/catch捕获错误
      - 不能return
   2. Promise 实现了链式调用，解决了callback产生的问题
      - 每次then后返回的都是一个新的Promise
      - 如果在then中return，return的结果会被Promise.resolve()包装
      - promise构造函数是同步执行的，then方法是异步执行的
   3. Generator 可以控制函数的执行
      - yield 控制暂停函数的执行
   4. async/await 异步的终极解决方案
      - 解除了Promise的链式then，处理了callback回调地狱的问题



> JavaScript 专题系列

1. 防抖 「debounce」

   - 当触发一个事件时，响应总是在n秒之后才执行，如果在等待n秒过程中再次触发了这个事件，就重新等待n秒，直到在等待的过程中不再重新触发，事件才执行。

2. 节流 「throttle」

   - 当持续触发一个事件时，每隔一段儿时间，只执行一次事件。
   - 根据首次是否执行和结束后是否执行，效果有所不同，实现的方式也有所不同。
     1. 使用时间戳
        - 当触发事件的时候，取当前的时间戳。用当前的时间戳减去之前的时间戳（初始化的时间戳为0），如果大于设定的时间周期，则立即执行响应的函数，并且更新时间戳为当前的时间戳。如果小于设定的时间周期，则不响应执行函数。
     2. 设置定时器
        - 当触发事件的时候，设定一个定时器。如果再次触发这个事件的时候，先判断这个定时器是否存在，如果存在，则不执行响应函数。直到定时器内的函数执行完毕，并且清除了这个定时器，再次触发的事件重新设定这个定时器，开始下一轮的定时响应。

3. Set，Map，WeakSet，WeakMap

   - Set ES6新增属性 (类似数组，只有键值没有键名，成员不可以重复)
     1. 主要应用场景 数据重组
     2. size属性（注意不是length属性）
     3. add(value)，delete(value)，has(value)，clear()实例方法
     4. Array.from 可以将Set的构造实例转为数组
     5. keys()，values()，enties()，forEach() 等遍历方法
   - Map (类似集合，键值对集合，可以根据需求转化为其他数据格式)
     1. 主要应用场景 数据存储
     2. 以[key,value]的形式存储数据
   - WeakSet
     1. 成员都是对象
     2. 成员都是弱引用，可以被垃圾机制回收，可以用来保存DOM节点，不容易造成内存泄露
     3. 不能遍历，方法有add()，delete()，has()
   - WeakMap
     1. 只接受对象作为键名（不包含null）,不接受其他类型的值作为键名
     2. 键名是弱引用，键值可以是任意的，键名所指的对象可以的被垃圾回收，此时键名是无效的
     3. 不能遍历，但是方法有 set()，get()，has()，delete()

4. 判断数组的几个方法

   > 内置类型：7种 string， number，boolean，object，null，undefined，symbol
   >
   > 基本类型：除了「对象」之外的其他类型

   - Object.prototype.toString.call() 
     1. 返回 [Object type]，其中type为对象的类型。
     2. 对于所有的基本数据类型都能进行判断，即便null 和 undefined
   - instanceOf
     1. 内部机制是通过判断对象的原型链中是不是能找到类型的prototype
     2. 当对象的原型修改之后，链也随之改变（这种判断并不准确）
     3. 判断数组时同时符合 Array和Object
   - Array.isArray()
     1. 用来判断对象是否为数组
     2. ES5新增的方法

5. 箭头函数「()=>{}」与普通函数「function」的区别

   - 箭头函数 主要的设计目的就是就是以一种特定的方式来改变this的行为
     1. 匿名函数表达式
     2. 在箭头函数内部，this绑定不是动态的，而是词法的
     3. 不可以使用arguments对象，该对象在函数体内不存在
     4. 不可以使用yield命令，箭头函数不能用作generator函数
     5. 不可以使用 new命令，没有自己的this，无法调用call，apply。没有prototype属性



> JavaScript 基础概念相关

1. 执行上下文栈和变量对象

   - 变量提升
   - 函数提示
   - **函数声明 优先级 高于 变量声明** （函数是第一公民）
   - 函数上下文
     1. 在函数上下文中，用活动对象来表示变量对象
     2. 调用函数时，会为其创建一个arguments对象，并自动初始化局部arguments，指代该Arguments。所有作为参数传入的值都会成为Arguments对象的数组元素。
   - 上下文栈总结：
     1. 全局上下文的变量对象初始化是全局对象
     2. 函数上下文对象初始化只包含Arguments对象
     3. 在进入执行上下文时会给变量对象添加形参、函数声明、变量声明等初始的属性
     4. 在代码执行阶段，会再次修改变量对象的属性值

   

   2. 内存空间

      - 变量的存放

        1. 基本类型：保存在**栈内存**中，因为这些类型在内存中分别占有固定大小的空间，通过按照值来访问。基本类型一共分为6种：Undefined，Null，Boolean，Number，String，Symbol
        2. 引用类型：保存在**堆内存**中，因为这种值的大小不固定，因此不能保存到**栈内存**中，但因为内存地址是固定的，因此保存在堆内存中，在栈内存中存放的只是该对象的访问地址。当查询引用类型的变量时，**先从栈中读取内存地址，然后再通过地址找到堆中的值**。对于这种，可以叫做按引用访问。

        ![](http://resource.muyiy.cn/image/2019-07-24-060214.png)

      - 内存空间的管理

        1. 生命周期：
           - 分配你所需的内存
           - 使用分配到的内存（读、写）
           - 不需要时将其释放、归还

      - 内存机制

        > JavaScript中内存空间可以分为**栈（Stack）**、**堆（heap）**、**池（一般池也会归类到栈中）**。其中，**栈**存放的是**变量**，**堆**存放的是**复杂对象**，**池**存放的是**常量**，所以也叫常量池。
        >
        > 基本类型：栈内存（不包含闭包中的变量）
        >
        > 引用类型：堆内存

        1. 闭包

        ```javascript
        function A(){
          let a = 1
          function B(){
            console.log(a)
          }
          return B
        }
        ```

        简单定义：函数A返回了一个函数B，并且函数B中使用了函数A的变量，函数B就被称为闭包。
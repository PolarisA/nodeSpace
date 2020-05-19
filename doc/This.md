#### JavaScript Code Line

##### `this`

> `this`的5中绑定规则
>
> 1. 默认绑定（严格/非严格模式）
> 2. 隐式绑定
> 3. 显式绑定
> 4. new绑定
> 5. 箭头函数绑定

1. 默认绑定

   - **独立函数调用**，可以把默认绑定看作是无法应用其他规则时的默认规则，**`this`指向全局对象**
   - **严格模式**下，不能将全局对象用于默认绑定，**`this`会绑定到`undefined`**。只有函数运行在非严格模式下，默认绑定才能绑定到全局对象。在**严格模式下调用函数则不影响默认绑定**。

2. 隐式绑定

   - 当函数引用有**上下文对象**时，隐式绑定规则会把函数中的this绑定到这个上下文对象。对象属性引用链中只有上一层或者说最后一层在调用中起作用。

3. 显式绑定

   - 通过`call(...)`或者`apply(...)`方法。第一个参数是一个对象，在调用函数时将这个对象绑定到`this`。因为直接指定`this`的绑定对象，称之为“显示绑定”。
   - `bind`（硬绑定）
   - Api调用的“上下文”

4. new绑定

   - 在JavaScript中，**构造函数**只是通过**`new`操作符**时被调用的**普通函数**，他们不属于某个类，也不会实例化一个类。
   - 包括**内置对象函数**（比如**`Number(...)`**）在内的所有函数都可以用**`new`**来调用，这种函数调用被称之为**构造函数调用**。
   - 实际上并**不存在所谓的“构造函数”**,只有对于函数的“**构造调用**”
   - 使用new来调用一个函数的时候，或者说发生构造的时候，会自动执行下面的操作
     1. 创建（或者说构造）一个新对象
     2. 这个新对象会执行`[[prototype]]`连接
     3. 这个新对象会绑定到函数调用的`this`
     4. 如果函数没有返回其他对象，那么`new`表达式中的函数调用会自动返回这个新对象。

   

   - 手写实现一个`new`

   ```javascript
   function create(){
     var obj = new Object()
     var Con = [].shift.call(arguments)
     obj.__proto__ = Con.prototype
     
     var ret = Con.apply(obj,arguments)
     return ret instanceof Object ? ret : obj
   }
   ```

   - 代码原理解析
     1. 用`new Object()` 的方式新建了一个对象`obj`
     2. 取出第一个参数，就是我们要传入的构造函数。此外因为`shift`会修改原数组，所以`arguments`会被去除第一个参数
     3. 将`obj`原型执行构造函数，这样`obj`就可以访问到构造函数原型中的属性
     4. 使用`apply`，改变构造函数`this`的指向到新建的对象，这样`obj`就可以访问到构造函数中的属性
     5. 返回`obj`

5. 绑定的列外

   - 被忽略的this
     - 把`undefined`或者`null`作为`this`的绑定对象传入**`call`**，**apply**或者**`bind`**，这些值在调用时会被忽略，实际应用的是默认规则。
     - 使用`apply(...)`来“展开”一个数组，并当作参数传入一个函数
     - `bind(...)`可以对参数进行柯里化（预先设置一些参数）
   - 间接引用
   - 软绑定
     - 硬绑定会把this强制绑定到指定的对象（`new` 除外），防止函数调用默认绑定规则。但是会降低函数的灵活性，**使用硬绑定之后就无法使用显式绑定或者隐式绑定改变this指向**。
     - **如果给默认绑定指定一个全局对象和`undefined`以外的值**，那就可以实现和硬绑定相同的效果，同时保留隐式绑定或者显式绑定修改this的能力

6. this词法

   - 箭头函数无法使用上述4条规则，**而是根据外层（函数或者全局）作用域（词法作用域）来决定this**
   - **箭头函数的绑定无法被修改（`new`也不行）**
   - **箭头函数绑定**中，**this指向的外层作用域**，并不一定是第一层，也不一定是第二层。因为**没有自身的`this`**，所以**只能根据作用域链往上层找**，**直到找到一个绑定了`this`的函数作用域**，**并指向调用该普通函数的对象**。



##### `call()`和`apply()`原理、使用场景以及实现

> `call()`方法调用一个函数，其具有一个指定的this值和分别地提供的参数（参数列表）

- `call()`和`apply()`的区别在于,`call()`接受的是若干个参数的列表，而`apply()`方法接受的是一个包含多个参数的数组

1. 使用场景

   - 合并两个数组  

     ```javascript
     Array.prototype.push.call(arr1,arr2)
     /**
     * 限制：此方法不适用于arr2太大的情况 
     * 解决：可以采用将参数数组切块后循环传入目标的方法
     **/
     ```

   - 获取数组中的最大值和最小值

     ```javascript
     let number = [xx,xxx,xxxx,xx,x] // 数组
     Math.max.call(Math,...number)
     ```

   - 验证是否是数组

     ```javascript
     function isArray(obj){
       return Object.prototype.toString.call(obj) === '[object Array]'
     }
     ```

     ```javascript
     var toStr = Function.prototype.call.bind(Object.prototype.toString)
     function isArray(obj){
       return toStr(obj) === '[object Array]'
     }
     // 等价于 以上的 Object.prototype.toString.call()
     ```

   - 类数组对象（Array-like-Object）使用数组方法

     - 类数组对象有以下两个特性

       1. 具有：指向对象元素的数字索引下标和`length`属性
       2. 不具有：比如`push`、`pop`、`shift`、`unshift`，`forEach`以及`indexOf`等数组对象具有的方法

     - 类数组对象是一个对象，比如`arguments`对象，不能使用数组的方法。但是可以通过`Array.prototype.slice.cal`l转成真正的数组，就可以使用`Array`下所有的数组方法了。

     - 类数组转数组的常用方法

       ```javascript
       var arr = [].slice.call(arguments)
       
       ES6:
       let arr = Array.from(arguments)
       let arr = [...arguments]
       ```

   - PS-A 为什么通过`Array.prototype.slice.call()`就可以把类数组转换成数组？

     1. `slice`将`Array-like对象`通过`下标操作`放进了`新的Array`里面

   - 调用父构造函数实现继承


### JavaScript Code Line

##### 作用域与闭包

> 闭包是指**有权访问另一个函数作用域中的变量**的**函数**

- 闭包
  1. 闭包可以访问当前函数作用域之外的变量
  2. 即便是外部函数已经返回，闭包仍可以访问外部函数定义的变量
  3. 闭包可以更新外边变量的值
- 作用域链
  1. 当访问一个变量时，解释器会首先在当前作用域查找标识符，如果没有找到，就去父作用域找，直到找到该变量的标识符或者不在父作用域中，这就是作用域链。
- 作用域链的开始是当前代码执行环境的变量对象，常被称之为“活跃对象”（AO），变量的查找会从第一个链的对象开始，如果对象中包含变量属性，那么就停止查找，如果没有就会继续向上级作用域链查找，直到找到全局对象中。

​	

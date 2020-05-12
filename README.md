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


/**
 * @Author : HuiWen
 * @Date : 2019-11-18
 * @Description :
 **/

const obj = {
  count: 0,
  cool: function coolFn() {
    if (this.count < 1) {
      setTimeout(function timer() {
        this.count++; // this 是安全的 // 因为 bind(..)
        console.log("more awesome");
      }.bind(this), 100); // look, bind()!
    }
  }
};


let id = 'not awesome'

// obj.cool()

function identify() {
  return this.name.toUpperCase()
}

function speak() {
  // return console.log('HELLO ', identify.call(this.name))
  let greeting = "Hello, I'm " + identify.call(this);
  console.log(greeting);
}

const me = {
  name: 'Kely'
}

const you = {
  name: 'Pan'
}

// identify.call(me)
// speak.call(me)


function foo(num) {
  console.log("foo  >>> ", num)
  this.count++
}

foo.count = 0

for (let i = 0; i < 10; i++) {
  if (i > 5) {
    foo.call(foo, i)
  }
}

console.log("count >>> ", foo.count)

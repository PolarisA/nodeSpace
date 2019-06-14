function Parent(name) {
    this.name = name;
    this.colors = ['red', 'green', 'blue']
}

Parent.prototype.getName = function() {
    console.log(this.name)
}

function Child(name, age) {
    Parent.call(this, name)
    this.age = age
}

// Child.prototype = new Parent();

// let child1 = new Child('Kevin', 16);
// child1.colors.push('black')


// console.log("== child1 >>", child1.name)
// console.log("== child1 >>", child1.age)
// console.log("== child1 >>", child1.colors)

// let child2 = new Child('Alice',24)

// console.log("== child2 >>", child2)

let F = function(){}

F.prototype = Parent.prototype

Child.prototype = new F()

let child1 = new Child('Kevin',23)

console.log('child1 >>>',child1)



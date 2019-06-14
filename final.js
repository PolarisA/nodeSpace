function object(o) {
    function F() {}
    F.prototype = o;
    return new F()
}

function prototpye(child, parent) {
    let prototype = object(parent.prototpye)
    prototype.constructor = child;
    child.prototype = prototype;
}


function Parent(name) {
    this.name = name;
    this.colors = ['red', 'green', 'blue']
}

function Child(name, age) {
    Parent.call(this, name)
    this.age = age
}


prototpye(Child, Parent)
let child1 = new Child('Kevin', 25)

console.log(child1)
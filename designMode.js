/**
 * @Author : HuiWen
 * @Date : 2019-11-14
 * @Description :
 **/

const UserFactory = function (role) {
  function User(opt) {
    this.name = opt.name
    this.viewPage = opt.viewPage
  }

  switch (role) {
    case 'SuperAdmin': {
      return new User(superAdmin);
    }
    case 'admin': {
      return new User(admin);
    }
    case 'user': {
      return new User(user);
    }
    case 'visitor': {
      return new User(visitor);
    }
    default:
      throw new Error('参数错')
  }
}

const Factory = function (type, content) {
  if (this instanceof Factory) {
    const s = new this[type](content)
    return s
  } else {
    return new Factory(type, content)
  }
}

//工厂原型中设置创建类型数据对象的属性
Factory.prototype = {
  Java: function (content) {
    console.log('Java值为', content);
  },
  PHP: function (content) {
    console.log('PHP值为', content);
  },
  Python: function (content) {
    console.log('Python值为', content);
  },
}

// Factory('Python', 'I am Python')


function Animal(name) {
  this.name = name || 'Animal'
  this.sleep = function () {
    console.log(this.name + ' sleeping')
  }
}

Animal.prototype.eat = function (food) {
  console.log(this.name + ' eating ' + food)
}

function Cat() {

}

Cat.prototype = new Animal()
Cat.prototype.name = 'kitty'


let cat = new Cat()
console.log("=== Cat.name >>>>", cat.name)
cat.eat('fish')
cat.sleep()


class LinkNode {
  constructor (element, next) {
    this.element = element
    this.next = next
  }
}

class LinkedList {
  constructor () {
    this._head = null
    this._size = 0
    this._errorBoundary = this._errorBoundary.bind(this)
    this._getNodeByIndex = this._getNodeByIndex.bind(this)
    this._append = this._append.bind(this)
    this._insert = this._insert.bind(this)
    this._remove = this._remove.bind(this)
    this._removeAt = this._remove.bind(this)
    this._removeAll = this._removeAll.bind(this)
    this._getElement = this._getElement.bind(this)
    this._setIndex = this._setIndex.bind(this)
    this._indexOf = this._indexOf.bind(this)
    this._clear = this._clear.bind(this)
    this._length = this._length.bind(this)
    this._printf = this._printf.bind(this)
  }

  _errorBoundary (index) {
    if (index < 0 || index >= this._size) {
      throw `超出边界(${0}~${this._size})，目标位置${index}不存在！`
    }
  }

  _getNodeByIndex (index) {
    this._errorBoundary(index)
    let obj = this._head
    for (let i = 0; i < index; i++) {
      obj = obj.next
    }
    return obj
  }

  _append (element) {
    if (this._size === 0) {
      this._head = new LinkNode(element, null)
    } else {
      let obj = this._getNodeByIndex(this._size, -1)
      obj.next = new LinkNode(element, null)
    }
    this._size++
  }

  _insert (element, index) {
    if (this._size === 0) {
      this._head = new LinkNode(element, this._head)
    } else {
      let obj = this._getNodeByIndex(index - 1)
      obj.next = new LinkNode(element, obj.next)
    }
    this._size++
  }

  _remove (element) {
    if (this._size < 1) return null

    if (this._head.element == element) {
      this._head.element = this._head.next
      this._size--
      return element
    } else {
      let temp = this._head

      while (temp.next) {
        if (temp.next.element == element) {
          temp.next = temp.next.next
          this._size--
          return element
        } else {
          temp = temp.next
        }
      }
    }

    return null
  }

  _removeAt (index) {
    this._errorBoundary(index)

    let element = null
    if (index === 0) {
      element = this._head.element
      this._head = this._head.next
    } else {
      let prev = this._getNodeByIndex(index - 1)
      element = prev.next.element
      prev.next = prev.next.next
    }
    this._size--
    return element
  }

  _removeAll (element) {
    let v_head = new LinkNode(null, this._head)
    let tempNode = v_head

    while (tempNode.next) {
      if (tempNode.next.element == element) {
        tempNode.next = tempNode.next.next
        this._size--
      } else {
        tempNode = tempNode.next
      }
    }
    this._head = v_head.next
  }

  _getElement (index) {
    return this._getNodeByIndex(index).element
  }

  _setIndex (element, index) {
    this._errorBoundary(index)
    let obj = this._getNodeByIndex(index)
    obj.element = element
  }

  _indexOf (element) {
    let obj = this._head
    let index = -1

    for (let i = 0; i < this._size; i++) {
      if (obj.element == element) {
        index = i
        break
      }
      obj = obj.next
    }

    return index
  }

  _clear () {
    this._head = null
    this._size = 0
  }

  _length () {
    return this._size
  }

  _printf () {
    let obj = this._head
    const arr = []

    while (obj !== null) {
      arr.push(obj.element)
      obj = obj.next
    }

    const str = arr.join(' -> ')
    return str || null
  }
}

const obj = new LinkedList()

obj._append(0)
obj._append(2)
obj._append(1)

obj._printf()

class MyArray {
  constructor() {
    this.length = 0
    this.data = {}
  }

  get(index) {
    return this.data[index]
  }

  push(item) {
    this.data[this.length] = item
    this.length++
    return this.length
  }

  pop() {
    delete this.data[this.length - 1]
    this.length--
    return this.length
  }

  delete(index) {
    const lastItem = this.data[index]
    this.shiftItems(index)
    return lastItem
  }

  shiftItems(index) {
    for (let i = 0; i < this.length; i++) {
      this.data[i] = this.data[i + 1]
    }
    delete this.data[this.length - 1]
    this.length--
  }

  replace(item, newItem) {
    for (let i = 0; i < this.length; i++) {
      if (this.data[i] === item) {
        this.data[i] = newItem
        break
      }
    }
    return this.data
  }

  replaceAll(item, newItem) {
    for (let i = 0; i < this.length; i++) {
      if (this.data[i] === item) {
        this.data[i] = newItem
      }
    }
    return this.data
  }

  join(item='') {
    let str = this.data[0]
    for (let i = 1; i < this.length; i++) {
      if (this.data[i] !== "") {
        str = str + item + this.data[i]
      }
    }
    return str
  }
  
}

const newArr = new MyArray()
/* newArr.push("hello")
newArr.push("world")
newArr.pop()
newArr.push("hi")
newArr.push("you")
newArr.push("are")
newArr.push("nice")

newArr.delete(1)
newArr.delete(0) */

/* newArr.replace("are", "was") */

newArr.push("this")
newArr.push(" ")
newArr.push(" ")
newArr.push("is")
newArr.push(" ")
newArr.push(" ")
newArr.push(" ")
newArr.push("a")
newArr.push("great")
newArr.push("weather")

newArr.replaceAll(" ", "*")
const joinedStr = newArr.join(" ")
console.log(newArr)
console.log(joinedStr)

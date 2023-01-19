import * as React from "react"

const data = [
  { name: "Jack", salary: 10000 },
  { name: "Jane", salary: 16000 },
  { name: "John", salary: 20000 },
]
const colours = ["White", "Black", "Red", "Green", "Blue"]
const nums = [3, 5, 4, 3, 7, 8, 4, 2, 7, 9, 4, 32, 8, 0, 5, 3, 6, 9, 5]

function mapFunc(value, index) {
  return <li>{value}</li>
}

function myReduceFunc(previous, current, index) {
  return previous + current
}
export default function Page1() {
  // let items = []
  // for (let i = 0; i < colours.length; i++) {
  //     items.push( <li>{colours[i]}</li> )
  // }

  // let items = colours.map(mapFunc)
  // let items = colours.map(function(value,index) { return <li>{value}</li> })
  let items = colours.map((value, index) => <li>{value}</li>)

  // let sum = 0
  // for(let i = 0; i<nums.length; i++) {
  //     sum += nums[i]
  // }

  // let sum = nums.reduce(myReduceFunc)
  let sum = nums.reduce((p, c) => p + c)

  let datas = []
  let total = 0
  for (let i = 0; i < data.length; i++) {
    datas.push(
      <li>
        {data[i].name} {data[i].salary}
      </li>
    )
    total += data[i].salary
  }

  return (
    <>
      <h1>Hello</h1>
      <p>Sum = {sum}</p>
      <ul>{items}</ul>
      <ul>{datas}</ul>
      <p>Total = {total}</p>
    </>
  )
}

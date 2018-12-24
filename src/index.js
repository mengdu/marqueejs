import demo from './demo'

console.log(demo)
const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Hello !')
    }, time)
  })
}

const page = async name => {
  const res = await sleep()
  return res
}

export default page

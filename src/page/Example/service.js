
export const getUserList = (name) => {
  return new Promise((resolve, reject) => {
    const a = {
      code: 0,
      result: [
        { id: 1, name: '刘一', JobNo: '9521' },
        { id: 2, name: '陈二', JobNo: '9522' },
        { id: 3, name: '张三', JobNo: '9523' },
        { id: 4, name: '李四', JobNo: '9524' },
        { id: 5, name: '王五', JobNo: '9525' },
        { id: 6, name: '赵六', JobNo: '9526' },
        { id: 7, name: '孙七', JobNo: '9527' },
        { id: 8, name: '周八', JobNo: '9528' },
        { id: 9, name: '吴九', JobNo: '9529' },
        { id: 10, name: '郑十', JobNo: '9530' },
      ]
    }
    resolve(a)
  })
}

export const addProject = (data) => {
  console.log("添加项目： ", data)
  setTimeout(() => {
    return new Promise((resolve, reject) => {
      resolve({
        code: 0,
        result: 'ok'
      })
    })
  }, Math.random()*5000 + 1000)
}
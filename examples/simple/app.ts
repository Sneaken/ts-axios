import axios from '../../src'

axios({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  }
})
axios({
  method: 'post',
  url: '/simple/post',
  params: {
    a: 1,
    b: 2
  }
})

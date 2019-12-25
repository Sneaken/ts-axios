import axios from '../../src'

// axios({
//   method: 'get',
//   url: '/error/get1'
// })
//   .then((res: any) => {
//     console.log(res)
//   })
//   .catch((e: any) => {
//     console.log(e)
//   })

// axios({
//   method: 'get',
//   url: '/error/get'
// })
//   .then((res: any) => {
//     console.log(res)
//   })
//   .catch((e: any) => {
//     console.log(e)
//   })
//
// setTimeout(() => {
//   axios({
//     method: 'get',
//     url: '/error/get'
//   })
//     .then((res: any) => {
//       console.log(res)
//     })
//     .catch((e: any) => {
//       console.log(e)
//     })
// }, 5000)

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
})
  .then((res: any) => {
    console.log(res)
  })
  .catch((e: AxiosError) => {
    console.log(e.message)
    console.log(e.config)
    console.log(e.code)
    console.log(e.request)
    console.log(e.isAxiosError)
  })

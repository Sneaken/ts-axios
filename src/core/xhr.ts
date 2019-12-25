// export default function xhr(config: AxiosRequestConfig) {
//   const { method = 'get', url, headers, data = null } = config
//   const request = new XMLHttpRequest()
//   request.open(method, url, true)
//   Object.keys(headers).forEach(name => {
//     if (data === null && name.toLowerCase() === 'content-type') {
//       delete headers[name]
//     } else {
//       request.setRequestHeader(name, headers[name])
//     }
//   })
//   request.send(data)
// }

import { parseHeaders } from '../helpers/helper'
import { createError } from '../helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config
    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }
    if (timeout) {
      request.timeout = timeout
    }

    request.open(method.toUpperCase(), url, true)
    request.onreadystatechange = function handleLoad() {
      if (this.readyState !== 4) {
        return
      }
      // 当出现网络错误或者超时错误的时候，该值都为 0。
      if (this.status === 0) {
        return
      }

      const responseHeaders = parseHeaders(this.getAllResponseHeaders())
      const responseData =
        responseType && responseType !== 'text' ? this.response : this.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: this.status,
        statusText: this.statusText,
        headers: responseHeaders,
        config,
        request: this
      }
      handleResponse(response)
    }

    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }
    request.ontimeout = function handleTimeout() {
      reject(
        createError(`Timeout of ${config.timeout} ms exceeded`, config, 'ECONNABORTED', request)
      )
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)

    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}

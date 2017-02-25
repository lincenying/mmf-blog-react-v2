import axios from 'axios'
import qs from 'qs'
import NProgress from 'nprogress'
import config from './config'
import { setMessage } from '~utils'

axios.interceptors.request.use(config => {
    NProgress.start()
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    NProgress.done()
    return response
}, error => {
    NProgress.done()
    setMessage(error.toString())
    return Promise.reject(error)
})

function checkStatus(response) {
    if (response.status === 200 || response.status === 304) {
        return response
    }
    return {
        data: {
            code: -400,
            message: response.statusText
        }
    }
}

function checkCode(res) {
    if (res.data.code === -500) {
        window.location.href = '/backend'
        return
    } else if (res.data.code === -400) {
        window.location.href = '/'
        return
    } else if (res.data.code !== 200) {
        setMessage(res.data.message)
    }
    return res
}

export default {
    post(url, data) {
        return axios({
            method: 'post',
            url: config.api + url,
            data: qs.stringify(data),
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(checkStatus).then(checkCode)
    },
    get(url, params) {
        return axios({
            method: 'get',
            url: config.api + url,
            params,
            timeout: config.timeout,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(checkStatus).then(checkCode)
    }
}

import Cookies from 'js-cookie'
import isEmpty from 'lodash/isEmpty'
import { deleteCookie } from './cookies'

/**
 * 
 * @param {String} path URL path
 * @param {Object} opts Request payload
 * @returns 
 */
const fetcher = async (path, opts = {}) => {
    try {
        const token = Cookies.get('token')
        const response = await fetch(path, {
            method: 'GET',
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
                'Content-Type': 'application/json'
            },
            ...opts
        })

        if (!response.ok) {
            const body = await response.json()

            if (response.status === 401) {
                deleteCookie('token')
                window?.location.replace('/app/login')
            }

            throw new Error(body.message)
        }

        return response.json()
    } catch (error) {
        console.error(error)
    }
}

const api = {
    get: async (path, params) => {
        try {
            const cleanedParams = cleanParams(params)
            return await fetcher(`${path}${buildQueryString(cleanedParams)}`)
        } catch (error) {
            console.error(error)
            return null
        }
    },
    post: async (path, body) => {
        return fetcher(path, { method: 'POST', body: JSON.stringify(body) })
    },
    patch: async (path, body) => {
        return await fetcher(path, { method: 'PATCH', body })
    },
    delete: async (path) => {
        try {
            return await fetcher(path)
        } catch (error) {
            console.error(error)
            return null
        }
    }
}

const buildQueryString = (params) => {
    if (!isEmpty(params)) {
        const query = Object.keys(params)
            .map((key) => key + '=' + params[key])
            .join('&')

        return `?${query}`
    }

    return ''
}

const cleanParams = (params = {}) => {
    const result = {}
    Object.keys(params).forEach((key) => {
        if (!!params[key]) {
            result[key] = params[key]
        }
    })
    return result
}

export default api

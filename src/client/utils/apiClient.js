import Cookies from 'js-cookie'
import isEmpty from 'lodash/isEmpty'

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
            return await fetcher(`${path}${buildQueryString(params)}`)
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

export default api

export const getCookie = (name) => {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
    if (match) return match[2]
}

export const deleteCookie = (name = '') => {
    document.cookie = name + '="";-1; path=/'
}

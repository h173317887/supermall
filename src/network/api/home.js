import request from '../request.js';

function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    }) 
}

function getHomeGoods(type, page) {
    return request({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}
export {
    getHomeMultidata,
    getHomeGoods
}
// 引入模块
import axios from 'axios';
import qs from 'qs';
import store from '../../store';
import { Toast } from 'vant';

// 设置全局axios默认值
// axios.defaults.timeout = 30000;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = 'smartfood.virchow.com';

// 定义响应码及映射关系
axios.RESPONSE_SUCCESS = 1000;
axios.RESPONSE_ERROR = 1100;
axios.RESPONSE_LOGIN = 1110;
const resCodeMap = {
    [axios.RESPONSE_SUCCESS]: 'resSuccess',
    [axios.RESPONSE_ERROR]: 'resError',
    [axios.RESPONSE_LOGIN]: 'resLogin'
};

/*
 * 根据环境变量区分接口的默认地址 
 */
process.env.VUE_APP_API_BASE_URL && (axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL);

// switch (process.env.NODE_ENV) {
// 	case "production":
// 		axios.defaults.baseURL = "";
// 		break;
// 	case "test":
// 		axios.defaults.baseURL = "";
// 		break;
// 	default:
// 		axios.defaults.baseURL = "http://192.168.3.3";
// }

/**
 * 设置超时时间和跨域，是否允许携带凭证
 */
axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true;

/*
 * 设置请求传递数据的格式（看服务器要求什么格式）
 * x-www-form-urlencoded
 */
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.transformRequest = data => qs.stringify(data);

/**
 * 设置请求拦截器
 * 客户端发送请求 - > [请求拦截器] - > 服务器
 * TOKEN校验（JWT）：接收服务器返回的token，存储到vuex/本地存储中，每一次向服务器发请求，我们应该把token带上
 */
axios.interceptors.request.use(config => {
    handlerAxiosLoading(config, true);
    // 添加 auth请求头
    const userSessionInfo = store.getters['userSession/info'];
    config.headers.token = userSessionInfo.token;
    // config.headers.sid = 286;

    return config
}, error => {
    return Promise.reject(error)
})

/**
 * 响应拦截器
 * 服务器返回信息  -> [拦截的统一处理] -> 客户端JS获取到信息
 */
axios.interceptors.response.use(res => {
    handlerAxiosLoading(res.config, false);
    return {
        res,
        ...handlerAxiosAnticipation(res.data),
        resData: res.data.data,
        resCode: res.data.code,
        resMsg: res.data.msg,
    }
}, err => {
    handlerAxiosLoading(err.config, false);
    // let { response } = err;
    // if(response){
    //     // 服务最起码返回了结果（错误信息）
    //     switch(response.status){
    //         case 401: // 权限
    //             Toast.fail('未登录。。。');
    //             break;
    //         case 403: // 服务器接受请求但是拒绝执行（一般未token过去）
    //             Toast.fail('token过期');
    //             break;
    //         case 404:
    //             Toast.fail('请求接口不存在');
    //             break;
    //     }
    // } else {
    //     // 服务器没有返回结果（服务器崩溃，客户端断网等等）
    //     if(!window.navigator.onLine){
    //         // 断网处理
    //         return;
    //     }
    //     return Promise.reject(err)
    // }
    Toast.fail('内部错误');
    return Promise.reject(err);
})

/**
 * 处理请求中的loading行为
 */
const handlerAxiosLoading = (config, val = true) => {
    if(Boolean(val) === true){
        config.loading && config.loading(true)
    } else {
        if(config && config.loading){
            config.loading(false);
            config.loading = false
        }
    }
}

/**
 * 处理响应内容并预判结果
 */
const handlerAxiosAnticipation = (resData) => {
    const res = {
        $resSuccess: false,
        $resError: false,
        $resLogin: false
    };
    try {
        const resCode = resData.code;
        res['$' + resCodeMap[resCode]] = true
    } catch(err) {
        
    }
    return res
}

export default axios;
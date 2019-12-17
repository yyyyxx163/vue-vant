import axios from '@/common/utils/axios';

// 登录
export const axiosLogin = (param = {}, conf = {}) => axios.post('/api/api/login/login', param, conf)
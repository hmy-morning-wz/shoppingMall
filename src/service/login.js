import API_CONFIG from '../config';
import { postJSON } from '../utils/ajax';

export const serviceLogin = (username, password) => {
    return postJSON(API_CONFIG.LOGIN, {
        username,
        password,
    }).then((res) => {
        if (res.Code === 0) {
            alert('登录成功');
        } else {
            alert('登录失败');
        }
    }, (res) => {
        alert('网络错误');
        return Promise.reject(res);
    });
};

export const serviceLogout = () => {

};

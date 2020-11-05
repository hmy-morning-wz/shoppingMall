import {
    postJSON,
    getJSON
} from '../../utils/ajax';
import {
    apiHost,
    jsHost
} from '../../config/index';

export default {
    //新增地址接口
    addUserAddress(data) {
        const url = `${apiHost}operation-order/mallAddress/addUserAddress`;
        return postJSON(url, data)
            .then((response) => {
                return Promise.resolve(response.data || response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    //地址列表接口
    getUserAddressList(data) {
      const url = `${apiHost}operation-order/mallAddress/getUserAddressList`;
      return postJSON(url, data)
          .then((response) => {
              return Promise.resolve(response.data || response);
          }, (response) => {
              return Promise.reject(response);
          });
    },
    //删除用户地址接口
    deleteUserAddress(data) {
        const url = `${apiHost}operation-order/mallAddress/deleteUserAddress`;
        return postJSON(url, data)
            .then((response) => {
                return Promise.resolve(response.data || response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    //获取编辑详情地址接口
    getUserAddressById(id) {
        const url = `${apiHost}operation-order/mallAddress/getUserAddressById?id=${id}`;
        return getJSON(url)
            .then((response) => {
                return Promise.resolve(response.data || response);
            }, (response) => {
                return Promise.reject(response);
            });
      },
    // 修改用户地址接口
    updateUserAddress(data) {
        const url = `${apiHost}operation-order/mallAddress/updateUserAddress`;
        return postJSON(url,data)
            .then((response) => {
                return Promise.resolve(response.data || response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
     // 支付宝接口
    getCreateOrder(data) {
      const url = `${apiHost}operation-order/mallOrder/createOrder`;
      return postJSON(url,data)
          .then((response) => {
              return Promise.resolve(response.data || response);
          }, (response) => {
              return Promise.reject(response);
          });
    },
    // 判断地区是否支持接送
    getCheckDelivery(data) {
        const url = `${apiHost}operation-order/mallAddress/checkDelivery`;
        return postJSON(url,data)
            .then((response) => {
                return Promise.resolve(response.data || response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
};

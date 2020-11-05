import {
  postJSON,
  getJSON
} from '../../utils/ajax';
import {
  apiHost,
  jsHost
} from '../../config/index';

export default {
  //订单列表接口
  getUserOrderList(data) {
      const url = `${apiHost}operation-order/mallOrder/getUserOrderList`;
      return postJSON(url, data)
          .then((response) => {
              return Promise.resolve(response.data || response);
          }, (response) => {
              return Promise.reject(response);
          });
  },
  //交易成功获取返利信息
  getOrderReturnInfo(data) {
    const url = `${apiHost}voucher/mallVoucherBusiness/orderReturnInfo`;
    return postJSON(url, data)
        .then((response) => {
            return Promise.resolve(response.data || response);
        }, (response) => {
            return Promise.reject(response);
        });
},
  //获取订单详情接口
  getOrderDetail(orderNo) {
      const url = `${apiHost}operation-order/mallOrder/getOrderDetail?orderNo=${orderNo}`;
      return getJSON(url)
          .then((response) => {
              return Promise.resolve(response.data || response);
          }, (response) => {
              return Promise.reject(response);
          });
  },
    //确认收货接口
    confirmReceipt(data) {
      const url = `${apiHost}operation-order/mallOrder/confirmReceipt`;
      return postJSON(url,data)
          .then((response) => {
              return Promise.resolve(response.data || response);
          }, (response) => {
              return Promise.reject(response);
          });
  },
    //取消订单接口
    cancelOrder(data) {
      const url = `${apiHost}operation-order/mallOrder/cancelOrder`;
      return postJSON(url,data)
          .then((response) => {
              return Promise.resolve(response.data || response);
          }, (response) => {
              return Promise.reject(response);
          });
  },
    //退款接口
    getRefund(data) {
      const url = `${apiHost}operation-order/mallOrder/refundOrder`;
      return postJSON(url,data)
          .then((response) => {
              return Promise.resolve(response.data || response);
          }, (response) => {
              return Promise.reject(response);
          });
  },
};

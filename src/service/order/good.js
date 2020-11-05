import {
  postJSON,
  getJSON
} from '../../utils/ajax';
import {
  apiHost,
  jsHost
} from '../../config/index';

export default {
  //商品详情接口
  getGoodsDetail(id) {
      const url = `${apiHost}operation-mall/h5/getGoodsDetail?id=${id}`;
      return postJSON(url)
          .then((response) => {
              return Promise.resolve(response.data || response);
          }, (response) => {
              return Promise.reject(response);
          });
  },
  //获取sku接口
  getGoodsSkuList(data) {
    const url = `${apiHost}operation-mall/h5/getGoodsSkuList`;
    return postJSON(url,data)
        .then((response) => {
            return Promise.resolve(response.data || response);
        }, (response) => {
            return Promise.reject(response);
        });
  },
  //立即购买接口
  getSaleMessage(data) {
      const url = `${apiHost}operation-mall/h5/getSaleMessage`;
      return postJSON(url,data)
          .then((response) => {
              return Promise.resolve(response.data || response);
          }, (response) => {
              return Promise.reject(response);
          });
  },
  //返利接口
  getBuyReturnInfo(data) {
    const url = `${apiHost}operation-activity/activityGoodsInfo/buyReturnInfo`;
    return postJSON(url,data)
        .then((response) => {
            return Promise.resolve(response.data || response);
        }, (response) => {
            return Promise.reject(response);
        });
  },
  //是否满减接口，优惠券列表接口
  getVoucherList(data) {
    const url = `${apiHost}voucher/mallVoucher/goodsVoucherList`;
    return postJSON(url,data)
        .then((response) => {
            return Promise.resolve(response.data || response);
        }, (response) => {
            return Promise.reject(response);
        });
  },
  //领取券接口
  receiveVoucher(data) {
      const url = `${apiHost}voucher/voucherOp/sendVoucher`;
      return postJSON(url,data)
          .then((response) => {
              return Promise.resolve(response.data || response);
          }, (response) => {
              return Promise.reject(response);
          });
  },
   //选择优惠券列表接口
   getSelecVoucher(data) {
    const url = `${apiHost}voucher/mallVoucher/selectUserVoucher`;
    return postJSON(url,data)
        .then((response) => {
            return Promise.resolve(response.data || response);
        }, (response) => {
            return Promise.reject(response);
        });
  },
  //附近门店
  getGoodsShopList(data) {
    const url = `${apiHost}operation-mall/h5/getGoodsShopList`;
    return postJSON(url,data)
          .then((response) => {
              return Promise.resolve(response);
          }, (response) => {
          return Promise.reject(response);
    });
  },
  //获取配送地区接口
  getCnareaByLngLat(data) {
    const url = `${apiHost}operation-order/mallAddress/getCnareaByLngLat`;
    return postJSON(url,data)
          .then((response) => {
              return Promise.resolve(response);
          }, (response) => {
          return Promise.reject(response);
    });
  },
};


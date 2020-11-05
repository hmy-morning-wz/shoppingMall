import {
    postJSON,
    getJSON
  } from '../../utils/ajax';
  import {
    apiHost,
    jsHost
  } from '../../config/index';
  
  export default {
    //券列表接口
    getVpList(data) {
        const url = `${apiHost}voucher/mallVoucherPackage/vpList`;
        // const url = `${apiHost}mallVoucherPackage/vpList`;
        return postJSON(url, data)
            .then((response) => {
                return Promise.resolve( response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
    // 获取券详情
    queryUserVoucherInfo(data) {
        const url = `${apiHost}voucher/mappvoucher/queryUserVoucherInfo`;
        // const url = `${apiHost}mappvoucher/queryUserVoucherInfo`;
        return postJSON(url, data)
            .then((response) => {
                return Promise.resolve(response.data || response);
            }, (response) => {
                return Promise.reject(response);
            });
    },
  };
  
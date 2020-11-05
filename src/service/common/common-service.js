import API_CONFIG from '../../config/apiconfig';
import { getJSON } from '../../utils/ajax';
import { postJSON } from '../../utils/ajax';

export default {
    // 经纪人信息
    getBrokerDetail(uk) {
        const url = API_CONFIG.COMMON.BROKER_DETAIL_API.replace('{uk}', uk);
        return getJSON(url)
                .then((response) => {
                    return Promise.resolve(response.Data);
                }, (response) => {
                    return Promise.reject(response);
                });
    },
};

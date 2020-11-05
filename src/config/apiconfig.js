import {apiHost} from './index';

export default {
    /**
     * 公共api
     */
    COMMON: {
        // 获取经纪人信息
        BROKER_DETAIL_API: `${apiHost}open/broker-center-web/api/v1/broker/getBrokerDetailByUk/{uk}`,
        // 提交微信http://gateway.dev.apitops.com/broker-service-api/v1/
        SUBMIT_CODE_API: `${apiHost}broker-service-api/v1/share/house/updateHouseReadStatus/{code}/{shareUK}`,
        UPDATE_HOUSE_API: `${apiHost}broker-service-api/v1/share/house/updateHouseShareInfo/{shareUK}/{openId}`,
        STAY_TIME_API: `${apiHost}broker-service-api/v1/share/house/updateHouseReadTime/{houseShareVisitId}/{time}`,
    },
    /**
     * 分享楼盘api
     */
    ARTICLE_SHARE_API: {
        ARTICLE_DETAIL: `${apiHost}broker-service-api/v1/article`,
        // 获取楼盘动态信息
        GET_ARTLIC_BUILDING: `${apiHost}broker-service-api/v1/share/articleBuilding`,
    },
};

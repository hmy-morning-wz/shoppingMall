<template>
  <div class="goods" :class="{ clearMove: popupType || couponType || sellPointType || applicableStoreType}">
    <specification :goods='shopDetail' :sku="skuDetail" v-show="popupType" :distributionArea="distributionArea" @value-popup="handlePopData"></specification>
    <receivedCoupon v-show="couponType" @value-coupon="handleCouponData"></receivedCoupon>
    <sellingPoint :goods='shopDetail' v-show="sellPointType" @value-sell-point="handleChildeSell"></sellingPoint>
    <storeList v-show="applicableStoreType" @close-store-popup="handleCloseStore" :storeList="storeList"></storeList>
    <div class="banner">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in shopDetail.smallImages">
            <img :src="item">
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <spike :goods='shopDetail' v-if="shopDetail.activity === 'spike'" @value-spike="handleSpike"></spike>
    <advanceSale :goods='shopDetail' v-if="shopDetail.activity === 'persale'" @value-spike="handleSpike"></advanceSale>
    <div class="goods-detail" v-if="!shopDetail.activity">
      <div class="first">
        <div><span>¥</span>{{shopDetail.sellingPrice}}</div>
        <div
          class="label ml16"
          v-if="hasDiscountVoucher"
        >满减</div>
        <div
          class="label ml8"
          v-if="RebateDetial.hasBuyReturn"
        >返乘车红包</div>
      </div>
      <div class="second">
        原价: ¥ {{shopDetail.marketPrice}}
      </div>
      <div class="third">
        {{shopDetail.name}}
      </div>
    </div>
    <div @click="handleSellPoint" class="selling-point" v-if="sellPointList && sellPointList.length>0">
      <div class="sell-point-content" v-for="(item,index) in sellPointList" :key="index">
        <img
          src="../../assets/images/spike-icon.png"
          alt=""
        >
        <span>{{item.name}}</span>
      </div>
      <div class="yl_color" v-if="shopDetail.sellPointList && shopDetail.sellPointList.length > 3">...</div>
      <div class="arrow"></div>
    </div>
    <div class="line"></div>
    <div class="dis-flex comm-line box-shadow-bottom" @click="handleCoupon" v-if="voucherList.length > 0">
      <div class="comm-title">优惠</div>
      <div class="discount" v-for="(item,index) in voucherList" :key="index">
        <div class="discount-first"></div>
        <div class="discount-second" v-if="item.limitMoney === 0">{{item.amount}}元代金券</div>
        <div class="discount-second" v-else>满{{item.limitMoney}}减{{item.amount}}</div>
        <div class="discount-third"></div>
      </div>
      <div class="comm-end dis-flex">
        <div>领券</div>
        <div class="arrow"></div>
      </div>
    </div>
    <div class="dis-flex comm-line mt1" v-if="RebateDetial.hasBuyReturn">
      <div class="comm-title">返利</div>
      <div class="label">乘车红包</div>
      <div class="comm-content ml8" v-if="RebateDetial.hasBuyReturn">返{{RebateDetial.buyReturnMoney}}元乘车红包</div>
    </div>
    <div class="line" v-if="RebateDetial.hasBuyReturn"></div>
     <div class="dis-flex comm-line">
      <div class="comm-title">发货</div>
      <div class="comm-content">快递：免运费</div>
      <div
        class="comm-end dis-flex"
        v-if="shopDetail.activity === 'persale'"
      >已预订{{shopDetail.perSaleSum}}件</div>
      <div
        class="comm-end dis-flex"
        v-else
      >已售{{shopDetail.saleCount}}件</div>
    </div>
    <div class="line"></div>
    <div class="dis-flex comm-line">
      <div class="comm-title">规格</div>
      <div class="comm-content">
        <span v-if="selected.selectedColor || selected.selectedSize">已选：</span>
        <span v-show="selected.selectedColor">“{{selected.selectedColor}}”</span>
        <span v-show="selected.selectedSize">“{{selected.selectedSize}}”</span>
      </div>
      <div
        class="comm-end dis-flex"
        @click="handleSelect"
        v-if="shopDetail.status === 1 && shopDetail.sumRemainCount > 0"
      >
        <div style="padding-top:1px;min-width:0.64rem; white-space :nowrap;">选择</div>
        <div class="arrow"></div>
      </div>
      <div
        class="comm-end dis-flex"
        v-else
      >
        <div>选择</div>
        <div class="arrow"></div>
      </div>
    </div>
    <applicableStore  :storeList="storeList" @open-store-popup="handleValueStore"></applicableStore>
    <div class="line"></div>
    <div class="commodity-name">
      <div class="left">
        <img
          :src="shopDetail.brandLogo"
          alt=""
        >
      </div>
      <div class="right">
        <div class="first">{{shopDetail.brandName}}</div>
        <div class="second">
          <div class="shape"></div>
          <div class="pr10">品质供应商</div>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="good-title">—— 商品详情 ——</div>
    <div
      class="subheading"
      v-html="this.shopDetail.description"
      v-lazy-container="{ selector: 'img' }"
    >
    </div>
    <div class="bottom-copywriting">
      <div>公交生活，有我陪伴</div>
      <div>杭州市民卡&通卡联城联合运营</div>
    </div>
    <div class="shopp-bottom">
      <div class="shopp-button" @click="handleSelect" v-if="shopDetail.status === 1 && shopDetail.sumRemainCount > 0 && isStart"
        seed="立即购买"
      >立即购买</div>
      <div
        class="shopp-button shopp-button2"
        v-if="!isStart"
      >活动未开始</div>
      <div
        class="shopp-button shopp-button2"
        v-if="shopDetail.status === 0 "
      >已下架</div>
       <div
        class="shopp-button shopp-button2"
        v-if="shopDetail.status === 1 && shopDetail.sumRemainCount <= 0 "
      >已售罄</div>
    </div>
  </div>
</template>
<script>
import goodService from "../../service/order/good.js";
import orderConfirm from "../../service/order/orderConfirm.js";
import specification from "./specification.vue";
import spike from "./spike.vue";
import advanceSale from "./advance-sale.vue";
import receivedCoupon from "../coupon/receivedCoupon";
import sellingPoint from "./selling-point.vue";
import applicableStore from "../common/applicable-store.vue";
import storeList from "../common/store-list.vue";

export default {
  data() {
    return {
      userId: this.$route.query.userId,
      goodsId: this.$route.query.goodsId,
      channel: this.$route.query.channel || "mall",
      cityCode: "",
      lat: "",
      lng: "",
      storeList: [],
      keb: this.$route.query.keb,
      isStart: true,
      skuDetail: "",
      popupType: false,
      couponType: false,
      sellPointType: false,
      applicableStoreType: false,
      distributionArea:'',
      selected: {
        selectedColor: "",
        selectedSize: ""
      },
      RebateDetial: {
        hasBuyReturn: "",
        buyReturnMoney: ""
      },
      hasDiscountVoucher: "",
      voucherList: [],
      sellPointList:[],
      shopDetail: {
        brandLogo: "",
        sellPointList: [],
        activity: "",
        status: 1,
        pictUrl: "",
        brandName: "",
        sumRemainCount: 1,
        name: "",
        description: "",
        sellingPrice: "",
        marketPrice: "",
        saleCount: "",
        smallImages: []
      }
    };
  },
  components: {
    specification,
    receivedCoupon,
    spike,
    advanceSale,
    sellingPoint,
    applicableStore,
    storeList
  },
  created() {},
  computed: {},
  methods: {
    handleSellPoint() {
      this.sellPointType = true;
    },
    handleChildeSell() {
      this.sellPointType = false;
    },
    handleCloseStore() {
      this.applicableStoreType = false;
    },
    handleValueStore() {
      this.applicableStoreType = true;
    },
    handleCoupon() {
      this.couponType = true;
    },
    handleSelect() {
      this.popupType = true;
      if(this.lat && this.lng){
        this.getCnareaByLngLat()
      }else{
        this.getUserAddressList()
      }
    },
    handlePopData(data) {
      this.popupType = false;
      this.selected = data;
    },
    handleSpike(data) {
      this.isStart = data;
      console.log(data);
    },
    handleCouponData() {
      this.couponType = false;
    },
    getGoodsDetail() {
      const id = this.$route.query.goodsId || 1;
      const that = this;
      goodService.getGoodsDetail(id).then(
        response => {
          this.shopDetail = JSON.parse(JSON.stringify(response));
          if(this.shopDetail.sellPointList && this.shopDetail.sellPointList.length > 3){
              this.sellPointList = this.shopDetail.sellPointList.slice(0,3)
          }else{
              this.sellPointList  = this.shopDetail.sellPointList
          }
          for (let i = 0; i < this.shopDetail.smallImages.length; i++) {
            this.shopDetail.smallImages[i] = `${this.shopDetail.smallImages[i]}?x-oss-process=image/resize,m_fill,h_750,w_750/format,webp`;
          }
          this.shopDetail.description = this.letslazyload(this.shopDetail.description);
          this.getGoodsSkuList();
          this.$nextTick(() => {
            var swiper = new Swiper(".banner .swiper-container", {
              autoplay: true,
              pagination: {
                el: ".swiper-pagination",
                type: "fraction"
              }
            });
          });
          // that.getGoodsShopList();
          if (window.AlipayJSBridge) {
            AlipayJSBridge.call(
              "getCurrentLocation",
              { requestType: 2, bizType: "didi" },
              function(result) {
                if (result.error) {
                  that.getGoodsShopList();
                  return;
                }
                that.cityCode = result.cityAdcode;
                that.lat = result.latitude;
                that.lng = result.longitude;
                that.getGoodsShopList();
              }
            );
          }
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    letslazyload(dom) {
      let regexp1 = new RegExp(
        /(\<img )([^>]*)(src=")([^"]*")([^>]*)(\>)/,
        "g"
      );
      dom = dom.replace(regexp1, function(match, p1, p2, p3, p4, p5, p6) {
        return p1 + p2 + 'data-src="' + p4 + p5 + p6;
      });
      return dom;
    },
    getBuyReturnInfo() {
      const data = {
        goodsId: this.$route.query.goodsId || 1
      };
      goodService.getBuyReturnInfo(data).then(
        response => {
          this.RebateDetial = response;
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    getCnareaByLngLat() {
      const data = {
        lat: this.lat,
        lng: this.lng
      };
      goodService.getCnareaByLngLat(data).then(
        response => {
          this.distributionArea = response.data;
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    getUserAddressList() {
      const data = {
        userId: this.$route.query.userId,
      };
      orderConfirm.getUserAddressList(data).then(
        response => {
          if (Array.isArray(response)) {
            this.distributionArea = response[0];
          }
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    getVoucherList() {
      const data = {
        goodsId: this.$route.query.goodsId || 1,
        aliUserId: this.userId
      };
      goodService.getVoucherList(data).then(
        response => {
          this.hasDiscountVoucher = response.hasDiscountVoucher;
          if (response.goodsVoucherList.length > 0) {
            this.voucherList = response.goodsVoucherList.slice(0, 2);
          }
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    getGoodsSkuList() {
      const id = this.$route.query.goodsId;
      const data = {
        activity: this.shopDetail.activity || "",
        activityId: this.shopDetail.activityId,
        goodsId: this.$route.query.goodsId
      };
      goodService.getGoodsSkuList(data).then(
        response => {
          this.skuDetail = JSON.parse(JSON.stringify(response));
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    getGoodsShopList() {
      const data = {
        goodsId: this.goodsId,
        userId: this.userId,
        lat: this.lat,
        lng: this.lng,
        cityCode: this.cityCode
      };
      // const data = {
      // "cityCode": "330100",
      // "goodsId": 1074,
      // "lat": 30.230848,
      // "lng": 120.195613,
      //  "userId": "2088502802823710"
      // }
      goodService.getGoodsShopList(data).then(
        response => {
          if(response.data && Array.isArray(response.data)){
            this.storeList = response.data;
            sessionStorage.setItem("storeObj",JSON.stringify(response.data));
            const obj = {
              cityCode: this.cityCode,
              lat: this.lat,
              lng: this.lng,
            }
            sessionStorage.setItem("positionObj",JSON.stringify(obj));
          }
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    }
  },
  mounted() {
    sessionStorage.setItem("userId", this.userId);
    sessionStorage.setItem("goodsId", this.goodsId);
    sessionStorage.setItem("channel", this.channel);
    this.getGoodsDetail();
    this.getBuyReturnInfo();
    this.getVoucherList();
    window.Tracker && (window.Tracker.user_id = this.userId);
  },
  watch: {}
};
</script>
<style>
.subheading img {
  width: 100%;
}
</style>

<style lang="scss" scoped >
.pr10 {
  padding-right: 0.133333rem /* 10/75 */;
}
.clearMove {
  position: fixed !important;
  width: 100%;
  overflow:hidden;
}
.yl_color{
  color: #FF961F;
}
.swiper-container-horizontal > .swiper-pagination-bullets,
.swiper-pagination-custom,
.swiper-pagination-fraction {
  width: 0.9rem /* 63/75 */;
  height: 0.48rem /* 36/75 */;
  line-height: 0.48rem;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 0.266667rem /* 20/75 */;
  font-size: 0.266667rem /* 20/75 */;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #fff;
  right: 0.426667rem /* 32/75 */ !important;
  bottom: 0.426667rem /* 32/75 */ !important;
}
.swiper-container-horizontal > .swiper-pagination-bullets,
.swiper-pagination-custom,
.swiper-pagination-fraction {
  left: 8.733333rem /* 655/75 */ !important;
}
.discount {
  background: linear-gradient(
    136deg,
    rgba(255, 105, 102, 1) 0%,
    rgba(255, 66, 61, 1) 100%
  );
  height: 0.426667rem /* 32/75 */;
  line-height: 0.426667rem /* 32/75 */;
  display: flex;
  color: #fff;
  font-size: 10px;
  border-radius: 0.08rem /* 6/75 */;
  position: relative;
  align-items: center;
  margin-left: 0.133333rem /* 10/75 */;
  .discount-first {
    border-radius: 0.16rem /* 12/75 */;
    background: #fff;
    width: 0.16rem /* 12/75 */;
    height: 0.16rem /* 12/75 */;
    position: absolute;
    left: -0.08rem /* 6/75 */;
  }
  .discount-second {
    padding-left: 0.133333rem /* 10/75 */;
    padding-right: 0.133333rem /* 10/75 */;
  }
  .discount-third {
    border-radius: 0.16rem /* 12/75 */;
    background: #fff;
    width: 0.16rem /* 12/75 */;
    height: 0.16rem /* 12/75 */;
    position: absolute;
    right: -0.08rem /* 6/75 */;
  }
}
@import "goods-detail.styl";
</style>

<template>
  <div class="order-detail" :class="{ clearMove: couponState || contactState}">
    <coupon v-show="couponState" :count='count' :jumpTypes='jumpType' :favorablePrice="favorablePrice" @value-coupon="handleCoupon"></coupon>
    <contactSrvice v-show="contactState" @value-contact="handleContact"></contactSrvice>
    <storeList v-show="applicableStoreType" @close-store-popup="handleCloseStore" :storeList="storeList"></storeList>
    <div v-if="address.length >0 && goodDetail.goodsType == 1">
      <div
        class="buyer display-flex"
        v-for="(item,index) in address"
        :key="index"
        seed="修改地址"
        @click="handleAddress(item.id)"
      >
        <img
          src="../../assets/images/adress2.png"
          alt=""
        >
        <div class="right">
          <div class="first display-flex">
            <div>{{item.name}}</div>
            <div class="ml18">{{item.mobile}}</div>
          </div>
          <div class="second">
            <span>{{item.provinceName}}</span>
            <span>{{item.cityName}}</span>
            <span>{{item.districtName}}</span>
            <span>{{item.address}}</span>
          </div>
        </div>
        <div class="arrow"></div>
      </div>
    </div>
    <div v-if="address.length <= 0 && goodDetail.goodsType == 1">
      <div class="buyer2 display-flex" @click="handleAddAddress" seed="添加地址">
        <img src="../../assets/images/adress.png" alt="">
        <div class="right">请添加收货地址</div>
        <div class="arrow"></div>
      </div>
    </div>
    <div class="special-line" v-if="goodDetail.goodsType == 1"></div>
    <div class="line"></div>
    <div class="shop-name">
      <img src="../../assets/images/IcoStore.png" alt="">
      <div class="second">{{goodDetail.brandName}}</div>
    </div>
    <div class="content">
      <img
        :src="goodDetail.pictUrl"
        alt=""
      >
      <div class="right">
        <div class="first display-flex">
          <div>{{goodDetail.name}}</div>
          <div>{{goodDetail.sellingPrice}}元</div>
          <div class="number">x {{count}}</div>
        </div>
        <span class="second">{{goodDetail.specificationsOneValue}}{{goodDetail.specificationsTwoValue}}</span>
      </div>
    </div>
    <div class="purchase-quantity">
      <div class="title">购买数量：{{count}}</div>
      <div class="number">
        <div
          class="reduce"
          @click="subtract"
        >
          <div></div>
        </div>
        <div class="count"><input
            type="number"
            value="0"
            size="1"
            v-model="count"
            @keyup="inputOnlyNumber"
          ></div>
        <div
          class="plus"
          @click="add"
        >
          <div></div>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <applicableStore  @open-store-popup="handleValueStore" :storeList="storeList"></applicableStore>
    <div class="line" v-show="storeList.length>0"></div>
    <div class="prize display-flex">
      <div>共计{{count}}件商品</div>
      <div v-if="goodDetail.activity === 'persale'">应付定金：<span>{{prepaidPrice}}元</span></div>
      <div v-else>应付金额：<span>{{actualAmount}}元</span></div>
    </div>
    <div class="pre-sale-module" v-if="goodDetail.activity === 'persale'">
      <div class="display-flex commline mt12">
        <div>商品总额</div>
        <div>{{amountPayable}}元</div>
      </div>
      <div class="display-flex commline">
        <div>阶段1：定金</div>
        <div>{{prepaidPrice}}元</div>
      </div>
      <div class="display-flex commline">
        <div>阶段2：尾款</div>
        <div>{{tailMoney}}元</div>
      </div>
      <div class="display-flex commline">
        <div>商品优惠</div>
        <div>{{commodityPreferences}}元</div>
      </div>
      <div class="preferential-goods">
        <div class="display-flex first">
          <div>优惠券：</div>
          <div>{{favorablePrice}}</div>
          <div @click="handleSelectCoupon" v-if="selectCoupon">选择</div>
          <img @click="handleSelectCoupon" v-if="selectCoupon" src="../../assets/images/coupon-arrow.png" alt="">
        </div>
        <div class="display-flex second">
          <div>定金优惠：</div>
          <div>{{totalDiscount}}</div>
        </div>
      </div>
      <div class="display-flex commline mb12" v-if="RebateDetial.hasBuyReturn">
        <div>返利：交易成功后，返{{RebateDetial.buyReturnMoney}}元乘车红包</div>
      </div>
      <div class="line"></div>
      <div class="agree">
        <div class="">同意定金不退等 <预售协议>
        </div>
        <div class="">
          <mt-switch v-model="goodDetail.agree"></mt-switch>
        </div>
      </div>
      <div class="line"></div>
      <div class="notice">
        <div>尾款通知手机号</div>
        <div v-if="address.length>0">{{address[0].mobile}}</div>
      </div>
    </div>
     <div class="good-detail" v-else>
      <div class="select-coupon" @click="handleSelectCoupon" v-if="selectCoupon">
        <div>选择</div>
        <div class="arrow"></div>
      </div>
      <div class="display-flex shop-detail mt12">
        <div>商品总额</div>
        <div>{{amountPayable}}元</div>
      </div>
      <div class="display-flex shop-detail">
        <div>价格优惠</div>
        <div><span v-if="favorablePrice">-</span>{{favorablePrice}}元</div>
      </div>
      <div class="display-flex shop-detail" v-if="RebateDetial.hasBuyReturn">
        <div>返利</div>
        <div>交易成功后，返{{RebateDetial.buyReturnMoney}}元乘车红包</div>
      </div>
      <div class="display-flex shop-detail mb12">
        <div>运费</div>
        <div>免运费</div>
      </div>
    </div>
    <div class="line"></div>
    <div class="invoice display-flex" @click="handleInvoice">
      <img
        src="../../assets/images/invoice.png"
        alt=""
      >
      <div>开发票</div>
      <div class="arrow"></div>
    </div>
    <div class="line mb130"></div>
    <div class="bottom display-flex">
      <div class="left">
        <div v-if="goodDetail.activity === 'persale'">应付定金：<span>{{prepaidPrice}}元</span></div>
        <div v-else>应付金额：<span>{{actualAmount}}元</span></div>
        <div v-if="goodDetail.activity !== 'persale'">已优惠：<span>{{favorablePrice}}元</span></div>
      </div>
      <div class="right" @click="handlePay">去支付</div>
    </div>
  </div>
</template>
<script>
import orderConfirm from "../../service/order/orderConfirm.js";
import goodService from "../../service/order/good.js";
import coupon from "../coupon/coupon";
import contactSrvice from "../common/contact-srvice";
import applicableStore from "../common/applicable-store.vue";
import storeList from "../common/store-list.vue";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      count: JSON.parse(sessionStorage.getItem("goodObj")).count,
      activity: JSON.parse(sessionStorage.getItem("goodObj")).activity,
      storeList: [],
      channel: sessionStorage.getItem("channel"),
      applicableStoreType: false,
      selectCoupon: true,
      RebateDetial: {
        hasBuyReturn: "",
        buyReturnMoney: ""
      },
      totalDiscount:0,
      prepaidPrice:0,
      tailMoney: 0,
      jumpType: false,
      repeatOrder: true,
      couponState: false,
      contactState: false,
      commodityPreferences: 0,
      favorablePrice: 0,
      address: [],
      amountPayable: "",
      actualAmount: "",
      voucherId: "",
      skuId: JSON.parse(sessionStorage.getItem("goodObj")).skuId,
      activityId: JSON.parse(sessionStorage.getItem("goodObj")).activityId,
      goodDetail:{
        activity: "",
        pictUrl: "",
        name: "",
        sellingPrice: "",
        specificationsOneValue: "",
        specificationsTwoValue: "",
        id: "",
        remainCount: "",
        goodsType: "",
        agree: false,
      }
    };
  },
  components: {
    coupon,
    contactSrvice,
    applicableStore,
    storeList,
  },
  created() {},
  computed: {},
  methods: {
    handleOpenStore(){

    },
    handleCloseStore(){
      this.applicableStoreType = false;
    },
    handleValueStore(){
      this.applicableStoreType = true;
    },
    inputOnlyNumber() {
     if(this.goodDetail.activity){
         let minCount = 0
         this.goodDetail.limitPurchaseCount >= this.goodDetail.remainCount ? minCount= this.goodDetail.limitPurchaseCount : minCount = this.goodDetail.remainCount;
         if(event.target.value > minCount){
            this.count = minCount;
          }
        }else{
          if(event.target.value > this.goodDetail.remainCount) {
            this.count = this.goodDetail.remainCount;
          }
        }
        if (event.target.value < 1) {
          this.count = 1;
        }
        this.totalDiscount = ((this.goodDetail.offsetPrice - this.goodDetail.prepaidPrice) * this.count).toFixed(2);
        this.prepaidPrice = (Number(this.goodDetail.prepaidPrice) * Number(this.count)).toFixed(2);
        this.amountPayable = (Number(this.count) * Number(this.goodDetail.sellingPrice)).toFixed(2);
        this.actualAmount = (Number(this.count) * Number(this.goodDetail.sellingPrice) - Number(this.favorablePrice)).toFixed(2);
        this.commodityPreferences = (Number(this.totalDiscount) + Number(this.favorablePrice)).toFixed(2)
        this.tailMoney = (this.amountPayable -  this.commodityPreferences - this.prepaidPrice).toFixed(2);
    },
    //返利数据接口
    getBuyReturnInfo() {
      const data = {
        goodsId: sessionStorage.getItem("goodsId")
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
    //判断地区是否支持接送
    getCheckDelivery() {
      const data = {
        goodsId: sessionStorage.getItem("goodsId"),
        districtCode: this.address[0].districtCode,
        cityCode: this.address[0].cityCode,
        provinceCode: this.address[0].provinceCode
      };
      orderConfirm.getCheckDelivery(data).then(
        response => {
          if (response.supportDelivery === 0) {
            Toast({
              message: "该收货地址暂不接受配送",
              position: "middle",
              duration: 1000
            });
          }else{
           this.getCreateOrder();
          }
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    handlePay() {
      if(this.goodDetail.activity === 'persale'){
         if(!this.goodDetail.agree){
          Toast({
            message: `预售协议未选择`,
            position: "middle",
            duration: 1000
          });
          return
        }
        if(Number(this.tailMoney)<= 0){
          Toast({
            message: `尾款0元无法下单`,
            position: "middle",
            duration: 1000
          });
          return
        }
      }
      if (this.goodDetail.goodsType == 2 || this.goodDetail.goodsType == 3) {
        if (this.repeatOrder) {
          this.repeatOrder = false;
          this.getCreateOrder();
        }
      } else {
        if (this.address.length > 0) {
          if (this.repeatOrder) {
            this.repeatOrder = false;
            this.getCheckDelivery();
          }
        } else {
          Toast({
            message: "请填写收货地址",
            position: "middle",
            duration: 1000
          });
        }
      }
    },
    handleAddress(id) {
      const router = `./harvestAddress?id=${id}`;
      this.$router.push(router);
    },
    handleAddAddress() {
      const router = `./addAddress`;
      this.$router.push(router);
    },
    handleSelectCoupon() {
      this.couponState = true;
      this.jumpType = true;
    },
    handleCoupon(data) {
      this.couponState = false;
      this.jumpType = false;
      this.favorablePrice = data.amount;
      this.voucherId = data.voucherId;
      this.actualAmount = (Number(this.count) * Number(this.goodDetail.sellingPrice) - Number(this.favorablePrice)).toFixed(2);
      this.commodityPreferences = (Number(this.totalDiscount) + Number(this.favorablePrice)).toFixed(2);
      this.tailMoney = (this.amountPayable -  this.commodityPreferences - this.prepaidPrice).toFixed(2);
    },
    handleInvoice() {
      this.contactState = true;
    },
    handleContact() {
      this.contactState = false;
    },
    add: function(count) {
       if(this.goodDetail.activity && this.goodDetail.limitPurchaseCount !== null){
            if(this.count < this.goodDetail.limitPurchaseCount && this.count < this.goodDetail.remainCount){
                this.count++;
                this.totalDiscount = ((this.goodDetail.offsetPrice - this.goodDetail.prepaidPrice) * this.count).toFixed(2);
                this.prepaidPrice = (Number(this.goodDetail.prepaidPrice) * Number(this.count)).toFixed(2);
                this.amountPayable = (Number(this.count) * Number(this.goodDetail.sellingPrice)).toFixed(2);
                this.actualAmount = (Number(this.count) * Number(this.goodDetail.sellingPrice) - Number(this.favorablePrice)).toFixed(2);
                this.commodityPreferences = (Number(this.totalDiscount) + Number(this.favorablePrice)).toFixed(2);
                this.tailMoney = (this.amountPayable -  this.commodityPreferences - this.prepaidPrice).toFixed(2);
            }
        }else{
           if(this.count < this.goodDetail.remainCount) {
                this.count++;
                this.totalDiscount = ((this.goodDetail.offsetPrice - this.goodDetail.prepaidPrice) * this.count).toFixed(2);
                this.prepaidPrice = (Number(this.goodDetail.prepaidPrice) * Number(this.count)).toFixed(2);
                this.amountPayable = (Number(this.count) * Number(this.goodDetail.sellingPrice)).toFixed(2);
                this.actualAmount = (Number(this.count) * Number(this.goodDetail.sellingPrice) - Number(this.favorablePrice)).toFixed(2);
                this.commodityPreferences = (Number(this.totalDiscount) + Number(this.favorablePrice)).toFixed(2);
                this.tailMoney = (this.amountPayable -  this.commodityPreferences - this.prepaidPrice).toFixed(2);
            }
          }
    },
    subtract: function(count) {
       if (this.count <= 1) {
          this.count = 1;
        } else {
          this.count -= 1;
          this.totalDiscount = ((this.goodDetail.offsetPrice - this.goodDetail.prepaidPrice) * this.count).toFixed(2);
          this.prepaidPrice = (Number(this.goodDetail.prepaidPrice) * Number(this.count)).toFixed(2);
          this.amountPayable = (
            Number(this.count) * Number(this.goodDetail.sellingPrice)
          ).toFixed(2);
          this.actualAmount = (
            Number(this.count) * Number(this.goodDetail.sellingPrice) -
            Number(this.favorablePrice)
          ).toFixed(2);
          this.commodityPreferences = (Number(this.totalDiscount) + Number(this.favorablePrice)).toFixed(2);
          this.tailMoney = (this.amountPayable -  this.commodityPreferences - this.prepaidPrice).toFixed(2);
        }
    },
    getSelecVoucher(templateId) {
      let data = {
        goodsId: sessionStorage.getItem("goodsId"),
        aliUserId: sessionStorage.getItem("userId"),
        goodsPrice: ""
      };
      const count = JSON.parse(sessionStorage.getItem("goodObj")).count;
      const sellingPrice = Number(this.goodDetail.sellingPrice) * count;
      const offsetPrice = Number(this.goodDetail.offsetPrice) * count;
      if(this.activity === 'persale'){
        data.goodsPrice = (sellingPrice - offsetPrice).toFixed(2);
      }else{
        data.goodsPrice = sellingPrice;
      }
      goodService.getSelecVoucher(data).then(
        response => {
          if (Number(response.size) === 0) {
            this.selectCoupon = false;
            this.commodityPreferences = (Number(this.totalDiscount) + Number(this.favorablePrice)).toFixed(2)
            this.tailMoney = (this.amountPayable -  this.commodityPreferences - this.prepaidPrice).toFixed(2);
            return;
          }
          if (response.voucherList instanceof Array);
          {
            if (response.voucherList[0].canUse) {
              this.favorablePrice = response.voucherList[0].amount;
              this.voucherId = response.voucherList[0].voucherId;
              this.actualAmount = (
                this.actualAmount - Number(response.voucherList[0].amount)
              ).toFixed(2);
            }
          }
          this.commodityPreferences = (Number(this.totalDiscount) + Number(this.favorablePrice)).toFixed(2)
          this.tailMoney = (this.amountPayable -  this.commodityPreferences - this.prepaidPrice).toFixed(2);
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    getUserAddressList() {
      const data = {
        userId: sessionStorage.getItem("userId") || ''
      };
      orderConfirm.getUserAddressList(data).then(
        response => {
          if (Array.isArray(response)) {
            const id = this.$route.query.id;
            if (id) {
              response.forEach((item, index) => {
                if (item.id == id) {
                  const obj = {
                    provinceName: item.provinceName,
                    cityName: item.cityName,
                    districtName: item.districtName,
                    address: item.address,
                    name: item.name,
                    mobile: item.mobile,
                    id: item.id,
                    provinceCode: item.provinceCode,
                    cityCode: item.cityCode,
                    districtCode: item.districtCode,
                  };
                  this.address.push(obj);
                }
              });
            } else {
              this.address = response.slice(0, 1);
            }
          }
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    getSaleMessage() {
      let data = {
        count: this.count,
        skuId: this.skuId,
        activity: this.activity
      };
      if(this.activityId) data.activityId = this.activityId;
      goodService.getSaleMessage(data).then(
        response => {
          this.goodDetail = JSON.parse(JSON.stringify(response))
          this.goodDetail.agree = false;
          this.prepaidPrice = (response.prepaidPrice * this.count).toFixed(2);
          this.totalDiscount = ((response.offsetPrice - response.prepaidPrice) * this.count).toFixed(2);
          this.amountPayable = (Number(this.count) * Number(this.goodDetail.sellingPrice)).toFixed(2);
          this.actualAmount = (Number(this.count) * Number(this.goodDetail.sellingPrice) - Number(this.favorablePrice)).toFixed(2);
          this.getSelecVoucher();
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    //去支付接口
    getCreateOrder() {
      const that = this;
      let data = {
        count: this.count,
        frontendUrl: "www.baidu.com",
        goodsId: this.goodDetail.id,
        payType: "mapp",
        skuId: this.skuId,
        userId: sessionStorage.getItem("userId"),
        voucherId: this.voucherId,
        channel: 1,
      };
      if(this.channel === 'mybus') data.channel = 2;
      if(this.address.length>0){
        data.userAddresId = this.address[0].id
      }
      if(this.goodDetail.activity === 'spike'){
        data.activity = 'spike'
      }else if(this.goodDetail.activity === 'persale'){
        data.activity = 'persale';
        data.persaleActivity = 'prepaid';
      }
      orderConfirm.getCreateOrder(data).then(
        response => {
          const orderNo = response.orderNo;
          const payNo = response.payStr;
          my.tradePay({
            tradeNO: `${payNo}`, // 调用统一收单交易创建接口（alipay.trade.create），获得返回字段支付宝交易号trade_no
            success: res => {
              this.repeatOrder = true;
              if (res.resultCode == 9000) {
                const router = `./result?orderNo=${orderNo}`;
                this.$router.push(router);
              } else {
                const router = `./orderList?userId=${sessionStorage.getItem(
                  "userId"
                )}`;
                this.$router.push(router);
              }
            },
            fail: res => {
              my.alert({
                content: JSON.stringify(res)
              });
            }
          });
        },
        response => {
          this.repeatOrder = true;
          Toast({
            message: `${response.msg}`,
            position: "middle",
            duration: 1000
          });
        }
      );
    }
  },
  mounted() {
    this.getUserAddressList();
    this.getSaleMessage();
    this.getBuyReturnInfo();
    if(JSON.parse(sessionStorage.getItem("storeObj")))this.storeList = JSON.parse(sessionStorage.getItem("storeObj"));
  },
  watch: {
  }
};
</script>
<style>
.mint-switch-input:checked + .mint-switch-core {
  border-color: #4cd964 !important;
  background-color: #4cd964 !important;
}
</style>
<style lang="scss" scoped >
.clearMove {
  position: fixed !important;
  width: 100%;
}
input {
  outline-color: invert;
  outline-style: none;
  outline-width: 0;
  border: none;
  border-style: none;
  text-shadow: none;
  -webkit-appearance: none;
  -webkit-user-select: text;
  outline-color: transparent;
  box-shadow: none;
}
.display-flex {
  display: flex;
}
.mb130 {
  margin-bottom: 1.733333rem /* 130/75 */;
}
.ml18 {
  margin-left: 0.24rem /* 18/75 */;
}
.mb12 {
  margin-bottom: 0.16rem /* 12/75 */ !important;
}
.mt12 {
  margin-top: 0.16rem /* 12/75 */ !important;
}
.line {
  height: 0.213333rem /* 16/75 */;
  width: 100%;
  background-color: #f4f5f7;
}
.special-line {
  background: url("../../assets/images/line.png") no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 0.106667rem /* 8/75 */;
}
.order-detail {
  background-color: #fff;
  .shop-name {
    display: flex;
    height: 1.28rem /* 96/75 */;
    line-height: 1.28rem /* 96/75 */;
    width: 100%;
    align-items: center;
    font-size: 0.373333rem /* 28/75 */;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    img {
      width: 0.426667rem /* 32/75 */;
      height: 0.426667rem /* 32/75 */;
      display: block;
      padding-left: 0.426667rem /* 32/75 */;
      padding-right: 0.213333rem /* 16/75 */;
    }
    .second {
      color: rgba(9, 30, 66, 1);
    }
  }
  .buyer {
    width: 100%;
    height: 2.88rem /* 216/75 */;
    img {
      width: 0.853333rem /* 64/75 */;
      height: 0.853333rem /* 64/75 */;
      display: block;
      margin: 0.426667rem /* 32/75 */ 0.426667rem /* 32/75 */ 0 0.426667rem
        /* 32/75 */;
    }
    .right {
      width: 6.48rem /* 486/75 */;
      .first {
        margin: 0.426667rem /* 32/75 */ 0.533333rem /* 40/75 */ 0.213333rem
          /* 16/75 */ 0;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(9, 30, 66, 1);
        font-size: 0.426667rem /* 32/75 */;
      }
      .second {
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(66, 82, 110, 1);
        font-size: 0.373333rem /* 28/75 */;
        margin-right: 0.533333rem /* 40/75 */;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
    .arrow {
      background: url("../../assets/images/arrow.png") no-repeat;
      background-size: 100% 100%;
      width: 0.426667rem /* 32/75 */;
      height: 0.426667rem /* 32/75 */;
      margin-left: auto;
      margin-right: 0.426667rem /* 32/75 */;
      margin-top: 1.226667rem /* 92/75 */;
    }
  }
  .buyer2 {
    width: 100%;
    height: 1.92rem /* 144/75 */;
    align-items: center;
    img {
      width: 0.853333rem /* 64/75 */;
      height: 0.853333rem /* 64/75 */;
      display: block;
      margin: 0.533333rem /* 40/75 */ 0.426667rem /* 32/75 */;
    }
    .right {
      width: 6.48rem /* 486/75 */;
      font-size: 0.426667rem /* 32/75 */;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(9, 30, 66, 1);
    }
    .arrow {
      background: url("../../assets/images/arrow.png") no-repeat;
      background-size: 100% 100%;
      width: 0.426667rem /* 32/75 */;
      height: 0.426667rem /* 32/75 */;
      margin-left: auto;
      margin-right: 0.426667rem /* 32/75 */;
    }
  }
  .content {
    display: flex;
    position: relative;
    align-items: center;
    width: 100%;
    height: 2.986667rem /* 224/75 */;
    img {
      width: 2.133333rem /* 160/75 */;
      height: 2.133333rem /* 160/75 */;
      padding: 0.426667rem /* 32/75 */;
      display: block;
    }
    .right {
      margin-right: 0.426667rem /* 32/75 */;
      width: 6.586667rem /* 494/75 */;
      .first {
        position: relative;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        div:nth-child(1) {
          width: 4.56rem /* 342/75 */;
          height: 1.066667rem /* 80/75 */;
          line-height: 0.533333rem /* 40/75 */;
          color: rgba(9, 30, 66, 1);
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        div:nth-child(2) {
          margin-left: auto;
          color: #ff423d;
        }
        .number {
          position: absolute;
          right: 0;
          bottom: 0;
          color: rgba(122, 134, 154, 1);
        }
      }
      .second {
        padding: 0.066667rem /* 5/75 */ 0.213333rem /* 16/75 */;
        height: 0.533333rem /* 40/75 */;
        text-align: center;
        line-height: 0.533333rem /* 40/75 */;
        background: rgba(244, 245, 247, 1);
        border-radius: 0.053333rem /* 4/75 */;
        color: #7a869a;
        font-size: 0.266667rem /* 20/75 */;
        margin-top: 0.533333rem /* 40/75 */;
      }
    }
  }
  .purchase-quantity {
    display: flex;
    align-items: center;
    width: 100%;
    height: 1.653333rem /* 124/75 */;
    .title {
      height: 0.533333rem /* 40/75 */;
      font-size: 0.373333rem /* 28/75 */;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 0.533333rem /* 40/75 */;
      letter-spacing: 1px;
      margin-left: 0.426667rem /* 32/75 */;
    }
    .number {
      display: flex;
      margin-left: auto;
      margin-right: 0.426667rem /* 32/75 */;
    }
    .reduce {
      width: 0.88rem /* 66/75 */;
      height: 0.8rem /* 60/75 */;
      background: rgba(244, 245, 247, 1);
      box-shadow: 2px 0px 0px 0px rgba(255, 255, 255, 1);
      border-radius: 0.106667rem /* 8/75 */ 0 0 0.106667rem /* 8/75 */;
      display: flex;
      align-items: center;
      justify-content: center;
      div {
        width: 0.32rem /* 24/75 */;
        height: 0.053333rem /* 4/75 */;
        background: rgba(223, 225, 230, 1);
      }
    }
    .count {
      width: 1.013333rem /* 76/75 */;
      height: 0.8rem /* 60/75 */;
      background: rgba(244, 245, 247, 1);
      margin-left: 0.053333rem /* 4/75 */;
      display: flex;
      align-items: center;
      justify-content: center;
      input {
        width: 0.75rem;
        height: 0.65rem /* 60/75 */;
        background: rgba(244, 245, 247, 1);
        text-align: center;
        border: none;
      }
    }
    .plus {
      width: 0.88rem /* 66/75 */;
      height: 0.8rem /* 60/75 */;
      background: rgba(244, 245, 247, 1);
      box-shadow: -2px 0px 0px 0px rgba(255, 255, 255, 1);
      border-radius: 0 0.106667rem /* 8/75 */ 0.106667rem /* 8/75 */ 0;
      display: flex;
      align-items: center;
      justify-content: center;
      div {
        background: url("../../assets/images/plus.png") no-repeat;
        background-size: 100% 100%;
        width: 0.506667rem /* 38/75 */;
        height: 0.506667rem /* 38/75 */;
      }
    }
  }
  .prize {
    position: relative;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(9, 30, 66, 1);
    font-size: 0.32rem /* 24/75 */;
    margin: 0 0.426667rem /* 32/75 */;
    height: 1.226667rem /* 92/75 */;
    line-height: 1.226667rem /* 92/75 */;
    overflow: hidden;
    div:nth-child(2) {
      margin-left: auto;
      span {
        font-weight: 500;
        color: #ff423d;
        font-size: 0.373333rem /* 28/75 */;
      }
    }
  }
  .prize::after {
    content: "";
    height: 1px;
    position: absolute;
    left: 0;
    width: 105%;
    bottom: 0;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 -1px 0px 0px rgba(0, 0, 0, 0.1);
  }
  .good-detail {
    position: relative;
    .select-coupon {
      display: flex;
      font-size: 0.32rem /* 24/75 */;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      align-items: center;
      position: absolute;
      top: 1.226667rem /* 92/75 */;
      right: 0;
      div:nth-child(1) {
        margin-left: auto;
        color: rgba(151, 160, 175, 1);
      }
      .arrow {
        background: url("../../assets/images/arrow.png") no-repeat;
        background-size: 100% 100%;
        width: 0.426667rem /* 32/75 */;
        height: 0.426667rem /* 32/75 */;
        margin-right: 0.426667rem /* 32/75 */;
      }
    }
  }
  .pre-sale-module {
    .mt12 {
      margin-top: 0.16rem /* 12/75 */;
    }
    .commline {
      font-size: 0.32rem /* 24/75 */;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      line-height: 0.853333rem /* 64/75 */;
      div:nth-child(1) {
        color: rgba(122, 134, 154, 1);
        margin-left: 1.173333rem /* 88/75 */;
      }
      div:nth-child(2) {
        color: rgba(9, 30, 66, 1);
        margin-left: auto;
        margin-right: 0.426667rem /* 32/75 */;
      }
    }
    .preferential-goods {
      margin-left: 2.2rem /* 165/75 */;
      height: 1.866667rem /* 140/75 */;
      color: rgba(122, 134, 154, 1);
      font-size: 0.32rem /* 24/75 */;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      .first {
        line-height: 0.853333rem /* 64/75 */;
        align-items: center;
        div:nth-child(1) {
          min-width: 1.6rem /* 120/75 */;
        }
        div:nth-child(2) {
          color: #ff584d;
        }
        div:nth-child(3) {
          margin-left: auto;
        }
        img {
          height: 0.32rem /* 24/75 */;
          width: 0.32rem /* 24/75 */;
          margin-right: 0.426667rem /* 32/75 */;
        }
      }
      .second {
        line-height: 0.853333rem /* 64/75 */;
        div:nth-child(2) {
          color: #091e42;
        }
      }
    }
    .agree {
      width: 100%;
      height: 1.44rem /* 108/75 */;
      display: flex;
      align-items: center;
      font-size: 0.373333rem /* 28/75 */;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(9, 30, 66, 1);
      div:nth-child(1) {
        margin-left: 0.426667rem /* 32/75 */;
      }
      div:nth-child(2) {
        margin-left: auto;
        margin-right: 0.506667rem /* 38/75 */;
      }
    }
    .notice {
      display: flex;
      font-size: 0.373333rem /* 28/75 */;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(9, 30, 66, 1);
      width: 100%;
      height: 1.493333rem /* 112/75 */;
      align-items: center;
      div:nth-child(1) {
        margin-left: 0.426667rem /* 32/75 */;
      }
      div:nth-child(2) {
        margin-left: auto;
        margin-right: 0.426667rem /* 32/75 */;
      }
    }
  }
  .shop-detail {
    margin: 0 0.2rem /* 15/75 */ 0 1.173333rem /* 88/75 */;
    height: 0.853333rem /* 64/75 */;
    line-height: 0.853333rem /* 64/75 */;
    font-size: 0.32rem /* 24/75 */;
    .order-info {
      width: 1.6rem /* 120/75 */ !important;
    }
    div:nth-child(1) {
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(122, 134, 154, 1);
      min-width: 1.28rem /* 96/75 */;
      text-align: justify;
    }
    div:nth-child(1):after {
      display: inline-block;
      width: 100%;
      content: "";
    }
    div:nth-child(2) {
      margin-left: 0.426667rem /* 32/75 */;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: #42526e;
    }
  }
  .invoice {
    width: 100%;
    height: 1.493333rem /* 112/75 */;
    align-items: center;
    img {
      width: 0.64rem /* 48/75 */;
      height: 0.64rem /* 48/75 */;
      margin: 0.426667rem /* 32/75 */ 0.32rem /* 24/75 */ 0.426667rem
        /* 32/75 */ 0.426667rem /* 32/75 */;
      display: block;
    }
    .arrow {
      background: url("../../assets/images/arrow.png") no-repeat;
      background-size: 100% 100%;
      width: 0.426667rem /* 32/75 */;
      height: 0.426667rem /* 32/75 */;
      margin-left: auto;
      margin-right: 0.426667rem /* 32/75 */;
    }
  }
  .bottom {
    width: 100%;
    height: 1.6rem /* 120/75 */;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    text-align: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    .left {
      margin-left: auto;
      margin-right: 0.32rem /* 24/75 */;
      div:nth-child(1) {
        font-size: 0.373333rem /* 28/75 */;
        color: #42526e;
        span {
          font-size: 0.426667rem /* 32/75 */;
          color: #ff423d;
          font-weight: 600;
        }
      }
      div:nth-child(2) {
        font-size: 0.266667rem /* 20/75 */;
        color: #42526e;
      }
    }
    .right {
      width: 3.413333rem /* 256/75 */;
      height: 1.173333rem /* 88/75 */;
      line-height: 1.173333rem /* 88/75 */;
      background: linear-gradient(
        135deg,
        rgba(255, 105, 102, 1) 0%,
        rgba(255, 66, 61, 1) 100%
      );
      border-radius: 0.586667rem /* 44/75 */;
      margin-right: 0.426667rem /* 32/75 */;
      font-size: 0.426667rem /* 32/75 */;
      color: #fff;
    }
  }
}
</style>

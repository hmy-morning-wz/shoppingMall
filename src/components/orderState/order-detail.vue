<template>
  <div class="order-detail" :class="{ clearMove: applicableStoreType}">
    <instruction :content="orderDetail" v-show="instructionType" @value-instruction="handleCloseInstruction"></instruction>
    <refundContact v-show="contactState" @value-contact="handleContact"></refundContact>
    <refundPopup
      v-show="refundPopupState"
      @value-refund="handleRefund"
      @value-close="handleClosePopup"
    ></refundPopup>
    <storeList v-show="applicableStoreType" @close-store-popup="handleCloseStore" :storeList="storeList"></storeList>
    <div class="header display-flex">
      <div class="left">
        <div v-if="orderDetail.orderStatus === 1">待付款</div>
        <div v-else-if="orderDetail.orderStatus === 2">付款成功</div>
        <div v-else-if="orderDetail.orderStatus === 3">待发货</div>
        <div v-else-if="orderDetail.orderStatus === 4">待收货</div>
        <div v-else-if="orderDetail.orderStatus === 5">交易完成</div>
        <div v-else-if="orderDetail.orderStatus === 6">待付定金</div>
        <div v-else-if="orderDetail.orderStatus === 7">待付尾款</div>
        <div v-else-if="orderDetail.orderStatus === -1">交易关闭</div>
        <div v-if="orderDetail.orderStatus === 1 || orderDetail.orderStatus === 6">订单将在{{time}}分钟后自动关闭</div>
        <div v-else-if="orderDetail.orderStatus === 7">尾款时间:{{startTailMoneyMonth}}月{{startTailMoneyDay}}日{{startTailMoneyTime}}-{{endTailMoneyMonth}}月{{endTailMoneyDay}}日{{endTailMoneyTime}})</div>
        <div v-else-if="orderDetail.orderStatus === 2 || orderDetail.orderStatus === 3">
          <span v-if="orderDetail.goodsType == 1">已付款，卖家尚未发货</span>
          <span v-else>兑换码将在1个工作日内发放</span>
        </div>
        <div v-else-if="orderDetail.orderStatus === 4">卖家已发货</div>
        <div v-else-if="orderDetail.orderStatus === 5">成交时间:{{orderDetail.succeedTime}}</div>
        <div v-else-if="orderDetail.orderStatus === -1">关闭原因：{{orderDetail.closedReason}}</div>
      </div>
      <img
        src="../../assets/images/array.png"
        alt=""
        v-if="orderDetail.orderStatus === 1"
      >
      <img
        src="../../assets/images/array.png"
        alt=""
        v-if="orderDetail.orderStatus === 6"
      >
      <img
        src="../../assets/images/array.png"
        alt=""
        v-if="orderDetail.orderStatus === 7"
      >
      <img
        src="../../assets/images/orderDetail4.png"
        alt=""
        v-else-if="orderDetail.orderStatus === 2"
      >
      <img
        src="../../assets/images/orderDetail3.png"
        alt=""
        v-else-if="orderDetail.orderStatus === 3"
      >
      <img
        src="../../assets/images/orderDetail2.png"
        alt=""
        v-else-if="orderDetail.orderStatus === 4"
      >
      <img
        src="../../assets/images/orderDetail5.png"
        alt=""
        v-else-if="orderDetail.orderStatus === -1"
      >
    </div>
    <div class="buyer display-flex" v-if="orderDetail.goodsType == 1">
      <img src="../../assets/images/adress2.png" alt="">
      <div class="right">
        <div class="first display-flex">
          <div>{{orderDetail.name}}</div>
          <div class="ml18">{{orderDetail.mobile}}</div>
        </div>
        <div class="second">
          {{orderDetail.address}}
        </div>
      </div>
    </div>
    <div class="line" v-if="orderDetail.goodsType == 1"></div>
    <div class="shop-name">
      <img
        src="../../assets/images/IcoStore.png"
        alt=""
      >
      <div class="second">{{orderDetail.brandName}}</div>
    </div>
    <div class="content" @click="handleShopDetail">
      <img :src="orderDetail.pictUrl" alt="">
      <div class="right">
        <div class="first display-flex">
          <div>{{orderDetail.goodsName}}</div>
          <div v-if="!orderDetail.activity">{{orderDetail.sellingPrice}}元</div>
          <div v-else="!orderDetail.activity">{{orderDetail.activityPrice}}元</div>
          <div class="number">x {{orderDetail.count}}</div>
        </div>
        <span
          class="second"
          v-show="orderDetail.specificationsOne || orderDetail.specificationsTwo"
        >{{orderDetail.specificationsOne}}{{orderDetail.specificationsTwo}}</span>
      </div>
      <div class="refundStatusName">{{orderDetail.refundStatusName}}</div>
    </div>
    <div
      class="button"
      @click="handlePopupOpen"
      v-if="orderDetail.orderStatus === 3 || orderDetail.orderStatus === 4 || orderDetail.orderStatus === 5 || orderDetail.orderStatus === 2"
    >退款</div>
    <div
      class="line"
      v-if="(orderDetail.goodsType == 2 || orderDetail.goodsType == 3)&& orderDetail.orderStatus !== 1 && orderDetail.orderStatus !== 2  && orderDetail.orderStatus !== 3"
    ></div>
    <div class="virtual-goods virtual-goods-height" v-if="orderDetail.goodsType == 2 && (orderDetail.orderStatus === 4 || orderDetail.orderStatus === 5)">
      <!-- <div class="title">兑换码</div> -->
      <div class="third-goods-type">
        <div>兑换码</div>
        <div @click="handleUse" v-show="orderDetail.remark">如何使用？</div>
      </div>
      <div
        class="code-content"
        v-if="orderDetail.logistic && orderDetail.logistic === 'code'"
      >
        <div id="exchange">{{orderDetail.mailNo}}</div>
        <div
          class="copy"
          id="code"
          data-mtr-name="兑换码号"
          @click="handleCode"
          data-clipboard-target="#exchange"
        >复制</div>
      </div>
      <div
        class="qrcode-content"
        v-else
      >
        <div id="qrcodeImg"></div>
        <div
          id="exchange"
          class="exchange-number"
        >
          <div>{{orderDetail.mailNo}}</div>
        </div>
        <div
          class="copy"
          id="code"
          data-mtr-name="兑换码号"
          @click="handleCode"
          data-clipboard-target="#exchange"
        >复制</div>
      </div>
    </div>
    <div class="virtual-goods" v-if="orderDetail.goodsType == 3 && (orderDetail.orderStatus === 4 || orderDetail.orderStatus === 5)">
      <div class="third-goods-type">
        <div>使用说明</div>
        <div @click="handleUse" v-show="orderDetail.remark">如何使用？</div>
      </div>
      <div class="instructions" style="white-space:pre-line">
        <div>{{orderDetail.operationRemark}}</div>
      </div>
    </div>
    <applicableStore  @open-store-popup="handleValueStore" :storeList="storeList"></applicableStore>
    <div class="line" v-show="storeList.length>0"></div>
    <div class="prize display-flex">
      <div>共计1件商品</div>
      <div v-if="orderDetail.orderStatus === 6">应付定金：<span>{{orderDetail.needPayPrice}}</span></div>
      <div v-else-if="orderDetail.orderStatus === 7">应付尾款：<span>{{orderDetail.needPayPrice}}</span></div>
      <div v-else>应付金额：<span>{{orderDetail.needPayPrice}}</span></div>
    </div>
    <div v-if="!orderDetail.activity">
      <div class="display-flex shop-detail mt12">
        <div>商品总额</div>
        <div>{{orderDetail.totalMoney}}元</div>
      </div>
      <div class="display-flex shop-detail">
        <div>价格优惠</div>
        <div>-{{orderDetail.discountPrice}}元</div>
      </div>
      <div
        class="display-flex shop-detail"
        v-if="RebateDetial.hasReturn"
      >
        <div>返利</div>
        <div>交易成功后，返{{RebateDetial.returnMoney}}元乘车红包</div>
      </div>
      <div class="display-flex shop-detail mb12">
        <div>运费</div>
        <div>免运费</div>
      </div>
    </div>
    <div
      class="pre-sale-module"
      v-if="orderDetail.activity === 'persale'"
    >
      <div class="line"></div>
      <div class="display-flex commline mt12">
        <div>商品总额</div>
        <div class="ml32">{{orderDetail.totalMoney}}元</div>
      </div>
      <div class="display-flex commline">
        <div>定金</div>
        <div class="ml32 cl-red">{{orderDetail.prepaidPrice}}元</div>
        <div>{{orderDetail.prepaidStatus}}</div>
      </div>
      <div class="display-flex commline">
        <div>尾款</div>
        <div class="ml32 cl-red">{{orderDetail.finalpaidPrice}}元</div>
        <div>{{orderDetail.finalpaidStatus}}</div>
      </div>
      <div class="display-flex commline">
        <div>商品优惠</div>
        <div class="ml32">{{totalDiscount}}元</div>
      </div>
      <div class="preferential-goods">
        <div class="display-flex first">
          <div>优惠券：</div>
          <div>{{orderDetail.discountPrice}}元</div>
        </div>
        <div class="display-flex second">
          <div>定金优惠：</div>
          <div>{{orderDetail.offsetPrice}}元</div>
        </div>
      </div>
      <div
        class="display-flex commline mb12"
        v-if="RebateDetial.hasReturn"
      >
        <div class="rebate">返利</div>
        <div class="ml32">交易成功后，返{{RebateDetial.returnMoney}}元乘车红包</div>
      </div>
    </div>
    <div class="line"></div>
    <div class="order-title display-flex">
      <div></div>
      <div>订单信息</div>
    </div>
    <div class="display-flex shop-detail mt12">
      <div class="order-info">订单编号:</div>
      <div>{{orderDetail.orderNo}}</div>
    </div>
    <div
      class="display-flex shop-detail mb12"
      v-if="orderDetail.orderStatus !== 1 && orderDetail.payTime"
    >
      <div class="order-info">付款时间:</div>
      <div>{{orderDetail.payTime}}</div>
    </div>
    <div
      class="display-flex shop-detail mb12"
      v-if="orderDetail.goodsType == 1 && orderDetail.mailNo"
    >
      <div class="order-info">物流单号:</div>
      <div id="mailNo">{{orderDetail.mailNo}}</div>
      <div
        class="copy"
        id="btn"
        data-mtr-name="复制物流订单号"
        data-clipboard-target="#mailNo"
        @click="handleCopy"
        v-if="orderDetail.mailNo"
      >复制</div>
    </div>
    <div
      class="display-flex shop-detail mb12"
      v-if="orderDetail.goodsType == 1 && orderDetail.logistic"
    >
      <div class="order-info">物流公司:</div>
      <div>{{orderDetail.logistic}}</div>
    </div>
    <div class="line mt100"></div>
    <div
      class="bottom display-flex"
      v-if="orderDetail.orderStatus === 1"
    >
      <div
        class="cancel-button"
        @click="handleCancelOrder"
      >取消订单</div>
      <div
        class="purchase-button"
        @click="handlePay"
      >立即付款</div>
    </div>
    <div
      class="bottom display-flex"
      v-if="orderDetail.orderStatus === 4"
    >
      <div
        class="purchase-button marleft-auto"
        @click="handleConfirmReceipt"
      >确认收货</div>
    </div>
    <div
      class="bottom display-flex"
      v-if="orderDetail.orderStatus === 6"
    >
      <div
        class="cancel-button marleft-auto"
        @click="handleCancelOrder"
      >取消订单</div>
      <div
        class="purchase-button"
        @click="handlePay"
      >支付定金</div>
    </div>
    <div
      class="bottom display-flex"
      v-if="orderDetail.orderStatus === 7"
    >
      <div
        class="purchase-button marleft-auto"
        @click="handleGetCreateOrder"
        v-if="orderDetail.finalpaidButton == 1"
      >支付尾款</div>
    </div>
  </div>
</template>
<script>
import orderDetail from "../../service/order/orderDetail.js";
import  {shopLink} from '../../config/index';
import goodService from "../../service/order/good.js";
import orderConfirm from "../../service/order/orderConfirm.js";
import refundContact from "../common/refund-contact";
import refundPopup from "../common/refund-popup.vue";
import applicableStore from "../common/applicable-store.vue";
import storeList from "../common/store-list.vue";
import instruction from "../common/instruction.vue";
import QRCode from "qrcodejs2";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      orderNo: this.$route.query.orderNo,
      userId:  this.$route.query.userId,
      instructionType: false,
      cityCode: '',
      lat: '',
      lng: '',
      orderDetail: {
        activity: ""
      },
      storeList: [],
      totalDiscount: "",
      contactState: false,
      refundPopupState: false,
      applicableStoreType: false,
      startTailMoneyMonth: 0,
      startTailMoneyDay: 0,
      startTailMoneyTime: 0,
      endTailMoneyMonth: 0,
      endTailMoneyDay: 0,
      endTailMoneyTime: 0,
      time: 0,
      RebateDetial: {
        hasReturn: "",
        returnMoney: ""
      }
    };
  },
  components: {
    refundContact,
    refundPopup,
    applicableStore,
    storeList,
    instruction

  },
  created() {},
  computed: {},
  methods: {
    handleCloseStore(){
      this.applicableStoreType = false;
    },
    handleUse(){
      this.instructionType = true;
    },
    handleCloseInstruction(){
      this.instructionType = false;
    },
    handleValueStore(){
      this.applicableStoreType = true;
    },
    handleShopDetail(){
      this.getGoodsDetail()
    },
    // 生成二维码
    createQrcode(text) {
      const qrcodeImgEl = document.getElementById("qrcodeImg");
      qrcodeImgEl.innerHTML = "";
      let qrcode = new QRCode(qrcodeImgEl, {
        width: 154,
        height: 154,
        colorDark: "#333333",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.L
      });
      qrcode.makeCode(text);
    },
    //复制物流
    handleCopy() {
      var that = this;
      var clipboard = new ClipboardJS("#btn");
      clipboard.on("success", function(e) {
        Toast({
          message: `复制成功`,
          position: "middle",
          duration: 1000
        });
        e.clearSelection();
      });

      clipboard.on("error", function(e) {
        console.error("Action:", e.action);
        console.error("Trigger:", e.trigger);
      });
    },
    //复制兑换码
    handleCode() {
      var that = this;
      var clipboard = new ClipboardJS("#code");
      clipboard.on("success", function(e) {
        Toast({
          message: `复制成功`,
          position: "middle",
          duration: 1000
        });
        e.clearSelection();
      });

      clipboard.on("error", function(e) {
        console.error("Action:", e.action);
        console.error("Trigger:", e.trigger);
      });
    },
    //去支付尾款
    handleGetCreateOrder() {
      const that = this;
      let data = {
        activity: "persale",
        frontendUrl: "https://www.baidu.com",
        persaleActivity: "finalpaid",
        payType: "mapp",
        orderNo: this.orderNo
      };
      orderConfirm.getCreateOrder(data).then(
        response => {
          const orderNo = response.orderNo;
          const payNo = response.payStr;
          my.tradePay({
            tradeNO: `${payNo}`, // 调用统一收单交易创建接口（alipay.trade.create），获得返回字段支付宝交易号trade_no
            success: res => {
              if (res.resultCode == 9000) {
                this.getOrderDetail();
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
          Toast({
            message: `${response.msg}`,
            position: "middle",
            duration: 1000
          });
        }
      );
    },
    //去支付
    handlePay() {
      const that = this;
      my.tradePay({
        tradeNO: `${that.orderDetail.payUrl}`, // 调用统一收单交易创建接口（alipay.trade.create），获得返回字段支付宝交易号trade_no
        success: res => {
          if (res.resultCode == 9000) {
            this.getOrderDetail();
          }
        },
        fail: res => {
          my.alert({
            content: JSON.stringify(res)
          });
        }
      });
    },
    getGoodsDetail() {
      const id = this.orderDetail.goodsId;
      goodService.getGoodsDetail(id).then(
        response => {
          console.log(response.code)
          if(!response.code){
            window.location.href = `${shopLink}?userId=${this.userId}&goodsId=${this.orderDetail.goodsId}`
          }else{
          Toast({
            message: "该商品过期不存在",
            position: "middle",
            duration: 1000
          });
          }
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    //去退款
    handleRefund() {
      this.getRefund();
      this.refundPopupState = false
    },
    handleClosePopup() {
      this.refundPopupState = false;
    },
    handlePopupOpen() {
      if (Number(this.orderDetail.orderStatus) === 2) {
        this.refundPopupState = true;
      } else {
        this.contactState = true;
      }
    },
    handleContact() {
      this.contactState = false;
    },
    //取消订单接口
    handleCancelOrder() {
      this.cancelOrder();
    },
    //确认收货接口
    handleConfirmReceipt() {
      this.confirmReceipt();
    },
    //获取返利信息
    getOrderReturnInfo() {
      const data = {
        orderNo: this.orderNo,
        userId: sessionStorage.getItem("userId")
      };
      orderDetail.getOrderReturnInfo(data).then(
        response => {
          console.log(response);
          this.RebateDetial.hasReturn = response.hasReturn;
          this.RebateDetial.returnMoney = response.returnMoney;
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    //获取订单详情
    getOrderDetail() {
      const orderNo = this.orderNo;
      orderDetail.getOrderDetail(orderNo).then(
        response => {
          const that = this;
          this.orderDetail = JSON.parse(JSON.stringify(response));
          this.totalDiscount = (
            Number(this.orderDetail.offsetPrice) +
            Number(this.orderDetail.discountPrice)
          ).toFixed(2);
          if (
            this.orderDetail.gmtActivityEnd &&
            this.orderDetail.gmtFinalPaymentStart
          ) {
            this.startTailMoneyMonth = this.orderDetail.gmtFinalPaymentStart.substring(5,7);
            this.startTailMoneyDay = this.orderDetail.gmtFinalPaymentStart.substring(8,10);
            this.startTailMoneyTime = this.orderDetail.gmtFinalPaymentStart.substring(10,16);
            this.endTailMoneyMonth = this.orderDetail.gmtActivityEnd.substring(5,7);
            this.endTailMoneyDay = this.orderDetail.gmtActivityEnd.substring(8,10);
            this.endTailMoneyTime = this.orderDetail.gmtActivityEnd.substring(10,16);
          }
          if (Number(this.orderDetail.orderStatus) === 1 || Number(this.orderDetail.orderStatus) === 6) {
            this.countTime();
          }
          if (
            this.orderDetail.logistic &&
            this.orderDetail.logistic === "qrcode"
          ) {
            this.$nextTick(() => {
              this.createQrcode(this.orderDetail.mailNo);
            });
          }
          if(sessionStorage.getItem("positionObj")){
            this.cityCode = JSON.parse(sessionStorage.getItem("positionObj")).cityCode;
            this.lat = JSON.parse(sessionStorage.getItem("positionObj")).lat;
            this.lng = JSON.parse(sessionStorage.getItem("positionObj")).lng;
          }
          if (window.AlipayJSBridge && !this.cityCode) {
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
          }else{
            that.getGoodsShopList();
          }
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    //获取门店信息
    getGoodsShopList() {
      const data = {
        goodsId: this.orderDetail.goodsId,
        userId: this.userId,
        lat: this.lat,
        lng: this.lng,
        cityCode: this.cityCode
      };
      goodService.getGoodsShopList(data).then(
        response => {
          if(response.data && Array.isArray(response.data)){
            this.storeList = response.data;
          }
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    //确认收货接口
    confirmReceipt() {
      const data = {
        orderNo: this.orderNo
      };
      orderDetail.confirmReceipt(data).then(
        response => {
          Toast({
            message: `收货成功`,
            position: "middle",
            duration: 1000
          });
          this.getOrderDetail();
        },
        response => {
          Toast({
            message: `${response.sub_msg}`,
            position: "middle",
            duration: 1000
          });
        }
      );
    },
    // 取消订单接口
    cancelOrder() {
      const data = {
        orderNo: this.orderNo
      };
      orderDetail.cancelOrder(data).then(
        response => {
          this.getOrderDetail();
        },
        response => {
          Toast({
            message: `${response.msg}`,
            position: "middle",
            duration: 1000
          });
        }
      );
    },
    //退款接口
    getRefund(orderNo) {
      const data = {
        orderNo: this.orderNo
      };
      orderDetail.getRefund(data).then(
        response => {
          setTimeout(() => {
            this.getOrderDetail();
          }, 2000);
          Toast({
            message: `退款申请中`,
            position: "middle",
            duration: 1000
          });
        },
        response => {
          Toast({
            message: `${response.msg}`,
            position: "middle",
            duration: 1000
          });
        }
      );
    },
    countTime() {
      //开始时间
      var date = new Date();
      var now = date.getTime();
      var end;
      var end = this.orderDetail.predictCloseTime;
      //时间差
      var leftTime = end - now;
      //定义变量 d,h,m,s保存倒计时的时间
      var d, h, m, s;
      if (leftTime >= 0) {
        m = Math.floor((leftTime / 1000 / 60) % 60);
      }
      this.time = m;
      //递归每秒调用countTime方法，显示动态时间效果
      setTimeout(this.countTime, 1000);
    }
  },
  mounted() {
    this.getOrderDetail();
    this.getOrderReturnInfo();
  },
  watch: {}
};
</script>
<style lang="scss" scoped >
.display-flex {
  display: flex;
}
.clearMove {
  position: fixed !important;
  width: 100%;
  overflow:hidden;
}
.marleft-auto {
  margin-left: auto !important;
}
.mt100 {
  margin-bottom: 1.333333rem /* 100/75 */;
}
.ml32 {
  margin-left: 0.426667rem /* 32/75 */;
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
.cl-red {
  color: #ff423d;
}
.order-detail {
  .header {
    width: 100%;
    height: 2.666667rem /* 200/75 */;
    background: linear-gradient(
      315deg,
      rgba(255, 151, 82, 1) 0%,
      rgba(255, 91, 87, 1) 100%
    );
    box-shadow: 0px 1px 0px 0px rgba(255, 255, 255, 0.08);
    .left {
      width: 5.88rem /* 441/75 */;
      div:nth-child(1) {
        font-size: 0.533333rem /* 40/75 */;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 0.746667rem /* 56/75 */;
        margin: 0.786667rem /* 59/75 */ 0 0.133333rem /* 10/75 */ 0.72rem
          /* 54/75 */;
      }
      div:nth-child(2) {
        font-size: 0.32rem /* 24/75 */;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        margin-left: 0.72rem /* 54/75 */;
      }
    }
    img {
      width: 4.12rem /* 309/75 */;
      height: 2.666667rem /* 200/75 */;
    }
  }
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
      }
    }
  }
  .content {
    display: flex;
    position: relative;
    align-items: center;
    width: 100%;
    height: 2.986667rem /* 224/75 */;
    .refundStatusName {
      position: absolute;
      color: #ff961f;
      font-family: Regular;
      font-size: 0.32rem /* 24/75 */;
      right: 0.426667rem /* 32/75 */;
      bottom: 0.426667rem /* 32/75 */;
    }
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
        }
        .number {
          position: absolute;
          right: 0;
          bottom: 0;
          color: rgba(122, 134, 154, 1);
        }
      }
      .second {
        padding: 0.06667rem 0.21333rem;
        height: 0.53333rem;
        text-align: center;
        line-height: 0.53333rem;
        background: #f4f5f7;
        border-radius: 0.05333rem;
        color: #7a869a;
        font-size: 0.26667rem;
        margin-top: 0.53333rem;
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
  .pre-sale-module {
    .mt12 {
      margin-top: 0.16rem /* 12/75 */;
    }
    .commline {
      font-size: 0.32rem /* 24/75 */;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      line-height: 0.853333rem /* 64/75 */;
      height: 0.853333rem /* 64/75 */;
      div:nth-child(1) {
        color: rgba(122, 134, 154, 1);
        margin-left: 1.173333rem /* 88/75 */;
        min-width: 1.28rem /* 96/75 */;
        text-align: justify;
      }
      div:nth-child(1):after {
        content: ".";
        display: inline-block;
        width: 100%;
        overflow: hidden;
        height: 0;
      }
      div:nth-child(3) {
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: #42526e;
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
          color: #091e42;
        }
      }
      .second {
        line-height: 0.853333rem /* 64/75 */;
        div:nth-child(2) {
          color: #091e42;
        }
      }
    }
  }
  .button {
    width: 1.333333rem /* 100/75 */;
    height: 0.586667rem /* 44/75 */;
    line-height: 0.586667rem /* 44/75 */;
    border-radius: 0.293333rem /* 22/75 */;
    border: 1px solid rgba(122, 134, 154, 1);
    margin-left: auto;
    margin-right: 0.426667rem /* 32/75 */;
    margin-bottom: 0.493333rem /* 37/75 */;
    margin-top: 0.133333rem /* 10/75 */;
    font-size: 0.32rem /* 24/75 */;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(122, 134, 154, 1);
    text-align: center;
  }
  .shop-detail {
    margin: 0 0.2rem /* 15/75 */ 0 1.173333rem /* 88/75 */;
    height: 0.853333rem /* 64/75 */;
    line-height: 0.853333rem /* 64/75 */;
    font-size: 0.32rem /* 24/75 */;
    overflow: hidden;
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
    .copy {
      margin-left: auto;
      margin-right: 0.533333rem /* 40/75 */;
      color: rgba(122, 134, 154, 1);
    }
  }
  .order-title {
    width: 100%;
    height: 1.226667rem /* 92/75 */;
    align-items: center;
    position: relative;
    overflow: hidden;
    div:nth-child(1) {
      width: 0.066667rem /* 5/75 */;
      height: 0.346667rem /* 26/75 */;
      background: linear-gradient(
        135deg,
        rgba(255, 105, 102, 1) 0%,
        rgba(255, 66, 61, 1) 100%
      );
      border-radius: 0.04rem /* 3/75 */;
      margin-left: 0.426667rem /* 32/75 */;
    }
    div:nth-child(2) {
      font-size: 0.373333rem /* 28/75 */;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: #42526e;
      margin-left: 0.213333rem /* 16/75 */;
    }
  }
  .order-title::after {
    content: "";
    height: 1px;
    position: absolute;
    left: 0.426667rem /* 32/75 */;
    width: 100%;
    bottom: 0;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 -1px 0px 0px rgba(0, 0, 0, 0.1);
  }
  .bottom {
    width: 100%;
    height: 1.306667rem /* 98/75 */;
    font-size: 0.373333rem /* 28/75 */;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    text-align: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    .cancel-button {
      width: 2.08rem /* 156/75 */;
      height: 0.773333rem /* 58/75 */;
      line-height: 0.773333rem /* 58/75 */;
      border-radius: 0.386667rem /* 29/75 */;
      border: 1px solid rgba(122, 134, 154, 1);
      color: #7a869a;
      margin-left: auto;
    }
    .purchase-button {
      width: 2.08rem /* 156/75 */;
      height: 0.773333rem /* 58/75 */;
      line-height: 0.773333rem;
      border-radius: 0.386667rem /* 29/75 */;
      border: 1px solid rgba(255, 66, 61, 1);
      color: #ff423d;
      margin-right: 0.426667rem /* 32/75 */;
      margin-left: 0.64rem /* 48/75 */;
    }
  }
  .virtual-goods-height {
    height: 9.973333rem /* 748/75 */ !important;
  }
  .virtual-goods {
    width: 100%;
    height: 6.986667rem /* 524/75 */;
    .title {
      font-size: 0.373333rem /* 28/75 */;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(66, 82, 110, 1);
      padding: 0.426667rem /* 32/75 */ 0 0 /* 32/75 */ 0.426667rem /* 32/75 */;
    }
    .code-content {
      margin: 1.12rem /* 84/75 */ 0.853333rem /* 64/75 */ 0.32rem /* 24/75 */
        0.853333rem /* 64/75 */;
      div:nth-child(1) {
        font-size: 0.533333rem /* 40/75 */;
        font-family: Avenir-Heavy;
        font-weight: 800;
        color: rgba(9, 30, 66, 1);
        line-height: 0.746667rem /* 56/75 */;
        text-align: center;
        width: 8.293333rem /* 622/75 */;
        word-wrap: break-word;
      }
      div:nth-child(2) {
        margin: 0.32rem /* 24/75 */ auto 0;
        width: 2.24rem /* 168/75 */;
        height: 0.853333rem /* 64/75 */;
        line-height: 0.853333rem /* 64/75 */;
        border-radius: 0.426667rem /* 32/75 */;
        opacity: 0.64;
        border: 1px solid rgba(94, 108, 132, 1);
        font-size: 0.32rem /* 24/75 */;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(122, 134, 154, 1);
        text-align: center;
      }
    }
    .qrcode-content {
      #qrcodeImg {
        width: 4.106667rem /* 308/75 */;
        height: 4.106667rem /* 308/75 */;
        margin: 0.426667rem /* 32/75 */ auto 0;
      }
      .copy {
        width: 2.24rem /* 168/75 */;
        height: 0.853333rem /* 64/75 */;
        line-height: 0.853333rem /* 64/75 */;
        border-radius: 0.426667rem /* 32/75 */;
        opacity: 0.64;
        border: 1px solid rgba(94, 108, 132, 1);
        margin: 0 auto;
        font-size: 0.32rem /* 24/75 */;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #7a869a;
        text-align: center;
      }
    }
    .exchange-number {
      width: 9.146667rem /* 686/75 */;
      background: rgba(244, 245, 247, 1);
      border-radius: 0.106667rem /* 8/75 */;
      margin: 0.693333rem /* 52/75 */ auto 0.426667rem /* 32/75 */;
      div {
        font-size: 0.426667rem /* 32/75 */;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(9, 30, 66, 1);
        line-height: 0.64rem /* 48/75 */;
        text-align: center;
        padding: 0.373333rem /* 28/75 */ 0.426667rem /* 32/75 */;
      }
    }
    .third-goods-type{
      display: flex;
      height:.586667rem /* 44/75 */;
      font-size:.373333rem /* 28/75 */;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(66,82,110,1);
      line-height:.586667rem /* 44/75 */;
      margin: .426667rem /* 32/75 */ .426667rem /* 32/75 */ 0 .426667rem /* 32/75 */;
      div:nth-child(2){
        margin-left: auto;
        font-size:.32rem /* 24/75 */;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color: #1890FF;
      }
    }
    .instructions{
      width: 9.146667rem /* 686/75 */;
      height: 4.96rem /* 372/75 */;
      background:rgba(244,245,247,1);
      border-radius:.106667rem /* 8/75 */;
      margin: .426667rem /* 32/75 */ auto;
      div{
        padding: .426667rem /* 32/75 */;
        font-size:.373333rem /* 28/75 */;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(9,30,66,1);
        line-height:.586667rem /* 44/75 */;
      }
    }
  }
}
</style>

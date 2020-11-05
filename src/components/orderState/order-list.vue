<template>
  <div class="order-list">
    <mt-navbar v-model="selected">
      <mt-tab-item id="0">
        <div @click="handleTab(0)">全部</div>
      </mt-tab-item>
      <mt-tab-item id="1">
        <div @click="handleTab(1)">待付款</div>
      </mt-tab-item>
      <mt-tab-item id="3">
        <div @click="handleTab(3)">待发货</div>
      </mt-tab-item>
      <mt-tab-item id="4">
        <div @click="handleTab(4)">待收货</div>
      </mt-tab-item>
      <mt-tab-item id="5">
        <div @click="handleTab(5)">已完成</div>
      </mt-tab-item>
    </mt-navbar>
    <div class="line"></div>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="0">
        <div v-if="orderList.length > 0">
          <div
            class="order-detail"
            v-for="(item,index) in orderList"
            :key="index"
          >
            <div class="header">
              <img
                src="../../assets/images/IcoStore.png"
                alt=""
              >
              <div class="second">{{item.brandName}}</div>
              <div
                class="third"
                v-if="item.orderStatus === 1"
              >待付款</div>
              <div
                class="third"
                v-else-if="item.orderStatus === 2"
              >付款成功</div>
              <div
                class="third"
                v-else-if="item.orderStatus === 3"
              >待发货</div>
              <div
                class="third"
                v-else-if="item.orderStatus === 4"
              >待收货</div>
              <div
                class="third"
                v-else-if="item.orderStatus === 6"
              >待付定金</div>
              <div
                class="third"
                v-else-if="item.orderStatus === 7"
              >待付尾款</div>
              <div
                class="third"
                v-else-if="item.orderStatus === 5"
              >交易完成</div>
              <div
                class="third"
                v-else-if="item.orderStatus === -1"
              >交易关闭</div>
            </div>
            <div
              class="content"
              @click="handleClick(item.orderNo)"
            >
              <img
                :src="item.pictUrl"
                alt=""
              >
              <div class="right">
                <div class="first display-flex">
                  <div>{{item.goodsName}}</div>
                  <div v-if="!item.activity">{{item.sellingPrice}}元</div>
                  <div v-else="!item.activity">{{item.activityPrice}}元</div>
                  <div class="number">x {{item.count}}</div>
                </div>
                <span
                  class="second"
                  v-show="item.specificationsOne || item.specificationsTwo"
                >{{item.specificationsOne}}{{item.specificationsTwo}}</span>
              </div>
              <div class="refundStatusName">{{item.refundStatusName}}</div>
            </div>
            <div class="prize display-flex">
              <div>共计{{item.count}}件商品</div>
              <div v-if="item.orderStatus === 6">应付定金：<span>{{item.prepaidPrice}}</span></div>
              <div v-else-if="item.orderStatus === 7">应付尾款：<span>{{item.needPayPrice}}</span></div>
              <div v-else>应付金额：<span>{{item.needPayPrice}}</span></div>
            </div>
            <div
              class="bottom-button"
              v-if="item.orderStatus === 1"
            >
              <div
                class="button2 mr40"
                @click="handleCancelOrder(item.orderNo)"
              >
                取消订单
              </div>
              <div
                class="button"
                @click="handlePay(item.payUrl)"
              >
                立即付款
              </div>
            </div>
            <div
              class="bottom-button"
              v-else-if="item.orderStatus === 4"
            >
              <div
                class="button mlauto"
                @click="handleConfirmReceipt(item.orderNo)"
              >
                确认收货
              </div>
            </div>
            <div
              class="bottom-button"
              v-else-if="item.orderStatus === 6"
            >
              <div
                class="button2 mr40"
                @click="handleCancelOrder(item.orderNo)"
              >取消订单</div>
              <div
                class="button"
                @click="handlePay(item.payUrl)"
              >支付定金</div>
            </div>
            <div
              class="bottom-button"
              v-else-if="item.orderStatus === 7"
            >
              <div
                class="button mlauto"
                v-if="item.finalpaidButton === 1"
                @click="handleGetCreateOrder(item.orderNo)"
              >
                支付尾款
              </div>
              <div
                class="tail-money-time"
                v-else
              >尾款时间:{{item.startTailMoneyMonth}}月{{item.startTailMoneyDay}}日{{item.startTailMoneyTime}}-{{item.endTailMoneyMonth}}月{{item.endTailMoneyDay}}日{{item.endTailMoneyTime}})</div>
            </div>
            <div class="line"></div>
          </div>
        </div>
        <div class="no-data" v-else>
          <div class="header"></div>
          <div class="content">暂无订单～</div>
          <div class="button" @click="handleShop">去商城逛逛</div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="1">
        <div v-if="orderList.length > 0">
          <div
            class="order-detail"
            v-for="(item,index) in orderList"
            :key="index"
          >
            <div class="header">
              <img
                src="../../assets/images/IcoStore.png"
                alt=""
              >
              <div class="second">{{item.brandName}}</div>
              <div
                class="third"
                v-if="item.orderStatus === 1"
              >待付款</div>
              <div
                class="third"
                v-else-if="item.orderStatus === 2"
              >付款成功</div>
              <div
                class="third"
                v-else-if="item.orderStatus === 3"
              >待发货</div>
              <div
                class="third"
                v-else-if="item.orderStatus === 4"
              >待收货</div>
              <div
                class="third"
                v-else-if="item.orderStatus === 5"
              >交易完成</div>
              <div
                class="third"
                v-else-if="item.orderStatus === 6"
              >待付定金</div>
              <div
                class="third"
                v-else-if="item.orderStatus === 7"
              >待付尾款</div>
              <div
                class="third"
                v-else-if="item.orderStatus === -1"
              >交易关闭</div>
            </div>
            <div
              class="content"
              @click="handleClick(item.orderNo)"
            >
              <img
                :src="item.pictUrl"
                alt=""
              >
              <div class="right">
                <div class="first display-flex">
                  <div>{{item.goodsName}}</div>
                  <div v-if="!item.activity">{{item.sellingPrice}}元</div>
                  <div v-else="!item.activity">{{item.activityPrice}}元</div>
                  <div class="number">x {{item.count}}</div>
                </div>
                <span
                  class="second"
                  v-show="item.specificationsOne || item.specificationsTwo"
                >{{item.specificationsOne}}{{item.specificationsTwo}}</span>
              </div>
              <div class="refundStatusName">{{item.refundStatusName}}</div>
            </div>
            <div class="prize display-flex">
              <div>共计{{item.count}}件商品</div>
              <div v-if="item.orderStatus === 6">应付定金：<span>{{item.prepaidPrice}}</span></div>
              <div v-else-if="item.orderStatus === 7">应付尾款：<span>{{item.needPayPrice}}</span></div>
              <div v-else>应付金额：<span>{{item.needPayPrice}}</span></div>
            </div>
            <div
              class="bottom-button"
              v-if="item.orderStatus === 1"
            >
              <div
                class="button2 mr40"
                @click="handleCancelOrder(item.orderNo)"
              >
                取消订单
              </div>
              <div
                class="button"
                @click="handlePay(item.payUrl)"
              >
                立即付款
              </div>
            </div>
            <div
              class="bottom-button"
              v-else-if="item.orderStatus === 4"
            >
              <div
                class="button mlauto"
                @click="handleConfirmReceipt(item.orderNo)"
              >
                确认收货
              </div>
            </div>
            <div
              class="bottom-button"
              v-else-if="item.orderStatus === 6"
            >
              <div
                class="button2 mr40"
                @click="handleCancelOrder(item.orderNo)"
              >取消订单</div>
              <div
                class="button"
                @click="handlePay(item.payUrl)"
              >
                支付定金
              </div>
            </div>
            <div
              class="bottom-button"
              v-else-if="item.orderStatus === 7"
            >
              <div
                class="button mlauto"
                v-if="item.finalpaidButton === 1"
                @click="handleGetCreateOrder(item.orderNo)"
              >
                支付尾款
              </div>
              <div
                class="tail-money-time"
                v-else
              >尾款时间:{{item.startTailMoneyMonth}}月{{item.startTailMoneyDay}}日{{item.startTailMoneyTime}}-{{item.endTailMoneyMonth}}月{{item.endTailMoneyDay}}日{{item.endTailMoneyTime}})</div>
            </div>
            <div class="line"></div>
          </div>
        </div>
        <div
          class="no-data"
          v-else
        >
          <div class="header"></div>
          <div class="content">暂无订单～</div>
          <div class="button" @click="handleShop">去商城逛逛</div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <div v-if="orderList.length > 0">
          <div
            class="order-detail"
            v-for="(item,index) in orderList"
            :key="index"
          >
            <div class="header">
              <img
                src="../../assets/images/IcoStore.png"
                alt=""
              >
              <div class="second">{{item.brandName}}</div>
              <div
                class="third"
                v-if="item.orderStatus === 1"
              >待付款</div>
              <div
                class="third"
                v-else-if="item.orderStatus === 2"
              >付款成功</div>
              <div
                class="third"
                v-else-if="item.orderStatus === 3"
              >待发货</div>
              <div
                class="third"
                v-else-if="item.orderStatus === 4"
              >待收货</div>
              <div
                class="third"
                v-else-if="item.orderStatus === 5"
              >交易完成</div>
              <div
                class="third"
                v-else-if="item.orderStatus === -1"
              >交易关闭</div>
            </div>
            <div
              class="content"
              @click="handleClick(item.orderNo)"
            >
              <img
                :src="item.pictUrl"
                alt=""
              >
              <div class="right">
                <div class="first display-flex">
                  <div>{{item.goodsName}}</div>
                  <div v-if="!item.activity">{{item.sellingPrice}}元</div>
                  <div v-else="!item.activity">{{item.activityPrice}}元</div>
                  <div class="number">x {{item.count}}</div>
                </div>
                <span
                  class="second"
                  v-show="item.specificationsOne || item.specificationsTwo"
                >{{item.specificationsOne}}{{item.specificationsTwo}}</span>
              </div>
              <div class="refundStatusName">{{item.refundStatusName}}</div>
            </div>
            <div class="prize display-flex">
              <div>共计{{item.count}}件商品</div>
              <div v-if="item.orderStatus === 6">应付定金：<span>{{item.prepaidPrice}}</span></div>
              <div v-else-if="item.orderStatus === 7">应付尾款：<span>{{item.needPayPrice}}</span></div>
              <div v-else>应付金额：<span>{{item.needPayPrice}}</span></div>
            </div>
            <div
              class="bottom-button"
              v-if="item.orderStatus === 1"
            >
              <div
                class="button2 mr40"
                @click="handleCancelOrder(item.orderNo)"
              >
                取消订单
              </div>
              <div
                class="button"
                @click="handlePay(item.payUrl)"
              >
                立即付款
              </div>
            </div>
            <div
              class="bottom-button"
              v-else-if="item.orderStatus === 4"
            >
              <div
                class="button mlauto"
                @click="handleConfirmReceipt(item.orderNo)"
              >
                确认收货
              </div>
            </div>
            <div
              class="bottom-button"
              v-else-if="item.orderStatus === 6"
            >
              <div
                class="button2 mr40"
                @click="handleCancelOrder(item.orderNo)"
              >取消订单</div>
              <div
                class="button"
                @click="handlePay(item.payUrl)"
              >
                支付定金
              </div>
            </div>
            <div
              class="bottom-button"
              v-else-if="item.orderStatus === 7"
            >
              <div
                class="button mlauto"
                v-if="item.finalpaidButton === 1"
                @click="handleGetCreateOrder(item.orderNo)"
              >
                支付尾款
              </div>
              <div
                class="tail-money-time"
                v-else
              >尾款时间:{{item.startTailMoneyMonth}}月{{item.startTailMoneyDay}}日{{item.startTailMoneyTime}}-{{item.endTailMoneyMonth}}月{{item.endTailMoneyDay}}日{{item.endTailMoneyTime}})</div>
            </div>
            <div class="line"></div>
          </div>
        </div>
        <div
          class="no-data"
          v-else
        >
          <div class="header"></div>
          <div class="content">暂无订单～</div>
          <div class="button" @click="handleShop">去商城逛逛</div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <div v-if="orderList.length > 0">
          <div
            class="order-detail"
            v-for="(item,index) in orderList"
            :key="index"
          >
            <div class="header">
              <img
                src="../../assets/images/IcoStore.png"
                alt=""
              >
              <div class="second">{{item.brandName}}</div>
              <div
                class="third"
                v-if="item.orderStatus === 1"
              >待付款</div>
              <div
                class="third"
                v-else-if="item.orderStatus === 2"
              >付款成功</div>
              <div
                class="third"
                v-else-if="item.orderStatus === 3"
              >待发货</div>
              <div
                class="third"
                v-else-if="item.orderStatus === 4"
              >待收货</div>
              <div
                class="third"
                v-else-if="item.orderStatus === 5"
              >交易完成</div>
              <div
                class="third"
                v-else-if="item.orderStatus === -1"
              >交易关闭</div>
            </div>
            <div
              class="content"
              @click="handleClick(item.orderNo)"
            >
              <img
                :src="item.pictUrl"
                alt=""
              >
              <div class="right">
                <div class="first display-flex">
                  <div>{{item.goodsName}}</div>
                  <div v-if="!item.activity">{{item.sellingPrice}}元</div>
                  <div v-else="!item.activity">{{item.activityPrice}}元</div>
                  <div class="number">x {{item.count}}</div>
                </div>
                <span
                  class="second"
                  v-show="item.specificationsOne || item.specificationsTwo"
                >{{item.specificationsOne}}{{item.specificationsTwo}}</span>
              </div>
              <div class="refundStatusName">{{item.refundStatusName}}</div>
            </div>
            <div class="prize display-flex">
              <div>共计{{item.count}}件商品</div>
              <div v-if="item.orderStatus === 6">应付定金：<span>{{item.prepaidPrice}}</span></div>
              <div v-else-if="item.orderStatus === 7">应付尾款：<span>{{item.needPayPrice}}</span></div>
              <div v-else>应付金额：<span>{{item.needPayPrice}}</span></div>
            </div>
            <div
              class="bottom-button"
              v-if="item.orderStatus === 1"
            >
              <div
                class="button2 mr40"
                @click="handleCancelOrder(item.orderNo)"
              >
                取消订单
              </div>
              <div
                class="button"
                @click="handlePay(item.payUrl)"
              >
                立即付款
              </div>
            </div>
            <div
              class="bottom-button"
              v-else-if="item.orderStatus === 4"
            >
              <div
                class="button mlauto"
                @click="handleConfirmReceipt(item.orderNo)"
              >
                确认收货
              </div>
            </div>
            <div
              class="bottom-button"
              v-else-if="item.orderStatus === 6"
            >
              <div
                class="button2 mr40"
                @click="handleCancelOrder(item.orderNo)"
              >取消订单</div>
              <div
                class="button"
                @click="handlePay(item.payUrl)"
              >
                支付定金
              </div>
            </div>
            <div
              class="bottom-button"
              v-else-if="item.orderStatus === 7"
            >
              <div
                class="button mlauto"
                v-if="item.finalpaidButton === 1"
                @click="handleGetCreateOrder(item.orderNo)"
              >
                支付尾款
              </div>
              <div
                class="tail-money-time"
                v-else
              >尾款时间:{{item.startTailMoneyMonth}}月{{item.startTailMoneyDay}}日{{item.startTailMoneyTime}}-{{item.endTailMoneyMonth}}月{{item.endTailMoneyDay}}日{{item.endTailMoneyTime}})</div>
            </div>
            <div class="line"></div>
          </div>
        </div>
        <div
          class="no-data"
          v-else
        >
          <div class="header"></div>
          <div class="content">暂无订单～</div>
          <div class="button" @click="handleShop">去商城逛逛</div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="5">
        <div v-if="orderList.length > 0">
          <div
            class="order-detail"
            v-for="(item,index) in orderList"
            :key="index"
          >
            <div class="header">
              <img
                src="../../assets/images/IcoStore.png"
                alt=""
              >
              <div class="second">{{item.brandName}}</div>
              <div
                class="third"
                v-if="item.orderStatus === 1"
              >待付款</div>
              <div
                class="third"
                v-else-if="item.orderStatus === 2"
              >付款成功</div>
              <div
                class="third"
                v-else-if="item.orderStatus === 3"
              >待发货</div>
              <div
                class="third"
                v-else-if="item.orderStatus === 4"
              >待收货</div>
              <div
                class="third"
                v-else-if="item.orderStatus === 5"
              >交易完成</div>
              <div
                class="third"
                v-else-if="item.orderStatus === -1"
              >交易关闭</div>
            </div>
            <div
              class="content"
              @click="handleClick(item.orderNo)"
            >
              <img
                :src="item.pictUrl"
                alt=""
              >
              <div class="right">
                <div class="first display-flex">
                  <div>{{item.goodsName}}</div>
                  <div v-if="!item.activity">{{item.sellingPrice}}元</div>
                  <div v-else="item.activity">{{item.activityPrice}}元</div>
                  <div class="number">x {{item.count}}</div>
                </div>
                <span
                  class="second"
                  v-show="item.specificationsOne || item.specificationsTwo"
                >{{item.specificationsOne}}{{item.specificationsTwo}}</span>
              </div>
              <div class="refundStatusName">{{item.refundStatusName}}</div>
            </div>
            <div class="prize display-flex">
              <div>共计{{item.count}}件商品</div>
              <div v-if="item.orderStatus === 6">应付定金：<span>{{item.prepaidPrice}}</span></div>
              <div v-else-if="item.orderStatus === 7">应付尾款：<span>{{item.needPayPrice}}</span></div>
              <div v-else>应付金额：<span>{{item.needPayPrice}}</span></div>
            </div>
            <div
              class="bottom-button"
              v-if="item.orderStatus === 1"
            >
              <div
                class="button2 mr40"
                @click="handleCancelOrder(item.orderNo)"
              >
                取消订单
              </div>
              <div
                class="button"
                @click="handlePay(item.payUrl)"
              >
                立即付款
              </div>
            </div>
            <div
              class="bottom-button"
              v-else-if="item.orderStatus === 4"
            >
              <div
                class="button mlauto"
                @click="handleConfirmReceipt(item.orderNo)"
              >
                确认收货
              </div>
            </div>
            <div
              class="bottom-button"
              v-else-if="item.orderStatus === 6"
            >
              <div
                class="button2 mr40"
                @click="handleCancelOrder(item.orderNo)"
              >取消订单</div>
              <div
                class="button"
                @click="handlePay(item.payUrl)"
              >
                支付定金
              </div>
            </div>
            <div
              class="bottom-button"
              v-else-if="item.orderStatus === 7"
            >
              <div
                class="button mlauto"
                v-if="item.finalpaidButton === 1"
                @click="handleGetCreateOrder(item.orderNo)"
              >
                支付尾款
              </div>
              <div
                class="tail-money-time"
                v-else
              >尾款时间:{{item.startTailMoneyMonth}}月{{item.startTailMoneyDay}}日{{item.startTailMoneyTime}}-{{item.endTailMoneyMonth}}月{{item.endTailMoneyDay}}日{{item.endTailMoneyTime}})</div>
            </div>
            <div class="line"></div>
          </div>
        </div>
        <div
          class="no-data"
          v-else
        >
          <div class="header"></div>
          <div class="content">暂无订单～</div>
          <div class="button" @click="handleShop">去商城逛逛</div>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
import orderDetail from "../../service/order/orderDetail.js";
import orderConfirm from "../../service/order/orderConfirm.js";
import  {volumeLink} from '../../config/index';
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      selected: "0",
      page: 1,
      state: this.$route.query.state || "0",
      userId: sessionStorage.getItem("userId") || this.$route.query.userId,
      orderList: []
    };
  },
  components: {},
  created() {},
  computed: {},
  methods: {
    handleTab(item) {
      this.page = 1;
      if (this.orderList.length > 0) {
        this.orderList = [];
      }
      this.getUserOrderList(item);
    },
    handlePay(payStr) {
      my.tradePay({
        tradeNO: `${payStr}`, // 调用统一收单交易创建接口（alipay.trade.create），获得返回字段支付宝交易号trade_no
        success: res => {
          if (res.resultCode == 9000) {
            this.orderList = [];
            this.page = 1;
            this.getUserOrderList(Number(this.selected));
          }
        },
        fail: res => {
          my.alert({
            content: JSON.stringify(res)
          });
        }
      });
    },
    //跳转到商城
    handleShop(){
      window.location.href = `${volumeLink}?userId=${this.userId}`
    },
    //跳转到详情页面
    handleClick(orderNo) {
      const router = `./orderDetail?orderNo=${orderNo}&userId=${this.userId}`;
      this.$router.push(router);
    },
    //取消订单
    handleCancelOrder(orderNo) {
      this.cancelOrder(orderNo);
    },
    //确认收货
    handleConfirmReceipt(orderNo) {
      this.confirmReceipt(orderNo);
    },
    //订单列表接口
    getUserOrderList(index) {
      const data = {
        page: this.page,
        pageSize: 10,
        userId: this.$route.query.userId
      };
      if (index != 0) {
        data.orderStatusList = [index];
      }
      if (Number(index) === 1) {
        data.orderStatusList = [1, 6, 7];
      }
      if (Number(index) === 3) {
        data.orderStatusList = [2, 3];
      }
      orderDetail.getUserOrderList(data).then(
        response => {
          this.page = this.page + 1;
          if (Array.isArray(response)) {
            response.forEach(item => {
              if (item.gmtActivityEnd && item.gmtFinalPaymentStart) {
                item.startTailMoneyMonth = item.gmtFinalPaymentStart.substring(
                  5,
                  7
                );
                item.startTailMoneyDay = item.gmtFinalPaymentStart.substring(
                  8,
                  10
                );
                item.startTailMoneyTime = item.gmtFinalPaymentStart.substring(
                  10,
                  16
                );
                item.endTailMoneyMonth = item.gmtActivityEnd.substring(5, 7);
                item.endTailMoneyDay = item.gmtActivityEnd.substring(8, 10);
                item.endTailMoneyTime = item.gmtActivityEnd.substring(10, 16);
              }
              this.orderList.push(item);
            });
          }
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    //确认收货接口
    confirmReceipt(orderNo) {
      const data = {
        orderNo: orderNo
      };
      orderDetail.confirmReceipt(data).then(
        response => {
          Toast({
            message: `收货成功`,
            position: "middle",
            duration: 1000
          });
          this.page = 1;
          this.orderList = [];
          this.getUserOrderList(Number(this.selected));
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    // 取消订单接口
    cancelOrder(orderNo) {
      const data = {
        orderNo: orderNo
      };
      orderDetail.cancelOrder(data).then(
        response => {
          Toast({
            message: `已取消订单`,
            position: "middle",
            duration: 1000
          });
          this.page = 1;
          this.orderList = [];
          this.getUserOrderList(Number(this.selected));
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    //去支付尾款
    handleGetCreateOrder(orderNo) {
      const that = this;
      let data = {
        activity: "persale",
        frontendUrl: "https://www.baidu.com",
        persaleActivity: "finalpaid",
        payType: "mapp",
        orderNo: orderNo
      };
      orderConfirm.getCreateOrder(data).then(
        response => {
          const orderNo = response.orderNo;
          const payNo = response.payStr;
          my.tradePay({
            tradeNO: `${payNo}`, // 调用统一收单交易创建接口（alipay.trade.create），获得返回字段支付宝交易号trade_no
            success: res => {
              if (res.resultCode == 9000) {
                this.orderList = [];
                this.page = 1;
                this.getUserOrderList(Number(this.selected));
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
    }
  },
  mounted() {
    this.selected = this.state.toString();
    this.getUserOrderList(this.state);
    const self = this;
    document.addEventListener("scroll", function() {
      const scrollTop = window.pageYOffset || document.body.scrollTop;
      if (
        document.body.scrollHeight == scrollTop + window.innerHeight &&
        self.orderList.length > 0
      ) {
        self.getUserOrderList(Number(self.selected));
      }
    });
  },
  watch: {}
};
</script>
<style>
.mint-navbar .mint-tab-item.is-selected {
  border-bottom: 2px solid #ff423d;
  color: #ff423d;
}
.refundStatusName {
  position: absolute;
  color: #ff961f;
  font-family: Regular;
  font-size: 0.32rem /* 24/75 */;
  right: 0.426667rem /* 32/75 */;
  bottom: 0.426667rem /* 32/75 */;
}
</style>

<style lang="scss" scoped >
.mlauto {
  margin-left: auto;
}
@import "order-list.styl";
</style>

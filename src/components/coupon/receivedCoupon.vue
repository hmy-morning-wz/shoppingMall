<template>
  <div class="coupon-detail">
    <div class="bg" @click="handleConfirm">
      <div class="content">
        <div class="title">优惠券</div>
        <div class="list">
          <div  class="coupon"  v-for="(item,index) in couponList" :key="index">
          <div class="left">
            <div class="first">
              <span>¥</span>
              <span>{{item.amount}}</span>
              <span>优惠券</span>
            </div>
            <div class="second">满{{item.limitMoney}}可用</div>
            <div class="third">有效期{{item.gmtActive}} - {{item.gmtExpired}}</div>
          </div>
          <div class="right">
            <!-- <div  v-if="item.hasReceive" class="opacity7">已领取</div> -->
            <div  @click="handleReceive(item.templateId)">立即领取</div>
            <img v-if="item.hasReceive" src="../../assets/images/received.png" alt="">
          </div>
        </div>
        </div>
        <div class="confirm" @click="handleConfirm">完成</div>
      </div>
    </div>
  </div>
</template>
<script>
// import commodityDetail from "../../service/life-city/preferential-shop";
import goodService from "../../service/order/good.js";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      couponList: []
    };
  },
  components: {},
  created() {},
  computed: {},
  methods: {
    handleConfirm() {
      this.$emit("value-coupon");
    },
    handleReceive(templateId) {
      this.receiveVoucher(templateId);
    },
    getVoucherList() {
      const data = {
        goodsId: this.$route.query.goodsId,
        aliUserId: this.$route.query.userId || sessionStorage.getItem("userId"),
      };
      goodService.getVoucherList(data).then(
        response => {
          if (Array.isArray(response.goodsVoucherList)) {
            this.couponList = response.goodsVoucherList;
            this.couponList.forEach(item => {
              if(item.gmtActive)item.gmtActive = item.gmtActive.substring(0, 10);
              if(item.gmtExpired)item.gmtExpired = item.gmtExpired.substring(0, 10);
            });
          }
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    receiveVoucher(templateId) {
      const data = {
        memo: "电商系统发优惠券",
        orderType: "30",
        platformType: 1,
        requestType: "sync",
        sendType: 1,
        userType: "2",
        templateId: templateId,
        userId:  this.$route.query.userId || sessionStorage.getItem("userId"),
      };
      goodService.receiveVoucher(data).then(
        response => {
          this.getVoucherList();
          Toast({
            message: "领取成功,快去使用",
            position: "middle",
            duration: 2000
          });
        },
        response => {
           Toast({
            message: `${response.sub_msg}`,
            position: "middle",
            duration: 1000
          });
          this.getVoucherList();
        }
      );
    }
  },
  mounted() {
    this.getVoucherList();
  },
  watch: {}
};
</script>

<style lang="scss" scoped >
.float-left {
  float: left;
}
.opacity7 {
  opacity: 0.7;
}
.mt64 {
  margin-top: 0.853333rem /* 64/75 */;
}
.pb100{
  padding-bottom: 1.6rem /* 120/75 */;
}
.coupon-detail {
  position: relative;
  .bg {
    width: 100%;
    min-height: 17.813333rem /* 1336/75 */;
    background: rgba(0, 0, 0, 0.72);
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 100;
    .content {
      position: relative;
      width: 10rem /* 750/75 */;
      height: 14.026667rem /* 1052/75 */;
      background: rgba(255, 255, 255, 1);
      border-radius: 0.266667rem /* 20/75 */ 0.266667rem /* 20/75 */ 0 0;
      position: fixed;
      z-index: 1000;
      bottom: 0;
      font-size: 0.426667rem /* 32/75 */;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      overflow: auto;
      .title {
        color: rgba(66, 82, 110, 1);
        text-align: center;
        margin: 0.533333rem /* 40/75 */ auto;
      }
      .list{
        width: 10rem /* 750/75 */;
        height: 10.4rem;
        overflow: auto;
      }
      .coupon {
        background: url("../../assets/images/coupon-bg.png") no-repeat;
        background-size: 100% 100%;
        width: 9.146667rem /* 686/75 */;
        height: 2.346667rem /* 176/75 */;
        margin: 0 auto 0.32rem /* 24/75 */;
        display: flex;
        .left {
          width: 7.013333rem /* 526/75 */;
          .first {
            color: #ffe9c2;
            margin-left: 0.426667rem /* 32/75 */;
            margin-top: 0.32rem /* 24/75 */;
            display: flex;
            align-items: center;
            span:nth-child(1) {
              font-size: 0.426667rem /* 32/75 */;
              font-family: Avenir-Heavy;
              font-weight: 800;
              margin-right: 0.106667rem /* 8/75 */;
            }
            span:nth-child(2) {
              font-size: 0.64rem /* 48/75 */;
              font-family: Avenir-Black;
              font-weight: 900;
              margin-right: 0.106667rem /* 8/75 */;
            }
            span:nth-child(3) {
              font-size: 0.373333rem /* 28/75 */;
              font-family: PingFangSC-Regular;
              font-weight: 400;
            }
          }
          .second {
            margin-left: 0.426667rem /* 32/75 */;
            font-size: 10px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: #fff;
            height: 0.48rem /* 36/75 */;
            line-height: 0.48rem /* 36/75 */;
          }
          .third {
            margin-left: 0.426667rem /* 32/75 */;
            font-size: 10px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            height: 0.48rem /* 36/75 */;
            line-height: 0.48rem /* 36/75 */;
          }
        }
        .right {
          width: 2.133333rem /* 160/75 */;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.373333rem /* 28/75 */;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          position: relative;
          img {
            width: 1.92rem /* 144/75 */;
            height: 1.066667rem /* 80/75 */;
            position: absolute;
            bottom:-6px;
            left: 0.266667rem /* 20/75 */;
          }
        }
      }
      .confirm {
        width: 9.146667rem /* 686/75 */;
        height: 1.28rem /* 96/75 */;
        line-height: 1.28rem /* 96/75 */;
        background: linear-gradient(
          135deg,
          rgba(255, 105, 102, 1) 0%,
          rgba(255, 66, 61, 1) 100%
        );
        border-radius: 0.64rem /* 48/75 */;
        margin: 0 auto 0.213333rem /* 16/75 */;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0.213333rem /* 16/75 */;
      }
    }
  }
}
</style>

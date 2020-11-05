<template>
  <div class="coupon-detail">
    <div class="bg">
      <div class="content">
        <div class="title">价格优惠</div>
        <div class="list">
          <div class="coupon" v-for="(item,index) in couponDetail" :key="index" :class="{opacity7: !item.canUse}">
            <div class="left">
              <div class="first">
                <span>¥</span>
                <span>{{item.amount}}</span>
              </div>
              <div class="second" v-if="item.limitMoney > 0">满{{item.limitMoney}}元可用</div>
              <div class="second" v-else>无门槛优惠券</div>
            </div>
            <div class="right">
              <div class="detail">
                <div class="first">{{item.voucherName}}</div>
                <div class="second">{{item.gmtActive}}至{{item.gmtExpired}}</div>
              </div>
              <div class="circle"  @click="handleCheck(index,item.isChecked)" v-if="item.canUse">
                <img src="../../assets/images/c-check.png" alt="" v-if="item.isChecked">
              </div>
              <div class="tip" v-show="!item.canUse">{{item.reason}}</div>
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

export default {
  props: ["count", "jumpTypes", "favorablePrice"],
  data() {
    return {
      couponDetail: [],
      amount: 0,
      voucherId: 0,
      sellingPrice: "",
      offsetPrice: "",
      indexs: 0,
      activityId: JSON.parse(sessionStorage.getItem("goodObj")).activityId,
      activity: JSON.parse(sessionStorage.getItem("goodObj")).activity,
    };
  },
  components: {},
  created() {},
  computed: {},
  methods: {
    handleCheck(indexs, isChecked) {
      this.couponDetail.forEach((item, index) => {
        if (indexs === index) {
          item.isChecked = !isChecked;
          this.indexs = indexs;
        } else {
          if (!isChecked) {
            item.isChecked = false;
          }
        }
      });
    },
    handleConfirm() {
      let voucher = {
        amount: 0,
        voucherId: 0
      };
      this.couponDetail.forEach(item => {
        if (item.isChecked) {
          if (item.canUse) {
            voucher.amount = item.amount;
            voucher.voucherId = item.voucherId;
          }
        }
      });
      this.$emit("value-coupon", voucher);
    },
    getSaleMessage() {
      const data = {
        count: this.count,
        skuId: JSON.parse(sessionStorage.getItem("goodObj")).skuId
      };
      if (this.activityId) data.activityId = this.activityId;
      if (this.activity) data.activity = this.activity;
      goodService.getSaleMessage(data).then(
        response => {
          this.offsetPrice = response.offsetPrice;
          this.sellingPrice = response.sellingPrice;
          this.getSelecVoucher();
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    getSelecVoucher(templateId) {
      let data = {
        goodsId: sessionStorage.getItem("goodsId"),
        aliUserId: sessionStorage.getItem("userId"),
        goodsPrice: ""
      };
      const count = this.count;
      const sellingPrice = (Number(this.sellingPrice) * count).toFixed(2);
      const offsetPrice = (Number(this.offsetPrice) * count).toFixed(2);
      if(this.activity === 'persale'){
        data.goodsPrice = (sellingPrice - offsetPrice).toFixed(2);
      }else{
        data.goodsPrice = sellingPrice;
      }
      goodService.getSelecVoucher(data).then(
        response => {
          if (Number(response.size) === 0) {
            return;
          }
          if (response.size > 0);
          {
            response.voucherList.forEach(item => {
              const obj = {
                amount: item.amount,
                canUse: item.canUse,
                gmtActive: item.gmtActive.substring(0, 10),
                gmtExpired: item.gmtExpired.substring(0, 10),
                limitMoney: item.limitMoney,
                voucherId: item.voucherId,
                voucherName: item.voucherName,
                reason: item.reason,
                isChecked: false
              };
              this.couponDetail.push(obj);
            });
          }
          if (this.couponDetail.length > 0)
            if (this.favorablePrice) {
              this.couponDetail[this.indexs].isChecked = true;
            }
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    }
  },
  mounted() {
    this.getSaleMessage();
  },
  watch: {
    jumpTypes() {
      if (this.jumpTypes) {
        this.couponDetail = [];
        this.getSelecVoucher();
      }
    }
  }
};
</script>
<style>
.opacity7 {
  opacity: 0.7;
}
.mint-cell-title {
  flex: 0;
  -webkit-box-flex: 0;
}
.mint-checkbox-input:checked + .mint-checkbox-core {
  background-color: #fff;
  border-color: #fff;
}
.mint-checkbox-input:checked + .mint-checkbox-core::after {
  border-color: #ff5e5a;
  -webkit-transform: rotate(45deg) scale(1);
  transform: rotate(45deg) scale(1);
}
.mint-checkbox-core {
  display: inline-block;
  background-color: #ff6f65;
  border-radius: 100%;
  border: 1px solid #ccc;
  position: relative;
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
</style>

<style lang="scss" scoped >
.float-left {
  float: left;
}
.pb120 {
  padding-bottom: 1.6rem /* 120/75 */;
}
.mt64 {
  margin-top: 0.853333rem /* 64/75 */;
}
.coupon-detail {
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
      .list{
        width: 10rem /* 750/75 */;
        height: 10.4rem;
        overflow: auto;
      }
      .title {
        background: url("../../assets/images/color-bar.png") no-repeat;
        background-size: 100% 100%;
        width: 3.2rem /* 240/75 */;
        height: 0.666667rem /* 50/75 */;
        line-height: 0.666667rem /* 50/75 */;
        margin: 0.546667rem /* 41/75 */ auto 0.746667rem /* 56/75 */;
        text-align: center;
        font-size: 0.426667rem /* 32/75 */;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(9, 30, 66, 1);
      }
      .coupon {
        // background: url("../../assets/images/coupon-bg.png") no-repeat;
        // background-size: 100% 100%;
        width: 9.36rem /* 702/75 */;
        height: 2.56rem /* 192/75 */;
        margin: 0 auto 0.32rem /* 24/75 */;
        display: flex;
        .left {
          background: url("../../assets/images/left-icon.png") no-repeat;
          background-size: 100% 100%;
          height: 2.56rem /* 192/75 */;
          width: 2.613333rem /* 196/75 */;
          .first {
            color: #FFFFFF;
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
              font-size: .746667rem /* 56/75 */;
              font-family: Avenir-Black;
              font-weight: 900;
              margin-right: 0.106667rem /* 8/75 */;
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
        }
        .right {
          width: 6.746667rem /* 506/75 */;
          border-radius:0 4px 4px 0;
          border:1px solid rgba(223,225,230,1);
          display: flex;
          align-items: center;
          position: relative;
          .detail{
            font-size: .373333rem /* 28/75 */;
            font-family:PingFangSC-Medium;
            font-weight:500;
            color:rgba(9,30,66,1);
            line-height:.586667rem /* 44/75 */;
            margin-left: .32rem /* 24/75 */;
            .first{
              width: 4.506667rem /* 338/75 */;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
            }
            .second{
              font-size:.32rem /* 24/75 */;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:rgba(122,134,154,1);
              margin-top: .213333rem /* 16/75 */;
            }
          }
          .circle {
            width: 20px;
            height: 20px;
            border-radius: 100%;
            border: 1px solid #ccc;
            display: flex;
            align-items: center;
            margin-left: .96rem /* 72/75 */;
            img {
              width: 20px;
              height: 20px;
            }
          }
          .tip{
            position: absolute;
            bottom: 0;
            right: .32rem /* 24/75 */;
            padding-left: .133333rem /* 10/75 */;
            padding-right: .133333rem /* 10/75 */;
            height:.546667rem /* 41/75 */;
            line-height:.546667rem /* 41/75 */;
            background:rgba(9,30,66,0.72);
            border-radius:.32rem /* 24/75 */ 0px 0px 0px;
            font-size:.32rem /* 24/75 */;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(255,255,255,1);
            text-align: center;
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

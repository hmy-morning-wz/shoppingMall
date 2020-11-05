<template>
  <div class="advance-sale">
    <div class="spike display-flex">
      <div class="left">
        <div>定金</div>
        <div>¥</div>
        <div>{{goods.prepaidPrice}}</div>
        <div>可抵{{goods.offsetPrice}}元</div>
      </div>
      <div class="right">
        <div class="first" v-if="startOrEnd">距开始仅剩</div>
        <div class="first" v-else>距结束仅剩</div>
        <div class="count-down display-flex ">
          {{day}}天{{hour}}小时{{minute}}分
        </div>
      </div>
    </div>
    <div class="pre-sale-price display-flex">
      <div>预售价</div>
      <div>¥</div>
      <div>{{goods.activityPrice}}</div>
      <div>原价:¥{{goods.marketPrice}}</div>
    </div>
    <div class="tail-money display-flex">
      <div>尾款</div>
      <div>¥</div>
      <div>{{goods.finalPayment}}</div>
    </div>
    <div class="Tips">(支付尾款时间：{{startTailMoneyMonth}}月{{startTailMoneyDay}}日{{startTailMoneyTime}}-{{endTailMoneyMonth}}月{{endTailMoneyDay}}日{{endTailMoneyTime}})</div>
    <div class="shop-name">{{goods.name}}</div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";

export default {
  props: ["goods"],
  data() {
    return {
      day: 0,
      hour: 0,
      minute: 0,
      startOrEnd:true,
      startTailMoneyMonth:0,
      startTailMoneyDay:0,
      startTailMoneyTime:0,
      endTailMoneyMonth:0,
      endTailMoneyDay:0,
      endTailMoneyTime:0,
    };
  },
  components: {},
  created() {},
  computed: {},
  methods: {
     countTime() {
      //开始时间
      var date = new Date();
      var now = date.getTime();
      var end;
      //设置截止时间
      if( Number(now) - Number(this.goods.gmtPerSaleStart) < 0 ){
        this.$emit("value-spike", false);
        end = this.goods.gmtPerSaleStart
      }else{
        end = this.goods.gmtPerSaleEnd;
        this.startOrEnd = false;
      }
      //时间差
      var leftTime = end - now;
      //定义变量 d,h,m,s保存倒计时的时间
      var d, h, m, s;
      if (leftTime >= 0) {
        d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
        h = Math.floor((leftTime / 1000 / 60 / 60) % 24);
        m = Math.floor((leftTime / 1000 / 60) % 60);
        s = Math.floor((leftTime / 1000) % 60);
      }
       this.day = d;
       this.hour = h;
       this.minute = m;
      //递归每秒调用countTime方法，显示动态时间效果
      setTimeout(this.countTime, 1000);
    }
  },
  mounted() {
    this.startTailMoneyMonth = this.goods.gmtFinalPaymentStart.substring(5,7);
    this.startTailMoneyDay = this.goods.gmtFinalPaymentStart.substring(8,10);
    this.startTailMoneyTime = this.goods.gmtFinalPaymentStart.substring(10,16);
    this.endTailMoneyMonth = this.goods.gmtActivityEnd.substring(5,7);
    this.endTailMoneyDay = this.goods.gmtActivityEnd.substring(8,10);
    this.endTailMoneyTime = this.goods.gmtActivityEnd.substring(10,16);
    this.countTime()
  },
  watch: {}
};
</script>
<style lang="scss" scoped >
.display-flex {
  display: flex;
}
.advance-sale {
  .shop-name{
    margin: .106667rem /* 8/75 */ .426667rem /* 32/75 */  .32rem /* 24/75 */ .426667rem /* 32/75 */;
    font-size:.426667rem /* 32/75 */;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(9,30,66,1);
    line-height:.64rem /* 48/75 */;
  }
  .spike {
    background: url("../../assets/images/spike-bg.png") no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 1.386667rem /* 104/75 */;
    .left {
      display: flex;
      margin-left: 0.426667rem /* 32/75 */;
      margin-top: 0.266667rem /* 20/75 */;
      height: 0.853333rem /* 64/75 */;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      font-size: 0.426667rem /* 32/75 */;
      align-items: center;
      div:nth-child(2) {
        margin-left: 0.16rem /* 12/75 */;
        margin-right: 0.053333rem /* 4/75 */;
      }
      div:nth-child(3) {
        font-size: 0.64rem /* 48/75 */;
      }
      div:nth-child(4) {
        height: 0.426667rem /* 32/75 */;
        line-height: 0.426667rem /* 32/75 */;
        background: rgba(255, 255, 255, 1);
        border-radius: 0.213333rem /* 16/75 */;
        font-size: 0.266667rem /* 20/75 */;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(255, 88, 77, 1);
        margin-left: 0.16rem /* 12/75 */;
        text-align: center;
        padding: 0 0.16rem /* 12/75 */;
      }
    }
    .right {
      margin-left: auto;
      margin-right: 0.32rem /* 24/75 */;
      text-align: center;
      .first {
        padding-top: 0.16rem /* 12/75 */;
        font-size: 0.266667rem /* 20/75 */;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        line-height: 0.373333rem /* 28/75 */;
        color: rgba(255, 255, 255, 1);
      }
      .count-down {
        margin-top: 0.08rem /* 6/75 */;
        font-size: 0.373333rem /* 28/75 */;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: #fff;
        line-height: 0.586667rem /* 44/75 */;
      }
    }
  }
  .pre-sale-price {
    font-family: Avenir-Heavy;
    font-weight: 800;
    height: 0.64rem /* 48/75 */;
    align-items: center;
    margin: 0.32rem /* 24/75 */ 0 0.213333rem /* 16/75 */ 0.426667rem
      /* 32/75 */;
    div:nth-child(1) {
      width: 1.12rem /* 84/75 */;
      height: 0.426667rem /* 32/75 */;
      text-align: center;
      background: linear-gradient(
        135deg,
        rgba(255, 132, 87, 1) 0%,
        rgba(255, 82, 93, 1) 100%
      );
      border-radius: 0.213333rem /* 16/75 */;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 0.426667rem /* 32/75 */;
      font-size: 0.266667rem /* 20/75 */;
    }
    div:nth-child(2) {
      font-size: 0.426667rem /* 32/75 */;
      color: rgba(255, 88, 77, 1);
      margin: 0 0.053333rem /* 4/75 */ 0 0.16rem /* 12/75 */;
    }
    div:nth-child(3) {
      color: rgba(255, 88, 77, 1);
      font-size: 0.64rem /* 48/75 */;
      margin-right: 0.16rem /* 12/75 */;
    }
    div:nth-child(4) {
      font-size: 0.32rem /* 24/75 */;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(179, 186, 197, 1);
      position: relative;
    }
    div:nth-child(4)::after {
        content: "";
        height: 1px;
        position: absolute;
        left: 0;
        width: 100%;
        bottom: 45%;
        background: #b3bac5;
      }
  }
  .tail-money {
    font-family: PingFangSC-Regular;
    font-weight: 400;
    margin: 0 0 0.106667rem /* 8/75 */ 0.426667rem /* 32/75 */;
    color: rgba(255, 88, 77, 1);
    height: 0.64rem /* 48/75 */;
    align-items: center;
    div:nth-child(1) {
      color: rgba(255, 255, 255, 1);
      font-size: 0.266667rem /* 20/75 */;
      text-align: center;
      width: 0.853333rem /* 64/75 */;
      height: 0.426667rem /* 32/75 */;
      background: linear-gradient(
        135deg,
        rgba(255, 132, 87, 1) 0%,
        rgba(255, 82, 93, 1) 100%
      );
      border-radius: 0.213333rem /* 16/75 */;
      line-height: 0.426667rem /* 32/75 */;
    }
    div:nth-child(2) {
      font-size: 0.32rem /* 24/75 */;
      font-family: Avenir-Heavy;
      font-weight: 800;
      margin: 0 0.053333rem /* 4/75 */ 0 0.16rem /* 12/75 */;
    }
    div:nth-child(3) {
      font-family: Avenir Heavy;
      font-size: 0.426667rem /* 32/75 */;
    }
  }
  .Tips {
    color: #1890ff;
    font-size: .32rem /* 24/75 */;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    margin-left: .426667rem /* 32/75 */;
  }
}
</style>

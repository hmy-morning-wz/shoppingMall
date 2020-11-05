<template>
  <div class="result">
    <div class="header">
      <div class="checked"></div>
      <div class="desc">支付成功</div>
    </div>
    <div class="bottom display-flex">
      <!-- <div class="button1" @click="handleBack">
        回到首页
      </div> -->
      <div class="button2" @click="handleOrder">
        查看订单
      </div>
    </div>
  </div>
</template>
<script>
// import commodityDetail from "../../service/life-city/preferential-shop";
export default {
  data() {
    return {
     orderNo: this.$route.query.orderNo,
    };
  },
  components: {},
  created() {},
  computed: {},
  methods: {
    handleOrder(){
      const orderNo = this.orderNo;
      const router = `./orderDetail?orderNo=${orderNo}`
      this.$router.push(router);
    },
    handleBack(){
      my.redirectTo({
          url: '/pages/index/index'
        })
    },
  },
  mounted() {},
  watch: {}
};
</script>

<style lang="scss" scoped >
.display-flex {
  display: flex;
}
.result {
  .header {
    background: url("../../assets/images/header.png") no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 5.88rem /* 441/75 */;
    overflow: hidden;
    .checked {
      background: url("../../assets/images/c-check.png") no-repeat;
      background-size: 100% 100%;
      width: 1.173333rem /* 88/75 */;
      height: 1.173333rem /* 88/75 */;
      margin: 2.666667rem /* 200/75 */ auto 0;
    }
    .desc {
      font-size: 0.426667rem /* 32/75 */;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin: 0.32rem /* 24/75 */ auto;
      text-align: center;
    }
  }
  .bottom {
    margin: 1.053333rem /* 79/75 */ 0.426667rem /* 32/75 */;
    font-size: 0.426667rem /* 32/75 */;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    text-align: center;
    justify-content: center;
    .button1 {
      width: 4.36rem /* 327/75 */;
      height: 1.28rem /* 96/75 */;
      line-height: 1.28rem /* 96/75 */;
      border-radius: 0.64rem /* 48/75 */;
      border: 1px solid #97a0af;
      color:#091E42;
    }
    .button2 {
      width: 4.36rem /* 327/75 */;
      height: 1.28rem /* 96/75 */;
      line-height: 1.28rem /* 96/75 */;
      background: linear-gradient(
        135deg,
        rgba(255, 105, 102, 1) 0%,
        rgba(255, 66, 61, 1) 100%
      );
      color: #fff;
      border-radius: .64rem /* 48/75 */;
      margin-left: .426667rem /* 32/75 */;
    }
  }
}
</style>

<template>
  <div class="container">
    <div class="img-icon">
      <img v-if="voucherTypeStr === 'coupon' || voucherTypeStr === 'exchangeVoucher'" class="img-icon" :src="details.voucherPic">
      <img v-else class="img-icon" src="https://front-h5.oss-cn-hangzhou.aliyuncs.com/img/icon-alipay.png">
    </div>
    
    <div class="background-container">
        
        <img v-if="details.voucherStatus === 3" class="img-label" src="../../assets/images/icon-lose-efficacy.png" alt>
        <img v-else-if="details.voucherStatus === 2" class="img-label" src="../../assets/images/icon-have-use.png" alt>
    
      <div class="voucher-name">{{details.voucherName}}</div>
      <div class="voucher-time">有效期{{details.gmtActive}}~{{details.gmtExpired}}</div>
      <div class="voucher-money">
        <div class="money-label">￥</div>
        <div class="money-value">{{details.amount}}</div>
      </div>
      <div  class="voucher-decs">
          <div v-if="details.limitMoney" class="voucher-decs">满{{details.limitMoney}}元可用</div></div>
      <!-- <div class="voucher-btn">立即使用</div> -->
      <div class="voucher-btn"></div>
      <div class="voucher-dash"></div>
      <div class="voucher-use" @click="useClick">
        <div class="text-use">使用说明</div>
        <img class="img-arrow" src="../../assets/images/coupon-arrow.png" alt>
      </div>
    </div>
  </div>
</template>
<script>
import voucher from "../../service/voucher/voucher.js";

export default {
  data() {
    return {
        voucherId : "",
        voucherTypeStr: "",
      details:{}
    };
  },
  components: {},
  created() {},
  computed: {},
  methods: {
    //订单列表接口
    queryUserVoucherInfo() {
      const data = {
        voucherId: this.voucherId,
      };
      voucher.queryUserVoucherInfo(data).then(
        response => {
          this.details = JSON.parse(JSON.stringify(response));
          let gmtActive = this.details.gmtActive;
          this.details.gmtActive = gmtActive.split(" ")[0];
          this.details.gmtExpired = this.details.gmtExpired.split(" ")[0];
        },
        response => {
          console.log(response.Message || "服务器连接失败！");
        }
      );
    },
    //跳转到历史卡券
    useClick() {
        this.$router.push({
                name: "instructionUse",
                query:{ voucherDesc: this.details.voucherDesc }
              });

    //   const router = `./instructionUse`;
    //   this.$router.push(router);
    },
  },
  mounted() {
      const voucherId = this.$route.query.voucherId ;
      const voucherTypeStr = this.$route.name;
      // console.log("voucherTypeStr111===",voucherTypeStr);
      // || "36518"
      this.voucherId = voucherId;
      this.voucherTypeStr = voucherTypeStr;
      // console.log("voucherTypeStr===",this.voucherTypeStr);
    this.queryUserVoucherInfo();
  },
  watch: {}
};
</script>
<style>
.mint-navbar .mint-tab-item.is-selected {
  border-bottom: 2px solid #ff423d;
  color: #091e42;
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  position:fixed;
  background: rgba(255, 66, 61, 1);
}
.background-container {
  width: 9.573333rem /* 718/75 */;
  height: 9.7866667rem /* 734/75 */;
  margin-top: 0.9866667rem /* 74/75 */;
  border-radius: 0.16rem /* 12/75 */;
  margin-left: auto;
  margin-right: auto;
  background: url("https://front-h5.oss-cn-hangzhou.aliyuncs.com/img/bg-voucher-white.png");
  background-size: 100%;
}
.img-icon {
  width: 1.333333rem /* 100/75 */;
  height: 1.333333rem /* 100/75 */;
  left: 0;
  right: 0;
  margin-top: 0.186667rem /* 14/75 */;
  margin-left: auto;
  margin-right: auto;
  position: absolute;
  border-radius:1.333333rem /* 100/75 */;
  /* background: rgba(223, 225, 230, 1); */
}
.voucher-name {
  font-size: 0.426667rem /* 32/75 */;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(9, 30, 66, 1);
  line-height: 0.64rem /* 48/75 */;
  margin-top: 0.88rem /* 66/75 */;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
.voucher-time {
  font-size: 0.32rem /* 24/75 */;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(122, 134, 154, 1);
  line-height: 0.53333rem /* 40/75 */;
  margin-top: 0.053333rem /* 4/75 */;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
.voucher-money {
  display: flex;
  justify-content: center;
  margin-top: 0.426667rem /* 32/75 */;
  text-align: center;
  align-items: flex-end;
  margin-left: auto;
  margin-right: auto;
}
.money-label {
  width: 0.2533333rem /* 19/75 */;
  height: 0.64rem /* 48/75 */;
  font-size: 0.426667rem /* 32/75 */;
  font-family: Avenir-Heavy;
  font-weight: 800;
  text-align: center;
  color: rgba(255, 66, 61, 1);
  line-height: 0.64rem /* 48/75 */;
  vertical-align: bottom;
}
.money-value {
  height: 1.226667rem /* 92/75 */;
  font-size: 1.013333rem /* 76/75 */;
  font-family: Avenir-Black;
  font-weight: 900;
  text-align: center;
  margin-left: 0.1066667rem /* 8/75 */;
  color: rgba(255, 66, 61, 1);
  line-height: 1.226667rem /* 92/75 */;
  vertical-align: bottom;
}
.voucher-decs {
  height: 0.48rem /* 36/75 */;
  font-size: 0.2666667rem /* 20/75 */;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(66, 82, 110, 1);
  line-height: 0.48rem /* 36/75 */;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
.voucher-btn {
  width: 4.36rem /* 327/75 */;
  height: 1.28rem /* 96/75 */;
  /* background: linear-gradient(
    135deg,
    rgba(255, 105, 102, 1) 0%,
    rgba(255, 66, 61, 1) 100%
  ); */
  border-radius: 0.64rem /* 48/75 */;
  line-height: 1.28rem /* 96/75 */;
  font-size: 0.426667rem /* 32/75 */;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  align-items: center;

  text-align: center;

  margin-left: auto;
  margin-right: auto;
  margin-top: 1.373333rem /* 103/75 */;
}
.voucher-dash {
  width: 8.8666667rem /* 665/75 */;
  height: 0;
  border-bottom: #97A0AF 0px dashed; /*#000000表示白色，边框宽度为一个像素，边框线型为虚线*/
  margin-left: auto;
  margin-right: auto;
  margin-top: 1.493333rem /* 112/75 */;
}
.voucher-use {
    display: flex;
}
.text-use{
   
height:1.3866667rem /* 104/75 */;
font-size:.3733333rem /* 104/75 */;
font-family:PingFangSC-Regular;
font-weight:400;
color:rgba(9,30,66,1);
line-height:1.3866667rem /* 104/75 */;
margin-left: 0.426667rem /* 32/75 */;
}
.img-arrow{
    width: 0.426667rem /* 32/75 */;
  height: 0.426667rem /* 32/75 */;
  margin-left: auto;
  margin-right: 0.426667rem /* 32/75 */;
  margin-top: auto;
  margin-bottom: auto;
}
.img-label{
    position: absolute;
    right: 0;
    margin-right: 0.213333rem /* 16/75 */;
    margin-top: 0.426667rem /* 32/75 */;
    width: 1.52rem /* 144/75 */;
  height: 1.33333rem /* 100/75 */;
}
</style>

<style lang="scss" scoped >
// @import "red-card-voucher.styl";
</style>

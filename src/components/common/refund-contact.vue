<template>
  <div class="contact-srvice">
    <div class="bg">
      <div class="content">
        <div class="title mt48">如需退款</div>
        <div class="title">请拨打以下客服电话</div>
        <div class="phone-number mt48">0571-87113360</div>
        <div class="button">
          <div class="left" @click="handleCancel">取消</div>
          <div class="right" v-if="miniprogram" @click="handleCallPhone">
            呼叫
          </div>
          <div class="right" v-else>
            <a href="tel:0571-87113360">呼叫</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import commodityDetail from "../../service/life-city/preferential-shop";

export default {
  data() {
    return {
      miniprogram: false,
    };
  },
  components: {},
  created() {},
  computed: {},
  methods: {
    handleCancel() {
      this.$emit("value-contact");
    },
    handleCallPhone(){
      my.postMessage({method:"makePhoneCall",param:{number:'0571-87113360'}})
    }
  },
  mounted() {
    const that = this
    if (window.AlipayJSBridge) {
      my.getEnv(function(res) {
        that.miniprogram = res.miniprogram;
      });
    }
  },
  watch: {}
};
</script>

<style lang="scss" scoped >
.mt48 {
  margin-top: 0.64rem /* 48/75 */ !important;
}
.contact-srvice {
  .bg {
    width: 100%;
    min-height: 17.813333rem /* 1336/75 */;
    background: rgba(0, 0, 0, 0.72);
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 100;
    .content {
      width: 6.266667rem /* 470/75 */;
      height: 5.546667rem /* 416/75 */;
      background-color: #fff;
      border-radius: 0.213333rem /* 16/75 */;
      border: 1px solid rgba(151, 151, 151, 1);
      margin: 4.266667rem /* 320/75 */ auto;
      overflow: hidden;
      .title {
        font-size: 0.32rem /* 24/75 */;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(66, 82, 110, 1);
        line-height: 0.533333rem /* 40/75 */;
        margin: 0 auto;
        text-align: center;
      }
      .phone-number {
        font-size: 0.64rem /* 48/75 */;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(9, 30, 66, 1);
        text-align: center;
      }
      .button {
        display: flex;
        margin: 0.853333rem /* 64/75 */ 0.533333rem /* 40/75 */ 0.64rem
          /* 48/75 */ 1.333333rem /* 100/75 */;
        align-items: center;
        .left {
          font-size: 0.32rem /* 24/75 */;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(9, 30, 66, 1);
        }
        .right {
          width: 2.24rem /* 168/75 */;
          height: 0.853333rem /* 64/75 */;
          line-height: 0.853333rem /* 64/75 */;
          border-radius: 0.426667rem /* 32/75 */;
          border: 2px solid rgba(255, 66, 61, 1);
          text-align: center;
          margin-left: auto;
          color: rgba(255, 66, 61, 1);
          a {
            font-size: 0.32rem /* 24/75 */;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(255, 66, 61, 1);
            text-decoration:none
          }
        }
      }
    }
  }
}
</style>

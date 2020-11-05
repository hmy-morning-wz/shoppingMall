<template>
  <div class="refund-popup">
    <div class="bg">
      <div class="content">
        <div class="title">确认对该商品进行退款？</div>
        <div class="button">
          <div class="left" @click="handleRefund">确认退款</div>
          <div class="right" @click="handleClose">再想想</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import commodityDetail from "../../service/life-city/preferential-shop";
import orderDetail from "../../service/order/orderDetail.js";

export default {
  data() {
    return {
      value: "哈哈哈"
    };
  },
  components: {},
  created() {},
  computed: {},
  methods: {
    handleRefund() {
      this.$emit("value-refund");
    },
    handleClose() {
      this.$emit("value-close");
    },
  },
  mounted() {},
  watch: {}
};
</script>

<style lang="scss" scoped >
.refund-popup {
  .bg {
    width: 100%;
    min-height: 17.813333rem /* 1336/75 */;
    background: rgba(0, 0, 0, 0.72);
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 100;
    .content {
      width: 7.226667rem /* 542/75 */;
      height: 4.266667rem /* 320/75 */;
      background-color: #fff;
      border-radius: 0.213333rem /* 16/75 */;
      border: 1px solid rgba(151, 151, 151, 1);
      margin: 4.266667rem /* 320/75 */ auto;
      overflow: hidden;
      .title {
        color: rgba(66, 82, 110, 1);
        font-size: 0.426667rem /* 32/75 */;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #42526E;
        line-height: .64rem /* 48/75 */;
        margin: 0 auto;
        margin-top: 1.066667rem /* 80/75 */;
        text-align: center;
      }
      .button{
        display: flex;
        margin: .96rem /* 72/75 */ .533333rem /* 40/75 */ .533333rem /* 40/75 */;
        font-size:.373333rem /* 28/75 */;
        font-family:PingFangSC-Regular;
        font-weight:400;
        text-align: center;
        height:1.066667rem /* 80/75 */;
        line-height:1.066667rem /* 80/75 */;
        .left{
          width:2.773333rem /* 208/75 */;
          border-radius:.56rem /* 42/75 */;
          border:1px solid rgba(179,186,197,1);
          color:#7A869A;
        }
        .right{
          width:2.773333rem /* 208/75 */;
          border-radius:.56rem /* 42/75 */;
          background:linear-gradient(135deg,rgba(33,182,255,1) 0%,rgba(24,144,255,1) 100%);
          margin-left:.613333rem /* 46/75 */;
          color: #fff;
        }
      }
    }
  }
}
</style>

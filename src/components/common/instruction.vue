<template>
  <div class="contact-srvice">
    <div class="bg">
      <div class="content">
        <div class="detail mt48">{{remark}}</div>
      </div>
      <img
      @click="handleClose"
      class="close"
        src="../../assets/images/close.png"
        alt=""
      >
    </div>
  </div>
</template>
<script>

export default {
   props: ["content"],
  data() {
    return {
      remark: '',
    };
  },
  components: {},
  created() {},
  computed: {},
  methods: {
    handleClose() {
      this.$emit("value-instruction");
    }
  },
  mounted() {
  },
  watch: {
    content(){
       this.remark = this.content.remark;
    }
  }
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
      width: 7.226667rem /* 542/75 */;
      background-color: #fff;
      border-radius: 0.213333rem /* 16/75 */;
      border: 1px solid rgba(151, 151, 151, 1);
      margin: 4.266667rem /* 320/75 */ auto .533333rem /* 40/75 */;
      overflow: hidden;
      .title {
        font-size:.533333rem /* 40/75 */;
        font-family:PingFangSC-Regular;
        width: 5.653333rem /* 424/75 */;
        font-weight:400;
        color:rgba(24,144,255,1);
        line-height:.746667rem /* 56/75 */;
        margin: 0  .786667rem /* 59/75 */;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .detail{
        font-size:.373333rem /* 28/75 */;
        font-family:PingFangSC-Regular;
        text-align: justify;
        font-weight:400;
        color:rgba(66,82,110,1);
        line-height:.586667rem /* 44/75 */;
        margin: .426667rem /* 32/75 */ .64rem /* 48/75 */ 1.066667rem /* 80/75 */ .64rem /* 48/75 */;
      }
    }
    .close{
      width: .64rem /* 48/75 */;
      height: .64rem /* 48/75 */;
      display: block;
      margin: 0 auto;
    }
  }
}
</style>

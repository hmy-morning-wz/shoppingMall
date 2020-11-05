<template>
  <div class="use-container">
    <div class="use-decs">使用说明</div>
    <div class="background-use-container">
        
        <div class="text-content">{{voucherDesc}}</div>
        
    </div>
    
  </div>
</template>
<script>
import voucher from "../../service/voucher/voucher.js";

export default {
  data() {
    return {
      voucherDesc:""
    };
  },
  components: {},
  created() {},
  computed: {},
  methods: {
    
  },
  mounted() {
      const voucherDesc = this.$route.query.voucherDesc || "";
      this.voucherDesc = voucherDesc
      console.log("voucherDesc===",this.voucherDesc)
    // this.queryUserVoucherInfo();
  },
  watch: {}
};
</script>
<style>
.mint-navbar .mint-tab-item.is-selected {
  border-bottom: 2px solid #ff423d;
  color: #091e42;
}
.use-container {
  width: 100%;
  height: 100%;
  
  position:fixed;
  background:rgba(244,245,247,1);
}
.use-decs{
height:0.5866667rem /* 44/75 */;
font-size:0.373333rem /* 28/75 */;
font-family:PingFangSC-Regular;
font-weight:400;
color:rgba(122,134,154,1);
line-height:0.5866667rem /* 44/75 */;
margin-left: 0.426667rem /* 32/75 */;
margin-top: 0.533333rem /* 40/75 */;
}
.background-use-container {
  width: 100% /* 686/75 */;
  margin-top: 0.213333rem /* 16/75 */;
  margin-left: auto;
  margin-right: auto;
  background:rgba(254,255,254,1);
  padding: 0.426667rem /* 32/75 */;
}
.text-content{
    white-space:pre-wrap;
    
font-size:0.373333rem /* 28/75 */;
font-family:PingFangSC-Regular;
font-weight:400;
color:rgba(9,30,66,1);
margin-right: 0.426667rem /* 32/75 */;
line-height:0.5866667rem /* 44/75 */;
}

</style>

<style lang="scss" scoped >
@import "red-card-voucher.styl";
</style>

<template>
  <div class="contact-srvice">
    <div class="bg">
      <div class="bottom">
        <div v-if="miniprogram" class="line" v-for="(item,index) in phoneListData" :key="index" @click="handleCallPhone(item)">
          <span class="tel">{{item}}</span>
        </div>
        <div v-else class="line" v-for="(item,index) in phoneListData" :key="index">
           <a class="tel" :href="'tel:' + item">{{item}}</a>
        </div>
        <div class="cancel" @click="handleCancel">取消</div>
      </div>
    </div>
  </div>
</template>
<script>
// import commodityDetail from "../../service/life-city/preferential-shop";

export default {
  props: ["phoneData"],
  data() {
    return {
       phoneListData: [],
       miniprogram: false,
    };
  },
  components: {},
  created() {},
  computed: {},
  methods: {
    handleCancel() {
      this.$emit("value-phone");
    },
    handleCallPhone(phone){
      const phoneNumber = phone.toString()
      my.postMessage({method:"makePhoneCall",param:{number:phoneNumber}})
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
  watch: {
    phoneData(){
      this.phoneListData = this.phoneData;
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
    background: rgba(0, 0, 0, 0.72);
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 100;
    .bottom{
      width: 100%;
      background: #fff;
      position: absolute;
      bottom:0;
      .line{
        height: 1.066667rem /* 80/75 */;
        line-height: 1.066667rem /* 80/75 */;
        text-align: center;
        position: relative;
      }
      .line::after {
        content: "";
        height: 1px;
        position: absolute;
        left: 0;
        width: 10rem;
        bottom: 0;
        background:black;
        opacity: 0.1;
      }
      .cancel{
        height: 1.466667rem /* 110/75 */;
        line-height: 1.466667rem /* 110/75 */;
        text-align: center;
      }
      .tel{
        text-decoration: none;
        color: #333;
      }
    }

  }
}
</style>

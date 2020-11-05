]<template>
   <div class="store-information">
      <div v-for="(item,index) in contentList" :key="index">
        <div class="header">
          <div class="left">适用门店</div>
          <div class="right" @click="handleOpenStore" v-if="number>1">
            <span>全部门店{{number}}家</span>
            <img src="../../assets/images/arrow.png" alt="">
          </div>
        </div>
        <div class="detail">
          <div class="first">{{item.shopName}}<span v-if="item.userDistance || item.userDistance === 0">（距您{{item.userDistance}})</span></div>
          <div class="second" v-if="item.siteDistance || item.siteDistance === 0">
            <img src="../../assets/images/icon-adress.png" alt="">
            距{{item.siteName}}{{item.siteDistance}}
          </div>
        <div v-if="item.lineName">
          <div class="third" v-for="(items,index) in item.lineName" :key="index">
            <span class="kuang">{{items}}</span>
          </div>
        </div>
        <div class="phone-Icon" v-if="item.phone.length > 1" @click="handlePhone"></div>
        <div class="phone-Icon" v-else-if="item.phone.length <=1 && miniprogram" @click="handleCallPhone(item.phone)">
        </div>
        <div class="phone-Icon" v-else-if="item.phone.length <=1 && !miniprogram">
          <a class="tel" :href="'tel:' + item.phone"></a>
        </div>
      </div>
      </div>
      <phone-list v-show="phoneType" :phoneData="phoneData" @value-phone="handlePhoneClose"></phone-list>
    </div>
</template>
<script>

import goodService from "../../service/order/good.js";
import phoneList from "./phone-list.vue";
import { Toast } from "mint-ui";

export default {
  props: ["storeList"],
  data() {
    return {
      contentList: [],
      number:0,
      phoneType: false,
      phoneData:[],
      miniprogram: false,
    };
  },
  components: {
    phoneList
  },
  created() {},
  computed: {},
  methods: {
    handleOpenStore(){
      this.$emit("open-store-popup");
    },
    handlePhone(){
      this.phoneType = true;
    },
    handlePhoneClose(){
      this.phoneType = false;
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
    storeList(){
      this.storeList.forEach((item,index) => {
        if(item.phone.indexOf(";") > -1){
          this.phoneData = item.phone.split(";");
          item.phone = item.phone.split(";")
        }else{
          item.phone = [item.phone]
        }
        if(item.userDistance > 1000){
          item.userDistance = `${(item.userDistance / 1000).toFixed(2)}公里`
        }else if(item.userDistance >= 0 && item.userDistance < 1000){
          item.userDistance = `${item.userDistance}米`
        }
        if(item.siteDistance > 1000){
          item.siteDistance = `${(item.siteDistance / 1000).toFixed(2)}公里`
        }else if(item.siteDistance >= 0 && item.siteDistance < 1000){
          item.siteDistance = `${item.siteDistance}米`
        }
      })
      this.contentList = this.storeList.slice(0,1)
      this.number = this.storeList.length;
    }
  }
};
</script>

<style lang="scss" scoped >
 .store-information{
    .header{
        display: flex;
        height: 1.293333rem /* 97/75 */;
        margin: 0 .506667rem /* 38/75 */ 0 .426667rem /* 32/75 */;
        align-items: center;
        font-size: .373333rem /* 28/75 */;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(66,82,110,1);
        position: relative;
        .right{
            margin-left: auto;
            display: flex;
            align-items: center;
            font-size: .32rem /* 24/75 */;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(122,134,154,1);
            height: .426667rem /* 32/75 */;
            img{
              width: .32rem /* 24/75 */;
              height: .32rem /* 24/75 */;
            }
        }
      }
    .header::after {
      content: "";
      height: 1px;
      position: absolute;
      width: 8.72rem /* 654/75 */;
      bottom: 0;
      background: #091E42;
      opacity: 0.1;
      right:0;
    }
    .detail{
      margin: .32rem /* 24/75 */ 0 .053333rem /* 4/75 */ .853333rem /* 64/75 */;
      position: relative;
      min-height: 1.066667rem /* 80/75 */;
      .first{
        font-family:PingFangSC-Regular;
        font-weight:400;
        color: #091E42;
        font-size: .373333rem /* 28/75 */;
        margin-bottom: .053333rem /* 4/75 */;
        span{
          color:#7A869A;
          font-size: .32rem /* 24/75 */;
        }
      }
      .second{
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:#7A869A;
        font-size: .32rem /* 24/75 */;
        line-height: .533333rem /* 40/75 */;
        display: flex;
        align-items: center;
        margin-bottom: .213333rem /* 16/75 */;
        img{
          width: .32rem /* 24/75 */;
          height: .32rem /* 24/75 */;
          margin-right: .106667rem /* 8/75 */;
        }
      }
      .third{
        margin-bottom: .426667rem /* 32/75 */;
        .kuang{
          font-size: .266667rem /* 20/75 */;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:rgba(24,144,255,1);
          height: .266667rem /* 20/75 */;
          line-height: .266667rem /* 20/75 */;
          border:1px solid rgba(24,144,255,1);
          padding: .08rem /* 6/75 */ .106667rem /* 8/75 */;
          display: inline-block;
          margin-left: .08rem /* 6/75 */;
        }
      }
      .phone-Icon{
        background: url("../../assets/images/phone-Icon.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        width: 1.066667rem /* 80/75 */;
        height: 1.066667rem /* 80/75 */;
        right: .746667rem /* 56/75 */;
        bottom: 0;
        .tel{
          width: 100%;
          height: 100%;
          position: absolute;
        }
      }
    }
  }
</style>

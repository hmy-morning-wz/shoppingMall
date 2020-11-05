]<template>
  <div class="applicable-store">
    <div class="bg">
      <div class="content">
        <div class="title">全部门店</div>
        <div class="list">
          <div class="detail" v-for="(item,index) in popupList" :key="index">
          <div class="first">{{item.shopName}}<span v-if="item.userDistance || item.userDistance === 0">（距您{{item.userDistance}}）</span></div>
          <div class="second" v-if="item.siteDistance || item.siteDistance === 0">
            <img
              src="../../assets/images/icon-adress.png"
              alt=""
            >
            距{{item.siteName}}{{item.siteDistance}}
          </div>
          <div v-if="item.lineName">
            <div
              class="third"
              v-for="(items,index) in item.lineName"
              :key="index"
            >
              <span class="kuang">{{items}}</span>
            </div>
          </div>
          <div class="phone-Icon" v-if="item.phone.length > 1" @click="handlePhone(index)"></div>
          <div class="phone-Icon" v-else-if="item.phone.length <= 1 && miniprogram" @click="handleCallPhone(item.phone)"></div>
          <div class="phone-Icon" v-else-if="item.phone.length <= 1 && !miniprogram">
            <a class="tel" :href="'tel:' + item.phone"></a>
          </div>
        </div>
        </div>
        <div class="confirm" @click="handleConfirm">确定</div>
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
      popupList: [],
      phoneType: false,
      phoneData:[],
      miniprogram:false,
    };
  },
  components: {
    phoneList
  },
  created() {},
  computed: {},
  methods: {
    handleConfirm() {
      this.$emit("close-store-popup");
    },
    handlePhone(index){
      this.phoneType = true;
      this.popupList.forEach((item,indexs) => {
        if(item.phone.length > 1 && index === indexs){
          this.phoneData = item.phone
        }
      })
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
    storeList() {
      this.popupList = this.storeList;
    }
  }
};
</script>

<style lang="scss" scoped >
.float-left {
  float: left;
}
.opacity7 {
  opacity: 0.7;
}
.mt64 {
  margin-top: 0.853333rem /* 64/75 */;
}
.pb100 {
  padding-bottom: 1.6rem /* 120/75 */;
}
.applicable-store {
  position: relative;
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
      .detail {
        margin: 0 /* 24/75 */ 0 0.746667rem /* 56/75 */ 0.853333rem /* 64/75 */;
        position: relative;
        min-height: 1.066667rem /* 80/75 */;
        .first {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: #091e42;
          font-size: 0.373333rem /* 28/75 */;
          margin-bottom: 0.053333rem /* 4/75 */;
          span {
            color: #7a869a;
            font-size: 0.32rem /* 24/75 */;
          }
        }
        .second {
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: #7a869a;
          font-size: 0.32rem /* 24/75 */;
          line-height: 0.533333rem /* 40/75 */;
          display: flex;
          align-items: center;
          img {
            width: 0.32rem /* 24/75 */;
            height: 0.32rem /* 24/75 */;
            margin-right: 0.106667rem /* 8/75 */;
          }
        }
        .third {
          margin-top: 0.213333rem /* 16/75 */;
          margin-bottom: 0.426667rem /* 32/75 */;
          .kuang {
            font-size: 0.266667rem /* 20/75 */;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(24, 144, 255, 1);
            height: 0.266667rem /* 20/75 */;
            line-height: 0.266667rem /* 20/75 */;
            border: 1px solid rgba(24, 144, 255, 1);
            padding: 0.08rem /* 6/75 */ 0.106667rem /* 8/75 */;
            display: inline-block;
            margin-left: 0.08rem /* 6/75 */;
          }
        }
        .phone-Icon {
          background: url("../../assets/images/phone-Icon.png") no-repeat;
          background-size: 100% 100%;
          position: absolute;
          width: 1.066667rem /* 80/75 */;
          height: 1.066667rem /* 80/75 */;
          right: 0.746667rem /* 56/75 */;
          bottom: 0;
          .tel {
            width: 100%;
            height: 100%;
            position: absolute;
          }
        }
      }
      .confirm {
        width: 9.146667rem /* 686/75 */;
        height: 1.28rem /* 96/75 */;
        line-height: 1.28rem /* 96/75 */;
        background: linear-gradient(
          135deg,
          rgba(255, 132, 87, 1) 0%,
          rgba(255, 82, 93, 1) 100%
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

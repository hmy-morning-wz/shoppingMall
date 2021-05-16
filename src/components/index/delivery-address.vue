<template>
    <div class="address">
      <div class="title">
        <div>当前配送至</div>
      </div>
      <div class="delivery">
        <div class="first"></div>
        <div class="second">
          <span>{{currentAddress.provinceName}}</span>
          <span>{{currentAddress.cityName}}</span>
          <span>{{currentAddress.districtName}}</span>
        </div>
      </div>
      <div class="title">
        <div>从我的收货地址选择</div>
      </div>
      <div
        class="select-address"
        v-for="(item,index) in address"
        :key="index"
        @click="handleSelectAdress(item)"
      >
        <div class="first">
          <span>{{item.name}}</span>
          <span>{{item.mobile}}</span>
        </div>
        <div class="second">
          <div
            class="label"
            v-show="item.defaultAddress == 1"
          >默认</div>
          <div class="detail-address">
            <span>{{item.provinceName}}</span>
            <span>{{item.cityName}}</span>
            <span>{{item.districtName}}</span>
            <span>{{item.address}}</span>
          </div>
        </div>
      </div>
      <div
        class="bottom"
        @click="handleAdress"
      >
        选择其它地区
      </div>

    </div>
</template>
<script>
import orderConfirm from "../../service/order/orderConfirm.js";

export default {
  props: ["addressDetail"],
  data() {
    return {
      selectAddressType: false,
      currentAddress: {
        provinceName: "",
        cityName: "",
        districtName: ""
      },
      address: []
    };
  },
  components: {
    

  },
  created() {},
  computed: {},
  methods: {
    //关闭弹窗
    handleClose() {
      this.$emit("value-popup");
    },
    handleAdress() {
      // const router = `./selectAddress`;
      // this.$router.push(router);
      document.title = "配送区域";
      this.$emit("open-select-address")
    },
    handleSelectAdress(item){
      this.currentAddress.provinceName = item.provinceName;
      this.currentAddress.provinceCode = item.provinceCode;
      this.currentAddress.cityName = item.cityName;
      this.currentAddress.cityCode = item.cityCode;
      this.currentAddress.districtName = item.districtName;
      this.currentAddress.districtCode = item.districtCode;
      this.$emit("value-delivery-address",this.currentAddress)
    },
    getUserAddressList() {
      const data = {
        userId: this.$route.query.userId
      };
      orderConfirm.getUserAddressList(data).then(
        response => {
          if (Array.isArray(response)) {
            this.address = response;
          }
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    }
  },
  mounted() {
    this.getUserAddressList();
  },
  watch: {
    addressDetail(){
      this.currentAddress.provinceName = this.addressDetail.provinceName
      this.currentAddress.cityName = this.addressDetail.cityName
      this.currentAddress.districtName = this.addressDetail.districtName
    }
  }
};
</script>

<style lang="scss" scoped >
.address {
  position: absolute;
  z-index: 1000;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  .title {
    width: 100%;
    height: 1.066667rem /* 80/75 */;
    background-color: #f4f5f7;
    line-height: 1.333333rem /* 100/75 */;
    div {
      font-size: 0.32rem /* 24/75 */;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(122, 134, 154, 1);
      padding-left: 0.426667rem /* 32/75 */;
    }
  }
  .delivery {
    width: 100%;
    height: 1.28rem /* 96/75 */;
    display: flex;
    align-items: center;
    position: relative;
    .first {
      background: url("../../assets/images/adress.png") no-repeat;
      background-size: 100% 100%;
      width: 0.853333rem /* 64/75 */;
      height: 0.853333rem /* 64/75 */;
      margin: 0 0.32rem /* 24/75 */ 0 0.426667rem /* 32/75 */;
    }
    .second {
      height: 0.64rem /* 48/75 */;
      font-size: 0.373333rem /* 28/75 */;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(9, 30, 66, 1);
      line-height: 0.64rem /* 48/75 */;
    }
    .third {
      background: url("../../assets/images/arrow.png") no-repeat;
      background-size: 100% 100%;
      width: 0.426667rem /* 32/75 */;
      height: 0.426667rem /* 32/75 */;
      margin-left: auto;
      margin-right: 0.426667rem /* 32/75 */;
    }
  }
  .select-address {
    position: relative;
    padding-bottom: 0.426667rem /* 32/75 */;
    .first {
      margin: 0.426667rem /* 32/75 */ 0.426667rem /* 32/75 */ 0.213333rem
        /* 16/75 */ 0.426667rem;
      /* 32/75 */
    }
    .second {
      display: flex;
      margin: 0 0.426667rem /* 32/75 */ 0.426667rem /* 32/75 */ 0.426667rem;
      overflow: hidden;
      /* 32/75 */
      .label {
        width: 0.88rem /* 66/75 */;
        height: 0.426667rem /* 32/75 */;
        background: linear-gradient(
          135deg,
          rgba(255, 105, 102, 1) 0%,
          rgba(255, 66, 61, 1) 100%
        );
        border-radius: 0.053333rem /* 4/75 */;
        font-size: 0.266667rem /* 20/75 */;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 0.426667rem /* 32/75 */;
        text-align: center;
        margin-right: 0.266667rem /* 20/75 */;
      }
      .detail-address {
        font-size: 0.373333rem /* 28/75 */;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(66, 82, 110, 1);
      }
    }
  }
  .select-address::after {
    content: "";
    height: 1px;
    position: absolute;
    left: 0.426667rem /* 32/75 */;
    width: 9.573333rem /* 718/75 */;
    bottom: 0;
    background: #fffaef;
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  }
  .bottom {
    width: 9.146667rem /* 686/75 */;
    height: 1.28rem /* 96/75 */;
    line-height: 1.28rem /* 96/75 */;
    background: linear-gradient(
      135deg,
      rgba(255, 105, 102, 1) 0%,
      rgba(255, 66, 61, 1) 100%
    );
    border-radius: 0.64rem /* 48/75 */;
    font-size: 0.426667rem /* 32/75 */;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    margin: 0 auto;
    text-align: center;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0.48rem /* 36/75 */;
  }
}
</style>

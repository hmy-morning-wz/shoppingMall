<template>
  <div class="order-list" style="opacity: 0.5; margin-bottom:4rem;">
    <div v-if="showEmpty" class="empty_data1">
      <div>
        <img
          class="icon_empty"
          src="https://front-h5.oss-cn-hangzhou.aliyuncs.com/img/icon_empty_data.png"
          alt
        >
      </div>
      <div class="text_empty1">暂无红包卡券</div>
    </div>
    <div
      class="order-detail"
      @click="handleClick(item)"
      v-for="(item,index) in vpList"
      :key="index"
    >
      <!-- <div class="header">
            <img src="../../assets/images/IcoStore.png" alt>
            <div class="second">店铺名称</div>
            <div class="third">待付款</div>
      </div>-->
      <div
        class="content bg_ali"
        :class="{ bg_voucher:item.voucherTypeStr === '优惠券' || item.voucherTypeStr === '兑换券'}"
      >
        <img
          v-if="item.voucherTypeStr === '优惠券' || item.voucherTypeStr === '兑换券'"
          :src="item.voucherPic"
          alt
        >
        <img v-else src="https://front-h5.oss-cn-hangzhou.aliyuncs.com/img/icon-alipay.png" alt>
        <div class="right">
          <div class="display-flex">
            <div
              class="money"
              :class="{money2:item.voucherTypeStr === '优惠券' || item.voucherTypeStr === '兑换券'}"
            >￥</div>
            <div
              class="prize"
              :class="{prize2:item.voucherTypeStr === '优惠券' || item.voucherTypeStr === '兑换券'}"
            >{{item.priceStr}}</div>
            <div
              class="voucher_text"
              :class="{voucher_text2:item.voucherTypeStr === '优惠券' || item.voucherTypeStr === '兑换券'}"
            >{{item.voucherTypeStr}}</div>
          </div>

          <div
            class="desc"
            :class="{desc2:item.voucherTypeStr === '优惠券' || item.voucherTypeStr === '兑换券'}"
          >满{{item.floorAmount}}元可用</div>

          <div
            class="time"
            :class="{time2:item.voucherTypeStr === '优惠券' || item.voucherTypeStr === '兑换券'}"
          >有效期 {{item.gmtActive}} - {{item.gmtExpired}}</div>
        </div>
        <div
          class="check"
          :class="{check2:item.voucherTypeStr === '优惠券' || item.voucherTypeStr === '兑换券'}"
        >点击查看</div>
      </div>
      <!-- <div class="line"></div> -->
    </div>
    <!-- <div class="line"></div> -->
  </div>
</template>
<script>
import voucher from "../../service/voucher/voucher.js";

export default {
  data() {
    return {
      showEmpty: false,
      userId: "",
      vpList: []
    };
  },
  components: {},
  created() {},
  computed: {},
  methods: {
    //订单列表接口
    getVpList() {
      const data = {
        canUse: false,
        pageNo: 1,
        pageSize: 100,
        userId: this.userId 
        // || "2088702267429045"
      };
      voucher.getVpList(data).then(
        response => {
          if (response.code === "20000") {
            if (response.data && response.data.length != 0) {
              this.showEmpty = false;
              this.vpList = JSON.parse(JSON.stringify(response.data));
              for (let index = 0; index < this.vpList.length; index++) {
                const element = this.vpList[index];
                this.vpList[index].gmtActive = this.vpList[
                  index
                ].gmtActive.split(" ")[0];
                this.vpList[index].gmtExpired = this.vpList[
                  index
                ].gmtExpired.split(" ")[0];
              }
              console.log(this.vpList);
            }else{
              this.vpList = [] ;
              this.showEmpty = true;
            }
          }
        },
        response => {
         this.vpList = [] ;
          this.showEmpty = true;
        Toast({
          message: response.message || response.sub_msg || response.msg || '服务器返回错误'+response.code,
          position: "middle",
          duration: 1000
        });
          console.log(response.message || "服务器连接失败！3");
        }
      );
    },
    //跳转到详情页面
    handleClick(item) {
      if (item.voucherTypeStr === "优惠券") {
        this.$router.push({
          name: "coupon",
          query: { voucherId: item.voucherId }
        });
      } else if (item.voucherTypeStr === "兑换券") {
        this.$router.push({
          name: "exchangeVoucher",
          query: { voucherId: item.voucherId }
        });
      } else if (item.voucherTypeStr === "乘车券") {
        this.$router.push({
          name: "driveVoucher",
          query: { voucherId: item.voucherId }
        });
      }else if (item.voucherTypeStr === "乘车红包") {
        this.$router.push({
          name: "redPacket",
          query: { voucherId: item.voucherId }
        });
      }
    }
  },
  mounted() {
    const userId = this.$route.query.userId;
    this.userId = userId;
    this.getVpList();
  },
  watch: {}
};
</script>
<style>
.mint-navbar .mint-tab-item.is-selected {
  border-bottom: 0.03rem solid #ff423d;
  color: #091e42;
}
.empty_data1 {
  position: absolute;
  width: 2.24rem /* 168/75 */;
}
.icon_empty {
  width: 1.92rem /* 144/75 */;
  height: 1.92rem /* 144/75 */;
  margin-left: 4.04rem;
}
.text_empty1 {
  width: 2.34rem /* 168/75 */;
  height: 0.59rem;
  font-size: 0.37rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(179, 186, 197, 1);
  line-height: 0.59rem;
  margin-left: 3.88rem;
}
</style>

<style lang="scss" scoped >
@import "red-card-voucher.styl";
</style>

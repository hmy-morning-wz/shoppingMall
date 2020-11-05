<template>
  <div class="order-list">
    <div v-if="showEmpty" class="empty_data">
      <div>
        <img
          class="icon_empty"
          src="https://front-h5.oss-cn-hangzhou.aliyuncs.com/img/icon_empty_data.png"
          alt
        >
      </div>
      <div class="text_empty">暂无红包卡券</div>
    </div>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">
        <div @click="handleTab(1)">全部</div>
      </mt-tab-item>
      <mt-tab-item id="2">
        <div @click="handleTab(2)">乘车券</div>
      </mt-tab-item>
      <mt-tab-item id="3">
        <div @click="handleTab(3)">乘车红包</div>
      </mt-tab-item>
      <mt-tab-item id="4">
        <div @click="handleTab(4)">优惠券</div>
      </mt-tab-item>
      <!-- <mt-tab-item id="5">兑换券</mt-tab-item> -->
    </mt-navbar>
    <!-- <div class="line"></div> -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
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
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
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
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
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
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
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
      </mt-tab-container-item>
    </mt-tab-container>
    <div>
      <div v-if="showEmpty === false" class="text-history" @click="historyClick">查看已使用和已过期红包卡券></div>
    </div>
  </div>
</template>
<script>
import voucher from "../../service/voucher/voucher.js";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      showEmpty: false,
      selected: "1",
      vpList: [],
      voucherType: ""
    };
  },
  components: {},
  created() {},
  computed: {},
  methods: {
    handleTab(item) {
      if (item === 1) {
        this.voucherType = "";
      } else if (item === 2) {
        this.voucherType = "FIX_VOUCHER";
      } else if (item === 3) {
        this.voucherType = "COUPON";
      } else if (item === 4) {
        this.voucherType = "CASH";
      }
      this.getVpList();
    },
    //订单列表接口
    getVpList() {
      const data = {
        pageNo: 1,
        pageSize: 100,
        userId: this.$route.query.userId ,
        // || "2088702267429045"
        voucherType: this.voucherType
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
            } else {
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
    //跳转到历史卡券
    historyClick() {
      // console.log("userId===",this.$route.query.userId)
      this.$router.push({
          name: "redCardVoucherNoUse",
          query: { userId: this.$route.query.userId }
        });
      // const router = `./redCardVoucherNoUse`;
      // this.$router.push(router);
    },
    //跳转到详情页面
    handleClick(item) {
      // console.log("voucherId===", item.voucherId);
      // console.log("===voucherTypeStr===", item.voucherTypeStr);
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
      // const router = `./coupon`;
      // this.$router.push(router);
    }
  },
  mounted() {
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
.empty_data {
  position: absolute;
  width: 2.24rem /* 168/75 */;
  margin-top: 5.87rem /*440 /75*/;
}
.icon_empty {
  width: 1.92rem /* 144/75 */;
  height: 1.92rem /* 144/75 */;
  margin-left: 4.04rem;
}
.text_empty {
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

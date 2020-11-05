<template>
  <div class="selling-point">
    <div class="bg" @click="handleConfirm">
      <div class="content">
        <div class="title">品质服务</div>
        <div class="list">
          <div class="detail" v-for="(item,index) in sellPointList" :key="index">
            <div class="left">
            </div>
            <div class="right">
              <div class="first">{{item.name}}</div>
              <div class="second">{{item.description}}</div>
            </div>
          </div>
        </div>
        <div
          class="confirm"
          @click="handleConfirm"
        >确定</div>
      </div>
    </div>
  </div>
</template>
<script>
// import commodityDetail from "../../service/life-city/preferential-shop";
import goodService from "../../service/order/good.js";
import { Toast } from "mint-ui";

export default {
  props: ["goods"],
  data() {
    return {
      sellPointList: []
    };
  },
  components: {},
  created() {},
  computed: {},
  methods: {
    handleConfirm() {
      this.$emit("value-sell-point");
    },
    getVoucherList() {
      const data = {
        goodsId: this.$route.query.goodsId || 1,
        aliUserId: sessionStorage.getItem("userId") || 2088512180518706
      };
      goodService.getVoucherList(data).then(
        response => {
          if (Array.isArray(response.goodsVoucherList)) {
            this.couponList = response.goodsVoucherList;
            this.couponList.forEach(item => {
              if (item.gmtActive)
                item.gmtActive = item.gmtActive.substring(0, 10);
              if (item.gmtExpired)
                item.gmtExpired = item.gmtExpired.substring(0, 10);
            });
          }
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    }
  },
  mounted() {},
  watch: {
    goods() {
      if (this.goods.sellPointList && this.goods.sellPointList.length > 0)
        this.sellPointList = this.goods.sellPointList;
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
.selling-point {
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
        display: flex;
        margin: 0 0.426667rem /* 32/75 */ 0.426667rem /* 32/75 */;
        .left {
          background: url("../../assets/images/spike-icon.png") no-repeat;
          background-size: 100% 100%;
          width: 0.426667rem /* 32/75 */;
          height: 0.426667rem /* 32/75 */;
          margin-top: 0.08rem /* 6/75 */;
        }
        .right {
          width: 8.293333rem /* 622/75 */;
          text-align: justify;
          margin-left: 0.426667rem /* 32/75 */;
          font-size: 0.373333rem /* 28/75 */;
          line-height: 0.586667rem /* 44/75 */;
          .first {
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(255, 150, 31, 1);
          }
          .second {
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(9, 30, 66, 1);
            width: 8.293333rem /* 622/75 */;
            word-wrap: break-word;
            word-break: break-all;
            white-space: pre-wrap;
            text-align: justify;
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

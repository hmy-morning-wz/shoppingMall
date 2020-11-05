<template>
  <div class="spike-compont">
    <div class="spike display-flex">
      <div class="left">
        <div class="top">
          <div class="prize"><span>¥</span><span>{{goods.activityPrice}}</span></div>
          <div class="stock">仅剩{{goods.sumRemainCount}}件</div>
        </div>
        <div class="bottom">
          <img
            src="../../assets/images/spike-title.png"
            alt=""
          >
          <div class="original-price">¥{{goods.marketPrice}}</div>
        </div>
      </div>
      <div
        class="right"
        v-if="type"
      >
        <div
          class="first"
          v-if="startOrEnd"
        >距开始仅剩</div>
        <div
          class="first"
          v-else
        >距结束仅剩</div>
        <div class="count-down display-flex">
          <div class="kuang">{{hour}}</div>：
          <div class="kuang">{{minute}}</div>：
          <div class="kuang">{{second}}</div>
          <!-- <div class="kuang">{{Millisecond}}</div> -->
        </div>
      </div>
      <div
        class="right"
        v-else
      >
        <div
          class="first"
          v-if="startOrEnd"
        >距开始仅剩</div>
        <div
          class="first"
          v-else
        >距结束仅剩</div>
        <div class="count-down display-flex ">
          {{day}}天{{hour}}小时{{minute}}分
        </div>
      </div>
    </div>
    <div class="shop-name">{{goods.name}}</div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";

export default {
  props: ["goods"],
  data() {
    return {
      type: true,
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
      Millisecond: 0,
      startOrEnd: true
    };
  },
  components: {},
  created() {},
  computed: {},
  methods: {
    countTime() {
      //开始时间
      var date = new Date();
      var now = date.getTime();
      var end;
      if (Number(now) - Number(this.goods.gmtStart) < 0) {
        end = this.goods.gmtStart;
        this.$emit("value-spike", false);
      } else {
        end = this.goods.gmtEnd;
        this.startOrEnd = false;
      }
      //设置截止时间
      // var end = this.goods.gmtEnd;
      //时间差
      var leftTime = end - now;
      //定义变量 d,h,m,s保存倒计时的时间
      var d, h, h2,m, s, sec;
      if (leftTime >= 0) {
        d = this.checkTime(Math.floor(leftTime / 1000 / 60 / 60 / 24));
        h = this.checkTime(Math.floor(leftTime / 1000 / 60 / 60 % 24));
        h2 = this.checkTime(Math.floor(leftTime / 1000 / 60 / 60));
        m = this.checkTime(Math.floor((leftTime / 1000 / 60) % 60));
        s = this.checkTime(Math.floor((leftTime / 1000) % 60));
        sec = Math.floor(leftTime % 10);
      }
      this.day = d;
      if (h2 >= 100){
        this.type = false
        this.hour = h
      }else{
        this.hour = h2;
      }
      this.minute = m;
      this.second = s;
      this.Millisecond = sec;
      //递归每秒调用countTime方法，显示动态时间效果
      setTimeout(this.countTime, 1000);
    },
    checkTime(i) {
        if(i < 10){
          i = '0' + i;
      }
      return i
    }
  },
  mounted() {
    this.countTime();
  },
  watch: {}
};
</script>


<style lang="scss" scoped >
.display-flex {
  display: flex;
}
.spike-compont {
  .shop-name {
    margin: 0.32rem /* 24/75 */ 0.426667rem /* 32/75 */ 0.32rem /* 24/75 */
      0.426667rem /* 32/75 */;
    font-size: 0.426667rem /* 32/75 */;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(9, 30, 66, 1);
    line-height:.64rem /* 48/75 */;
  }
  .spike {
    background: url("../../assets/images/spike-bg.png") no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 1.386667rem /* 104/75 */;
    .left {
      margin-left: 0.426667rem /* 32/75 */;
      .top {
        display: flex;
        height: .853333rem /* 64/75 */;
        align-items: center;
        .prize {
          font-family: Avenir-Heavy;
          font-weight: 800;
          color: #fff;
          span:nth-child(1) {
            font-size: 0.426667rem /* 32/75 */;
          }
          span:nth-child(2) {
            font-size: 0.64rem /* 48/75 */;
          }
        }
        .stock {
          height: 0.426667rem /* 32/75 */;
          background: rgba(255, 255, 255, 1);
          border-radius: 0.213333rem /* 16/75 */;
          font-size: 0.266667rem /* 20/75 */;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(255, 88, 77, 1);
          text-align: center;
          margin: 0 /* 20/75 */ 0 0 0.16rem /* 12/75 */;
          padding: 0 0.16rem /* 12/75 */;
        }
      }
      .bottom {
        display: flex;
        img {
          width: 1.706667rem /* 128/75 */;
          height: 0.373333rem /* 28/75 */;
        }
        .original-price {
          font-size: 0.32rem /* 24/75 */;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 0.4rem /* 40/75 */;
          margin-left: .213333rem /* 16/75 */;
          position: relative;
          width: fit-content;
          width: -webkit-fit-content;
          width: -moz-fit-content;
          opacity: 0.72;
        }
        .original-price::after {
          content: "";
          height: 1px;
          position: absolute;
          left: 0;
          width: 100%;
          bottom: 50%;
          background: #fff;
        }
      }
    }
    .right {
      margin-left: auto;
      margin-right: 0.32rem /* 24/75 */;
      text-align: center;
      .first {
        padding-top: 0.16rem /* 12/75 */;
        font-size: 0.266667rem /* 20/75 */;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        line-height: 0.373333rem /* 28/75 */;
        color: rgba(255, 255, 255, 1);
      }
      .count-down {
        margin-top: 0.08rem /* 6/75 */;
        color: #fff;
        line-height: 0.586667rem /* 44/75 */;
        .kuang {
          width: 0.533333rem /* 40/75 */;
          height: 0.533333rem /* 40/75 */;
          line-height: 0.533333rem /* 40/75 */;
          background: rgba(255, 255, 255, 1);
          border-radius: 0.053333rem /* 4/75 */;
          text-align: center;
          color: #ff584d;
          font-family: PingFangSC-Medium;
          font-weight: 500;
        }
      }
    }
  }
}
</style>

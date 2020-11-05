<template>
  <div class="specification">
    <div class="bg">
      <div class="content">
        <div class="goods">
          <img class="img" :src="commodityImg" alt="">
          <div class="prize">
            <div class="first">¥ {{sellingIntervalPrice}}</div>
            <div class="second" v-if="selectedColor || selectedSize">
              <span>已选：<span>{{selectedColor}}</span><span class="ml10">{{selectedSize}}</span></span>
              <span class="surplus">(剩余<span>{{sumRemainCount}}</span>件)</span>
            </div>
          </div>
          <div
            class="close"
            @click="handleClose"
          ></div>
        </div>
        <div class="delivery" @click="handleAdress" v-if="goods.type === 1">
          <div class="first"></div>
          <div class="second" v-if="currentAddress.provinceName">
            <div>
              <span>{{currentAddress.provinceName}}</span>
              <span>{{currentAddress.cityName}}</span>
              <span>{{currentAddress.districtName}}</span>
            </div>
            <div class="tips" v-if="!isCheckDelivery">该地区暂不支持配送</div>
          </div>
          <div class="second" v-else>请选择配送区域</div>
          <div class="third"></div>
        </div>
        <div class="color mt64" v-show="specificationsOneName">
          <div class="color-title">{{specificationsOneName}}</div>
          <div class="color-select">
            <div
              class="float-left block"
              v-for="(item,index) in specificationsOne"
              :key="index"
              @click="handleSelected(index,item.content,item.type)"
              :class="{ nostorage: item.type == false, select:firstSelect === index && item.type}"
            >{{item.content}}
            </div>
          </div>
        </div>
        <div class="color mt64" v-show="specificationsTwoName">
          <div class="color-title">{{specificationsTwoName}}</div>
          <div class="color-select">
            <div
              class="float-left block2"
              v-for="(items,index) in specificationsTwo"
              :key="index"
              @click="handleSelected2(index,items.content,items.type)"
              :class="{ nostorage: items.type == false, select:secondSelect === index && items.type}"
            >{{items.content}}</div>
          </div>
        </div>
        <div class="purchase-quantity">
          <div class="title">购买数量：</div>
          <div class="number">
            <div
              class="reduce"
              @click="subtract"
            >
              <div></div>
            </div>
            <div class="count">
              <input
                type="number"
                v-model="count"
                @keyup="inputOnlyNumber"
              >
            </div>
            <div
              class="plus"
              @click="add"
            >
              <div></div>
            </div>
          </div>
        </div>
        <div class="confirm" @click="handleSure" v-if="sumRemainCount > 0 && isCheckDelivery">确定</div>
        <div class="confirm confirm2" v-else-if="!isCheckDelivery">该地区暂不支持</div>
        <div class="confirm confirm2" v-else-if="sumRemainCount <= 0">确定</div>
      </div>
    </div>
    <deliveryAddress :addressDetail="distributionArea" v-show="deliveryAdressType" @open-select-address="handleOpenSelectAddress" @value-delivery-address="handleGetValueAddress"></deliveryAddress>
    <selectAddress v-show="selectAddressType" @value-select-address="handleGetSelectAddress"></selectAddress>
  </div>
</template>
<script>
import goodService from "../../service/order/good.js";
import orderConfirm from "../../service/order/orderConfirm.js";
import deliveryAddress from "./delivery-address.vue";
import selectAddress from "./select-address.vue";
import { Toast } from "mint-ui";

export default {
  props: ["goods","sku","distributionArea"],
  data() {
    return {
      deliveryAdressType: false,
      selectAddressType: false,
      isCheckDelivery: true,
      commodityImg: '',
      currentAddress: {
        provinceName: "",
        provinceCode: "",
        cityName: "",
        cityCode: "",
        districtName: "",
        districtCode: "",
      },
      selectedColor: "",
      selectedSize: "",
      sellingIntervalPrice: "",
      sessionSellPrice: "",
      sessionSumCount: "",
      sumRemainCount: "0",
      skuId: "",
      count: 1,
      firstSelect: "",
      secondSelect: "",
      specificationsOneName: "",
      specificationsTwoName: "",
      specificationsOne: [],
      specificationsTwo: [],
      contentArray: []
    };
  },
  components: {
    deliveryAddress,
    selectAddress
  },
  created() {},
  computed: {},
  methods: {
    handleOpenSelectAddress(){
      this.selectAddressType = true;
      // this.deliveryAdressType = false;
    },
    handleGetValueAddress(content){
      this.deliveryAdressType = false;
      this.currentAddress  = content;
    },
    handleGetSelectAddress(content){
      this.currentAddress  = content;
      this.selectAddressType = false;
      this.deliveryAdressType = false;
    },
    // getUserAddressList() {
    //   const data = {
    //     userId: this.$route.query.userId,
    //   };
    //   orderConfirm.getUserAddressList(data).then(
    //     response => {
    //       if (Array.isArray(response)) {
    //         this.currentAddress.provinceName = response[0].provinceName;
    //         this.currentAddress.cityName = response[0].cityName;
    //         this.currentAddress.districtName = response[0].districtName;
    //         this.addressList = response[0]
    //       }
    //     },
    //     response => {
    //       console.log(response.Message || "服务器连接失败！3");
    //     }
    //   );
    // },
    //判断地区是否支持接送
    getCheckDelivery() {
      const data = {
        goodsId: this.$route.query.goodsId,
        districtCode: this.currentAddress.districtCode,
        cityCode: this.currentAddress.cityCode,
        provinceCode: this.currentAddress.provinceCode
      };
      return orderConfirm.getCheckDelivery(data).then(
        response => {
          if (response.supportDelivery === 0) {
            this.isCheckDelivery = false;
            Toast({
              message: "该收货地址暂不接受配送",
              position: "middle",
              duration: 1000
            });
            return
          }
        },
        response => {
          this.isCheckDelivery = false;
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    //跳转到订单确认页面
    async handleSure() {
      const that = this;
      if(this.goods.type === 1) await this.getCheckDelivery()
            console.log(this.isCheckDelivery)
      if(!this.isCheckDelivery){
        return
      }
      if(!this.currentAddress.provinceName && this.goods.type === 1){
         Toast({
            message: `请选择配送区域`,
            position: "middle",
            duration: 1000
        });
        return
      }
      if (this.specificationsOneName && this.specificationsTwoName) {
        if (this.selectedColor && this.selectedSize) {
          this.contentArray.forEach(item => {
            if (
              item.specificationsOne === this.selectedColor &&
              item.specificationsTwo === this.selectedSize
            ) {
              this.skuId = item.skuId;
            }
          });
          const goodObj = {
            count: this.count,
            skuId: this.skuId,
            activityId: this.goods.activityId,
            activity: this.goods.activity,
          };
          sessionStorage.setItem("goodObj", JSON.stringify(goodObj));
          const router = `./orderConfirm`;
          this.$router.push(router);
        } else if (this.selectedColor === "" && this.selectedSize) {
          Toast({
            message: `请选择${this.specificationsOneName}`,
            position: "middle",
            duration: 1000
          });
        } else if (this.selectedSize === "" && this.selectedColor) {
          Toast({
            message: `请选择${this.specificationsTwoName}`,
            position: "middle",
            duration: 1000
          });
        } else {
          Toast({
            message: `请选择规格`,
            position: "middle",
            duration: 1000
          });
        }
      }
      if (this.specificationsOneName && !this.specificationsTwoName) {
        if (this.selectedColor) {
          this.contentArray.forEach(item => {
            if (item.specificationsOne === this.selectedColor) {
              this.skuId = item.skuId;
            }
          });
           const goodObj = {
            count: this.count,
            skuId: this.skuId,
            activityId: this.goods.activityId,
            activity: this.goods.activity,
          };
          sessionStorage.setItem("goodObj", JSON.stringify(goodObj));
          const router = `./orderConfirm`;
          this.$router.push(router);
        } else {
          Toast({
            message: `请选择${this.specificationsOneName}`,
            position: "middle",
            duration: 1000
          });
        }
      }
    },
    handleSelected(index, item, type) {
      if (!type) return;
      //未选中时
      if (this.firstSelect === index) {
        this.firstSelect = "";
        this.selectedColor = "";
        this.sellingIntervalPrice = this.sessionSellPrice;
        this.sumRemainCount = this.sessionSumCount;
        this.specificationsTwo.forEach(element => {
          element.type = true;
        });
        //选中时
      } else {
        this.firstSelect = index;
        this.selectedColor = item;
        //有第二种规格时
        if (this.specificationsTwoName) {
          if (this.selectedColor && this.selectedSize) {
            this.contentArray.forEach(item => {
              if (item.specificationsOne === this.selectedColor && item.specificationsTwo === this.selectedSize) {
                this.sumRemainCount = item.remainCount;
                this.sellingIntervalPrice = item.sellingPrice;
                if(item.photo){
                  this.commodityImg = item.photo;
                }else{
                  this.commodityImg = this.goods.pictUrl;
                }
              }
            });
          }
          //颜色和尺码之间的级联关系
          const array = [];
          this.contentArray.forEach(element => {
            if (element.specificationsOne === item) {
              array.push(element.specificationsTwo);
            }
          });
          this.specificationsTwo.forEach(element => {
            element.type = false;
            array.forEach(elements => {
              if (elements == element.content) {
                element.type = true;
              }
            });
          });
        } else {
          this.contentArray.forEach(item => {
            if (item.specificationsOne === this.selectedColor) {
              if(item.photo)this.commodityImg = item.photo;
              this.sumRemainCount = item.remainCount;
              this.sellingIntervalPrice = item.sellingPrice;
            }
          });
        }
      }
    },
    handleSelected2(index, item, type) {
      if (!type) return;
      if (this.secondSelect === index) {
        this.secondSelect = "";
        this.selectedSize = "";
        this.sellingIntervalPrice = this.sessionSellPrice;
        this.sumRemainCount = this.sessionSumCount;
        this.specificationsOne.forEach(element => {
          element.type = true;
        });
      } else {
        this.secondSelect = index;
        this.selectedSize = item;
        if (this.selectedColor && this.selectedSize) {
          this.contentArray.forEach(item => {
            if (item.specificationsOne === this.selectedColor && item.specificationsTwo === this.selectedSize) {
              this.sumRemainCount = item.remainCount;
              this.sellingIntervalPrice = item.sellingPrice;
               if(item.photo){
                this.commodityImg = item.photo;
              }else{
                this.commodityImg = this.goods.pictUrl;
              }
            }
          });
        }
        //颜色和尺码之间的级联关系
        const array = [];
        this.contentArray.forEach(element => {
          if (element.specificationsTwo === item) {
            array.push(element.specificationsOne);
          }
        });
        this.specificationsOne.forEach(element => {
          element.type = false;
          array.forEach(elements => {
            if (elements == element.content) {
              element.type = true;
            }
          });
        });
      }
    },
    //关闭弹窗
    handleClose() {
      const obj = {
        selectedColor: this.selectedColor,
        selectedSize: this.selectedSize
      };
      this.$emit("value-popup", obj);
    },
    handleAdress() {
      this.deliveryAdressType = true;
      this.isCheckDelivery = true;
      document.title = "收货地址";
      if(navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){
          let iframe = document.createElement("iframe");
          iframe.style.display="none";
          iframe.setAttribute("src", "../../static/title.html");
          let d = function() {
          setTimeout(function() {
              iframe.removeEventListener('load', d);
              document.body.removeChild(iframe);
          }, 0);
        };
          iframe.addEventListener('load', d);
          document.body.appendChild(iframe);
         }
    },
    add: function(count) {
      if (this.sumRemainCount > this.count) {
          this.count++;
      }
    },
    subtract: function(count) {
       if (this.count <= 1) {
          this.count = 1;
        } else {
          this.count -= 1;
        }
    },
    getGoodsSkuList() {
      const id = this.$route.query.goodsId;
      goodService.getGoodsSkuList(id).then(
        response => {
          this.specificationsOneName = response.specificationsOneName;
          this.specificationsTwoName = response.specificationsTwoName;
          this.sellingIntervalPrice = response.sellingIntervalPrice;
          this.sumRemainCount = response.sumRemainCount;
          this.sessionSellPrice = response.sellingIntervalPrice;
          this.sessionSumCount = response.sumRemainCount;
          const specificationsOne = [];
          const specificationsTwo = [];
          if (Array.isArray(response.goodsStockList)) {
            this.contentArray = JSON.parse(JSON.stringify(response.goodsStockList));
            response.goodsStockList.forEach(item => {
              if (item.specificationsOne) {
                specificationsOne.push(item.specificationsOne);
              }
              if (item.specificationsTwo) {
                specificationsTwo.push(item.specificationsTwo);
              }
            });
            if (specificationsOne.length > 0)
              this.unique(specificationsOne).forEach(item => {
                const obj = {
                  type: true,
                  content: item
                };
                this.specificationsOne.push(obj);
              });
            if (specificationsTwo.length > 0)
              this.unique(specificationsTwo).forEach(item => {
                const obj = {
                  type: true,
                  content: item
                };
                this.specificationsTwo.push(obj);
              });
          }
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    //数组去重
    unique(arr) {
      var tmp = new Array();
      for (var i in arr) {
        //该元素在tmp内部不存在才允许追加
        if (tmp.indexOf(arr[i]) == -1) {
          tmp.push(arr[i]);
        }
      }
      return tmp;
    },
    getArrDifference(arr1, arr2) {
      return arr1.concat(arr2).filter(function(v, i, arr) {
        return arr.indexOf(v) === arr.lastIndexOf(v);
      });
    },
    inputOnlyNumber(value) {
       if (event.target.value > this.sumRemainCount) {
          this.count = this.sumRemainCount;
        }
        if (event.target.value < 1) {
          this.count = 1;
        }
    }
  },
  mounted() {
      // this.getUserAddressList();
    const that = this
    document.addEventListener('back', function (e) {
      if (that.selectAddressType) {
        that.selectAddressType = false;
         history.pushState(null, null, document.URL);
          document.title = "收货地址";
        return
      }
      if(that.deliveryAdressType && !that.selectAddressType){
         that.deliveryAdressType = false;
          document.title = "商品详情";
         history.pushState(null, null, document.URL);
      }
    })

  },
  watch: {
    goods(){
      this.commodityImg = this.goods.pictUrl
    },
    sku(){
          this.specificationsOneName = this.sku.specificationsOneName;
          this.specificationsTwoName = this.sku.specificationsTwoName;
          this.sellingIntervalPrice = this.sku.sellingIntervalPrice;
          this.sumRemainCount = this.sku.sumRemainCount;
          this.sessionSellPrice = this.sku.sellingIntervalPrice;
          this.sessionSumCount = this.sku.sumRemainCount;
          const specificationsOne = [];
          const specificationsTwo = [];
          if (Array.isArray(this.sku.goodsStockList)) {
            this.contentArray = JSON.parse(
              JSON.stringify(this.sku.goodsStockList)
            );
            this.sku.goodsStockList.forEach(item => {
              if (item.specificationsOne) {
                specificationsOne.push(item.specificationsOne);
              }

              if (item.specificationsTwo) {
                specificationsTwo.push(item.specificationsTwo);
              }
            });
            if (specificationsOne.length > 0)
              this.unique(specificationsOne).forEach(item => {
                const obj = {
                  type: true,
                  content: item
                };
                this.specificationsOne.push(obj);
              });
            if (specificationsTwo.length > 0)
              this.unique(specificationsTwo).forEach(item => {
                const obj = {
                  type: true,
                  content: item
                };
                this.specificationsTwo.push(obj);
              });
          }
    },
    distributionArea(){
      this.currentAddress.provinceName = this.distributionArea.provinceName;
      this.currentAddress.provinceCode = this.distributionArea.provinceCode;
      this.currentAddress.cityName = this.distributionArea.cityName;
      this.currentAddress.cityCode = this.distributionArea.cityCode;
      this.currentAddress.districtName = this.distributionArea.districtName;
      this.currentAddress.districtCode = this.distributionArea.districtCode;
    }
  }
};
</script>


<style lang="scss" scoped >
.float-left {
  float: left;
}
.ml10 {
  margin-left: 0.133333rem /* 10/75 */;
}
.mt64 {
  margin-top: 0.853333rem /* 64/75 */;
}
.specification {
  .bg {
    width: 100%;
    min-height: 17.813333rem /* 1336/75 */;
    background: rgba(0, 0, 0, 0.72);
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 100;
    .content {
      width: 10rem /* 750/75 */;
      background: rgba(255, 255, 255, 1);
      border-radius: 0.266667rem /* 20/75 */ 0.266667rem /* 20/75 */ 0 0;
      position: fixed;
      z-index: 1000;
      bottom: 0;
      .goods {
        display: flex;
        position: relative;
        margin-bottom: 0.426667rem /* 32/75 */;
        .img {
          margin: 0.533333rem /* 40/75 */ 0.426667rem /* 32/75 */ 0 0.426667rem
            /* 32/75 */;
          width: 2.133333rem /* 160/75 */;
          height: 2.133333rem /* 160/75 */;
          background-color: #cccccc;
          border-radius: 0.106667rem /* 8/75 */;
          display: block;
        }
        .prize {
          margin-top: 1.493333rem /* 112/75 */;
          margin-right: .133333rem /* 10/75 */;
          .first {
            height: 0.64rem /* 48/75 */;
            font-size: 0.426667rem /* 32/75 */;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(255, 66, 61, 1);
            line-height: 0.64rem /* 48/75 */;
          }
          .second {
            font-size: 0.32rem /* 24/75 */;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: #091e42;
            line-height: 0.533333rem /* 40/75 */;
            .surplus {
              font-size: 0.32rem /* 24/75 */;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(255, 66, 61, 1);
            }
          }
        }
        .close {
          background: url("../../assets/images/close.png") no-repeat;
          background-size: 100% 100%;
          width: 0.533333rem /* 40/75 */;
          height: 0.533333rem /* 40/75 */;
          position: absolute;
          top: 0.426667rem /* 32/75 */;
          right: 0.426667rem /* 32/75 */;
        }
      }
      .goods::after {
        content: "";
        height: 1px;
        position: absolute;
        left: 0.426667rem /* 32/75 */;
        width: 9.573333rem /* 718/75 */;
        bottom: -0.426667rem /* 32/75 */;
        background: #fffaef;
        box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
      }
      .delivery {
        width: 100%;
        height: 1.92rem /* 144/75 */;
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
          font-size: 0.426667rem /* 32/75 */;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(9, 30, 66, 1);
          line-height: 0.64rem /* 48/75 */;
          width: 7.466667rem /* 560/75 */;
          .tips{
              font-size:.32rem /* 24/75 */;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:rgba(255,66,61,1)
          }
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
      .delivery::after {
        content: "";
        height: 1px;
        position: absolute;
        left: 0.426667rem /* 32/75 */;
        width: 9.573333rem /* 718/75 */;
        bottom: 0;
        background: #fffaef;
        box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
      }
      .color {
        position: relative;
        .color-title {
          margin: 0.426667rem /* 32/75 */ 0 0.213333rem /* 16/75 */ 0.426667rem
            /* 32/75 */;
        }
        .color-select {
          margin: 0 0.346667rem /* 26/75 */ 0.426667rem /* 32/75 */ 0.426667rem
            /* 32/75 */;
          .block {
            min-width: 1.49rem /* 112/75 */;
            padding-left: 0.133333rem /* 10/75 */;
            padding-right: 0.133333rem /* 10/75 */;
            height: 0.746667rem /* 56/75 */;
            background: rgba(244, 245, 247, 1);
            border-radius: 0.106667rem /* 8/75 */;
            margin: 0 0.426667rem /* 32/75 */ 0.32rem /* 24/75 */ 0;
            font-size: 0.32rem /* 24/75 */;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: #42526e;
            line-height: 0.746667rem /* 56/75 */;
            text-align: center;
          }
          .block2 {
            min-width: 1.733333rem /* 130/75 */;
            height: 0.746667rem /* 56/75 */;
            padding-left: 0.133333rem /* 10/75 */;
            padding-right: 0.133333rem /* 10/75 */;
            background: rgba(244, 245, 247, 1);
            border-radius: 0.106667rem /* 8/75 */;
            margin: 0 0.426667rem /* 32/75 */ 0.32rem /* 24/75 */ 0;
            font-size: 0.32rem /* 24/75 */;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: #42526e;
            line-height: 0.746667rem /* 56/75 */;
            text-align: center;
          }
          .select {
            background: linear-gradient(
              135deg,
              rgba(255, 105, 102, 1) 0%,
              rgba(255, 66, 61, 1) 100%
            );
            color: #fff;
          }
          .nostorage {
            color: rgba(179, 186, 197, 1) !important;
          }
        }
        .color-select:after {
          content: " ";
          display: block;
          height: 0;
          clear: both;
        }
      }
      .color::after {
        content: "";
        height: 1px;
        position: absolute;
        left: 0.426667rem /* 32/75 */;
        width: 9.573333rem /* 718/75 */;
        bottom: -0.426667rem /* 32/75 */;
        background: #fffaef;
        box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
      }
      .purchase-quantity {
        display: flex;
        align-items: center;
        width: 100%;
        height: 1.866667rem /* 140/75 */;
        .title {
          height: 0.533333rem /* 40/75 */;
          font-size: 0.373333rem /* 28/75 */;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 0.533333rem /* 40/75 */;
          letter-spacing: 1px;
          margin-left: 0.426667rem /* 32/75 */;
        }
        .number {
          display: flex;
          margin-left: auto;
          margin-right: 0.426667rem /* 32/75 */;
        }
        .reduce {
          width: 0.88rem /* 66/75 */;
          height: 0.8rem /* 60/75 */;
          background: rgba(244, 245, 247, 1);
          box-shadow: 2px 0px 0px 0px rgba(255, 255, 255, 1);
          border-radius: 0.106667rem /* 8/75 */ 0 0 0.106667rem /* 8/75 */;
          display: flex;
          align-items: center;
          justify-content: center;
          div {
            width: 0.32rem /* 24/75 */;
            height: 0.053333rem /* 4/75 */;
            background: rgba(223, 225, 230, 1);
          }
        }
        .count {
          width: 1.013333rem /* 76/75 */;
          height: 0.8rem /* 60/75 */;
          background: rgba(244, 245, 247, 1);
          margin-left: 0.053333rem /* 4/75 */;
          display: flex;
          align-items: center;
          justify-content: center;
          input {
            width: 0.75rem;
            height: 0.65rem /* 60/75 */;
            background: rgba(244, 245, 247, 1);
            text-align: center;
            border: none;
          }
        }
        .plus {
          width: 0.88rem /* 66/75 */;
          height: 0.8rem /* 60/75 */;
          background: rgba(244, 245, 247, 1);
          box-shadow: -2px 0px 0px 0px rgba(255, 255, 255, 1);
          border-radius: 0 0.106667rem /* 8/75 */ 0.106667rem /* 8/75 */ 0;
          display: flex;
          align-items: center;
          justify-content: center;
          div {
            background: url("../../assets/images/plus.png") no-repeat;
            background-size: 100% 100%;
            width: 0.506667rem /* 38/75 */;
            height: 0.506667rem /* 38/75 */;
          }
        }
      }
      .confirm2 {
        background: #dfe1e6 !important;
      }
      .confirm {
        width: 9.146667rem /* 686/75 */;
        height: 1.28rem /* 96/75 */;
        line-height: 1.28rem /* 96/75 */;
        background: linear-gradient(
          135deg,
          rgba(255, 105, 102, 1) 0%,
          rgba(255, 66, 61, 1) 100%
        );
        border-radius: 0.64rem /* 48/75 */;
        margin: 0 auto 0.213333rem /* 16/75 */;
        font-size: 0.426667rem /* 32/75 */;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        text-align: center;
      }
    }
  }
}
</style>

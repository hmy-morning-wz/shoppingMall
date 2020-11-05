<template>
  <div class="add-address">
    <div class="content">
      <input
        type="text"
        placeholder="所在地区"
        v-model="areaString"
        is-link
        onfocus="this.blur()"
        @click="handlerArea"
      >
      <mt-popup
        v-model="areaVisible"
        class="area-class"
        position="bottom"
      >
        <mt-picker
          :slots="slots"
          @change="onValuesChange"
        ></mt-picker>
      </mt-popup>
    </div>
    <div
      class="bottom"
      @click="handleSave"
    >保存</div>
  </div>
</template>
<script>
import orderConfirm from "../../service/order/orderConfirm.js";
import { Toast } from "mint-ui";
// 导入数据
import data from "../../assets/data/data.json";
let index = 0;
let index2 = 0;
let index3 = 0;
// 初始化省
let province = data.map(res => {
  return res.name;
});
// 初始化市
let city = data[index].childs.map(res => {
  return res.name;
});
// 初始化区
let area = data[index].childs[index2].childs.map(res => {
  return res.name;
});
export default {
  data() {
    return {
      currentAddress: {
        provinceName: "",
        cityName: "",
        districtName: ""
      },
      areaVisible: false,
      areaString: "",
      streetString: "",
      arrayCity: [],
      slots: [
        {
          flex: 1,
          values: province,
          className: "slot1",
          textAlign: "left"
        },
        {
          divider: true,
          content: "",
          className: "slot2"
        },
        {
          flex: 1,
          values: city,
          className: "slot3",
          textAlign: "left"
        },
        {
          divider: true,
          content: "",
          className: "slot4"
        },
        {
          flex: 1,
          values: area,
          className: "slot5",
          textAlign: "left"
        }
      ]
    };
  },
  components: {},
  created() {},
  computed: {},
  methods: {
    handlerArea() {
      this.areaVisible = true;
    },
    onValuesChange(picker, values) {
      if (this.areaVisible) {
        let one = values[0];
        let two = values[1];
        let three = values[2];
        index = province.indexOf(one);
        if (index >= 0 && province.length > 0) {
          city = data[index].childs.map(res => {
            return res.name;
          });
          picker.setSlotValues(1, city);
          two = values[1];
        }

        index2 = city.indexOf(two);
        if (index2 >= 0 && city.length > 0) {
          area = data[index].childs[index2].childs.map(res => {
            return res.name;
          });
          picker.setSlotValues(2, area);
          three = values[2];
        }
        index3 = area.indexOf(three);
        this.areaString = values.join(",");
        this.arrayCity = values;
      }
    },
    handleSave() {
      if (this.arrayCity.length < 1) {
        Toast({
          message: `请选择配送区域`,
          position: "middle",
          duration: 1000
        });
      } else {
        this.currentAddress.provinceName = this.arrayCity[0];
        this.currentAddress.cityName = this.arrayCity[1];
        this.currentAddress.districtName = this.arrayCity[2];
        console.log(this.arrayCity)
        data.forEach((item, index) => {
          if (item.name === this.arrayCity[0]) {
            this.currentAddress.provinceCode = item.code;
            item.childs.forEach(items => {
              if (items.name === this.arrayCity[1]) {
                this.currentAddress.cityCode = items.code;
                items.childs.forEach(item3 => {
                  if (item3.name === this.arrayCity[2]) {
                    this.currentAddress.districtCode = item3.code;
                  }
                });
              }
            });
          }
        });
        this.$emit("value-select-address",this.currentAddress)
      }
    }
  },
  mounted() {},
  watch: {}
};
</script>
<style>
.area-class {
  width: 100%;
  height: 50%;
}
.picker-slot-wrapper {
  height: 300px !important;
}
.picker-center-highlight {
  box-sizing: border-box;
  position: absolute;
  left: 0;
  width: 100%;
  top: 90px;
  margin-top: -18px;
  pointer-events: none;
}
.picker-slot-center div {
  margin-top: -100px;
}
.picker {
  height: 100%;
}
.picker-items {
  height: 100%;
}
</style>

<style lang="scss" scoped >
.display-flex {
  display: flex;
}
.ml32 {
  margin-left: 0.426667rem /* 32/75 */;
}
.line {
  height: 0.28rem /* 21/75 */;
  width: 100%;
}
input{
  outline-color: invert;
  outline-style: none;
  outline-width: 0;
  border: none;
  border-style: none;
  text-shadow: none;
  -webkit-appearance: none;
  -webkit-user-select: text;
  outline-color: transparent;
  box-shadow: none;
  -webkit-tap-highlight-color:rgba(0,0,0,0);
}
input::-webkit-input-placeholder {
  /* placeholder颜色  */
  color: #7a869a;
  /* placeholder字体大小  */
  font-size: 14px;
}
.add-address {
  position: absolute;
  background-color: #f4f5f7;
  z-index: 1010;
  top: 0;
  bottom: 0;
  width: 100%;
  .content {
    width: 100%;
    height: 1.226667rem /* 92/75 */;
    border-bottom: 1px solid #e5e5e5;
    overflow: hidden;
    background: rgba(255, 255, 255, 1);
    input {
      margin: 0 0.426667rem /* 32/75 */ 0 0.426667rem /* 32/75 */;
      width: 9.146667rem /* 686/75 */;
      height: 1.226667rem /* 92/75 */;
      font-size: 0.373333rem; /* 28/75 */
    }
  }
  .detail-address {
    width: 100%;
    height: 3.2rem /* 240/75 */;
    border-bottom: 1px solid #e5e5e5;
    background-color: #fff;
    textarea {
      width: 9.146667rem /* 686/75 */;
      height: 3.2rem /* 240/75 */;
      font-size: 0.373333rem; /* 28/75 */
      padding-left: 0.426667rem /* 32/75 */;
      padding-right: 0.426667rem /* 32/75 */;
    }
  }
  .set-address {
    width: 100%;
    height: 1.226667rem /* 92/75 */;
    display: flex;
    align-items: center;
    background-color: #fff;
    .title {
      font-size: 0.373333rem /* 28/75 */;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(66, 82, 110, 1);
      margin-left: 0.426667rem /* 32/75 */;
    }
    .switch {
      margin-left: auto;
      margin-right: 0.426667rem /* 32/75 */;
    }
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
    position: fixed;
    text-align: center;
    bottom: 0.16rem /* 12/75 */;
    left: 0;
    right: 0;
    margin: 0 auto;
    font-size: 0.426667rem /* 32/75 */;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
}
</style>

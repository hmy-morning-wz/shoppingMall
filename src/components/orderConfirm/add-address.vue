<template>
  <div class="add-address">
    <div class="content">
      <input
        v-model="form.name"
        placeholder="收货人姓名"
      >
    </div>
    <div class="content">
      <input
        type="tel"
        v-model="form.mobile"
        maxlength="11"
        placeholder="手机号码"
      >
    </div>
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
    <div class="detail-address">
      <textarea
        v-model="form.address"
        placeholder="街道、小区门牌等详细地址"
        minlength="5"
      ></textarea>
    </div>
    <div class="line"></div>
    <div class="set-address">
      <div class="title">设置默认地址</div>
      <div class="switch">
        <mt-switch v-model="form.defaultAddress"></mt-switch>
      </div>
    </div>
    <div
      seed="提交地址"
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
// 初始化街
// let street = data[index].childs[index2].childs[index3].childs.map(res => {
//   return res.name;
// });
export default {
  data() {
    return {
      form: {
        name: "",
        mobile: "",
        address: "",
        defaultAddress: false,
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
      this.addUserAddress();
    },
    //新增地址接口
    addUserAddress() {
      if(this.$route.query.userId){
        const kebUserId = this.$route.query.userId
        sessionStorage.setItem("kebUserId",kebUserId);
      }
      if (this.Verification()) {
        let participation = {
          name: this.form.name,
          mobile: this.form.mobile,
          address: this.form.address
        };
        participation.provinceName = this.arrayCity[0];
        participation.cityName = this.arrayCity[1];
        participation.districtName = this.arrayCity[2];
        console.log(participation.provinceName);
        this.form.defaultAddress
          ? (participation.defaultAddress = 1)
          : (participation.defaultAddress = 0);
        participation.userId =
          sessionStorage.getItem("userId") || this.$route.query.userId;
        data.forEach((item, index) => {
          if (item.name === this.arrayCity[0]) {
            participation.provinceCode = item.code;
            item.childs.forEach(items => {
              if (items.name === this.arrayCity[1]) {
                participation.cityCode = items.code;
                items.childs.forEach(item3 => {
                  if (item3.name === this.arrayCity[2]) {
                    participation.districtCode = item3.code;
                  }
                });
              }
            });
          }
        });
        if (this.$route.query.id) {
          participation.id = this.$route.query.id;
          orderConfirm.updateUserAddress(participation).then(
            response => {
              const router = `./harvestAddress`;
              this.$router.replace(router);
            },
            response => {
              Toast({
                message: `${response.sub_msg}`,
                position: "middle",
                duration: 1000
              });
            }
          );
        } else {
          orderConfirm.addUserAddress(participation).then(
            response => {
              const router = `./harvestAddress`;
              this.$router.replace(router);
            },
            response => {
              Toast({
                message: `${response.sub_msg}`,
                position: "middle",
                duration: 1000
              });
            }
          );
        }
      }
    },
    getUserAddressById(id) {
      orderConfirm.getUserAddressById(id).then(
        response => {
          const array = [
            response.provinceName,
            response.cityName,
            response.districtName
          ];
          this.arrayCity = array;
          this.areaString = array.join(",");
          if (response.defaultAddress == 1) {
            this.form.defaultAddress = true;
          } else {
            this.form.defaultAddress = false;
          }
          this.form.name = response.name;
          this.form.mobile = response.mobile;
          this.form.address = response.address;
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    Verification() {
      const reg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
      if (!this.form.name) {
        Toast({
          message: "请填写收货人",
          position: "middle",
          duration: 1000
        });
        return;
      }
      if (!this.form.mobile) {
        Toast({
          message: "手机号码不能为空!",
          position: "middle",
          duration: 1000
        });
        return;
      }
      if(!reg.test(this.form.mobile)){
        Toast({
          message: "请填写正确的手机号码",
          position: "middle",
          duration: 1000
        });
        return;
      }
      if (!this.areaString) {
        Toast({
          message: "请选择地区",
          position: "middle",
          duration: 1000
        });
        return false;
      }
      if (!this.form.address) {
        Toast({
          message: "详细地址至少5个字",
          position: "middle",
          duration: 1000
        });
        return;
      }
      if (this.form.address && this.form.address.length < 6) {
        Toast({
          message: "详细地址至少5个字",
          position: "middle",
          duration: 1000
        });
        return;
      }
      return true;
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.getUserAddressById(this.$route.query.id);
    }
  },
  watch: {}
};
</script>
<style>
.mint-switch-input:checked + .mint-switch-core {
  border-color: #4cd964;
  background-color: #4cd964;
}
.area-class {
  width: 100%;
  height: 50%;
}
.picker-slot-wrapper{
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
.picker-slot-center div{
  margin-top: -100px;

}
.picker{
  height: 100%;
}
.picker-items{
  height: 100%;
}
input,
textarea {
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
textarea::-webkit-input-placeholder {
  /* placeholder颜色  */
  color: #7a869a;
  /* placeholder字体大小  */
  font-size: 14px;
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
.add-address {
  position: fixed;
  background-color: #f4f5f7;
  min-height: 17.786667rem /* 1334/75 */;
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
    height: 3.52rem /* 240/75 */;
    border-bottom: 1px solid #e5e5e5;
    background-color: #fff;
    textarea {
      width: 9.146667rem /* 686/75 */;
      height: 3.2rem /* 240/75 */;
      font-size: 0.373333rem; /* 28/75 */
      padding-left: 0.426667rem /* 32/75 */;
      padding-right: 0.426667rem /* 32/75 */;
      padding-top:0.32rem;
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

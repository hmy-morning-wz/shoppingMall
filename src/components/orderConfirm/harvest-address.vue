<template>
  <div class="harvest-address">
    <div class="mb80">
      <div  class="buyer display-flex" v-for="(item,index) in sectionList" :key="index">
      <div class="left">
        <div class="mint-cell-title"  @click="handleSelected(item.id)">
          <label class="mint-checklist-label">
            <span class="mint-checkbox">
              <input
                type="checkbox"
                class="mint-checkbox-input"
                v-model="item.selectAddress"
              >
              <span class="mint-checkbox-core"></span>
            </span>
          </label>
        </div>
      </div>
      <div class="right">
        <div class="first display-flex">
          <div>{{item.name}}</div>
          <div class="ml32">{{item.mobile}}</div>
        </div>
        <div class="second">
          <div class="label" v-if="item.defaultAddress == 1">默认</div>
          <div class="address"><span>{{item.provinceName}}</span>
            <span>{{item.cityName}}</span>
            <span>{{item.districtName}}</span>
            <span>{{item.address}}</span>
          </div>
        </div>
      </div>
      <mt-cell-swipe :right="[
    {
      content: '删除',
      style: { background: 'red', color: '#fff' },
      handler: () => deleteSection(item.id)
    }
  ]"></mt-cell-swipe>
      <div class="edit"  @click="handleEdit(item.id)">
        <img src="../../assets/images/iconEdit.png" alt="">
      </div>
    </div>
    </div>
    <div class="bottom"  @click="handleAdd">添加新地址</div>
  </div>
</template>
<script>
import orderConfirm from "../../service/order/orderConfirm.js";

export default {
  data() {
    return {
      selected: 1,
      sectionList: []
    };
  },
  components: {},
  created() {},
  computed: {},
  methods: {
    deleteSection(id) {
      this.deleteUserAddress(id);
    },
    handleSelected(id) {
      const router = `./orderConfirm?id=${id}`;
      this.$router.replace(router);
    },
    getUserAddressList() {
      const data = {
        userId: sessionStorage.getItem("userId") ||  sessionStorage.getItem("kebUserId"),
      };
      orderConfirm.getUserAddressList(data).then(
        response => {
          if (Array.isArray(response)) {
            this.sectionList = response;
            const id = this.$route.query.id;
            this.sectionList.forEach((item, index) => {
              if (id) {
                if (item.id == id) {
                  item.selectAddress = 1;
                } else {
                  item.selectAddress = 0;
                }
              }
            });
          }else{
            this.sectionList = [];
          }
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    //删除地址接口
    deleteUserAddress(id) {
      const data = {
        id: id
      };
      orderConfirm.deleteUserAddress(data).then(
        response => {
          this.getUserAddressList();
        },
        response => {
          console.log(response.Message || "服务器连接失败！3");
        }
      );
    },
    handleAdd() {
      const router = `./addAddress`;
      this.$router.push(router);
    },
    handleEdit(id) {
      const router = `./addAddress?id=${id}`;
      this.$router.push(router);
    }
  },
  mounted() {
      this.getUserAddressList();

  },
  watch: {}
};
</script>
<style>
.mint-checkbox-input:checked + .mint-checkbox-core {
  background-color: #ff5e5a !important;
  border-color: #ff5e5a !important;
}
.mint-checkbox-input:checked + .mint-checkbox-core::after {
  border-color: #fff !important;
}
.mint-checkbox-core {
  display: inline-block;
  background-color: #fff !important;
  border-radius: 100%;
  border: 1px solid #ccc;
  position: relative;
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
.mint-cell-swipe-button {
  line-height: 2.88rem;
}
.mint-cell-right {
  z-index: 10;
}
</style>
<style>
.mb80{
  margin-bottom: 1.6rem /* 120/75 */;
}
.mint-cell {
  width: 1.706667rem /* 128/75 */;
}
</style>

<style lang="scss" scoped >
.display-flex {
  display: flex;
}
.ml32 {
  margin-left: 0.426667rem /* 32/75 */;
}
.harvest-address {
  position: relative;
  background-color: #fff;
  .buyer {
    width: 100%;
    height: 2.88rem /* 216/75 */;
    position: relative;
    .left {
      width: 0.853333rem /* 64/75 */;
      height: 0.853333rem /* 64/75 */;
      margin: 1.093333rem /* 82/75 */ 0.426667rem /* 32/75 */;
    }
    .right {
      width: 6.8rem /* 510/75 */;
      font-size:.426667rem /* 32/75 */;
      .first {
        margin: 0.426667rem /* 32/75 */ 0.533333rem /* 40/75 */ 0.213333rem
          /* 16/75 */ 0;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(9, 30, 66, 1);
        font-size: 0.426667rem /* 32/75 */;
      }
      .second {
        display: flex;
        overflow: hidden;
        width: 6.8rem /* 510/75 */;
        .label {
          font-size: 10px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: #fff;
          width: 0.933333rem /* 70/75 */;
          height: 0.426667rem /* 32/75 */;
          line-height: 0.426667rem /* 32/75 */;
          text-align: center;
          background: linear-gradient(
            135deg,
            rgba(255, 105, 102, 1) 0%,
            rgba(255, 66, 61, 1) 100%
          );
          border-radius: 0.053333rem /* 4/75 */;
          margin-right: 0.26667rem;
          margin-top: 0.066667rem /* 5/75 */;
        }
        .address {
          font-size: 0.373333rem /* 28/75 */;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
    }
    .edit {
      // background: url("../../assets/images/iconEdit.png") no-repeat;
      // background-size: 100% 100%;
      // width: 0.426667rem /* 32/75 */;
      // height: 0.426667rem /* 32/75 */;
      // right: 0.426667rem /* 32/75 */;
      width: .8rem /* 60/75 */;
      height: .8rem /* 60/75 */;
      right: .266667rem /* 20/75 */;
      top: 1.146667rem /* 86/75 */;
      position: absolute;
      z-index: 9;
      text-align: center;
      img{
      width: 0.426667rem /* 32/75 */;
      height: 0.426667rem /* 32/75 */;
      }
    }
  }
  .buyer::after {
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
    position: fixed;
    text-align: center;
    bottom: .2rem /* 15/75 */;
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

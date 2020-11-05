<template>
    <div id="loading" class="logo_loading" v-if="loadingShow">
        <div class="bg">
            <div class="circle"></div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.logo_loading {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  background-color: rgba(0, 0, 0, 0.8);
}

.logo_loading .bg {
  width: 120px;
  height: 120px;
  zoom: 0.5;
  border-radius: 10px;
  margin: 0 auto;
  top: 35%;
  position: relative;
  background-color: #fff;
  /* border: 1px solid #d9d9d9;
            background: #fff url("http://sit-img-citytsm.oss-cn-hangzhou.aliyuncs.com/logo.png")no-repeat;
            background-size: cover; */
}

.logo_loading .circle {
  position: absolute;
  width: 100px;
  height: 100px;
  left: 8px;
  top: 8px;
  right: 0;
  background: url("http://static.apitops.com/openimages/princessbay/images/loading-circle.png")
    center center no-repeat;
  background-size: 100%;
  z-index: 98;
  -webkit-animation: load 1.4s infinite linear;
  animation: load 1.4s infinite linear;
}

@-webkit-keyframes load {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes load {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
<script>
export default {
  props: ["loadingShow"],
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>


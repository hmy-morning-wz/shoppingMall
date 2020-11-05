<template>
    <div id="app">
          <div id="app">
        <!-- <router-view></router-view> -->
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive">
                <!-- 这里是会被缓存的视图组件，比如 page1,page2 -->
            </router-view>
        </keep-alive>

        <router-view v-if="!$route.meta.keepAlive">
            <!-- 这里是不被缓存的视图组件，比如 page3 -->
        </router-view>
    </div>
    </div>
</template>
<script>
export default {
   data() {
    return {
      flag: false
    }
  },
  watch: {
    '$route': (to, from) => {
    }
  },
  methods: {
      // 隐藏菊花
    hideLoading() {
      window.yl.call('hideLoading')
    },
    // 菊花
    showLoading(t = 500) {
      window.yl.call(
        'showLoading',
        {
          content: '正在加载中…',
          duration: t
        }
      )
    }
  }
};
</script>
<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
}
</style>


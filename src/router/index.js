import Vue from 'vue';
import VueRouter from 'vue-router';

const appMain = (resolve) => {
    require(['../components/home.vue'], resolve);
};
// 异步加载组件
const goodDetail = (resolve) => {
    require(['../components/index/goods-detail.vue'], resolve);
};
const deliveryAddress = (resolve) => {
    require(['../components/index/delivery-address.vue'], resolve);
};
const selectAddress = (resolve) => {
  require(['../components/index/select-address.vue'], resolve);
};
const orderList = (resolve) => {
  require(['../components/orderState/order-list.vue'], resolve);
};
const orderDetail = (resolve) => {
  require(['../components/orderState/order-detail.vue'], resolve);
};
const orderConfirm = (resolve) => {
  require(['../components/orderConfirm/order-confirm.vue'], resolve);
};
const harvestAddress = (resolve) => {
  require(['../components/orderConfirm/harvest-address.vue'], resolve);
};
const addAddress = (resolve) => {
  require(['../components/orderConfirm/add-address.vue'], resolve);
};
const result = (resolve) => {
  require(['../components/orderConfirm/result.vue'], resolve);
};
const redCardVoucher = (resolve) => {
    require(['../components/redCardVoucher/red-card-voucher.vue'], resolve);
  };
  const redCardVoucherNoUse = (resolve) => {
    require(['../components/redCardVoucher/red-card-no-use.vue'], resolve);
  };
  const instructionUse = (resolve) => {
    require(['../components/redCardVoucher/instruction-use.vue'], resolve);
  };
  const coupon = (resolve) => {
    require(['../components/redCardVoucher/coupon.vue'], resolve);
  };
const routes = [
    {
        path: '/',
        component: appMain,
        meta: {
            title: '首页',
        },
    },
    {
      path: '/goodDetail',
      name: 'goodDetail',
      component: goodDetail,
      meta: {
          title: '商品详情'
      },
    },
    {
      path: '/deliveryAddress',
      name: 'deliveryAddress',
      component: deliveryAddress,
      meta: {
          title: '收货地址'
      },
    },
    {
      path: '/selectAddress',
      name: 'selectAddress',
      component: selectAddress,
      meta: {
          title: '选择地址'
      },
    },
    {
      path: '/orderList',
      name: 'orderList',
      component: orderList,
      meta: {
          title: '我的订单'
      },
    },
    {
      path: '/orderDetail',
      name: 'orderDetail',
      component: orderDetail,
      meta: {
          title: '订单详情'
      },
    },
    {
      path: '/orderConfirm',
      name: 'orderConfirm',
      component: orderConfirm,
      meta: {
          title: '确认订单'
      },
    },
    {
      path: '/harvestAddress',
      name: 'harvestAddress',
      component: harvestAddress,
      meta: {
          title: '收货地址'
      },
    },
    {
      path: '/addAddress',
      name: 'addAddress',
      component: addAddress,
      meta: {
          title: '添加地址'
      },
    },
    {
      path: '/result',
      name: 'result',
      component: result,
      meta: {
          title: '支付结果'
      },
    },
    {
        path: '/redCardVoucher',
        name: 'redCardVoucher',
        component: redCardVoucher,
        meta: {
            title: '红包卡券'
        },
      },
      {
        path: '/redCardVoucherNoUse',
        name: 'redCardVoucherNoUse',
        component: redCardVoucherNoUse,
        meta: {
            title: '红包卡券'
        },
      },
      {
        path: '/instructionUse',
        name: 'instructionUse',
        component: instructionUse,
        meta: {
            title: '使用说明'
        },
      },
      {
        path: '/coupon',
        name: 'coupon',
        component: coupon,
        meta: {
            title: '优惠券'
        },
      },
      {
        path: '/coupon',
        name: 'redPacket',
        component: coupon,
        meta: {
            title: '乘车红包'
        },
      },
      {
        path: '/coupon',
        name: 'driveVoucher',
        component: coupon,
        meta: {
            title: '乘车券'
        },
      },
      {
        path: '/coupon',
        name: 'exchangeVoucher',
        component: coupon,
        meta: {
            title: '兑换券'
        },
      },
];
Vue.use(VueRouter);

export const router = new VueRouter({
    // mode: 'history',
    routes,
    // scrollBehavior (to, from, savedPosition) {
    //     return { x: 0, y: 0 }
    //   }
});
router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
});
router.afterEach(route => {
    // 从路由的元信息中获取 title 属性
    if (route.meta.title) {
        document.title = route.meta.title;
        // 如果是 iOS 设备，则使用如下 hack 的写法实现页面标题的更新
        if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            const hackIframe = document.createElement('iframe');
            hackIframe.style.display = 'none';
            hackIframe.src = '/static/html/fixIosTitle.html?r=' + Math.random();
            document.body.appendChild(hackIframe);
            setTimeout(_ => {
                document.body.removeChild(hackIframe)
            }, 10)
        }
    }
});



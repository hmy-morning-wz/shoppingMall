webpackJsonp([15],[,,,function(t,e,n){"use strict";n.d(e,"a",function(){return o}),n.d(e,"c",function(){return a}),n.d(e,"b",function(){return i});var o="",a="",i="";o="https://operation.allcitygo.com/",a="https://money.allcitygo.com/hangzhoutong/#/index",i="https://money.allcitygo.com/shopping/#/goodDetail"},,function(t,e,n){"use strict";n.d(e,"a",function(){return w});var o=n(0),a=n(19),i=function(t){n.e(13).then(function(){var e=[n(25)];t.apply(null,e)}.bind(this)).catch(n.oe)},c=function(t){n.e(0).then(function(){var e=[n(26)];t.apply(null,e)}.bind(this)).catch(n.oe)},r=function(t){n.e(10).then(function(){var e=[n(23)];t.apply(null,e)}.bind(this)).catch(n.oe)},u=function(t){n.e(9).then(function(){var e=[n(24)];t.apply(null,e)}.bind(this)).catch(n.oe)},l=function(t){n.e(3).then(function(){var e=[n(32)];t.apply(null,e)}.bind(this)).catch(n.oe)},d=function(t){n.e(1).then(function(){var e=[n(31)];t.apply(null,e)}.bind(this)).catch(n.oe)},p=function(t){n.e(2).then(function(){var e=[n(29)];t.apply(null,e)}.bind(this)).catch(n.oe)},h=function(t){n.e(5).then(function(){var e=[n(28)];t.apply(null,e)}.bind(this)).catch(n.oe)},s=function(t){n.e(8).then(function(){var e=[n(27)];t.apply(null,e)}.bind(this)).catch(n.oe)},m=function(t){n.e(12).then(function(){var e=[n(30)];t.apply(null,e)}.bind(this)).catch(n.oe)},f=function(t){n.e(6).then(function(){var e=[n(36)];t.apply(null,e)}.bind(this)).catch(n.oe)},v=function(t){n.e(7).then(function(){var e=[n(35)];t.apply(null,e)}.bind(this)).catch(n.oe)},y=function(t){n.e(11).then(function(){var e=[n(34)];t.apply(null,e)}.bind(this)).catch(n.oe)},b=function(t){n.e(4).then(function(){var e=[n(33)];t.apply(null,e)}.bind(this)).catch(n.oe)},g=[{path:"/",component:i,meta:{title:"首页"}},{path:"/goodDetail",name:"goodDetail",component:c,meta:{title:"商品详情"}},{path:"/deliveryAddress",name:"deliveryAddress",component:r,meta:{title:"收货地址"}},{path:"/selectAddress",name:"selectAddress",component:u,meta:{title:"选择地址"}},{path:"/orderList",name:"orderList",component:l,meta:{title:"我的订单"}},{path:"/orderDetail",name:"orderDetail",component:d,meta:{title:"订单详情"}},{path:"/orderConfirm",name:"orderConfirm",component:p,meta:{title:"确认订单"}},{path:"/harvestAddress",name:"harvestAddress",component:h,meta:{title:"收货地址"}},{path:"/addAddress",name:"addAddress",component:s,meta:{title:"添加地址"}},{path:"/result",name:"result",component:m,meta:{title:"支付结果"}},{path:"/redCardVoucher",name:"redCardVoucher",component:f,meta:{title:"红包卡券"}},{path:"/redCardVoucherNoUse",name:"redCardVoucherNoUse",component:v,meta:{title:"红包卡券"}},{path:"/instructionUse",name:"instructionUse",component:y,meta:{title:"使用说明"}},{path:"/coupon",name:"coupon",component:b,meta:{title:"优惠券"}},{path:"/coupon",name:"redPacket",component:b,meta:{title:"乘车红包"}},{path:"/coupon",name:"driveVoucher",component:b,meta:{title:"乘车券"}},{path:"/coupon",name:"exchangeVoucher",component:b,meta:{title:"兑换券"}}];o.default.use(a.a);var w=new a.a({routes:g});w.beforeEach(function(t,e,n){document.title=t.meta.title,n()}),w.afterEach(function(t){if(t.meta.title&&(document.title=t.meta.title,navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/))){var e=document.createElement("iframe");e.style.display="none",e.src="/static/html/fixIosTitle.html?r="+Math.random(),document.body.appendChild(e),setTimeout(function(t){document.body.removeChild(e)},10)}})},function(t,e){},function(t,e){},function(t,e,n){function o(t){n(14)}var a=n(9)(n(12),n(18),o,null,null);t.exports=a.exports},,,,function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={data:function(){return{flag:!1}},watch:{$route:function(t,e){}},methods:{hideLoading:function(){window.yl.call("hideLoading")},showLoading:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:500;window.yl.call("showLoading",{content:"正在加载中…",duration:t})}}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),a=n(8),i=n.n(a),c=n(4),r=n.n(c),u=(n(3),n(6)),l=(n.n(u),n(5)),d=n(7),p=(n.n(d),n(2));o.default.use(p.default,{error:"",loading:""}),o.default.use(r.a),new o.default({router:l.a,el:"#app",components:{App:i.a},template:"<app></app>"})},function(t,e){},,,,function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{attrs:{id:"app"}},[n("keep-alive",[t.$route.meta.keepAlive?n("router-view"):t._e()],1),t._v(" "),t.$route.meta.keepAlive?t._e():n("router-view")],1)])},staticRenderFns:[]}}],[13]);
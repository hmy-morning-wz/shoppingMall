webpackJsonp([12],{140:function(e,t){e.exports=function(e){return"string"!=typeof e?e:(/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),/["'() \t\n]/.test(e)?'"'+e.replace(/"/g,'\\"').replace(/\n/g,"\\n")+'"':e)}},179:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAMAAABGS8AGAAAASFBMVEVHcEz/////////////////////////////////////////////////////////////aTL/cT3/1cX/3tL/ybb/iV7/7uj/sZT0wfhaAAAAD3RSTlMAp/nOBMLtJt9jeVCSh4Cb2WQ+AAACI0lEQVRYw72Z6ZaDIAyFRQFxjVqX93/TQWtnbCtLgMz9z3dyLpBAkmVulU3NRKFknktVCFY3Jc+iVVZMwpckq8ooaq/AKNWHsisBDokK7wmvFHhIYdF+2Cca460AhISv17zLAaW88/KjLACtwiPoRkKAZOPi1hCo2s5tIVitxWjOIELMTI7iWsgtRKpNvG+OHWwggW5OXSlTgOXXTeEFJJH43MAOEqn7MCJPBc7fzRCQTOItr0NCXTI/VynBitMEfAk5bcCXkBMH/BeySA0+D0YJyfU8y316cH+Aw7dunef1fvvinJjGYRgfRi+qGO4wLMZzwaK4w3hf/jRYRnENEUseavGLa/BYmxxW6qbh5E7G4leTcHW9ZiRcvXuChKvTRUHChQJ/ob24+lJbjvG8LHMgF2Rmrvvbvn4zcR+OV4AFvAzf5NmTq8FmK867tQXEu1uh7Fa8kb3j3TfPfNzW5eTMeK4+bpYL8kHGcPUFsV3pdbyQUdyc2ZPQL3nCcfckZE+bv+QNx9Vp05HoHy8yjrtXU4kge3N1aXIm5AvZm3sUU2f5f5U3BPf48JW+iRLBfT7e3Bl5xnKV76NwWsZlRT8KyZ6xZA9vuq9CRvW5IfuO0X0gyb68dJ90urYCWSMkWeum4P/VbKJrj9E19OhakHRNU7o2L1ljmrCVTtf8DxtX+M1YqAYsdCMhwiEW4djtQJMMCilHm4TD2MORjN+Nj50e/AA6ZWU3SesVzQAAAABJRU5ErkJggg=="},202:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{orderNo:this.$route.query.orderNo}},components:{},created:function(){},computed:{},methods:{handleOrder:function(){var e=this.orderNo,t="./orderDetail?orderNo="+e;this.$router.push(t)},handleBack:function(){my.redirectTo({url:"/pages/index/index"})}},mounted:function(){},watch:{}}},230:function(e,t,r){var a=r(140);t=e.exports=r(21)(!1),t.push([e.i,".display-flex[data-v-64942494]{display:flex}.result .header[data-v-64942494]{background:url("+a(r(284))+") no-repeat;background-size:100% 100%;width:100%;height:5.88rem;overflow:hidden}.result .header .checked[data-v-64942494]{background:url("+a(r(179))+") no-repeat;background-size:100% 100%;width:1.17333rem;height:1.17333rem;margin:2.66667rem auto 0}.result .header .desc[data-v-64942494]{color:#fff;margin:.32rem auto}.result .bottom[data-v-64942494],.result .header .desc[data-v-64942494]{font-size:.42667rem;font-family:PingFangSC-Regular;font-weight:400;text-align:center}.result .bottom[data-v-64942494]{margin:1.05333rem .42667rem;justify-content:center}.result .bottom .button1[data-v-64942494]{width:4.36rem;height:1.28rem;line-height:1.28rem;border-radius:.64rem;border:1px solid #97a0af;color:#091e42}.result .bottom .button2[data-v-64942494]{width:4.36rem;height:1.28rem;line-height:1.28rem;background:linear-gradient(135deg,#ff6966,#ff423d);color:#fff;border-radius:.64rem;margin-left:.42667rem}",""])},263:function(e,t,r){var a=r(230);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);r(22)("553da790",a,!0,{})},284:function(e,t,r){e.exports=r.p+"static/img/header.7e86d98.png"},30:function(e,t,r){function a(e){r(263)}var n=r(9)(r(202),r(320),a,"data-v-64942494",null);e.exports=n.exports},320:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"result"},[e._m(0),e._v(" "),r("div",{staticClass:"bottom display-flex"},[r("div",{staticClass:"button2",on:{click:e.handleOrder}},[e._v("\n      查看订单\n    ")])])])},staticRenderFns:[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"header"},[r("div",{staticClass:"checked"}),e._v(" "),r("div",{staticClass:"desc"},[e._v("支付成功")])])}]}}});
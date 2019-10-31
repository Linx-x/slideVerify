/*
   自定义滑动解锁
*/
import slideVerify from "./slideVerify.vue";
export default {
  install (Vue) {
    Vue.component("slideVerify", slideVerify)

  }
}
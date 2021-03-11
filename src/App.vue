<template>
  <div id="app" class="Basis">
    <div class="Micrify">
      <router-view v-if="isRouterShow" />
      <newChat ref="chat"></newChat>
    </div>
  </div>
</template>
<script>
import newChat from "./views/pages/front_page/components/newChat";
import { setInterval } from 'timers';
import { storage } from '@/util/storage'
import { mapGetters } from "vuex";
import _ from 'lodash'



export default {
  name: "App",
  provide() {
    return {
      reloadComponent: this.reloadComponent
    };
  },
  data() {
    return {
      isRouterShow: true,
      showChat: false,
      // showDialog: true,
      // timer:0
    };
  },
  computed: {
    ...mapGetters(["is_login_in", "user_data"])
  },
  components: {
    newChat,
  },
  created(){

  },
  mounted() {

  },
  methods: {
    reloadComponent() {
      this.isRouterShow = false;
      this.$nextTick(() => {
        this.isRouterShow = true;
      });
    },
    close(){
      // this.showDialog=false
      // let initTime=new Date().valueOf()
      // sessionStorage.setItem('initTime',initTime);
      // setTimeout(()=>{
      //   if(this.$route.path=='/'){
      //     this.showDialog=true
      //   }
      // },5000)
    }
  },
  watch:{
    '$route'(to,from){
      // if(to.path =='/'){
      //   let timePass=(new Date()).valueOf()-sessionStorage.getItem('initTime')
      //   console.warn(timePass/1000/10,'pp')
      //   if(timePass/1000/10>=1){
      //     this.showDialog=true
      //   }
      // }
    }
  },
  beforeDestroy() {

  },
  destroyed(){

  }
};
</script>
<style lang="scss" scoped>
// .Basis {
//   height: 100vh;
//   width: 100vw;
//   overflow: hidden;
// }
// .Micrify {
//   transform: translate(-50%, -50%) scale(0.1);
//   top: 50%;
//   left: 50%;
//   position: relative;
//   height: 1000vh;
//   width: 1000vw;
// }
</style>
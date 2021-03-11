<template>
  <section class="app-main">
    <!--<Bread class="bread" v-if="$route.path!='/serve/work/index'"></Bread>-->
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
import Bread from 'ServeComponents/Breadcrumb/index'

export default {
  name: 'AppMain',
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  },
  components:{
    Bread
  }
}
</script>

<style lang="scss" scoped>
	@import '@css/serve.scss';
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 62px);
  position: relative;
  overflow: hidden;
  margin:20px;
/*  background:#fff;*/
}
</style>

<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="activeMenu"
      background-color="#ffffff"
      text-color="#333333"
      :collapse="isCollapse"
      active-text-color="#ffffff"
    >
      <Logo :collapse="isCollapse" />
      <sidebar-item v-for="route in routes" :key="route.name" :item="route" :base-path="route.path"  :collapse="isCollapse"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import Logo from "./logo";
import SidebarItem from "./SidebarItem";
import { mapGetters } from "vuex";
// import io from 'socket.io-client';

export default {
  components: {
    SidebarItem,
    Logo
  },
  data: () => ({
    routes: [],
    socketLogin: false,
    role:'0',
    routeList:[],
    roleList:[]
  }),
  mounted() {
  console.log('haha');
  this.routeList=this.util.getMenuByRole(this,this.user_data.role);
  this.routes=this.routeList
  },
  computed: {
    ...mapGetters(["sidebar","user_data"]),
    activeMenu() {
      const { meta, path } = this.$route;
      return meta.activeMenu || path;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.title {
  line-height: 62px;
  font-size: 14px;
  font-weight: bold;
  color: #333333;
  background-color: #ffffff;
  padding: 0 20px;

  .logo-set {
    width: 21px;
    height: 21px;
  }
}

.minititle {
  padding: 0 10px;
  transition: padding 0.28s;
}
</style>

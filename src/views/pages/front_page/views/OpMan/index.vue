<template>
  <div class="box-bg">
    <div class="img-box">
      <img src="https://pic.paitume.com/images/HowToUse.png" class="img-set" />
    </div>
    <div class="content-box">
      <div class="catalog">
        <el-tree
          :data="helpType"
          @node-click="handleNodeClick"
          node-key="id"
          :default-expanded-keys="[1]"
          v-if="server_default_open"
          highlight-current
          ref="tree"
        ></el-tree>
        <el-tree
          v-else
          highlight-current
          :data="helpType"
          @node-click="handleNodeClick"
          node-key="id"
          ref="tree"
          :default-expanded-keys="[2]"
        ></el-tree>
      </div>
      <div class="content">
        <div v-html="content"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { help } from "@config/api";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    helpType: [],
    Waitlist: [],
    content: "",
    server_default_open: false
  }),
  methods: {
    handleNodeClick(e) {
      console.log(e);
      if (e.id != "0" && e.id > 10) {
        let params = {
          type: e.id
        };
        this.getRequest(help.getContent, params).then(res => {
          this.content = res.content;
        });
      }
    },
    getType() {
      let params = {
        pid: 0,
        is_all: 1
      };
      this.getRequest(help.getType, params)
        .then(res => {
          console.log('----------',res);
          if (this.user_data && this.user_data.role == 1) {
            console.log('11111111111',res);
            this.server_default_open = true;
            this.helpType = res;
            console.log("列表", this.helpType);
          } else {
            this.helpType = res.filter(item => item.id != 1);
          }
          this.opencontent();
        })
        .catch(err => {});
    },
    opencontent() {
      let params = {};
      if (this.user_data && this.user_data.role == 1) {
        params = { type: "111" };
      } else {
        params = { type: "130" };
      }
      this.getRequest(help.getContent, params).then(res => {
        this.content = res.content;
        this.$nextTick(() => {
          this.$refs["tree"].setCurrentKey(this.helpType[0].children[0].id);
        });
      });
    }
    // filterlist(data, list) {
    //   if (!data) {
    //     this.Waitlist.forEach(item => {
    //       this.helpType.push({
    //         id: item.id,
    //         label: item.name
    //       });
    //       if (item.children) {
    //         this.filterlist(true, item.children);
    //       }
    //     });
    //   } else {
    //     list;
    //   }
    // }
  },
  mounted() {
  		this.getType();
  	
    
//  this.opencontent();
  },
  computed: {
    ...mapGetters(["user_data"])
  },
  watch: {
    user_data() {
      this.getType();
    }
  }
};
</script>
<style lang="scss" scoped>
.box-bg {
  background-color: #fafafa;
  .img-box {
    .img-set {
      width: 100%;
      height: 100%;
      object-fit: scale-down;
    }
  }
  .content-box {
    padding: 0 10%;
    display: flex;
    min-height: 400px;
    .catalog {
      padding: 12px 8px;
      background-color: #ffffff;
      margin-right: 12px;
      min-width: 250px;
    }
    .content {
      flex: 2;
      background-color: #ffffff;
      padding: 40px;
      div {
        /deep/ img {
          max-width: 800px;
          object-fit: scale-down;
        }
      }
    }
  }
}
</style>
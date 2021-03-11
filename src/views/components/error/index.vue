<template>
  <div v-if="errorLogs.length>0">
    <el-badge
      :is-dot="true"
      style="line-height: 25px;margin-top: -5px;"
      @click.native="dialogTableVisible=true"
    >
      <el-button style="padding: 8px 10px;" size="small" type="danger">
        <ali-svg-icon icon-class="bug"/>
      </el-button>
    </el-badge>

    <el-dialog :visible.sync="dialogTableVisible" width="80%" append-to-body>
      <div slot="title">
        <span style="padding-right: 10px;">错误日志</span>
        <el-button size="mini" type="primary" icon="el-icon-delete" @click="clearAll">清除所有</el-button>
      </div>
      <el-table :data="errorLogs" border>
        <el-table-column label="错误信息如下">
          <template slot-scope="{row}">
            <div>
              <span class="message-title">错误信息:</span>
              <el-tag type="danger">{{ row.error.message }}</el-tag>
            </div>
            <br />
            <div v-if="row.vm">
              <span class="message-title" style="padding-right: 10px;">详细:</span>
              <el-tag type="warning">{{ row.vm.$vnode.tag }} 错误来自 {{ row.info }}</el-tag>
            </div>
            <br />
            <div v-if="row.url">
              <span class="message-title" style="padding-right: 16px;">错误页面链接:</span>
              <el-tag type="success">{{ row.url }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="详情">
          <template slot-scope="scope">
            <span v-if="scope.row.error.stack">{{ scope.row.error.stack }}</span>
            <span v-if="scope.row.error.info">
              <div v-html="scope.row.error.info"></div>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ErrorLog",
  data() {
    return {
      dialogTableVisible: false
    };
  },
  computed: {
    errorLogs() {
      return this.$store.getters.errorLogs;
    }
  },
  methods: {
    clearAll() {
      this.dialogTableVisible = false;
      this.$store.dispatch("clearErrorLog");
    }
  }
};
</script>

<style scoped>
.message-title {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  padding-right: 8px;
}
</style>
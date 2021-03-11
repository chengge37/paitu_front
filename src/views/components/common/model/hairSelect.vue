<template>
  <el-select v-model="code" :size="size" placeholder="请选择头发" @change="selectChangeAction">
    <el-option v-for="item in array" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
import { staticHairArray } from "@config/config.js";
export default {
  data() {
    return {
      code: null,
      array: staticHairArray
    };
  },
  props: ["value", "size"],
  methods: {
    selectChangeAction() {
      this.$emit("input", this.code);
    }
  },
  watch:{
    value(val){
      this.code = parseInt(val);
    }
  }
};
</script>

<style>
</style>

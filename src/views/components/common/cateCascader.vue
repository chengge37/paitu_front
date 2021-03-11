<template>
  <el-cascader
    :options="staticEquipCatArray"
    :show-all-levels="false"
    :props="{value:'id',label:'name'}"
    v-model="selectCategoryArray"
    @change="selectChangeAction"
  ></el-cascader>
</template>

<script>
import { staticEquipCatArray } from "@config/config.js";

export default {
  data() {
    return {
      selectCategoryArray: [],
      staticEquipCatArray:staticEquipCatArray
    };
  },
  props: ["value", "size"],
  computed: {
  },
  methods: {
    selectChangeAction() {
      this.$emit("input", this.selectCategoryArray);
    }
  },
  watch: {
    value(val) {
      this.selectCategoryArray = val;
    }
  }
};
</script>

<style>
</style>

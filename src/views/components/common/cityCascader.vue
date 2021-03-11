<template>
  <el-cascader
    :options="staticCityArray4Cascader"
    :props="{value:'code',label:'label'}"
    filterable
    v-model="selectCityArray"
    @change="selectChangeAction"
    :show-all-levels="false"
    :size="size"
  ></el-cascader>
</template>

<script>
import { staticCityArray } from "@config/config.js";

export default {
  data() {
    return {
      selectCityArray: []
    };
  },
  props: ["value", "size"],
  computed: {
    staticCityArray4Cascader() {
      let cityArray = staticCityArray;
      let targetArray = [];
      for (let i = 0, n = cityArray.length; i < n; i++) {
        let cityData = cityArray[i];
        let provinceHasExist = false;
        for (let j = 0, k = targetArray.length; j < k; j++) {
          let provinceData = targetArray[j];
          if (cityData.province_code === provinceData.code) {
            if (
              provinceData.children === undefined ||
              provinceData.children === null
            ) {
              provinceData.children = [];
            }
            provinceData.children.push({
              code: cityData.code,
              label: cityData.city
            });
            provinceHasExist = true;
            break;
          }
        }
        if (!provinceHasExist) {
          targetArray.push({
            code: cityData.province_code,
            label: cityData.province,
            children: [{ code: cityData.code, label: cityData.city }]
          });
        }
      }
      return targetArray;
    }
  },
  methods: {
    selectChangeAction() {
      this.$emit("input", this.selectCityArray[1]);
    }
  },
  watch: {
    value(val) {
      let cityData = _.find(staticCityArray, item => {
        return item.code == val;
      });
      if (cityData) {
        this.selectCityArray = [cityData.province_code, cityData.code];
      } else {
        this.selectCityArray = [];
      }
    }
  }
};
</script>

<style>
</style>

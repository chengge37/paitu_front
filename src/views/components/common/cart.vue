<template>
  <el-dialog
    :visible.sync="selfShow"
    @close="closeDialog"
    center
    width="650px"
    custom-class="my-dialog"
    title="影棚"
  >
    <el-tabs type="border-card">
      <el-tab-pane label="已选择">
        <el-row v-loading="loading">
          <el-row v-if="order">
            <el-row v-if="order.isStudio">
              <h2 style="text-align: center">{{order.studioOrder.studioDetail.name}}</h2>
            </el-row>
            <el-row v-if="order.isStudio">
              <el-col :span="1" class="text-center">
                <br>
              </el-col>
              <el-col :span="20">
                <p class="text-center" style="margin: 0 0 10px 0">影棚订单</p>
                <el-table
                  size="mini"
                  :data="order.studioOrder.priceTable"
                  border
                  style="width: 100%"
                >
                  <el-table-column prop="type" label="类型"></el-table-column>
                  <el-table-column prop="time" label="时间段"></el-table-column>
                  <el-table-column prop="price" label="价格"></el-table-column>
                </el-table>
                <p
                  class="text-center"
                  v-if="order.equipOrderArray.length>0"
                  style="margin: 10px 0 10px 0"
                >设备订单</p>
                <el-row v-for="(equipOrder,i) in order.equipOrderArray" :key="equipOrder.id">
                  <el-row>
                    <el-col
                      :span="6"
                      class="text-center"
                      style="height:40px;line-height: 40px"
                    >{{equipOrder.equip.static.name}}</el-col>
                    <el-col
                      :span="4"
                      class="text-center"
                      style="height:40px;line-height: 40px"
                    >{{equipOrder.price}}元</el-col>

                    <!--								<el-col :span="3">-->
                    <!--									{{computeEquipPrice(equip.id)*equip.orderCount}}-->
                    <!--								</el-col>-->
                    <el-input-number
                      v-model="equipOrder.order_count"
                      @change="handleEquipCountChange(equipOrder)"
                    ></el-input-number>
                    <el-button
                      icon="el-icon-delete"
                      type="danger"
                      @click="deleteEquipFromOrder(equipOrder.id)"
                    ></el-button>
                  </el-row>
                </el-row>
              </el-col>
              <el-col :span="3" style="text-align: center ">
                <el-button type="danger" @click="removeStudioOrder">删除</el-button>
              </el-col>
            </el-row>

            <el-row style="margin-top: 10px">
              <el-col :span="6" :offset="9">
                <p class="text-center">
                  订单总额：{{order.price}}元 &nbsp
                  <el-button @click="payOrGenerateOrder">
                    <template v-if="payOrGenerate()">生成订单</template>
                    <template v-else>支付</template>
                  </el-button>
                </p>
              </el-col>
            </el-row>
            <div id="aliForm"></div>
          </el-row>
          <el-row v-else>
            <p>您没有未支付订单</p>
          </el-row>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>



<script>
import { RentTypeDay, RentTypeHour } from "@config/config.js";
export default {
  data() {
    return {
      selfShow: this.show,
      loading: false,
      order: false,
      RentTypeDay: RentTypeDay,
      enableListenCountChange: true
    };
  },
  props: ["show"],
  methods: {
    closeDialog() {
      this.loading = false;
      this.$emit("cartDialogCloseMsg", this.order);
    },
    handleEquipCountChange(equipOrder) {
      if (!this.enableListenCountChange) {
        return;
      }
      let p = {
        order_id: equipOrder.order_id,
        equip_id: equipOrder.equip_id,
        order_count: equipOrder.order_count
      };
      console.log("cart数量变化 参数", p);
      let _this = this;
      this.postRequest("/order/updateEquipCountInOrder", p).then(resq => {
        if (resq) {
          console.log("cart数量变化返回 ", resq);
          if (resq.msg) {
            _this.$message({ type: "info", message: resq.msg });
          }
          _this.order.price = resq.totalPrice;
          let updateIndex = _.findIndex(_this.order.equipOrderArray, function(
            o
          ) {
            return o.equip_id == equipOrder.equip_id;
          });
          let updateData = _.find(_this.order.equipOrderArray, function(o) {
            return o.equip_id == equipOrder.equip_id;
          });
          updateData.price = resq.price;
          _this.enableListenCountChange = false;
          updateData.order_count = resq.count;
          _this.$set(_this.order.equipOrderArray, updateIndex, updateData);
          _this.enableListenCountChange = true;
        }
      });
    },
    deleteEquipFromOrder(equipOrderId) {
      console.log(equipOrderId);
      let _this = this;
      let delIndex = _.findIndex(this.order.equipOrderArray, function(o) {
        return o.id == equipOrderId;
      });
      console.log("dele index = " + delIndex);
      this.postRequest("/order/deleteEquipFromOrder", {
        equip_order_id: equipOrderId
      }).then(resq => {
        if (resq) {
          console.log(resq);
          _this.order.price = resq.newPrice;
          console.log(_this.order);
          _this.order.equipOrderArray.splice(delIndex, 1);
        }
      });
    },
    loadOrder() {
      let user = this.$store.state.user_data;
      if (user == null || user == undefined || user == false) {
        return;
      }
      this.loading = true;
      let _this = this;
      this.getRequest("/order/getMyUnpaidOrder").then(resq => {
        _this.loading = false;
        if (resq) {
          if (resq.totalCount == 0) {
            _this.order = false;
            return;
          }
          let orderDetail = resq.rows[0];
          console.log(orderDetail);
          if (orderDetail.isStudio) {
            console.log("cart有影棚 " + _this.RentTypeDay);
            console.log(orderDetail.studioOrder.rent_type);
            let priceTable = { type: "", time: "", price: "" };
            if (orderDetail.studioOrder.rent_type == _this.RentTypeDay) {
              console.log("cart有影棚 天");
              priceTable.type = "按天";
              priceTable.price = orderDetail.studioOrder.price;
              priceTable.time =
                orderDetail.studioOrder.start_time.substr(0, 10) +
                "至" +
                orderDetail.studioOrder.end_time.substr(0, 10);
            } else {
              console.log("cart有影棚 小时");
              priceTable.type = "按小时";
              priceTable.price = orderDetail.studioOrder.price;
              priceTable.time =
                orderDetail.studioOrder.start_time.substr(0, 16) +
                "至" +
                orderDetail.studioOrder.end_time.substr(11, 5);
            }
            console.log("priceTable = " + priceTable);
            orderDetail.studioOrder.priceTable = [priceTable];
          }
          _this.order = orderDetail;
          console.log(_this.order);
          _this.$emit("refreshOrderMsg", orderDetail);
        }
      });
    },
    removeStudioOrder() {},
    computeTotalPrice() {},
    payOrGenerateOrder() {},
    payOrGenerate() {}
  },
  created() {},
  mounted() {},
  watch: {
    show(val) {
      this.selfShow = val;
    }
  }
};
</script>
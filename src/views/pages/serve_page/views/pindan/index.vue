<template>
  <div class="newServe">
    <el-button @click="addPinpai" class="incomeBtn" type='primary'>添加拼拍</el-button>
    <el-table border :data="goodsList" @sort-change='handleSort'>
      <!--<el-table-column prop='id' label='id' sortable='custom' fixed></el-table-column>-->
      <el-table-column align="center" label="序号" width="70">
			<template slot-scope="scope">
				<span>{{(form.page-1)*form.page_size+scope.$index+1}}</span>
			</template>
		</el-table-column>
      <el-table-column prop='create_time' label='创建时间' sortable='custom' width='120'>
        <template slot-scope="scope">
          {{scope.row.create_time|time2FullDate}}
        </template>
      </el-table-column>
      <el-table-column prop='title' label='标题' width='180'></el-table-column>
      <el-table-column label="图片" align="center" width='100'>
			<template slot-scope="{row}">
				<el-image style="width:60px; height: 60px" :src="util.picExplode(row.photo)" fit="contain"></el-image>
			</template>
		</el-table-column>
      <el-table-column prop='price' label='价格'></el-table-column>
      <el-table-column prop='total' label='销量' sortable='custom'></el-table-column>
      <el-table-column prop='team_receipt' label='收件结束时间' width='110'></el-table-column>
      <el-table-column prop='team_shot' label='拍摄时间' width='100'></el-table-column>
      <el-table-column prop='team_deliver' label='交付时间' width='100'></el-table-column>
      <el-table-column prop='team_service' label='售后结束' width='100'></el-table-column>
      <el-table-column prop='team_num' label='成团数量'></el-table-column>
      <el-table-column prop='team_max' label='最大数量'></el-table-column>
      <el-table-column prop='team_limit' label='每人限购'>
        <template slot-scope="scope">
          {{scope.row.team_limit=='0'?'不限':scope.row.team_limit}}
        </template>
      </el-table-column>
      <el-table-column label='状态'>
        <template slot-scope="scope">
          {{scope.row.is_up==0?'下架':'上架'}}
        </template>
      </el-table-column>
      <el-table-column label='删除与否'>
        <template slot-scope="scope">
          {{scope.row.del==0?'未删除':'已删除'}}
        </template>
      </el-table-column>
      <el-table-column label='审核状态'>
        <template slot-scope="scope">
          {{scope.row.valid=='0'?'未审核':scope.row.valid=='1'?'审核通过':'审核未通过'}}
        </template>
      </el-table-column>
      <el-table-column label='审核信息' prop='valid_msg'></el-table-column>
      <el-table-column label='操作' fixed='right' width='200'>
        <template slot-scope="scope">
          <el-button type='text' @click="toDetail(scope.row.id)">详情</el-button>
          <el-button type='text' @click="edit(scope.row.id)">修改</el-button>
          <el-button type='text' @click="upAndDown(scope.row.id,scope.row.is_up)">{{scope.row.is_up==1?'下架':'上架'}}</el-button>
          <el-button type='text' @click="del(scope.row.id,scope.row.del)">{{scope.row.del==0?'删除':'恢复'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页模块-->
		<pagination :total="total" :page="form.page" :pagesize="form.page_size" @getPageNum="changePage" class="pagination"></pagination>
  </div>
</template>
<script>
import clipper from "FrontComponents/photoClipper";
import pagination from "FrontComponents/pagination";
import { mapGetters } from "vuex";
export default {
  components: {
    clipper,
    pagination,
  },
  computed: {
    ...mapGetters(["is_login_in", "user_data"])
  },
  data(){
    return{
      goodsList:[],
      form:{
        page:1,
        page_size:10,
        is_up:null,
        del:null,
      },
      total:0,
      shortOrder:'',
      order_by:'',
    }
  },
  methods:{
    upAndDown(id,up){
      console.log(id);
      let tmp=(up=='0'?'1':'0')
      this.postRequest('team/update',{id,is_up:tmp}).then(res=>{
        this.$message.success('修改成功')
        this.getList();
      })
    },
    getList(){
      this.getRequest('team/ajaxGetGoods',{...this.form,uid:this.user_data.id,order_by:this.order_by||null,order:this.shortOrder||null}).then(res=>{
        console.log(res,'sdadjj');
        this.goodsList=res.rows;
        this.total=res.total_count
      })
    },
    changePage(val) {
				this.form.page = val;
				this.getList();
		},
    addPinpai(){
      this.$router.push('pindanDetail')
    },
    toDetail(id){
      this.$router.push({
        path:'pindanDetail',
        query:{id,type:'detail'}
      })
    },
    edit(id){
      this.$router.push({
        path:'pindanDetail',
        query:{id,type:'edit'}
      })
    },
    del(id,dels){
      let tmp=(dels==0?'1':'0')
      this.postRequest('team/update',{id,del:tmp}).then(res=>{
        this.$message.success('修改成功')
        this.getList();
      })
    },
    handleSort(col){
      console.log(col,'???');
      let shortOrder;
      switch (col.order) {
        case 'ascending':
          this.shortOrder='asc'
          this.order_by=col.prop
          console.log('fjgvfjknk');
          break;
        case 'descending':
          this.shortOrder='desc'
          this.order_by=col.prop
          break;
        default:
          shortOrder=null
      }
      this.getRequest('team/ajaxGetGoods',{...this.form,uid:this.user_data.id,order_by:this.order_by,order:this.shortOrder}).then(res=>{
        console.log(res,'sdadjj');
        this.goodsList=res.rows;
        this.total=res.total_count
      })
    },
  },
  created(){
    this.getList()
  },
}
</script>
<style lang="scss">
  
</style>
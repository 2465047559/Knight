<template>
<!--  订单试图-->
  <div>
    <form action="/">
      <van-search
              v-model="searchValue"
              show-action
              shape="round"
              clearable
              action-text="取消"
              background="#00faf2"
              placeholder="请输入商品订单编号"
              @search="onOrderSearch"
              @input="changeOrderSearch"
              @cancel="onOrderSearchButton"
      />
    </form>
    <van-list
            v-model="listLoading"
            :finished="listFinished"
            finished-text="没有更多订单了"
            @load="listOnLoad"
    >
    <div v-for="(value,index) in orderData"
         :key="index">
      <van-card
              style="margin-top: 10px;"
              @click="goOneOrder(index)"
              :desc="'作业语言:'+value.orderName+
              '反馈名称:'+value.orderWantName"
              :title="'ID:'+value._id"
              :thumb="value.userImg"
      >
        <template #tags >
          <van-tag plain mark type="primary"
                   style="margin-right:10px;margin-top: 8px;">
            {{value.orderPayState}}</van-tag>
          <van-tag plain mark type="primary"
                   style="margin-top: 8px;">
            {{value.orderState}}</van-tag>
        </template>

        <template #footer v-if="value.orderState === '已完成'">
          <van-button size="mini" type="danger">删除</van-button>
        </template>

      </van-card>
    </div>
    </van-list>
  </div>
</template>

<script>
  import {formatdate} from "../../utils/dataFormat";
  import { Card,Search,Toast,Tag,Button,List} from 'vant';
  export default {
    name: "orderView",
    components:{
      [Search.name]: Search,
      [Card.name]: Card,
      [Tag.name]:Tag,
      [Button.name]: Button,
      [List.name]: List,
    },
    data(){
      return{
        searchValue: '',
        searchOrder: [],
        orderData: [],  //订单数据
        NowPages: 0,  //当前页
        orderCount: 10,   //指定订单长度
        listLoading: false, //加载状态
        listFinished: false, //完成状态
      }
    },
    methods: {
      changeOrderSearch(val){
        this.searchValue = val;
      },
      //订单搜索方法
      SearchMethod(){
        let query ="db.collection('myOrder')\n" +
            "  .where({\n" +
            "    _id: \""+this.searchValue+"\"\n" +
            "  })\n" +
            "  .get()\n"
        this.$axios({
          url:"/api/tcb/databasequery?access_token="+this.$store.state.access_token+"",
          method: 'POST',
          data: {
            "env": this.$store.state.envid,
            "query": query,
          },
        }).then( res => {
          console.log(res.data);
          //将数据转化为JSON格式
          for (let i=0;i<res.data.data.length;i++){
            this.searchOrder.push(JSON.parse(res.data.data[i]));
          }
          //格式化时间
          for (let i=0;i<this.searchOrder.length;i++){
            this.searchOrder[i].orderCreateTime = formatdate(
                new Date(this.searchOrder[i].orderCreateTime.$date),'yyyy-MM-dd hh:mm:ss'); //格式化创建时间
            this.searchOrder[i].orderLastTime = formatdate(
                new Date(this.searchOrder[i].orderLastTime.$date),'yyyy-MM-dd hh:mm:ss'
            ); //格式化创建时间
          }
          this.$store.commit("getOneOrder",this.searchOrder[0]);
          Toast.success("获取成功");
          this.$router.push("/oneOrderView")
        }).catch( err => {
          console.log(err);
        })
      },
      //订单搜索
      onOrderSearch() {
        this.SearchMethod();
      },
      //取消按钮
      onOrderSearchButton() {

      },
      //前往指定订单
      goOneOrder(index){
        this.$store.commit("getOneOrder",this.orderData[index]);//将当个商品提交到全局
        if (this.$store.state.oneOrder!=''){
          this.$router.push("/oneOrderView");
        }else {
          Toast("获取商品详细信息失败!");
        }
      },

      //获取指定状态长度
      getOrderStateCount() {
        let query = "db.collection(\"myOrder\")" +
            ".where({orderState:'"+this.orderState+"'})" +
            ".count()";
        this.$axios({
          url: "/api/tcb/databasequery?access_token=" + this.$store.state.access_token + "",
          method: 'POST',
          data: {
            "env": this.$store.state.envid,
            "query": query,
          },
        }).then(res => {
          this.orderCount = res.data.pager.Total;  //设置长度
        }).catch(err => {
          console.log(err);
        })
      },

      //订单加载
      listOnLoad() {
        let query = "db.collection(\"myOrder\")" +
            ".where({orderState:'"+this.orderState+"'})" +
            ".skip("+(this.NowPages)*10+")" +
            ".limit(10)" +
            ".get()";
        this.$axios({
          url: "/api/tcb/databasequery?access_token=" + this.$store.state.access_token + "",
          method: 'POST',
          data: {
            "env": this.$store.state.envid,
            "query": query,
          },
        }).then(res => {
          //将数据转化为JSON格式
          for (let i=0;i<res.data.data.length;i++){
            this.orderData[(this.NowPages)*10+i] = JSON.parse(res.data.data[i]);
          }
          //格式化时间
          for (let i=0;i<this.orderData.length;i++) {
            this.orderData[(this.NowPages)*10+i].orderCreateTime = formatdate(
                new Date(this.orderData[(this.NowPages)*10+i].orderCreateTime.$date), 'yyyy-MM-dd hh:mm:ss'); //格式化创建时间
            this.orderData[(this.NowPages)*10+i].orderLastTime = formatdate(
                new Date(this.orderData[(this.NowPages)*10+i].orderLastTime.$date), 'yyyy-MM-dd hh:mm:ss'
            ); //格式化创建时间
          }
          this.NowPages += 1;   //当前页加一
          // 加载状态结束
          this.listLoading = false;
        }).catch(err => {
          console.log(err);
        });
        // 数据全部加载完成
        if (this.orderData.length >= this.orderCount) {
          this.listFinished = true;
        }
      }
    },
    props:['orderState'],
    created() {
      this.getOrderStateCount();
    }
  }
</script>

<style scoped>
</style>
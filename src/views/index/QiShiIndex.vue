<template>
<!--  首页-->
  <div>
<!--    搜索框-->
    <search/>
<!--    订单消息-->
    <gong-ge :GridItemValue = "Orders">
      <template v-slot:GirdTitle>
        <span class="titleSize">订单详情</span>
      </template>
    </gong-ge>
    <br/>
<!--    蘑菇丁订单-->
    <gong-ge :GridItemValue= "MoGuOrders">
      <template v-slot:GirdTitle>
        <span class="titleSize">蘑菇丁详情</span>
      </template>
    </gong-ge>

    <span class="titleSize">资源列表</span>
    <my-shopping/>
  </div>
</template>

<script>
  import Search from "./Search";
  import GongGe from "./GongGe";
  import MyShopping from "../shopping/myShopping";
  export default {
    name: "QiShiIndex",
    components: {MyShopping, GongGe, Search,},
    data(){
      return{
        Orders: [
          {
            text: '',
            num: '',
            url: '',
          },
          {
            text: '',
            num: '',
            url: '',
          },
          {
            text: '',
            num: '',
            url: '',
          },
        ],   //订单信息
        orderState: ['待开发','开发中','已完成'],    //订单状态
        orderStateUrl:['/undevelopedOrder','/developingOrder','/developedOrder'],  //订单地址
        MoGuOrders: [
          {
            text: '',
            num: '',
            url: '',
          },
          {
            text: '',
            num: '',
            url: '',
          },
          {
            text: '',
            num: '',
            url: '',
          },
        ],  //蘑菇丁订单信息
        MoGuState: ['未打卡','打卡中','已改变'],
        MoGuStateUrl: ['/noPunchClock','/punchClockIng','/messageChange'],  //蘑菇丁地址
      }
    },
    methods:{
      //获取订单信息
      getOrders(){
        //发送请求
        for (let i=0;i<this.orderState.length;i++){
          let query = "db.collection('myOrder')\n" +
              "  .where({\n" +
              "    orderState: \""+this.orderState[i]+"\",\n" +
              "  })\n" +
              "  .count()";
          this.$axios({
            url:"/api/tcb/databasequery?access_token="+this.$store.state.access_token+"",
            method: 'POST',
            data: {
              "env": this.$store.state.envid,
              "query": query,
            },
          }).then( res => {
            this.Orders[i].text = this.orderState[i];
            this.Orders[i].num = res.data.pager.Total;
            this.Orders[i].url = this.orderStateUrl[i];
          }).catch( err => {
            console.log(err);
          })
        }
      },

      //获取蘑菇丁订单信息
      getMoGuOrders(){
        //发送请求
        for (let i=0;i<this.MoGuState.length;i++){
          let query = "db.collection('moGuOrder')\n" +
              "  .where({\n" +
              "    moGuState: \""+this.MoGuState[i]+"\",\n" +
              "  })\n" +
              "  .count()";
          this.$axios({
            url:"/api/tcb/databasequery?access_token="+this.$store.state.access_token+"",
            method: 'POST',
            data: {
              "env": this.$store.state.envid,
              "query": query,
            },
          }).then( res => {
            this.MoGuOrders[i].text = this.MoGuState[i];
            this.MoGuOrders[i].num = res.data.pager.Total;
            this.MoGuOrders[i].url = this.MoGuStateUrl[i];
          }).catch( err => {
            console.log(err);
          })
        }
      },


    },
    created() {
      this.getOrders();
      this.getMoGuOrders();
    }
  }
</script>

<style scoped>
  .titleSize{
    font-size: 16px;
    color: #C8C9CC;
    margin-left: 20px;
  }
</style>
<template>
  <div>
    <van-nav-bar
            title="蘑菇订单"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
    />
    <van-list
            v-model="listLoading"
            :finished="listFinished"
            finished-text="没有更多订单了"
            @load="listOnLoad"
    >
    <div v-for="(value,index) in moGuOrder"
         :key="index">
      <van-card
              style="margin-top: 10px;"
              @click="goOneMoGuOrder(index)"
              :desc="'蘑菇账号:'+value.moGuPhone+
              '蘑菇密码:'+value.moGuPassword"
              :title="'ID:'+value._id"
              :thumb="value.userImg"
      >
        <template #tags >
          <van-tag plain mark type="primary"
                   style="margin-right:10px;margin-top: 8px;">
            {{value.moGuState}}</van-tag>
          <van-tag plain mark type="primary"
                   style="margin-top: 8px;">
            {{value.moGuPayState === true? "已付款" :"未付款"}}</van-tag>
        </template>

      </van-card>
    </div>
    </van-list>
  </div>
</template>

<script>
  import { Card,Tag,Button,NavBar,Toast,List} from 'vant';
  import {formatdate} from "../../utils/dataFormat";
  export default {
    name: "moGuOrderView",
    components:{
      [Card.name]: Card,
      [Tag.name]:Tag,
      [Button.name]: Button,
      [NavBar.name]: NavBar,
      [List.name]: List,
    },
    data(){
      return{
        listLoading: false,
        listFinished: false,
        nowPages: 0,
        moGuOrder:[],
        moGuOrderLength: 10,  //蘑菇丁订单数量
      }
    },
    props:['moGuOrderState'],
    methods:{
      //前往当个订单
      goOneMoGuOrder(index){
        this.$store.commit("getOneMoGuOrder",this.moGuOrder[index]);
        if (this.$store.state.oneMoGuOrder!=''){
          Toast.success("读取成功")
          this.$router.push("/oneMoGuOrderView");
        }else {
          Toast.fail("读取失败");
        }
      },
      //放回上一级
      onClickLeft(){
        this.$router.go(-1);
      },

      //获取蘑菇丁指定打卡数里那个
      gerNowStateCount(){
        let query = "db.collection(\"moGuOrder\")." +
            "where({moGuState:'"+this.moGuOrderState+"'})" +
            ".count()"
        this.$axios({
          url:"/api/tcb/databasequery?access_token="+this.$store.state.access_token+"",
          method: 'POST',
          data: {
            "env": this.$store.state.envid,
            "query": query,
          },
        }).then( res => {
          this.moGuOrderLength = res.data.pager.Total;
        }).catch( err => {
          console.log(err);
        })
      },

      //List资源加载
      listOnLoad() {
        let query = "db.collection(\"moGuOrder\")." +
            "where({moGuState:'"+this.moGuOrderState+"'})" +
            ".skip("+(this.nowPages)*10+")" +
            ".limit(6)" +
            ".get()";
        this.$axios({
          url:"/api/tcb/databasequery?access_token="+this.$store.state.access_token+"",
          method: 'POST',
          data: {
            "env": this.$store.state.envid,
            "query": query,
          },
        }).then( res => {
          //将数据转化为JSON格式
          for (let i=0;i<res.data.data.length;i++){
            this.moGuOrder[(this.nowPages)*10+i] = JSON.parse(res.data.data[i]);
          }
          //格式化时间
          for (let i=0;i<this.moGuOrder.length;i++){
            this.moGuOrder[(this.nowPages)*10+i].moGuOrderCreateTime =
                formatdate(new Date(
                    this.moGuOrder[(this.nowPages)*10+i].moGuOrderCreateTime.$date),'yyyy-MM-dd hh:mm:ss'); //格式化创建时间
          }
          this.nowPages +=1;
          // 加载状态结束
          this.listLoading = false;
        }).catch( err => {
          console.log(err);
        });
        // 数据全部加载完成
        if (this.moGuOrder.length >= this.moGuOrderLength) {
          this.listFinished = true;
        }
      }
    },
    created() {
      this.gerNowStateCount();
    }
  }
</script>

<style scoped>

</style>
<template>
  <div>
    <van-cell-group  style="margin-left: 140px;;margin-top: 30px;">
      <van-image round width="100" height="100" :src="oneMoGuOrder.userImg" />
    </van-cell-group>

    <van-cell-group>
      <van-field v-model="oneMoGuOrder.userName" label="用户昵称" readonly/>
      <van-field v-model="oneMoGuOrder._id" type="textarea" autosize label="订单编号" readonly />
      <van-field v-model="oneMoGuOrder._openid" label="用户ID" readonly/>
      <van-field v-model="oneMoGuOrder.moGuOrderCreateTime" label="创建时间" readonly/>
      <van-field v-model="oneMoGuOrder.moGuPhone" label="蘑菇账号" readonly/>
      <van-field v-model="oneMoGuOrder.moGuPassword" label="蘑菇密码" readonly/>
      <van-field v-model="oneMoGuOrder.moGuSTARTTime" label="上班打卡时间" readonly/>
      <van-field v-model="oneMoGuOrder.moGuENDTime" label="下班打卡时间" readonly/>
      <van-field v-model="oneMoGuOrder.moGuAddress" label="打卡地点" readonly/>
      <van-field v-model="oneMoGuOrder.moGuClickTime" label="打卡期限" readonly/>
      <van-field v-model="oneMoGuOrder.moGuNumber" label="剩余修改次数"/>
    </van-cell-group>

    <van-cell-group>
      <van-field label="订单支付状态">
        <template #input>
          <van-radio-group v-model="oneMoGuOrder.moGuPayState" direction="horizontal">
            <van-radio :name="true" icon-size="15px">
              <span class="radioText">已付款</span>
            </van-radio>
            <van-radio :name="false" icon-size="15px">
              <span class="radioText">未付款</span>
            </van-radio>
          </van-radio-group>
        </template>
      </van-field>
    </van-cell-group>
    <van-button type="primary" style="width: 150px;margin:10px 10px"
                @click="updateOneMoGuOrder">确定修改</van-button>
    <van-button type="danger" style="width: 150px;margin:10px 10px;"
                @click="deleteOneMoGuOrder">删除订单</van-button>
  </div>
</template>

<script>
  import { Field, CellGroup,Cell,
    Image as VanImage,Button,Radio,RadioGroup,Toast } from 'vant';
  export default {
    name: "oneMoGuOrderViews",
    components:{
      [Field.name]: Field,
      [CellGroup.name]: CellGroup,
      [Cell.name]: Cell,
      [VanImage.name]: VanImage,
      [Button.name]: Button,
      [Radio.name]: Radio,
      [RadioGroup.name]: RadioGroup,
    },
    data(){
      return{
        oneMoGuOrder: this.$store.state.oneMoGuOrder
      }
    },
    methods:{
      //修改蘑菇订单
      updateOneMoGuOrder(){
        this.$axios({
          url: "/api/tcb/databaseupdate?access_token="+this.$store.state.access_token+"",
          method: 'POST',
          data:{
            "env": this.$store.state.envid,
            "query": "db.collection(\"moGuOrder\").doc(\""+this.oneMoGuOrder._id+"\").update({data:{" +
                "moGuNumber: "+this.oneMoGuOrder.moGuNumber+"," +
                "moGuPayState: "+this.oneMoGuOrder.moGuPayState+"" +
                "}})",
          }
        }).then( res => {
          if (res.data.errcode === 0){
            Toast.success('修改成功');
            setTimeout(this.$router.go(-1),2000)
          }
        }).catch( err => {
          console.log(err);
        })
      },

      //删除蘑菇订单
      deleteOneMoGuOrder(){
      //发送请求
        this.$axios({
          url:"/api/tcb/databasedelete?access_token="+this.$store.state.access_token+"",
          method: 'POST',
          data: {
            "env": this.$store.state.envid,
            "query": "db.collection(\"moGuOrder\")" +
                ".where({_id:\""+this.oneMoGuOrder._id+"\"}).remove()"
          },
        }).then( res => {
          if (res.data.errmsg === "ok"){
            Toast.success('删除成功');
            setTimeout(this.$router.go(-1),2000)
          }
        }).catch( err => {
          console.log(err);
        })
      },
    },
  }
</script>

<style scoped>

</style>
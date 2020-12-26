<template>
  <div>
    <van-cell-group style="margin-left: 140px;;margin-top: 30px;">
      <van-image round width="100" height="100" :src="this.$store.state.oneOrder.userImg" />
    </van-cell-group>

    <van-cell-group>
      <van-field v-model="oneOrder.userName" label-width="90px" colon label="用户昵称" readonly/>
      <van-field v-model="oneOrder._id" colon
                 type="textarea" autosize
                 label-width="90px" 
                 label="订单编号"
                 readonly />
      <van-field v-model="oneOrder._openid" label-width="90px" colon label="用户ID" readonly/>
      <van-field v-model="oneOrder.orderCreateTime" label-width="90px" colon label="创建时间" readonly/>
      <van-field v-model="oneOrder.orderLastTime" label-width="90px" colon label="结束时间" readonly/>
      <van-field v-model="oneOrder.orderName" label-width="90px" colon label="作业语言" readonly/>
      <van-field v-model="oneOrder.orderWantName" label-width="90px" colon label="反馈名称" readonly/>
      <van-field v-model="oneOrder.orderExplain" label-width="90px" colon label="订单说明" readonly/>
    </van-cell-group>

    <van-cell-group>
      <van-field label="金额估算" label-width="90px"  border colon>
        <template #input>
          <van-field v-model="oneOrder.orderMin">
            <template #right-icon>
              <span>元</span>
            </template>
          </van-field>
          <van-field v-model="oneOrder.orderMax" center>
            <template #right-icon>
              <span>元</span>
            </template>
          </van-field>
        </template>
      </van-field>
      <van-field v-model="oneOrder.orderMoney" label-width="90px"  colon label="最终金额">
        <template #right-icon>
          <span>元</span>
        </template>
      </van-field>
      <van-field v-model="oneOrder.orderGiveMoney" label-width="90px"  colon label="订金金额">
        <template #right-icon>
          <span>元</span>
        </template>
      </van-field>
    </van-cell-group>

    <van-cell-group>
      <van-field
              readonly
              clickable
              label="订单状态"
              colon
              :value="oneOrder.orderState"
              @click="showOrderState = true"
      />
      <van-popup v-model="showOrderState" round position="bottom"
                 :style="{ height: '40%'}" >
        <van-picker
                show-toolbar
                :columns="orderStates"
                @cancel="showOrderState = false"
                @confirm="onConfirm"
        />
      </van-popup>
    </van-cell-group>

    <van-cell-group>
      <van-field v-model="oneOrder.orderFeedBack" label-width="90px"  colon type="textarea" autosize
                 maxlength="500"
                 show-word-limit
                 label="订单反馈"/>
      <van-field label="订金状态" label-width="90px"  colon>
        <template #input>
          <van-radio-group v-model="oneOrder.orderBeforePayState" direction="horizontal">
            <van-radio name="已付款" icon-size="15px">
              <span class="radioText">已付款</span>
            </van-radio>
            <van-radio name="未付款" icon-size="15px">
              <span class="radioText">未付款</span>
            </van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field label="订单支付状态" label-width="90px"  colon>
        <template #input>
          <van-radio-group v-model="oneOrder.orderPayState" direction="horizontal">
            <van-radio name="已付款" icon-size="15px">
              <span class="radioText">已付款</span>
            </van-radio>
            <van-radio name="未付款" icon-size="15px">
              <span class="radioText">未付款</span>
            </van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field label="用户是否删除" label-width="90px"  colon>
        <template #input>
          <van-radio-group v-model="oneOrder.orderLookState" direction="horizontal">
            <van-radio name="0" icon-size="15px">
              <span class="radioText">已删除</span>
            </van-radio>
            <van-radio name="1" icon-size="15px">
              <span class="radioText">未删除</span>
            </van-radio>
          </van-radio-group>
        </template>
      </van-field>
    </van-cell-group>


    <van-button type="primary" style="width: 150px;margin:10px 10px"
                @click="updateOneOrder">确定修改</van-button>
    <van-button type="danger" style="width: 150px;margin:10px 10px;"
                @click="deleteOneOrder">删除订单</van-button>
  </div>
</template>

<script>
  import { Field, CellGroup,Cell,
    Image as VanImage,Button,Radio,RadioGroup,Toast,
    Popup,Picker} from 'vant';
  export default {
    name: "oneOrderView",
    data(){
      return{
        oneOrder: this.$store.state.oneOrder,  //当个商品属性
        showOrderState: false,  //是否展示选择订单状态框
        orderStates: ['待开发','开发中','已完成'],
      }
    },
    components:{
      [Field.name]: Field,
      [CellGroup.name]: CellGroup,
      [Cell.name]: Cell,
      [VanImage.name]: VanImage,
      [Button.name]: Button,
      [Radio.name]: Radio,
      [RadioGroup.name]: RadioGroup,
      [Popup.name]: Popup,
      [Picker.name]: Picker,
    },
    methods:{
      //按下确定按钮
      onConfirm(value){
        this.oneOrder.orderState = value;
        this.showOrderState = false;
      },
      //订单更新
      updateOneOrder(){
        this.$axios({
          url: "/api/tcb/databaseupdate?access_token="+this.$store.state.access_token+"",
          method: 'POST',
          data:{
            "env": this.$store.state.envid,
            "query": "db.collection(\"myOrder\").doc(\""+this.oneOrder._id+"\").update({data:{" +
                "orderMin: "+this.oneOrder.orderMin+"," +
                "orderMax: "+this.oneOrder.orderMax+"," +
                "orderMoney:"+this.oneOrder.orderMoney+","+
                "orderPayState:\""+this.oneOrder.orderPayState+"\","+
                "orderState:\""+this.oneOrder.orderState+"\","+
                "orderFeedBack:\""+this.oneOrder.orderFeedBack+"\","+
                "orderGiveMoney:\""+this.oneOrder.orderGiveMoney+"\","+
                "orderBeforePayState:\""+this.oneOrder.orderBeforePayState+"\""+
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

      //订单删除
      deleteOneOrder(){
        //发送请求
        this.$axios({
          url:"/api/tcb/databasedelete?access_token="+this.$store.state.access_token+"",
          method: 'POST',
          data: {
            "env": this.$store.state.envid,
            "query": "db.collection(\"myOrder\").where({_id:\""+this.oneOrder._id+"\"}).remove()"
          },
        }).then( res => {
          if (res.data.errmsg === "ok"){
            Toast.success('删除成功');
            setTimeout(this.$router.go(-1),2000)
          }
        }).catch( err => {
          console.log(err);
        })
      }
    },
  }
</script>

<style scoped>
  .radioText{
    font-size: 15px;
  }
</style>
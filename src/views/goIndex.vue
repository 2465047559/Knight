<template>
  <div>
    <van-cell-group style="margin-left: 120px;;margin-top: 30px;margin-bottom: 20px;">
      <van-image round width="100" height="100"
                 :src="userImg" />
    </van-cell-group>
    <van-form @submit="onSubmit">
      <van-field
              v-model="username"
              name="username"
              label="用户名"
              placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
              v-model="password"
              type="password"
              name="password"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
  import { Button,Toast,Form,Field,CellGroup,Image as VanImage} from 'vant';
  export default {
    name: "goIndex",
    components:{
      [Field.name]: Field,
      [Form.name]: Form,
      [CellGroup.name]: CellGroup,
      [Button.name]: Button,
      [VanImage.name]: VanImage,
    },
    data(){
      return{
        username: '',
        password: '',
        userImg: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=771975899,3536404012&fm=26&gp=0.jpg'
      }
    },
    methods:{
      //获取AccessToken
      getAccessToken(){
        this.$axios.get('/api/cgi-bin/token',{
          params:{
            grant_type:'client_credential',
            appid: this.$store.state.appid,
            secret: this.$store.state.secret
          }
        }).then( res => {
          this.$store.commit("getAccess_token",res.data.access_token)  //提交access_token到全局
          if (this.$store.state.access_token=='') {
            Toast("无效TOKEN")
          }
        }).catch( err => {
          console.log(err.response);
        })
      },

      //
      onSubmit(values){
        let query = "db.collection('userAdmin').where({\n" +
            "  userName: '"+values.username+"',\n" +
            "  userPassword: '"+values.password+"',\n" +
            "}).count()"
        this.$axios({
          url: "/api/tcb/databasequery?access_token=" + this.$store.state.access_token + "",
          method: 'POST',
          data: {
            "env": this.$store.state.envid,
            "query": query,
          },
        }).then(res => {
          console.log(res.data);
          console.log(res.data.pager.Total);
          if (res.data.pager.Total >=1){
            this.$router.push("/qiShiIndex")
          }else {
            Toast("账号密码错误");
          }
        }).catch(err => {
          console.log(err);
        })
      }
    },
    created() {
      this.getAccessToken();
    }
  }
</script>

<style scoped>
.van-button{

}
</style>
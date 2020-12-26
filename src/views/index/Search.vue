<template>
<!--  搜索框-->
  <div>
    <form action="/">
      <van-search
              v-model="value"
              show-action
              background="#00faf2"
              placeholder="请输入搜索关键词"
              @search="onSearch"
              @cancel="onCancel"
      />
    </form>
  </div>
</template>

<script>
  import { Search,Toast } from 'vant';
  export default {
    name: "Search",
    components:{
      [Search.name]:Search,   //搜索组件
    },
    data() {
      return {
        value: '',
        searchShopping: [],
      };
    },
    methods: {
      onSearch(val) {
        if (val != ''){
          let query = "db.collection('myShopping').where({\n" +
              "shoppingName: {\n" +
              "  $regex:'.*"+val+"',\n" +
              "  $options: 'i'\n" +
              "  },\n" +
              "}).get()"
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
              this.searchShopping.push(JSON.parse(res.data.data[i]));
            }
            for (let i = (this.NowPage) * 10; i < this.searchShopping.length; i++) {
              let file_list = [{
                "fileid": this.searchShopping[i].shoppingImg,
                "max_age": 7200
              }]
              this.$axios({
                url: "/api/tcb/batchdownloadfile?access_token=" + this.$store.state.access_token + "",
                method: "POST",
                data: {
                  "env": this.$store.state.envid,
                  "file_list": file_list
                }
              }).then(res => {
                this.searchShopping[i].orderImg = res.data.file_list[0].download_url;  //设置图片
              })

            }
            this.$store.commit("getSearchShopping",this.searchShopping);
            if (this.searchShopping !=''){
              Toast.success("搜索成功");
              this.$router.push("/searchShopping");
            }else {
              Toast.fail("没有搜到该资源")
            }
          }).catch( err => {
            console.log(err);
          })
        }else {
          Toast.fail("搜索为空")
        }
      },
      onCancel() {
        Toast('取消');
      },
    },
  }
</script>

<style scoped>

</style>
<template>
  <div>
    <van-list
            v-model="listLoading"
            :finished="listFinished"
            finished-text="没有更多资源了"
            @load="listOnLoad"
    >
      <div class="shoppingBox" v-for="(value,index) in MyShopping" :key="index">
        <div class="shoppingPhoto">
          <van-image width="100" height="100" :src="value.shoppingImg"/>
        </div>
        <div class="shoppingRight">
          <div class="shoppingTitle">
            <span>{{value.shoppingName}}</span>
          </div>
          <div class="shoppingInput">
            <van-field
                    v-model="value.shoppingHref"
                    rows="1"
                    readonly
                    autosize
                    type="textarea"
            />
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
  import {List, Card, Field, Image as VanImage} from 'vant';

  export default {
    name: "myShopping",
    components: {
      [List.name]: List,
      [Card.name]: Card,
      [Field.name]: Field,
      [VanImage.name]: VanImage,
    },
    data() {
      return {
        MyShopping: [],   //用来存放资源
        MyShoppingLength: 10,    //用来计入资源长度
        NowPage: 0,   //用来计入当前页数
        listLoading: false,  //list集合加载
        listFinished: false, //list完成状态
      }
    },
    methods: {
      //获取资源长度
      getMyShoppingCount() {
        let query = "db.collection('myShopping').count()";
        this.$axios({
          url: "/api/tcb/databasequery?access_token=" + this.$store.state.access_token + "",
          method: 'POST',
          data: {
            "env": this.$store.state.envid,
            "query": query,
          },
        }).then(res => {
          this.MyShoppingLength = res.data.pager.Total;  //设置长度
        }).catch(err => {
          console.log(err);
        })
      },
      //List资源加载
      listOnLoad() {
        let query = "db.collection('myShopping')\n" +
            "  .skip(" + (this.NowPage) * 10 + ")\n" +
            "  .limit(10)\n" +
            "  .get()"
        this.$axios({
          url: "/api/tcb/databasequery?access_token=" + this.$store.state.access_token + "",
          method: 'POST',
          data: {
            "env": this.$store.state.envid,
            "query": query,
          },
        }).then(res => {
          //将数据转化为JSON格式
          for (let i = 0; i < res.data.data.length; i++) {
            this.MyShopping[(this.NowPage)*10+i] = JSON.parse(res.data.data[i]);
          }
          for (let i = (this.NowPage) * 10; i < this.MyShopping.length; i++) {
            let file_list = [{
              "fileid": this.MyShopping[i].shoppingImg,
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
              this.MyShopping[i].orderImg = res.data.file_list[0].download_url;  //设置图片
            })
          }
          this.NowPage += 1;   //当前页加一
          // 加载状态结束
          this.listLoading = false;
        }).catch(err => {
          console.log(err);
        });

        // 数据全部加载完成
        if (this.MyShopping.length >= this.MyShoppingLength) {
          this.listFinished = true;
        }
      }
    },
    created() {
      this.getMyShoppingCount();
    }
  }
</script>

<style scoped>
  .shoppingBox {
    width: 100%;
    height: 180px;
    display: flex;
    margin-top: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }

  .shoppingPhoto {
    width: 100px;
    height: 100px;
    margin: 10px;
  }

  .shoppingRight {
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 180px;
    margin-top: 10px;
  }

  .shoppingTitle {
    width: 100%;
    height: 30px;
    font-size: 24px;
    color: #070707;
    float: left;
    font-family: "娃娃体";
  }

  .shoppingInput {
    width: 100%;
    height: 80px;
    margin-bottom: 10px;
  }
</style>
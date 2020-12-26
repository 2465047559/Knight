<template>
  <div>
    <van-nav-bar
            title="搜索结果"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
    />
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
  </div>
</template>

<script>
  import {Field, Image as VanImage,NavBar} from 'vant';
  export default {
    name: "searchShopping",
    components: {
      [Field.name]: Field,
      [VanImage.name]: VanImage,
      [NavBar.name]: NavBar,
    },
    data(){
      return{
        MyShopping: this.$store.state.searchShopping,
      }
    },
    methods:{
      onClickLeft(){
        this.$router.go(-1)
      }
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
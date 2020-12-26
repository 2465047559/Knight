<template>
<!--  宫格-->
  <div>
    <slot name="GirdTitle">

    </slot>

    <van-grid  :column-num="3"  clickable>
      <van-grid-item v-for="(value,index) in GridItemValue"
                     :to=value.url
                     :key="index">
        <span class="textSize">{{value.text}}</span>
        <span class="numSize">{{value.num}}</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
  import { Grid, GridItem,Icon} from 'vant';
  export default {
    name: "GongGe",
    components:{
      [Grid.name]: Grid,
      [GridItem.name]: GridItem,
      [Icon.name]: Icon,
    },
    data(){
      return{}
    },
    props:['GridItemValue']
  }
</script>

<style scoped>

  .textSize{
    font-size: 18px;
    color: #323233;
  }
  .numSize{
    font-size: 23px;
    color: #ED6A0C;
  }
</style>
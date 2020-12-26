<template>
  <div>
    <mo-gu-order-view :moGuOrderState="moGuOrderState"/>
  </div>
</template>

<script>
  import MoGuOrderView from "./moGuOrderView";
  import {formatdate} from "../../utils/dataFormat";
  export default {
    name: "punchClockIng",
    components: {MoGuOrderView},
    data(){
      return{
        moGuOrderState: '打卡中',
      }
    },
  }
</script>

<style scoped>

</style>
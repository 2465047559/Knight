<template>
  <div>
    <mo-gu-order-view :moGuOrderState="moGuOrderState"/>
  </div>
</template>

<script>
  import MoGuOrderView from "./moGuOrderView";
  export default {
    name: "noPunchClock",
    components: {MoGuOrderView},
    data(){
      return{
        moGuOrderState: '未打卡',
      }
    },
  }
</script>

<style scoped>

</style>
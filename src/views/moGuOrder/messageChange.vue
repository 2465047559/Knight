<template>
  <div>
    <mo-gu-order-view :moGuOrderState="moGuOrderState"/>
  </div>
</template>

<script>
  import MoGuOrderView from "./moGuOrderView";
  export default {
    name: "messageChange",
    components: {MoGuOrderView},
    data(){
      return{
        moGuOrderState: '已改变',
      }
    },
  }
</script>

<style scoped>

</style>
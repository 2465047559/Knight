<template>
<!--  待开发订单-->
  <div>
    <order-view :orderState="orderState"/>
  </div>
</template>

<script>
  import OrderView from "./orderView";
  export default {
    name: "undevelopedOrder",
    components: {OrderView},
    data(){
      return{
        orderState: '待开发',
      }
    },
  }
</script>

<style scoped>

</style>
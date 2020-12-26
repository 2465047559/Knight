<template>
  <div>
    <order-view :orderState="orderState"/>
  </div>
</template>

<script>
  import OrderView from "./orderView";
  export default {
    name: "developedOrder",
    components: {OrderView},
    data(){
      return{
        orderState: '已完成',
      }
    },
  }
</script>

<style scoped>
  .titleSize{
    font-size: 16px;
    color: #C8C9CC;
    margin-left: 20px;
  }
</style>
<template>
  <div>
    <order-view :orderState="orderState"/>
  </div>
</template>

<script>
  import OrderView from "./orderView";
  export default {
    name: "developingOrder",
    components: {OrderView},
    data(){
      return{
        orderState: '开发中',
      }
    },

  }
</script>

<style scoped>

</style>
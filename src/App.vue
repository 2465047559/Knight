<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
  import GoIndex from "./views/goIndex";
  export default {
    name: "App",
    components:{
      GoIndex,
    },
  }
</script>

<style scoped>

</style>
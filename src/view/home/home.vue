<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/images/vue-logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/home/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld
  }
};
</script>
<style lang="less">
.home {
  text-align: center;
}
</style>

<template>
  <div class="home">
    <HomeMenu />
    <router-view></router-view>
    <About />
  </div>
</template>

<script>
import HomeMenu from '../components/comon/HomeMenu.vue'
import About from '../components/comon/About.vue'
export default {
  name: 'Front',
  data() {
    return {}
  },
  components: { HomeMenu, About },

  computed: {},

  methods: {},
}
</script>
<style lang="css" scoped>
.home {
  overflow: hidden;
  /* background: url('../assets/img/Home.jpg'); */
  background-color: #fff;
  background-size: cover;
}
</style>

<template>
  <div class="backimg">
    <el-card
      class="box-card"
      style="border: 1px solid #ccc; margin: 0 25% 0 25%"
    >
      <el-card
        v-for="item in tableList[0]"
        :key="item.id"
        style="background-color: paper"
      >
        <div>
          <span>{{ item.title }}</span>
          <el-divider content-position="left">
            {{ item.author }}
          </el-divider>
          <span>{{ item.subtitle }}</span>
        </div>
        <div>
          <!-- <router-link to="details / id">详情</router-link> -->
          <el-link @click.native="goArticl(item.id)">
            查看详情
            <i class="el-icon-view el-icon--right"></i>
          </el-link>
        </div>
        <small>{{ item.date }}</small>

        <el-divider />
      </el-card>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Read',
  data() {
    return {
      tableList: [],
      id: '',
      // content: '',
      date: '2022年5月11日22:23:00',
      user: localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : {},
    }
  },
  created() {
    this.$http.get('http://localhost:9000/manage/article/list').then(res => {
      this.tableList.push(res.data.data)
      // this.id = res.data.data.id
      // this.tableList = res.data.data
      // console.log(res.data.data)
    })
  },

  methods: {
    goArticl(id) {
      this.$router.push(`details/${id}`)
    },
  },
}
</script>
<style lang="css" scoped>
.letco {
  text-align: right;
}
.el-header {
  text-align: center;
  line-height: 60px;
}
.backimg {
  background: url('../assets/img/locao.gif');
  background-repeat: no-repeat;
  background-size: 100%;
}
</style>

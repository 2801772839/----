<template>
  <div>
    <el-container v-for="item in tableList" :key="item.id">
      <el-header>
        <h1>{{ item.title }}</h1>
      </el-header>
      <el-main v-html="item.content">
        <el-card>
          {{ item.content }}
        </el-card>
      </el-main>
      <el-footer></el-footer>
      <el-button plain @click="previous">点我返回上一级</el-button>

      <div>
        <a-list
          v-if="comments.length"
          :data-source="comments"
          :header="`${comments.length} ${
            comments.length > 1 ? '条评论' : '条评论'
          }`"
          item-layout="horizontal"
        >
          <a-list-item slot="renderItem" slot-scope="item">
            <a-comment
              :author="author"
              :avatar="item.avatar"
              :content="item.content"
              :datetime="item.datetime"
            />
          </a-list-item>
        </a-list>
        <a-comment>
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="author"
          />
          <div slot="content">
            <a-form-item>
              <a-textarea :rows="4" :value="value" @change="handleChange" />
            </a-form-item>
            <a-form-item>
              <a-button
                html-type="submit"
                :loading="submitting"
                type="primary"
                @click="handleSubmit"
              >
                评论
              </a-button>
            </a-form-item>
          </div>
        </a-comment>
      </div>
    </el-container>
  </div>
</template>

<script>
import qs from 'qs'
import moment from 'moment'
export default {
  name: 'BlogDetails',
  data() {
    return {
      tableList: [],
      comments: [],
      submitting: false,
      value: '',
      moment,
      author: '',
    }
  },
  created() {
    this.createDetails()
  },

  methods: {
    //通过id获取当前文章
    createDetails() {
      //id是通过vue-router拿到
      const data = { id: this.$route.params.id }
      const url = 'http://localhost:9000/manage/article/list/'
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url,
      }
      this.$axios(options).then(res => {
        this.tableList = res.data.data
        this.author = res.data.data[0].author
      })
    },

    handleSubmit() {
      if (!this.value) {
        return
      }
      this.submitting = true
      setTimeout(() => {
        this.submitting = false
        this.comments = [
          {
            author: this.author,
            avatar:
              'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: this.value,
            datetime: moment().format('YYYY年 MM月 DD日'),
          },
          ...this.comments,
        ]
        this.value = ''
      }, 1000)
      // console.log(this.value)
      // localStorage.setItem('comment', this.value)
    },
    handleChange(e) {
      this.value = e.target.value
    },
    previous() {
      this.$router.push('/read')
    },
  },
}
</script>
<style lang="css" scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  /* text-align: center; */
  line-height: 40px;
}
</style>

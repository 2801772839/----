<template>
  <div class="topbac">
    <div style="margin: 0 25% 0 25%">
      <el-card>
        <span>标题:</span>
        <el-input v-model="title" placeholder="请输入标题" />
        <br />
        <span>副标题:</span>
        <el-input v-model="subtitle" placeholder="请输入副标题" />
      </el-card>

      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editor"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden"
        v-model="html"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="onCreated"
      />
      <!-- 提交文章-->
      <el-button type="primary" @click="createEdit">提交</el-button>
    </div>
  </div>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css'
import { Boot } from '@wangeditor/editor'
import markdownModule from '@wangeditor/plugin-md'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import qs from 'qs'
Boot.registerModule(markdownModule)

export default {
  name: 'Edit',
  data() {
    return {
      editor: null,
      html: '<p>hello</p>',
      toolbarConfig: {},

      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default', // or 'simple'
      title: '',
      subtitle: '',

      user: localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : {},
    }
  },
  components: { Editor, Toolbar },

  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
      // console.log(editor)
      const html = editor.getHtml()
      // console.log(html[0].txt)
    },

    //提交文章
    createEdit() {
      //点击提交后关闭弹窗
      //先获取拿到的标题
      const title = this.title
      const subtitle = this.subtitle
      const editor = this.editor // 获取 editor 实例
      const html = editor.getHtml() //获取文章内容
      const token = this.user.token
      //请求后台
      const data = {
        token: token,
        title: title,
        content: html,
        subtitle: subtitle,
      }
      const url = 'http://localhost:9000/manage/addedit'
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          token: token,
        },
        data: qs.stringify(data),
        url,
      }

      this.$axios(options).then(res => {
        /**
         * 判断登录用户是否有编辑权限,没有权限就在3秒后跳转至列表页
         */
        if (res.data.errCode === 200) {
          setTimeout(() => {
            this.$message({
              message: '文章添加成功,即将跳转到文章列表页',
              type: 'success',
            })
            this.$router.push('read')
          }, 2000)
        } else {
          setTimeout(() => {
            this.$message.error('您没有权限添加文章,请联系管理员,或登录后尝试')
            this.$router.push('login')
          }, 3000)
        }
      })
    },
  },

  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },
}
</script>
<style scoped>
.edites {
  display: inline-block;
}
.topbac {
  background: url('../assets/img/locao.gif');
  background-repeat: no-repeat;
  background-size: 100%;
}
</style>

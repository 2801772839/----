<template>
  <div>
    <el-main>
      <el-table :data="EditList" style="width: 100%" border stripe>
        <el-table-column prop="id" label="编号" width="140" />
        <el-table-column prop="author" label="创建者" width="140" />
        <el-table-column prop="title" label="标题" width="220" />
        <el-table-column prop="subtitle" label="副标题" width="220" />
        <el-table-column prop="content" label="内容" width="220">
          <template v-slot="scope">
            <el-button type="primary" @click="view(scope.row.content)">
              查看内容
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="warning"
              @click="editArticle(scope.row.content, scope.row.id)"
            >
              编辑
              <i class="el-icon-edit" />
            </el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.row.id)"
              type="danger"
            >
              删除
              <i class="el-icon-delete" />
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="padding: 10px 0">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum * 1"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize * 1"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-main>
    <el-dialog
      title="内容"
      :visible.sync="dialogFormVisible1"
      width="60%"
      :class-on-click-modal="false"
    >
      <el-card>
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
        <el-button @click="updateedit">更新内容</el-button>
      </el-card>
    </el-dialog>
    <el-dialog
      title="内容"
      :visible.sync="dialogFormVisible"
      width="60%"
      :class-on-click-modal="false"
    >
      <el-card>
        <div v-html="content" />
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css'
import { marked } from 'marked'

import { Boot } from '@wangeditor/editor'
import markdownModule from '@wangeditor/plugin-md'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import qs from 'qs'
Boot.registerModule(markdownModule)

export default {
  name: 'AdminEdit',
  data() {
    return {
      editor: null,
      html: '<p>wwwww</p>',
      toolbarConfig: {},
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default', // or 'simple'
      chuli: '',
      // 2
      uuid: 0,
      EditList: [],
      total: 0,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      content: '',
      pageNum: 0,
      // 默认展示5条
      pageSize: 5,

      user: localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : {},
    }
  },
  components: { Editor, Toolbar },
  created() {
    this.Reload()
  },

  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
      // console.log(editor)
      const html = editor.getHtml()
      // console.log(html[0].txt)
    },
    //分页查询
    Reload() {
      const url = 'http://localhost:9000/manage/article/list'
      this.$http.get(url).then(res => {
        this.EditList = res.data.data
        this.total = res.data.data.length
      })
    },
    view(content) {
      this.content = marked(content)
      this.dialogFormVisible = true
    },
    //删除
    deleteRow(id) {
      console.log(id)
      const data = { id: id }
      const url = 'http://localhost:9000/manage/article/del/'
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url,
      }
      this.$axios(options).then(res => {
        this.Reload()
      })
    },

    //分页
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      // console.log(`每页 ${pageSize} 条`)
      // console.log(pageSize)
      this.Reload()
    },
    //分页
    handleCurrentChange(pageNum) {
      // console.log(`当前页: ${pageNum}`)
      this.pageNum = pageNum

      this.Reload()
    },
    editArticle(content, id) {
      const edhtml = content
      this.html = edhtml
      this.uuid = id
      this.dialogFormVisible1 = true
    },
    //获取到更新的值
    updateedit() {
      const updata = this.html
      const id = this.uuid
      const author = this.user.nickname
      const token = this.user.token
      //请求后台
      const data = {
        token: token,
        id: id,
        author: author,
        content: updata,
      }
      const url = 'http://localhost:9000/manage/article/list/edit'
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
        if (res.data.errCode === 200) {
          this.$message.success('更新成功')
          this.Reload()
          this.dialogFormVisible1 = false
        } else {
          this.$message.error('更新失败')
          this.dialogFormVisible1 = false
        }
        //
      })
    },

    beforeDestroy() {
      const editor = this.editor
      if (editor == null) return
      editor.destroy() // 组件销毁时，及时销毁编辑器
    },
  },
}
</script>
<style lang="css" scoped></style>

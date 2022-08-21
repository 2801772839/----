<template>
  <div>
    <el-main>
      <div style="margin: 10px 0">
        <el-input
          style="width: 200px; margin-left: 5px"
          suffix-icon="el-icon-search"
          placeholder="请输入用户名"
        />
        <el-button style="margin-left: 5px" type="primary">搜索</el-button>
      </div>
      <div style="margin: 10px 0">
        <el-button type="primary">
          新增
          <i class="el-icon-circle-plus-outline"></i>
        </el-button>
        <el-button type="danger">
          批量删除
          <i class="el-icon-remove-outline"></i>
        </el-button>
      </div>

      <el-table :data="tableData" style="width: 100%" border stripe>
        <el-table-column prop="id" label="编号" width="80" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="nickname" label="昵称" />
        <el-table-column prop="role" label="用户名" />
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.role == 0" type="info">未赋予</el-tag>
            <el-tag v-if="scope.row.role == 1" type="warning">已赋予</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="role" label="操作">
          <template slot-scope="scope">
            <el-button
              v-model="giverole"
              @click="UpdateRole(scope.row.id, scope.row.role)"
              type="primary"
              plain
            >
              点击更改权限
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
  </div>
</template>

<script>
import qs from 'qs'

export default {
  name: 'Role',
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 0,
      giverole: false,
      // 默认展示5条
      rolevalue: true,
      pageSize: 5,

      user: localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : {},
    }
  },

  created() {
    this.Reload()
  },

  computed: {},

  methods: {
    //分页查询
    Reload() {
      const data = { pageNum: this.pageNum, pageSize: this.pageSize }
      const url = 'http://localhost:9000/manage/list'
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url,
      }
      this.$axios(options).then(res => {
        // console.log(res.data.data.pageSize)
        this.total = res.data.data.total
        this.tableData = res.data.data.listArr
        this.pageNum = res.data.data.pageNum
        this.pageSize = res.data.data.pageSize
        this.role = res.data.data.role
      })
    },
    //
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    handleEdit(index, row) {
      alert(index, row)
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
    DeleteSelectd() {
      alert('删除成功')
    },

    UpdateRole(id, role) {
      const data = { id: id, username: this.user.username, role: role }

      const url = 'http://localhost:9000/manage/user/update/'
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url,
      }

      this.$axios(options).then(res => {
        console.log(res)
        this.Reload()
      })
    },
  },
}
</script>
<style lang="css" scoped></style>

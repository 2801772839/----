<template>
  <div>
    <el-main>
      <div style="margin: 10px 0">
        <el-input
          style="width: 200px; margin-left: 5px"
          suffix-icon="el-icon-search"
          v-model="username"
          placeholder="请输入用户名"
        />
        <el-input
          style="width: 200px; margin-left: 5px"
          suffix-icon="el-icon-position"
          v-model="address"
          placeholder="请输入地址"
        />
        <el-button style="margin-left: 5px" type="primary" @click="Search">
          搜索
        </el-button>
        <el-button style="margin-left: 5px" type="primary" @click="Reset">
          重置
        </el-button>
      </div>
      <div style="margin: 10px 0">
        <el-button type="primary" @click="addUser">
          新增
          <i class="el-icon-circle-plus-outline"></i>
        </el-button>
        <el-button type="danger">
          批量删除
          <i class="el-icon-remove-outline"></i>
        </el-button>
      </div>

      <el-table :data="tableData" style="width: 100%" border stripe>
        <el-table-column prop="id" label="编号" width="140" />
        <el-table-column prop="username" label="用户名" width="140" />
        <el-table-column prop="nickname" label="昵称" width="220" />
        <el-table-column prop="address" label="地址" width="350" />
        <el-table-column label="操作" width="350" align="center">
          <template slot-scope="scope">
            <el-button type="warning" @click="editUser(scope.row)">
              编辑
              <i class="el-icon-edit" />
            </el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.row.id, tableData)"
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
      <!-- 新增用户信息 -->
      <el-dialog title="用户信息" :visible.sync="dialogFormVisible" width="30%">
        <el-form size="small">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.username" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth" v-show="did">
            <el-input v-model="form.password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="昵称" :label-width="formLabelWidth">
            <el-input v-model="form.nickname" autocomplete="off" />
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input v-model="form.address" autocomplete="off" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveUser">确 定</el-button>
        </div>
      </el-dialog>
    </el-main>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'DataList',
  data() {
    return {
      tableData: [],
      total: 0,
      pageNum: 0,
      password: '',
      // 默认展示5条
      pageSize: 5,
      username: '',
      address: '',
      nickname: '',
      did: true,
      form: {},
      formLabelWidth: '120px',
      dialogFormVisible: false,
    }
  },

  created() {
    this.Reload()
  },

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
        // console.log(res.data.data.pageNum)
        this.total = res.data.data.total
        this.tableData = res.data.data.listArr
        this.pageNum = res.data.data.pageNum
        this.pageSize = res.data.data.pageSize
      })
    },
    //删除用户
    deleteRow(id) {
      const data = { id: id }
      const url = 'http://localhost:9000/manage/user/del/'
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url,
      }
      console.log(id)
      this.$axios(options).then(res => {
        this.Reload()
      })
    },
    //编辑用户
    editUser(row) {
      this.form = { ...row }
      // this.form = row
      this.did = false

      console.log(this.form)
      this.dialogFormVisible = true
      this.Reload()
    },
    //分页
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.Reload()
    },
    //分页
    handleCurrentChange(pageNum) {
      if (pageNum != 0) {
        console.log(`当前: ${pageNum}`)
        this.pageNum = pageNum + 1
        this.Reload()
      } else {
        this.pageNum = pageNum
        console.log('不是0' + '是' + pageNum)
        this.Reload()
      }
      // this.Reload()
    },

    DeleteSelectd() {
      alert('删除成功')
    },
    //打开新用户界面
    addUser() {
      this.dialogFormVisible = true
      this.form = {}
    },
    //添加用户
    saveUser() {
      this.did = true
      let { username, nickname, address } = this.form
      const password = this.password
      const data = {
        username: username,
        nickname: nickname,
        address: address,
        password: password,
      }
      const url = 'http://localhost:9000/manage/user/add'
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url,
      }

      this.$axios(options).then(res => {
        console.log(res.data)
        if (res.data.errCode === 200) {
          this.dialogFormVisible = false
          this.Reload()
          this.$message.success('添加用户成功')
        } else {
          this.$message.error('添加用户失败')
          this.dialogFormVisible = false
        }
      })
    },
    Search() {
      const username = this.username
      const address = this.address
      const data = {
        username: username,
        address: address,
      }
      const url = 'http://localhost:9000/manage/user/search'
      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
        url,
      }

      this.$axios(options).then(res => {
        if (res.data.errCode === 200) {
          this.tableData = res.data.data
          this.total = res.data.data.length
          // this.Reload()
        } else {
          console.log(res.data.errCode)
        }
        // if ((res.data.errCode = 200)) {
        //   console.log(res.data)
        //   console.log('1')
        // } else {
        //   console.log(res.data.errCode)
        // }
      })
    },
    Reset() {
      this.username = ''
      this.address = ''
      this.Reload()
    },
  },
}
</script>

<template>
  <div class="home">
    <table>
      <tr>
        <th>姓名</th>
        <th>性別</th>
        <th>班级</th>
        <th>成绩</th>
        <th>操作</th>
      </tr>
      <tr v-for="item in data" :key="item.id">
        <td>{{item.name}}</td>
        <td>{{item.gender}}</td>
        <td>{{item.class_id}}</td>
        <td>{{item.score}}</td>
        <td @click="del(item.id)">删除</td>
      </tr>
    </table>
    <label>姓名:</label>
    <input type="text" v-model="name">
    <br/>
    <label>性別:</label>
    <input type="text" v-model="gender">
    <br/>
    <label>班级:</label>
    <input type="text" v-model="class_id">
    <br/>
    <label>成绩:</label>
    <input type="text" v-model="score">
    <br/>
    <button @click="add">增加</button>
    <br/>
    <button @click="update">设置第11条数据</button>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {},
  data () {
    return {
      data: [],
      name: '',
      gender: '',
      class_id: '',
      score: ''
    }
  },
  methods: {
    add () {
      let _this = this
      let datas = {
        name: this.name,
        gender: this.gender,
        class_id: this.class_id,
        score: this.score
      }
      this.axios.post(/api/ + 'add', datas, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        if (response.data.err === 0) {
          _this.getInfo()
        }
      }).catch(error => {
        console.log(error)
      })
    },
    del (id) {
      let _this = this
      let datas = { id }
      this.axios.post(/api/ + 'del', datas, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => {
        if (response.data.err === 0) {
          _this.getInfo()
        }
      }).catch(error => {
        console.log(error)
      })
    },
    update () {
      let _this = this
      this.axios.get(/api/ + 'update').then(response => {
        if (response.data.err === 0) {
          _this.getInfo()
        }
      }).catch(error => {
        console.log(error)
      })
    },
    async getInfo () {
      let res = await fetch(/api/ + 'students')
      this.data = await res.json()
    }
  },
  created () {
    this.getInfo()
  }
}
</script>

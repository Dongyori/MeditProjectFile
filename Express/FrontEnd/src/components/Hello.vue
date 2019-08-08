<template>
  <div class="hello">
    오늘 해야 할 일
    <ul v-if="toDoItems && toDoItems.length">
      <li v-for="toDoItem of toDoItems">
        {{toDoItem.title}}
      </li>
    </ul>
    <button @click="SendData()"></button>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'hello',
    data: () => {
      return {
        toDoItems: []
      }
    },
    created () {
      axios.post('http://192.168.1.26:1337/test',
        {email: 'test'})
        .then(response => {
          // this.toDoItems = response.data.map(r => r.data)
          console.log(JSON.stringify(response.data))
        })
        .catch(e => {
          console.log('error : ', e)
        })
    },
    methods: {
      SendData () {
        axios.post('http://192.168.1.26:1337/test',
          {email: 'test'})
          .then(response => {
          // this.toDoItems = response.data.map(r => r.data)
            console.log(JSON.stringify(response.data))
          })
          .catch(e => {
            console.log('error : ', e)
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #35495E;
  }
</style>




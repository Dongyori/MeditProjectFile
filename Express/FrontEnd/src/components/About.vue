<template>
  <div class="about">
    
    <button>Jiral Ha go JABBA JOTNE</button>
    내일하고할일
    {{toDoItems}}
  </div>
</template>

<script>
export default {
  name: 'hello',
  data: () => {
    return {
      toDoItems: ['1. 밥 먹기.', '2. 잠 자기.']
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

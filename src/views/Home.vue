<template>
  <div class="home">
    <label>
      <input class="input" type="text" placeholder="Що будеш робити?" v-model.lazy="task.t" @keyup.enter="addTask">
    </label>
    <h1>Завдання</h1>
    <div class="tasks">
      <div class="task" v-for="(oneTask, index) of tasks" :key="index" :class="{done: oneTask.finish === true}" >
<!--        <input type='checkbox' @change="oneTask.finish = !oneTask.finish">-->
        <p>{{ index + 1 }}</p>
        <p class="info" @click='oneTask.finish = !oneTask.finish'>{{ oneTask.todo }}</p>
        <p @click="deleatTask(index)">X</p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapMutations} from 'vuex'
export default {

  name: 'Home',
  computed:{
    ...mapGetters(['task',"tasks"])
  },
  methods:{
    ...mapMutations(['addTask', 'deleatTask', ])
  },
  components: {}
}
</script>
<style scoped>
.home {
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

textarea:focus, input:focus {
  outline: none;
}

.input {
  font-size: 25px;
  padding: 0 30px;
  background-color: white;
  height: 60px;
  width: 700px;
  margin-top: 50px;
  border-radius: 25px;
  margin-bottom: 30px;
}
h1{
  color: #4a4949;
}
.tasks {
  background-color: white;
  border-radius: 25px;
  height: 500px;
  width: 46%;
  padding: 10px 20px;
  font-size: 20px;
  overflow: auto;

}

.task {
  display: flex;
  justify-content: space-between;
  border: 1px solid grey;
  border-radius: 20px;
  padding: 5px 10px;
  align-items: center;
  margin: 5px 0;
}
.task > p {
  margin: 0 10px;
}
.info{
  width: 80%;
}
.done{
  text-decoration: line-through;
  opacity: 0.4;
}
::-webkit-scrollbar {
  width: 10px;
}
/* Track */
::-webkit-scrollbar-track {
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #414141;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #4a4a4a;
}
</style>

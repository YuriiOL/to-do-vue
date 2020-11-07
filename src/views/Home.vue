<template>
  <div class="home">
    <label>
      <div class="row"><input class="input" type="text" placeholder="Що будеш робити?" v-model.lazy="task.t" />
        <button @click="addTask(); sendData(); fetchToDo()" class="ButtonAdd" v-if="tasks.length == 0">Додати</button>
        <button @click="addTask(); update()" class="ButtonAdd" v-else>Додати</button></div>

    </label>
    <h1>Завдання</h1>
    <div class="tasks">
      <div class="task" v-for="(oneTask, index) of tasks" :key="index" :class="{done: oneTask.finish === true}" >
<!--        <input type='checkbox' @change="oneTask.finish = !oneTask.finish">-->
        <p>{{ index + 1 }}</p>
        <p class="info" @click='oneTask.finish = !oneTask.finish; update()'>{{ oneTask.todo }}</p>
        <p @click="deleatTask(index); update()"><span class="material-icons">clear</span></p>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapMutations} from 'vuex'
export default {

  name: 'Home',
  data(){
    return{
      keys: null,
      toDoFromDataBase: null
    }
  },
  computed:{
    ...mapGetters(['task',"tasks"])
  },

  methods:{
    ...mapMutations(['addTask', 'deleatTask', ]),
    async update(){
      await this.$store.dispatch('updateTodo', {todo: this.tasks, id: this.keys})
    },
    async sendData(){
      try {
        await this.$store.dispatch('saveToDo', {todo: this.tasks})
      }catch (e) {
        console.log(e)
      }
    },
    async fetchToDo() {
      let toDo = await this.$store.dispatch('fetchTodo')
      Object.keys(toDo).forEach(key => {
        this.keys = key
        this.toDoFromDataBase = toDo[key].todo
      })

    },

  },
  async mounted() {
    let toDo = await this.$store.dispatch('fetchTodo')
    Object.keys(toDo).forEach(key => {
      this.keys = key
      this.toDoFromDataBase = toDo[key].todo
    })
    for (const i in this.toDoFromDataBase) {
      this.$store.state.tasks.push(this.toDoFromDataBase[i])
    }
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
.row{
  display: flex;
}
.input {
  font-size: 25px;
  padding: 0 30px;
  background-color: white;
  height: 60px;
  width: 600px;
  margin-top: 50px;
  border-bottom-left-radius: 25px;
  border-top-left-radius: 25px;
  margin-bottom: 30px;
}
.ButtonAdd{
  background-color: darkred;
  width: 100px;
  height: 60px;
  cursor:pointer;
  margin-top: 50px;
  border-bottom-right-radius: 25px;
  border-top-right-radius: 25px;
  color: white;
}
.ButtonAdd:hover{
  background-color: #b30202;
}
h1{
  color: #4a4949;
}
.tasks {
  background-color: white;
  border-radius: 25px;
  height: 500px;
  width: 700px;
  padding: 10px 20px;
  font-size: 20px;
  overflow: auto;
  cursor:pointer;
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
span:hover{
  color: red;
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

@media only screen and (min-width: 1402px) {
  .input{
    width: 900px;
  }
  .tasks {
    width: 1000px;
  }
  .ButtonAdd{
    width: 100px;
  }
}
@media only screen and (max-width: 750px) {
  .input{
    width: 320px;
  }
  .tasks {
    width: 400px;
  }
  .ButtonAdd{
    width: 80px;
    font-size: 13px;
  }
}
@media only screen and (max-width: 450px) {
  .input{
  width: 190px;
    font-size: 14px;
}
  .tasks {
    width: 250px;
    font-size: 14px;
  }
  .ButtonAdd{
    width: 60px;
    font-size: 12px;
  }
}
  @media only screen and (max-height: 668px) {

    .tasks{
      height: 330px;
    }
  }

</style>

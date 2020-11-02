import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        task: {t: ''},
        tasks: [],
    },
    getters: {
        task: (state) => state.task,
        tasks: (state) => state.tasks,
    },
    mutations: {
        addTask(state) {
            if (state.task.t.length > 0) {
                state.tasks.push({ todo: state.task.t, finish: false })
                state.task.t = ''
            } else {
                return
            }
        },
        deleatTask(state, idtask) {
            state.tasks.splice(idtask, 1)
        },

        },

    actions: {},
    modules: {}
})

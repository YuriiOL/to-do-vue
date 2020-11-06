import firebase from "firebase/app";

export default {
    actions: {
        async updateCategory({ commit, dispatch }, {todo}) {
            try {
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/data`).update({todo})

            } catch (e) {
                commit('setError', e)
                throw e

            }
        },
        async fetchTodo({commit, dispatch}) {
            try {
                console.log(commit)
                const uid = await dispatch('getUid')
                const toDoListFromDataBase = (await firebase.database().ref(`/users/${uid}/data`).once('value')).val() || {}
                let list = []

                Object.keys(toDoListFromDataBase).forEach(key => {
                    list.push(
                        toDoListFromDataBase[key].todo
                    )
                })
                // console.log(list)
                return list
            } catch (e) {
                throw `${e}`
            }
        },
        async saveToDo({commit, dispatch}, {todo}) {
            try {
                console.log(commit)
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/data`).push({todo})
                return {todo}
            } catch (e) {
                throw `${e}`
            }
        }
    }
}
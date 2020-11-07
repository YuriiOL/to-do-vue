import firebase from "firebase/app";

export default {
    actions: {
        async updateTodo({commit, dispatch}, {todo, id}) {
            try {
                const uid = await dispatch('getUid')
                console.log(id);
                await firebase.database().ref(`/users/${uid}/data`).child(id).update({todo})
            } catch (e) {
                console.log(commit);
                throw e
            }
        },
        async fetchTodo({commit, dispatch}) {
            try {
                console.log(commit)
                const uid = await dispatch('getUid')
                console.log(uid)
                const toDoListFromDataBase = (await firebase.database().ref(`/users/${uid}/data`).once('value')).val() || {}
                return toDoListFromDataBase
            } catch (e) {
                throw `${e}`
            }
        },
        async saveToDo({commit, dispatch}, {todo}) {
            try {
                console.log(commit)
                const uid = await dispatch('getUid')
                console.log(uid)
                await firebase.database().ref(`/users/${uid}/data`).push({todo})
                return {todo}
            } catch (e) {
                throw `${e}`
            }
        }
    }
}
import firebase from "firebase/app";

export default {
    actions: {
        async login({dispatch, commit}, {email, password}){
            try {
               await firebase.auth().signInWithEmailAndPassword(email, password)
                console.log(dispatch, commit);
            }catch (e) {
                alert('Неправильний Логін або Пароль')
                throw `${e}`
            }
        },
        async registration({ dispatch, commit }, { email, password, name }){
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = await dispatch('getUid')
                await firebase
                    .database()
                    .ref(`/users/${uid}/info`)
                    .set({ name: name })
            } catch (e) {
                console.log(commit)
                alert('Цей Email вже використовується')
                throw e
            }
        },
        getUid() {
            const userInfo = firebase.auth().currentUser
            return userInfo ? userInfo.uid : null
        },
        async logout({ commit }) {
            await firebase.auth().signOut()
            commit('clearInfo')
        },
    }
}
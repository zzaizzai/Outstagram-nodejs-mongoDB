import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
    state() {
        return {
            postCount:0,

            myUserData: {
                uid: '0',
                userName: 'admin',
                userEmail: 'test@test.com',
                userProfileurl: 'none',
                userContent: 'none',
                role: 'normal'
            },
            posts: [{
                _id: "11111111",
                authorName: "test11",
                authorProfileUrl: "none111",
                authorUid: "IHDnCrJ0BWebbcTzybQevvdsd1i211111",
                content: "It is default profile imag111111e",
                date: "2022年5月30日",
                liked: false,
                likes: 1,
                uploadImageUrl: "https://placeimg.com/640/480/animals",
            }]
        }
    },
    mutations: {
        GetPostsMutation(state, payload) {
            payload.forEach((element) => {
                state.posts.push(element)
                console.log(element)
            })


        }

    },
    actions: {
        GetPostsAction({commit, state}) {
            axios.post("http://localhost:3000/getposts",{postCount: state.postCount}).then((result) => {
                console.log("getpost")
                state.postCount += 1
                commit('GetPostsMutation', result.data.posts)
            })
        },
        UploadNewPostAction(context, payload) {
            console.log("payload")
            console.log(payload)
            axios.post('http://localhost:3000/uploadpost', { post: payload })

        }
    }
})

export default store
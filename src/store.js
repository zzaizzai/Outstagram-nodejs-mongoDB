import { createStore } from 'vuex'
import axios from 'axios'
import router from './router.js'

const store = createStore({
    state() {
        return {
            isLogin: false,

            postCount: 0,

            myUserData: {
                uid: '0',
                userName: 'admin',
                userEmail: 'test',
                userProfileurl: 'none',
                userContent: 'none',
                role: 'normal'
            },
            posts: [
            //     {
            //     _id: "11111111",
            //     authorName: "test",
            //     authorEmail: "test",
            //     authorProfileUrl: "none111",
            //     authorUid: "IHDnCrJ0BWebbcTzybQevvdsd1i211111",
            //     content: "It is default profile imag111111e It is default profile imag111111e It is default profile imag111111e It is default profile imag111111e",
            //     date: "2022-06-06T15:45:57.087Z",
            //     liked: false,
            //     likes: 1,
            //     uploadImageUrl: "https://placeimg.com/640/480/animals",
            // }
        ]
        }
    },
    mutations: {
        UploadPost(state, payload) {
            state.posts.unshift(payload)
        },
        LoginTrue(state) {
            state.isLogin = true
        },
        LoginFalse(state) {
            state.isLogin = false
        },
        ClearPosts(state) {
            state.postCount = 0
            state.posts.splice(0, state.posts.length)
        },

        GetPostsMutation(state, payload) {
            payload.forEach((element) => {
                state.posts.push(element)
                console.log(element)
            })
        }
        ,
        GetUserDataFromSessionStorage(state, payload) {
            // console.log(payload)
            state.myUserData.uid = payload.user._id
            state.myUserData.userName = payload.user.displayName
            state.myUserData.userEmail = payload.user.id
            state.myUserData.userContent = payload.user.content
            state.myUserData.userProfileurl = payload.user.profileUrl


        },

    },
    actions: {
        GetPostsAction({ commit, state }) {
            axios.post("http://localhost:3000/getposts", { postCount: state.postCount }).then((result) => {
                console.log("getpost")
                state.postCount += 2
                commit('GetPostsMutation', result.data.posts)
            })
        },
        
        UploadNewPostAction(context, payload) {
            console.log("payload")
            console.log(payload)
            axios.post('http://localhost:3000/uploadpost', { post: payload })

        },

        CheckChatRoomAndCreateChatRoom({state}, payload) {

            let oponentUserData ={
                uid: payload.authorUid,
                userEmail: payload.authorEmail,
                userName: payload.authorName,
            }
            
            //Create ChatRoom
            console.log(payload)
            axios.post('http://localhost:3000/createchatroom', { oponentUserData: oponentUserData, myUserData: state.myUserData }).then((result)=>{
                console.log(result.data.isChatRoomExist)
                if (result.data.isChatRoomExist) {
                    console.log("already exist")
                    router.push("/chat");
                } else {
                    console.log("created new chatroom")
                    router.push("/chat");
                }
            })
        },
    }
})

export default store
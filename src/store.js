import { createStore } from 'vuex'
import axios from 'axios'
import router from './router.js'

const store = createStore({
    state() {
        return {
            isLogin: false,

            postCount: 0,

            chatTarget: {
                _id: "none"
            },

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
                // console.log(element)
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
        EditProfile(state, payload) {
            console.log("good22")
            state.myUserData.uid = payload.newProfile.profileUid
            state.myUserData.userName = payload.newProfile.profileName
            state.myUserData.userEmail = payload.newProfile.profileEmail
            state.myUserData.userContent = payload.newProfile.profileContent
            state.myUserData.userProfileurl = payload.newProfile.profileProfileUrl
        },
        PostLike(state, payload) {
            // console.log(payload.post)
            // console.log(payload.postIndex)

            if (state.posts[payload.postIndex].liked) {
                state.posts[payload.postIndex].likes -= 1
            } else {
                state.posts[payload.postIndex].likes += 1
            }
            state.posts[payload.postIndex].liked = !state.posts[payload.postIndex].liked
        }
        ,
        FetchLiked(state, payload) {
            if (state.posts[payload]) {
                state.posts[payload].liked = true
            }


        }


    },
    actions: {
        FetchLiked({ commit, state }) {
            axios.post('http://localhost:3000/fetchliked', {
                user: state.myUserData,

            }).then((result) => {
                result.data.liked.forEach((doc) => {
                    var likedPostIndex = state.posts.findIndex(v => v._id === doc.post_id)
                    // console.log(doc)
                    // console.log(dd)
                    commit('FetchLiked', likedPostIndex)

                })
            })
        },
        PostLike({ commit, state }, payload) {
            console.log(payload)

            axios.post('http://localhost:3000/likepost',
                {
                    user: state.myUserData,
                    post: payload.post,
                    postIndex: payload.postIndex
                }
            ).then((result) => {
                console.log(result)
            })

            // console.log(payload)
            commit('PostLike', payload)


        },
        EditProfile({ commit, state }, payload) {
            axios.post('http://localhost:3000/editprofile', { profile: payload }).then((result) => {
                // console.log(result.data)
                commit('EditProfile', result.data)
                router.push("/profile/" + state.myUserData.userEmail);

            })
        },
        GetPostsAction({ commit, state }) {
            var increase = 3
            axios.post("http://localhost:3000/getposts", { postCount: state.postCount, increase: increase }).then((result) => {
                console.log("getpost")
                state.postCount += increase
                commit('GetPostsMutation', result.data.posts)
            })
        },

        UploadNewPostAction(context, payload) {
            console.log("payload")
            console.log(payload)
            axios.post('http://localhost:3000/uploadpost', { post: payload })

        },

        CheckChatRoomAndCreateChatRoom({ state }, payload) {

            let oponentUserData = {
                uid: payload.authorUid,
                userEmail: payload.authorEmail,
                userName: payload.authorName,
            }

            //Create ChatRoom
            console.log(payload)
            axios.post('http://localhost:3000/createchatroom', { oponentUserData: oponentUserData, myUserData: state.myUserData }).then((result) => {
                console.log(result.data.isChatRoomExist)
                if (result.data.isChatRoomExist) {
                    console.log("already exist")
                    state.chatTarget._id = result.data.targetChatUid
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
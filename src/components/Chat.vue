<template>
  <div class="container p-4 mt-5">
    <div class="row">
      <div class="col-3">
        <ul class="list-group chat-list">
          <li class="list-group-item">
          <h6>currentChatUid:</h6>
          </li>

          <div v-for="item in chatRoom" :key="item">
            <li
              v-bind:class="{ activechat: currentChatUid == item.uid }"
              @click="
                currentChatUid = item.uid;
              "
              class="list-group-item chat-list-box"
            >
              <h6 v-if="item.who[0] == $store.state.myUserData.userName">
                {{ item.who[1] }}
              </h6>
              <h6 v-else>{{ item.who[0] }}</h6>
              <p class="chatroom-time">{{ item.lastDate }}</p>
            </li>
          </div>
          <button @click="FetchChatRoom">채팅방 패치</button>
        </ul>
      </div>

      <div class="col-6 p-3">
        <!-- <div>{{ chatOponent }}</div> -->
        <!-- <div>target: {{ $store.state.targetChatUid }}</div> -->

        <div class="chat-room">
          <div></div>
          <ul
            class="list-group chat-content"
            overflow-y:
            scroll
            ref="scrollMe"
            id="scrollMe"
          >
            <div v-for="message in chatContent" :key="message">
              <li>
                <div class="row">
                  <div>
                    <!-- <span
                      class="chat-date text-small"
                      v-bind:class="{
                        minedate:
                          $store.state.myUserData.uid ==
                          message.chatUserUidFrom,
                      }"
                      >{{ message.date }}</span
                    > -->
                  </div>

                  <div>
                    <span
                      class="chat-box"
                      v-bind:class="{
                        mine:
                          $store.state.myUserData.uid ==
                          message.chatUserUidFrom,
                      }"
                      >{{ message.chatContent }}</span
                    >
                  </div>
                </div>
              </li>
            </div>
            <li><span class="chat-box">ㅎㅇ</span></li>
            <li><span class="chat-box mine">ㅎㅇ</span></li>
            <li><span class="chat-box mine">ㅎㅇ</span></li>
          </ul>
          <div class="input-group">
            <input class="form-control" id="chat-input" v-model="sendMessage" />
            <button class="btn btn-secondary" >send</button>
          </div>
          <!-- <div
            class="down-button"
            style="font-size: 20px"
            @click="ScrollToBottom"
          >
            ▽
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "chat",
  created() {
  },
  mounted() {},
  unmounted() {},
  data() {
    return {
      sendMessage: "",
      currentChatUid: "",
      chatOponent: "Chose chat oponent",
      chatOponentUid: "2",
      scrollHeightofChat: 0,

      chatContent: [],
      chatRoom: [
        {
          uid: "0",
          whoUid: ["0", "2"],
          who: ["admin", "Kims"],
          startDate: "22 - 5 - 20",
          lastDate: "22 - 5 - 30",
        },
        {
          uid: "1",
          whoUid: ["0", "3"],
          who: ["admin", "Elaski"],
          startDate:' 22 - 5 - 21',
          lastDate: '22 - 5 - 31',
        },
      ],
    };
  },
  updated() {
    this.scrollHeightofChat = this.$el.querySelector("#scrollMe").scrollHeight;
  },
  methods: {
    FetchChatRoom(){
      console.log("fetch chatroom")
    }
  },
  watch: {
    chatRoom() {},
  },
};
</script>

<style>
.activechat{
  background: rgba(0, 0, 0, 0.185) !important;
  border-color: rgba(0, 0, 0, 0.185) !important;

}
.chat-box {
  background: #eee;
  padding: 5px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 20px;
  float: left;
}
.chat-list-box:hover {
  cursor: pointer;
  background-color: #eee;
  transition: 0.2s;
}

.chat-content {
  height: 450px;
  scrollbar-width: none;
  overflow-y: scroll;
  padding: 15px;
}
.chat-content li {
  margin-top: 10px;
  list-style: none;
}
.mine {
  float: right;
  background: skyblue;
}
.chat-date {
  float: left;
}
.minedate {
  float: right;
}

.chatroom-time {
  font-size: 12px;
  margin-bottom: 0px;
}

.down-button:hover {
  cursor: pointer;
}
</style>
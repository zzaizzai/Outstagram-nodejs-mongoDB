<template>
  <div class="container p-4 mt-5">
    <div class="row">
      <div class="col-3">
        <ul class="list-group chat-list">
          <li class="list-group-item">
            <h6>{{ currentChatUid }}</h6>
          </li>

          <div v-for="item in chatRoom" :key="item">
            <li
              v-bind:class="{ activechat: currentChatUid == item._id }"
              @click="FetchMessages(item)"
              class="list-group-item chat-list-box"
            >
              <h6 v-if="item.who[0] == $store.state.myUserData.userName">
                {{ item.who[1] }}
              </h6>
              <h6 v-else>{{ item.who[0] }}</h6>
              <p class="chatroom-time">{{ item.latestDate }}</p>
            </li>
          </div>
          <button @click="FetchChatRoom">chatroom fetch</button>
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
                    <span
                      class="chat-date text-small"
                      v-bind:class="{
                        minedate:
                          $store.state.myUserData.uid == message.senderUid,
                      }"
                      >{{ message.date }}</span
                    >
                  </div>

                  <div>
                    <span
                      class="chat-box"
                      v-bind:class="{
                        mine: $store.state.myUserData.uid == message.senderUid,
                      }"
                      >{{ message.content }}</span
                    >
                  </div>
                </div>
              </li>
            </div>
            <!-- <li><span class="chat-box">ㅎㅇ</span></li>
            <li><span class="chat-box mine">ㅎㅇ</span></li>
            <li><span class="chat-box mine">ㅎㅇ</span></li> -->
          </ul>
          <div class="input-group">
            <input class="form-control" id="chat-input" v-model="sendMessage" />
            <button @click="SendMessage" class="btn btn-secondary">send</button>
          </div>
          <div
            class="down-button"
            style="font-size: 20px"
            @click="ScrollToBottom"
          >
            ▽
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import io from "socket.io-client";

export default {
  name: "chat",

  data() {
    return {
      socket: io("http://127.0.0.1:3000"),
      sendMessage: "",
      currentChatUid: "none",
      chatOponent: "Chose chat oponent",
      chatOponentUid: "2",
      scrollHeightofChat: 0,

      chatContent: [],
      chatRoom: [
        {
          _id: "0",
          whoUid: ["0", "2"],
          who: ["admin", "Kims"],
          startDate: "22 - 5 - 20",
          lastDate: "22 - 5 - 30",
        },
        {
          _id: "1",
          whoUid: ["0", "3"],
          who: ["admin", "Elaski"],
          startDate: " 22 - 5 - 21",
          lastDate: "22 - 5 - 31",
        },
      ],
    };
  },
  created() {
    // this.socket.on("MESSAGE", () => {
    //   console.log("connected");
    // this.chatContent = [...this.chatContent, data];
    // });
  },
  updated() {
    this.ScrollToBottom();
  },
  mounted() {
    this.FetchChatRoom();
    this.socket.on("MESSAGE", (data) => {

      //replcae date display
      var messageDateChanged = data;
      messageDateChanged.date =
        new Date(messageDateChanged.date).toLocaleDateString() +
        new Date(messageDateChanged.date).toLocaleTimeString();
      this.chatContent.push(messageDateChanged);
    });
  },
  methods: {
    Join() {
      // this.soketInsatance =  io("http://localhost:3000")
    },
    ScrollToBottom() {
      let container = this.$el.querySelector("#scrollMe");
      container.scrollTop = container.scrollHeight;
    },
    FetchChatRoom() {
      this.chatRoom.splice(0, this.chatRoom.length);
      console.log("fetch chatroom");
      axios
        .post("http://localhost:3000/getchatroom", {
          user: this.$store.state.myUserData,
        })
        .then((result) => {
          result.data.chatrooms.forEach((chatroom) => {
            console.log(chatroom);
            this.chatRoom.unshift(chatroom);
          });
        });
    },
    FetchMessages(payload) {
      // var eventSource;

      // if (eventSource != undefined) {
      //   eventSource.close();
      // }

      this.currentChatUid = payload._id;
      // eventSource = new EventSource('http://localhost:3000/getmessages/' + payload._id);
      // eventSource.addEventListener("post", function (e) {
      //   console.log(e.data);
      // });

      axios
        .post("http://localhost:3000/getmessages", { chatroom: payload })
        .then((result) => {
          this.chatContent.splice(0, this.chatContent.length);
          result.data.messages.forEach((message) => {
            var messageDateChanged = message;
            messageDateChanged.date =
              new Date(messageDateChanged.date).toLocaleDateString() +
              new Date(messageDateChanged.date).toLocaleTimeString();
            this.chatContent.unshift(messageDateChanged);
          });
        });
    },
    SendMessage() {
      var message = {
        parentUid: this.currentChatUid,
        senderUid: this.$store.state.myUserData.uid,
        senderName: this.$store.state.myUserData.userName,
        content: this.sendMessage,
        date: new Date(),
      };
      this.socket.emit("SEND_MESSAGE", message);
      // socket.emit('JOINROOM', message)
      if (this.currentChatUid != "none") {
        axios.post("http://localhost:3000/sendmessage", { message: message });
        this.sendMessage = "";
      } else {
        console.log("input message");
      }
    },
  },
  watch: {
    chatRoom() {},
  },
};
</script>

<style>
.activechat {
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

.text-small {
  font-size: 12px;
  color: gray;
}
</style>
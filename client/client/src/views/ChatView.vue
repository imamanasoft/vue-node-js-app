<template>
  <div class="chat-container mt-4">
    <div class="messages">
      <div
        v-for="(message, index) in messages"
        :key="index"
        class="message mx-2 my-4"
      >
        {{ message }}
      </div>
    </div>
    <input
      v-model="newMessage"
      @keyup.enter="sendMessage"
      placeholder="Tapez votre message"
    />
    <button @click="sendMessage">Envoyer</button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { io } from "socket.io-client";

const socket = io("https://8vl4v8-8000.csb.app/"); // URL du serveur Node.js

const messages = ref([]);
const newMessage = ref("");

// Fonction pour envoyer un message
const sendMessage = () => {
  if (newMessage.value.trim()) {
    socket.emit("chatMessage", newMessage.value);
    newMessage.value = "";
  }
};

// Ecoute des messages entrants
onMounted(() => {
  socket.on("chatMessage", (msg) => {
    messages.value.push(msg);
  });
});

// Nettoyage à la destruction du composant
onUnmounted(() => {
  socket.off("chatMessage");
});
</script>

<style scoped>
.chat-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

.messages {
  height: 300px;
  overflow-y: scroll;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
}

.message {
  padding: 5px 10px;
  background: #f1f1f1;
  margin: 5px 0;
  border-radius: 5px;
}

input {
  width: calc(100% - 70px);
  padding: 10px;
  margin-right: 10px;
}

button {
  padding: 10px 20px;
}
</style>

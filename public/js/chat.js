class User {
    userName = '';
    sessionId = '';
    constructor(name, sessionId) {
        this.userName = name;
        this.sessionId = sessionId;
    }

    setName(name) {
        this.userName = name;
    }
}

class Chat extends User {
    chatHistory = [];
    constructor(name, sessionId) {
        super(name, sessionId);
        this.retreiveChat();
    }

    setAllUserChatHistory(chats) {
        localStorage.setItem('USER_CHATS', JSON.stringify(chats));
    }

    getAllUserChatsHistory() {
        return JSON.parse(localStorage.getItem('USER_CHATS'));
    }

    getUserChatHistory() {
        return JSON.parse(localStorage.getItem('USER_CHATS'))[this.userName];
    }

    pushChat(chat) {
        this.chatHistory.push({ message: chat, sessionId: this.sessionId, timing: new Date() });
        this.showChat(this.chatHistory[this.chatHistory.length - 1]);
        this.saveChat();
    }

    showChat(chat) {
        let self = this;

        const chatMsg = document.querySelector(".chatMsg");
        const chatMsgLayout = chatMsg.cloneNode(true);
        chatMsgLayout.style.display = "block";

        let userInput = chatMsgLayout.querySelector(".chatUser");
        userInput.textContent = this.userName;

        let chatTime = chatMsgLayout.querySelector(".chatTime");
        let t = new Date(chat.timing);
        chatTime.textContent = t.getHours() + ':' + t.getMinutes();

        let chatMessage = chatMsgLayout.querySelector(".chatMessage");
        chatMessage.textContent = chat.message;

        const chatMsgArea = document.querySelector(".chatMsgArea");
        chatMsgArea.appendChild(chatMsgLayout);
    }

    saveChat() {
        let allChats = this.getAllUserChatsHistory();
        allChats[this.userName] = this.chatHistory;
        this.setAllUserChatHistory(allChats);
    }

    retreiveChat() {
        let self = this;
        this.chatHistory = this.getUserChatHistory();
        this.bindEvents();
        this.chatHistory.forEach((chat, index) => {
            self.showChat(chat);
        });
    }

    bindEvents() {
        let self = this;
        let msgSendBtn = document.querySelector(".msgSendBtn");
        let msgInput = document.querySelector(".msgInput");
        msgSendBtn.addEventListener('click', function (event) {
            self.pushChat(msgInput.value);
        });
    }
}

function createSessionId() {
    return ((Math.random() * 1000).toFixed(3) + '_session');
}

function createNewChat(userName) {
    let chat = new Chat(userName, createSessionId());
    document.title = `${userName}'s chat room`;
}

function collectUserInfo() {
    let url = window.location.href.split('/');
    createNewChat(url[url.length - 1]);
}
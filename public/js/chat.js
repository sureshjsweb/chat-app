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

    getAllUserChats() {
        return JSON.parse(localStorage.getItem('USER_CHATS'));
    }

    getUserChatHistory() {
        return JSON.parse(localStorage.getItem('USER_CHATS'))[this.userName];
    }

    setAllUserChatHistory(chats) {
        localStorage.setItem('USER_CHATS', JSON.stringify(chats));
    }

    pushChat(chat) {
        this.chatHistory.push({ message: chat, sessionId: this.sessionId, timing: new Date() });
        this.showChat();
        this.saveChat();
    }

    showChat() {
        let self = this;
        let chat = this.chatHistory[this.chatHistory.length - 1];

        const chatMsg = document.querySelector(".chatMsg");
        const chatMsgLayout = chatMsg.cloneNode(true);
        chatMsgLayout.style.display = "block";

        let userInput = chatMsgLayout.querySelector(".chatUser");
        userInput.textContent = this.userName;

        let chatTime = chatMsgLayout.querySelector(".chatTime");
        chatTime.textContent = chat.timing;

        let chatMessage = chatMsgLayout.querySelector(".chatMessage");
        chatMessage.textContent = chat.message;

        const chatMsgArea = document.querySelector(".chatMsgArea");
        chatMsgArea.appendChild(chatMsgLayout);
    }

    saveChat() {
        let allChats = this.getAllUserChats();
        allChats[this.userName] = this.chatHistory;
        this.setAllUserChatHistory(allChats);
    }

    retreiveChat() {
        this.chatHistory = this.getUserChatHistory();
        this.bindEvents();
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
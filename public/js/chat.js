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

    getUserChatHistory() {
        return JSON.parse(localStorage.getItem('USER_CHATS'))[this.userName];
    }

    setUserChatHistory(chats) {
        localStorage.setItem('USER_CHATS', JSON.stringify(chats));
    }

    pushChat(chat) {
        this.chatHistory.push(chat);
    }

    retreiveChat() {
        this.chatHistory = this.getUserChatHistory();
        this.bindEvents();
    }

    bindEvents() {
        let displayName = document.querySelector("#displayName");
        displayName.addEventListener('change', function (event) {
            console.log(event.target.value);
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

document.onload = function () {
    const queryString = window.location.search;
    createNewChat(queryString.getItem('userName'));
    console.log('QS: ', queryString);
}
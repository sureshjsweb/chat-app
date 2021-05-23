import { CHAT_HISTORY } from './../constants';

class User {
    name = '';
    sessionId = '';
    displayName = '';
    constructor(name) {
        this.name = name;
    }

    setDisplayName(name) {
        this.displayName = name;
    }

    createSessionId() {
        return ((Math.random() * 1000).toFixed(3) + '_session');
    }
}

class ChatQueue extends User {
    chats = [];
    chatHistory = {};
    constructor(name) {
        super(name);
        this.sessionId = this.createSessionId();
        this.retreiveChat();
    }

    enqueue(userName, message, timing) {
        this.chats.push({ userName, message, timing });
    }

    populateMessages() {
        this.chats.forEach((chat) => {
            console.log(chat);
        });
    }

    bindEvents() {
        let displayName = winRef.document.querySelector("#displayName");
        displayName.addEventListener('change', function (event) {
            console.log(event.target.value);
        });
    }

    retreiveChat() {
        let chats = JSON.parse(localStorage.getItem(CHAT_HISTORY));
        if (chats !== null) {
            this.chats = chats[this.name];
            this.populateMessages();
            this.bindEvents();
        }
    }

    saveChat() {
        localStorage.setItem(CHAT_HISTORY, JSON.stringify(this.chatHistory));
    }
}

globalThis.createNewChat = (userName) => {
    this.chatHistory[userName] = new ChatQueue(userName);
    document.title = `${userName}'s chat room`;
    this.chatHistory[userName].saveChat();
}

document.onload = function () {
    globalThis.createNewChat('Suresh');
}

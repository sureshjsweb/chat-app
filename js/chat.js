class User {
    name;
    constructor(name) {
        this.name = name;
    }
}

class ChatQueue extends User {
    chats = [];
    constructor(name) {
        super(name);
    }

    enqueue(userName, message, timing) {
        this.chats.push({ userName, message, timing });
    }

    populateMessages() {
        this.chats.forEach((chat) => {
            console.log(chat);
        });
    }
}

class ChatApp {
    chatHistory = {};
    constructor() {
        this.openChats();
    }

    createSessionId() {
        return ((Math.random() * 1000).toFixed(3) + '_session');
    }

    createNewChat(userName) {
        let sessionId = this.createSessionId();
        this.chatHistory[sessionId] = new ChatQueue(userName);
        this.saveChats();
    }

    openChats() {
        let chats = JSON.parse(localStorage.getItem('chatHistory'));
        if (chats !== null) {
            this.chatHistory = chats;
        }
    }

    saveChats() {
        localStorage.setItem('chatHistory', JSON.stringify(this.chatHistory));
    }

    showChats() {
        for (const [key, value] of Object.entries(this.chatHistory)) {
            console.log(key);
            window.open('','_blank');
        }
    }
}



let chatApp = new ChatApp();
chatApp.createNewChat('Suresh');
chatApp.showChats();
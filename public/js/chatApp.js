class ChatApp {
    baseUrl = 'http://localhost:3000';
    constructor() {
        this.bindEvents();
    }

    bindEvents() {
        let self = this;
        const addUserChatBtn = document.querySelector('#addUserChatBtn');
        const addUserChatTxt = document.querySelector('#addUserChatTxt');
        addUserChatBtn.addEventListener('click', () => {
            self.addChatUser(addUserChatTxt.value);
        });
    }

    addChatUser(userName) {
        let chats = JSON.parse(localStorage.getItem('USER_CHATS'));
        if (!chats) {
            chats = {};
        }
        chats[userName] = chats[userName].length ? chats[userName] : [];
        localStorage.setItem('USER_CHATS', JSON.stringify(chats));
        this.openChatUsers(userName);
    }

    openChatUsers(userName) {
        let winRef = window.open(`${this.baseUrl}/${userName}`, '_blank');
        this.cloneChatTemplate(userName, winRef);
    }

    cloneChatTemplate(userName, winRef) {
        const chatLayout = document.querySelector(".chatlayout");
        const copyChatLayout = chatLayout.cloneNode(true);
        copyChatLayout.style.display = "block";
        winRef.document.body.appendChild(copyChatLayout);

        const scr = document.createElement('script');
        scr.src = "./chat.js";
        winRef.document.body.appendChild(scr);
    }
}

function createChatApp() {
    const chatApp = new ChatApp();
}
class ChatApp {
    constructor() {
        this.bindEvents();
    }

    bindEvents() {
        setTimeout(function () {
            const addUserChatBtn = document.querySelector('#addUserChatBtn');
            const addUserChatTxt = document.querySelector('#addUserChatTxt');
            let self = this;
            addUserChatBtn.addEventListener('click', () => {
                self.addChatUser(addUserChatTxt.value);
            });
        }.bind(this), 1000);
    }

    addChatUser(userName) {
        let chats = JSON.parse(localStorage.getItem('USER_CHATS'));
        if (!chats) {
            chats = {};
        }
        chats[userName] = [];
        localStorage.setItem('USER_CHATS', JSON.stringify(chats));
    }

    openChatUsers() {
        let baseUrl = 'http://localhost:3000/';
        for (const [key, value] of Object.entries(JSON.parse(localStorage.getItem('USER_CHATS')))) {
            let winRef = window.open(`${baseUrl}?userName=${value.name}`, '_blank');
            this.cloneChatTemplate(value.name, userInfo, winRef);
        }
    }

    cloneChatTemplate(userName, userInfo, winRef) {
        const chatLayout = document.querySelector("#chatlayout");
        const copyChatLayout = chatLayout.cloneNode(true);
        copyChatLayout.style.display = "block";
        winRef.document.body.appendChild(copyChatLayout);

        const scr = document.createElement('script');
        scr.src = "./chat.js";
        winRef.document.body.appendChild(scr);
    }
}

function createChatApp() {
    console.log('its onload');
    const chatApp = new ChatApp();
}
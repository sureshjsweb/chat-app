import { CHAT_HISTORY } from './../constants';

class ChatOpener {
    constructor() { }

    showChat() {
        for (const [key, value] of Object.entries(JSON.parse(localStorage.getItem(CHAT_HISTORY)))) {
            let winRef = window.open('', '_blank');
            this.cloneChatTemplate(value.name, userInfo, winRef);
        }
    }

    cloneChatTemplate(userName, userInfo, winRef) {
        const chatLayout = document.querySelector("#chatlayout");
        const copyChatLayout = chatLayout.cloneNode(true);
        copyChatLayout.style.display = "block";
        winRef.document.body.appendChild(copyChatLayout);

        const con = document.createElement('script');
        con.src = "../constants.js";
        winRef.document.body.appendChild(con);

        const scr = document.createElement('script');
        scr.src = "./chatQueue.js";
        winRef.document.body.appendChild(scr);
    }
}

const chatOpener = new ChatOpener();
let chatWins = document.querySelector('#openChatWindows')
chatWins.addEventListener('click', () => {
    chatOpener.showChat();
});
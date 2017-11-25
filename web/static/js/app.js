// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"
import {Socket, Presence} from "phoenix"

var connectToChat = document.getElementById("connectToChat");

function connect(){
    let user = document.getElementById("name").value;

    if (user){
        let socket = new Socket("/socket", {params: {user: user}})
        socket.connect()

        let presences = {}

        let formatTimestamp = (timestamp) => {
          let date = new Date(timestamp)
          return date.toLocaleTimeString()
        }
        let listBy = (user, {metas: metas}) => {
          return {
            user: user,
            onlineAt: formatTimestamp(metas[0].online_at)
          }
        }

        let userList = document.getElementById("UserList")
        let render = (presences) => {
          userList.innerHTML = Presence.list(presences, listBy)
            .map(presence => `
              <li>
                <b>${presence.user}</b>
                <br><small>online since ${presence.onlineAt}</small>
              </li>
            `)
            .join("")
        }

        let room = socket.channel("room:lobby", {})
        room.on("presence_state", state => {
          presences = Presence.syncState(presences, state)
          render(presences)
        })

        room.on("presence_diff", diff => {
          presences = Presence.syncDiff(presences, diff)
          render(presences)
        })

        room.join()

        let commentInput = document.getElementById("NewComment");
        commentInput.addEventListener("keypress", (e) => {
          if (e.keyCode == 13 && commentInput.value != "") {
            room.push("message:new", commentInput.value)
            commentInput.value = ""
          }
        })

        let commentList = document.getElementById("CommentList")
        let renderMessage = (message) => {
          let messageElement = document.createElement("li")
          messageElement.innerHTML = `
            <b>${message.user}</b>
            <i>${formatTimestamp(message.timestamp)}</i>
            <p>${message.body}</p>
          `
          commentList.appendChild(messageElement)
          commentList.scrollTop = commentList.scrollHeight;
        }

        room.on("message:new", message => renderMessage(message))
    }
}

connectToChat.addEventListener("click", connect);

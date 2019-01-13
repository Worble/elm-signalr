"use strict";

import { Elm } from "./elm/Main";
import "./assets/sass/styles.scss";
import * as signalR from "@aspnet/signalr";

(function() {
  const node: HTMLElement | null = document.getElementById("elm");
  const app = Elm.Main.init({
    node: node,
    flags: null
  });

  interface MessageData {
    name: string;
    message: string;
  }

  app.ports.sendMessage.subscribe(function(data: MessageData) {
    send(data.name, data.message);
  });

  const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:5001/chatHub")
    .build();

  connection.start().catch(err => console.log(err));

  connection.on("messageReceived", (username: string, message: string) => {
    app.ports.receiveMessage.send({ name: username, message: message });
  });

  function send(username: string, message: string) {
    connection.send("newMessage", username, message);
  }
})();

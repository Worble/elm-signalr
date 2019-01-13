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
    username: string;
    message: string;
  }

  interface RollData {
    username: string;
    diceType: number;
    diceAmount: number;
    diceTotal: number;
    rolls: number[];
  }

  app.ports.sendMessage.subscribe(function(data: MessageData) {
    send(data);
  });

  const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:5001/chatHub")
    .build();

  connection.start().catch(err => console.log(err));

  connection.on("messageReceived", (username: string, message: string) => {
    app.ports.receiveMessage.send({ username: username, message: message });
  });

  connection.on("rollReceived", (rolls: RollData) => {
    app.ports.receiveMessage.send({
      username: rolls.username,
      message: `rolled ${rolls.diceAmount} d${rolls.diceType} and got ${
        rolls.diceTotal
      } (${rolls.rolls.map(function(number) {
        return `${number}`;
      })})`
    });
  });

  function send(data: MessageData) {
    connection.send("newMessage", data);
  }
})();

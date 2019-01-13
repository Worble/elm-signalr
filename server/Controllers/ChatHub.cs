using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace server.Hubs
{
    public class ChatHub : Hub
    {
        public async Task NewMessage(IncomingResponse data)
        {
            if (data.message[0] == '/' && data.message.Length > 1)
            {
                await HandleCommand(data);
            }
            else
            {
                await Clients.All.SendAsync("messageReceived", data.username, data.message);
            }
        }

        private async Task HandleCommand(IncomingResponse response)
        {
            var command = response.message.Substring(1).Split(' ', StringSplitOptions.RemoveEmptyEntries);

            switch (command[0])
            {
                case "roll":
                case "r":
                    if (command.Length < 3)
                    {
                        //await HandleInvalidNumberOfArguments(response);
                        return;
                    }
                    if (!int.TryParse(command[1], out var diceType) || !int.TryParse(command[2], out var diceAmount))
                    {
                        //await HandleBadInput(response);
                        return;
                    }
                    var rng = new Random();
                    var rollhistory = new List<int>();
                    var rollTotal = 0;
                    for (int i = 0; i < diceAmount; i++)
                    {
                        var roll = rng.Next(1, diceType + 1);
                        rollhistory.Add(roll);
                        rollTotal += roll;
                    }
                    var data = new RollData()
                    {
                        DiceAmount = diceAmount,
                        DiceType = diceType,
                        DiceTotal = rollTotal,
                        Username = response.username,
                        Rolls = rollhistory.ToArray()
                    };
                    await Clients.All.SendAsync("rollReceived", data);
                    break;
            }
        }
    }

    public class IncomingResponse
    {
        public string username { get; set; }
        public string message { get; set; }
    }

    public class RollData
    {
        public string Username { get; set; }
        public int DiceType { get; set; }
        public int DiceAmount { get; set; }
        public int DiceTotal { get; set; }
        public int[] Rolls { get; set; }
    }
}
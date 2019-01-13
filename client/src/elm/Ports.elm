port module Ports exposing (receiveMessage, sendMessage)

import Types exposing (MessageData)


port receiveMessage : (MessageData -> msg) -> Sub msg


port sendMessage : MessageData -> Cmd msg

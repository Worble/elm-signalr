module Types exposing (Flags, MessageData, Model, Msg(..))

import Http


type alias Model =
    { message : String
    , messages : List MessageData
    , username : String
    }


type alias MessageData =
    { username : String
    , message : String
    }


type Msg
    = NoOp
    | ReceiveMessage MessageData
    | SendMessage
    | UpdateMessage String
    | UpdateName String


type alias Flags =
    ()

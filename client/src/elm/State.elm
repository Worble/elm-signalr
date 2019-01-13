module State exposing (subscriptions, update)

import Ports exposing (receiveMessage, sendMessage)
import Types exposing (MessageData, Model, Msg(..))


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        ReceiveMessage message ->
            ( { model | messages = message :: model.messages }, Cmd.none )

        UpdateMessage message ->
            ( { model | message = message }, Cmd.none )

        SendMessage ->
            ( { model | message = "" }, sendMessage { name = model.name, message = model.message } )

        UpdateName name ->
            ( { model | name = name }, Cmd.none )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    receiveMessage ReceiveMessage

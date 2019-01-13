module View exposing (view)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Json.Decode as Json
import Types exposing (MessageData, Model, Msg(..))


view : Model -> Html Msg
view model =
    div [ class "container" ]
        [ div [ class "row" ]
            [ label []
                [ text "Name: "
                , input [ onInput UpdateName, value model.name ] []
                ]
            ]
        , if List.isEmpty model.messages then
            text ""

          else
            ul [ class "row message-container" ] (List.map displayMessage (List.reverse model.messages))
        , div [ class "row" ]
            [ label []
                [ text "Message: "
                , input [ onInput UpdateMessage, value model.message, onEnter SendMessage ] []
                ]
            , button [ onClick SendMessage ] [ text "Send" ]
            ]
        ]


displayMessage : MessageData -> Html Msg
displayMessage messageData =
    li []
        [ span [ class "message-name" ] [ text <| messageData.name ++ ": " ]
        , text messageData.message
        ]


onEnter : Msg -> Attribute Msg
onEnter msg =
    let
        isEnter code =
            if code == 13 then
                Json.succeed msg

            else
                Json.fail "not ENTER"
    in
    on "keydown" (Json.andThen isEnter keyCode)

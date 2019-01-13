port module Main exposing (main)

import Browser
import State
import Types exposing (Flags, Model, Msg(..))
import View


main : Program Flags Model Msg
main =
    Browser.element
        { init = init
        , update = State.update
        , subscriptions = State.subscriptions
        , view = View.view
        }


init : () -> ( Model, Cmd Msg )
init _ =
    ( Model "" [] "Anonymous", Cmd.none )

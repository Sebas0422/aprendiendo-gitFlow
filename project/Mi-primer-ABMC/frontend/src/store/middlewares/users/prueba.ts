import { Middleware } from "@reduxjs/toolkit";

interface RootState {
    counter: number;
}

enum ActionType {
    INCREMENT = "INCREMENT",
    DECREMENT = "DECREMENT",
    RESET = "RESET",
}

type MyAction =
    | { type: ActionType.INCREMENT; payload: number }
    | { type: ActionType.DECREMENT; payload: number }
    | { type: ActionType.RESET };

const loggerMiddleware: Middleware<{}, RootState> = store => next => action => {
    if (isMyAction(action)) {
        console.log("Action type:", action.type);
        if (action.type === ActionType.INCREMENT) {
            console.log("Incrementing by:", action.payload);
        }
    }

    return next(action);
};

function isMyAction(action: unknown): action is MyAction {
    return (
        typeof action === "object" &&
        action !== null &&
        "type" in action &&
        Object.values(ActionType).includes((action as MyAction).type)
    );
}

export default loggerMiddleware;

import {MessageDetails} from "../interfaces/app.interfaces";
import {LoginError} from "../interfaces/user.interfcae";

export function getErrorMessage(errorCode: LoginError): MessageDetails | null {
    let errorMessage: MessageDetails | null = null
    switch (errorCode) {
        case LoginError.wrongPassword:
            errorMessage = MessageDetails.invalidLogin;
            break
        case LoginError.networkFailed:
            errorMessage = MessageDetails.networkFailed;
            break

        case LoginError.invalidEmail:
            errorMessage = MessageDetails.invalidEmail;
            break
        case LoginError.userNotFound:
            errorMessage = MessageDetails.userNotFound;
            break

        default:
            break;

    }
    return errorMessage
}
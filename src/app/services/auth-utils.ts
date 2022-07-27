import {MessageDetails} from "../interfaces/app.interfaces";
import {LoginError} from "../interfaces/user.interfcae";
import {getEnumKeyByEnumValue} from "./app-utils.service";

export function getErrorMessage(errorCode: LoginError): MessageDetails | null {
    const errorCodeValue = getEnumKeyByEnumValue(LoginError, errorCode)!;
    return (MessageDetails as any)[errorCodeValue]
}

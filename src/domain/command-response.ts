import { Response } from "./application-response";

export interface CommandResponseParams{
    exception?: Error;
    event?: any;
}

export interface CommandResponse {

    reponseException(params: CommandResponseParams):Response;
    reponseAccepted():Response;
}
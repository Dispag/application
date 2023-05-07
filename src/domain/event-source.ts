
export interface EventSourceParams {

    queueName: string;
    body: string;
}

export enum ResponseCode {

    OK = 'ok',
    NOK = 'Nao ok',
}

export interface EventSourceResponse {

    responseCode: ResponseCode;
    message: string;
}


export interface EventSource {

    push (params: EventSourceParams): Promise<EventSourceResponse>;
}

export const EventSource = Symbol("EventSource");
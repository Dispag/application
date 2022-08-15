
export interface EventSourceParams {

    topics: string;

    body: string;
}


export interface EventSource {

    push (params: EventSourceParams): Promise<void>;

}
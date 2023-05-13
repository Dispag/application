export interface EventSourceParams {
  queueName: string;
  body: string;
}

export interface EventSource {
  push(params: EventSourceParams): Promise<void>;
}

export const EventSource = Symbol("EventSource");

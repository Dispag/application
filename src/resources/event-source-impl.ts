import "reflect-metadata";
import { Injectable, Inject } from "@nestjs/common";
import { SQS } from 'aws-sdk';
import { EventSourceParams, EventSource } from "../domain/event-source";
import { QueueNotFoundError } from "../exceptions";
import { GetQueueUrlResult } from "aws-sdk/clients/sqs";

@Injectable()
export class EventSourceImpl implements EventSource {

    constructor (@Inject('SQS') private readonly sqs: SQS){}

    private async getQueueUrlByName(queueName: string): Promise<string> {
      try{
        const queueUrl = await this.sqs
          .getQueueUrl({
            QueueName: queueName,
          })
        return (queueUrl as GetQueueUrlResult).QueueUrl as string;
      }catch(e){
        throw new QueueNotFoundError(queueName);
      }
    }

    async push (params: EventSourceParams): Promise<void>{
        const queueUrl = await this.getQueueUrlByName(params.queueName);

        const sendMessageParams = {
            QueueUrl: queueUrl,
            MessageBody: JSON.stringify(params.body),
        };
        await this.sqs.sendMessage(sendMessageParams);
    }

}


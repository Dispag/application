import "reflect-metadata";
import { Injectable } from "@nestjs/common";
import { SQS } from 'aws-sdk';
import { EventSourceParams, EventSource, EventSourceResponse, ResponseCode } from "../domain/event-source";
import { QueueNotFoundError } from "../exceptions";
import { GetQueueUrlResult } from "aws-sdk/clients/sqs";


const env = process.env.NODE_ENV;
const isLocal = env === 'development' || env === 'test' || env === 'docker';

const localSQSParams = {
  accessKeyId: process.env.MOCK_ACCESS_KEY,
  secretAccessKey: process.env.MOCK_KEY_ID,
  endpoint: process.env.MOCK_SQS_ENDPOINT,
};

const sqs: SQS = isLocal ? new SQS(localSQSParams) : new SQS();


@Injectable()
export class EventSourceImpl implements EventSource {

    private async getQueueUrlByName(queueName: string): Promise<string> {
      try{
        const queueUrl = await sqs
          .getQueueUrl({
            QueueName: queueName,
          })
        return (queueUrl as GetQueueUrlResult).QueueUrl as string;
      }catch(e){
        throw new QueueNotFoundError(queueName);
      }
    }

    async push (params: EventSourceParams): Promise<EventSourceResponse>{
        const queueUrl = await this.getQueueUrlByName(params.queueName);

        const sendMessageParams = {
            QueueUrl: queueUrl,
            MessageBody: JSON.stringify(params.body),
        };
        await sqs.sendMessage(sendMessageParams);

        return {
            responseCode: ResponseCode.OK,
            message: params.body
         } as EventSourceResponse;
    }

}


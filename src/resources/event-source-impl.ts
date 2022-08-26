import { injectable } from "inversify";
import "reflect-metadata";
import { KafkaClient, Producer, ProduceRequest } from "kafka-node";
import { EventSourceParams, EventSource, EventSourceResponse, ResponseCode } from "../domain/event-source";


const OFF = process.env.KAFKA_ENABLE === 'OFF';
const kafkaHost =  process.env.KAFKA_SERVER || '';
const PARTITION = 0;

const producerReturnSent = (err: any, data: string)=>{

    if (err) {
      console.error(err)
    }else {
  
      console.log('[kafka-producer -> '+data+']: broker success');
    }
  
  }

@injectable()
export class EventSourceImpl implements EventSource {

    private message!: ProduceRequest;

    private kafka: KafkaClient;

    constructor(){

        this.kafka = new KafkaClient({kafkaHost});
    }

    private async pushOFF (): Promise<EventSourceResponse> {

        const msg  = `[EVENT-SOURCE] -> ${this.message.topic}] [Kafka Off]: Nenhuma Acao Sera Tomada`;
        return {
            responseCode: ResponseCode.OK,
            message: msg
         } as EventSourceResponse;
    }
    
    private async pushON (): Promise<EventSourceResponse> {
    
        const producer = await new Producer(this.kafka);
        producer.on('ready', async () => {await producer.send([this.message], producerReturnSent)});
        const msg  = `[EVENT-SOURCE] Finalizado Push kafka-producer Topic-> ${this.message.messages}`;
        return {
            responseCode: ResponseCode.OK,
            message: msg
         } as EventSourceResponse;
    }
    
    async push (params: EventSourceParams): Promise<EventSourceResponse>{

        this.message = {
            topic: params.topics, 
            messages: params.body,
            partition: PARTITION
        }
        if (OFF)
            return await this.pushOFF();
        else
            return await this.pushON();
    }

}
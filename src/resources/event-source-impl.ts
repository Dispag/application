import { KafkaClient, Producer, ProduceRequest } from "kafka-node";

import { EventSourceParams, EventSource } from "src/domain/event-source";

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

export class EventSourceImpl implements EventSource {

    private message!: ProduceRequest;

    private kafka: KafkaClient;

    constructor(){

        this.kafka = new KafkaClient({kafkaHost});
    }

    private async pushOFF (): Promise<void> {

        const msg  = `[EVENT-SOURCE] -> ${this.message.topic}] [Kafka Off]: Nenhuma Acao Sera Tomada`;
        console.log(msg);
    }
    
    private async pushON (): Promise<void> {
    
        const producer = await new Producer(this.kafka);
        producer.on('ready', async () => {await producer.send([this.message], producerReturnSent)});
        console.log(`[EVENT-SOURCE] Finalizado Push kafka-producer Topic-> ${this.message.messages}`)
    }
    
    async push (params: EventSourceParams): Promise<void>{

        this.message = {
            topic: params.topics, 
            messages: params.body,
            partition: PARTITION
        }
        if (OFF)
            this.pushOFF();
        else
            await this.pushON();
    }

}
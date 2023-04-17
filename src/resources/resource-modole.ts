import { Module } from "@nestjs/common";
import { KafkaClient } from "kafka-node";

import { EventSource } from "../domain/index";
import { EventSourceImpl } from "./event-source-impl";

const kafkaHost =  process.env.KAFKA_SERVER || '';

const kafkaClientFactory = {
    provide: "KafkaClient",
    useFactory: () => {
      return new KafkaClient({kafkaHost});
    },
};
  
@Module({
    providers: [kafkaClientFactory,
        {
            provide: EventSource, 
            useClass: EventSourceImpl
        }
    ],
    exports: [kafkaClientFactory, {
        provide: EventSource, 
        useClass: EventSourceImpl
    }]
})
export class ResourceModule {}
  
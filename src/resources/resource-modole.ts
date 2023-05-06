import { Module } from "@nestjs/common";
import { EventSource } from "../domain/index";
import { EventSourceImpl } from "./event-source-impl";

  
@Module({
    providers: [
        {
            provide: EventSource, 
            useClass: EventSourceImpl
        }
    ],
    exports: [ {
        provide: EventSource, 
        useClass: EventSourceImpl
    }]
})
export class ResourceModule {}
  
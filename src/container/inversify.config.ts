import { Container } from "inversify";
import { EventSource } from "../domain";
import { EventSourceImpl } from "../resources/event-source-impl";
import TYPES from "./types";


const container: Container = new Container();

container.bind<EventSource>(TYPES.EventSource).to(EventSourceImpl);

export default container;
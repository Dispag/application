import { Pool } from 'pg';
import { Container } from "inversify";
import { EventSource } from "../domain";
import { EventSourceImpl } from "../resources/event-source-impl";
import TYPES from "./types";

const container: Container = new Container();

container.bind<Pool>(TYPES.DataSourcePool).toDynamicValue(async () => {
    const data_source_pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
      });
    return data_source_pool;
});

container.bind<EventSource>(TYPES.EventSource).to(EventSourceImpl);

export default container;
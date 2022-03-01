const kafka = require('kafka-node');



//funcao acionada qdo a conexão com o kafka esta off
const pushOFF = async params =>{

  const msg  = `[EVENT-SOURCE] -> ${params.topic}] [Kafka Off]: Nenhuma Acao Sera Tomada`;
  console.log(msg);
  return msg;
}

const producerReturnSent = (err, data)=>{

  if (err) {
        
    console.error(err)
    //throw new PushTopicError('[kafka-producer -> '+payloads.topic+']: broker failed')
  }else {

    console.log('[kafka-producer -> '+data+']: broker success');
  }

}

//Constroi a mensagem que será publicada no tópico kafka
const buildingMessageToTopic = params=>{

  console.log(`[EVENT-SOURCE] Building Message para Topic-> ${params.topic}`);
  console.log(`[EVENT-SOURCE] Building Message para body-> ${params.body}`);
  return  [{ 
    topic: params.topic, 
    messages: params.body,
    partition: 0 
  }];
}

//funcao acionada qdo a conexão com o kafka esta On
const pushON= async params =>{

  let client;
  try{

    console.log(`[EVENT-SOURCE] Iniciar Push kafka-producer Topic-> ${params.topic}`);
    const message = buildingMessageToTopic(params);
    client = await new kafka.KafkaClient({kafkaHost: process.env.KAFKA_SERVER});
    const producer = await new kafka.Producer(client);
    producer.on('ready', async () => {await producer.send(message, producerReturnSent)});
    const result  = `[EVENT-SOURCE] Finalizado Push kafka-producer Topic-> ${params.body}`;
    console.log(result);
    return  result;
  }catch (err){

      console.error(err);
  }finally{
    client.close();
  }
}


module.exports = {

  push :  process.env.KAFKA_ENABLE === 'OFF'?pushOFF:pushON
}
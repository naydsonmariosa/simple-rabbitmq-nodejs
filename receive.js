const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {
  if (err) {
    throw err;
  }

  conn.createChannel((error, channel) => {
    if (error) {
      throw error;
    }

    const queue = 'Fila1';
    
    channel.assertQueue(queue, {durable: false});
    console.log(" [*] Aguardando mensagens em %s. Para sair, use CTRL+C", queue);
    channel.consume(queue, (msg) => {
      console.log(" [x] Recebido: ' %s '", msg.content.toString());
    }, { noAck: true });    
  });
});
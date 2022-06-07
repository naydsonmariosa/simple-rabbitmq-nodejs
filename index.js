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
    const msg = 'Nova mensagem aqui...';

    channel.assertQueue(queue, {durable: false});
    channel.sendToQueue(queue, Buffer.from(msg));
    console.log('[x] Enviado: " %s "', msg);
  })

  setTimeout(() => {
    conn.close()
    process.exit(0);
  }, 600)
});



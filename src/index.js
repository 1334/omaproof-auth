const { authenticationProcess } = require('./logic/generalProcess');

var amqp = require('amqplib/callback_api');

amqp.connect(
  'amqp://localhost',
  function(err, conn) {
    conn.createChannel(function(err, ch) {
      var q = 'rpc_queue';

      ch.assertQueue(q, { durable: false });
      ch.prefetch(1);

      ch.consume(q, async function reply(msg) {
        let received = JSON.parse(msg.content.toString());
        const { token, answer } = received;
        let response = await authenticationProcess(token, answer);
        response = JSON.stringify(response);

        ch.sendToQueue(msg.properties.replyTo, Buffer.from(response, 'utf8'), {
          correlationId: msg.properties.correlationId
        });
        ch.ack(msg);
      });
    });
  }
);

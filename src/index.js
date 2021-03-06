const { authenticationProcess } = require('./logic/generalProcess');
const { createGrandChild } = require('./db/models/grandChild');
const { createGrandParent } = require('./db/models/grandParent');
const { createRelation } = require('./db/models/relation');

var amqp = require('amqplib/callback_api');

amqp.connect(
  'amqp://localhost',
  function(err, conn) {
    conn.createChannel(function(err, ch) {
      var q = 'rpc_queue';
      ch.assertQueue(q, { durable: false });
      ch.prefetch(1);
      ch.consume(q, async function reply(msg) {
        try {
          let received = JSON.parse(msg.content.toString());
          const { token, answer } = received;
          let response = await authenticationProcess(token, answer);
          response = JSON.stringify(response);
          ch.sendToQueue(
            msg.properties.replyTo,
            Buffer.from(response, 'utf8'),
            {
              correlationId: msg.properties.correlationId
            }
          );
        } catch (error) {
          console.log(error); // eslint-disable-line
        } finally {
          ch.ack(msg);
        }
      });

      var p = 'createGroup';
      ch.assertQueue(p, { durable: false });
      ch.consume(
        p,
        async msg => {
          await _dumpData(JSON.parse(msg.content.toString())).catch(() =>
            ch.ack(msg)
          );
          ch.ack(msg);
        },
        { noAck: false }
      );
    });
  }
);

const _dumpData = async receivedPackage => {
  const kids = await Promise.all(
    receivedPackage.kids.map(el => {
      return createGrandChild(el);
    })
  );
  const GPs = await Promise.all(
    receivedPackage.grandParents.map(el => {
      return createGrandParent(el);
    })
  );
  await Promise.all(
    GPs.map(GP => Promise.all(kids.map(kid => createRelation(kid.id, GP.id))))
  );
};

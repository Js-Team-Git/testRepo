const { json } = require("express");
const { Kafka } = require("kafkajs");

async function consume() {
    const kafka = new Kafka({
        clientId: "player-jersey-3",
        brokers: ["127.0.0.1:9092"],
    });

    const consumer = kafka.consumer({ groupId: "player-jersey" });
    await consumer.connect();
    console.log("Consumer connected");

    await consumer.subscribe({
        topic: "jersey3",
        fromBeginning: true,
    });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            // 1. topic
            // 2. partition
            // 3. message
                console.log(`To Partition ${partition} -> message ${message.value.toString()}`);
                /* console.log(JSON.parse(message.value)) */
        },
    });
  
}

consume();
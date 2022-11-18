const { json } = require("express");
const { Kafka } = require("kafkajs");
const data = require("./data")
const person = require("./data1")
const { Partitioners } = require('kafkajs')

console.log("data is",data);

async function produce() {
    const kafka = new Kafka({
        clientId: "player-jersey-3",
        brokers: ["127.0.0.1:9092"],
    });

    const jerseyNumber = process.argv[2];
    const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
    await producer.connect();
    console.log("Producer connected");

  /*   const players = {
        7: "Dhoni",
        18: "Virat",
        12: "Yuvraj",
        10: "Sachin",
        45: "Rohit",
        99:"jadeja"
    }; */

    

    const producedData = await producer.send({
        topic: "jersey3",
        messages: [
           /*  {
                value: players[jerseyNumber],
                partition: jerseyNumber <= 10 ? 0 : 1,
            }, */
            {
                value:"hello world",
                
            },
            {
                value:"welcome to kafka",
            
            },
            {
                key:data.name,
                value:JSON.stringify(data),
                
            },
            {
                key:person.name,
                value:JSON.stringify(person),
                
            }
        ],
    });
     
    console.log(`Produced data ${JSON.stringify(producedData)}`);
    
}

produce();
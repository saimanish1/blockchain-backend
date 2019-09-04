const Blockchain = require('../blockchain/blockchain');

const blockchain = new Blockchain();

blockchain.addBlock({ data: 'initial' });
console.log('first block ', blockchain.chain[blockchain.chain.length - 1].hash);
let prevTimestamp, nextTimestamp, nextBlock, timeDiff, average;

const times = [];

for (let i = 0; i < 10000; i++) {
  prevTimestamp = blockchain.chain[blockchain.chain.length - 1].timestamp;

  blockchain.addBlock({ data: `block ${i}` });
  nextBlock = blockchain.chain[blockchain.chain.length - 1];
  nextTimestamp = nextBlock.timestamp;
  timeDiff = nextTimestamp - prevTimestamp;
  times.push(timeDiff);

  average = times.reduce((total, current) => total + current) / times.length;
  console.log(
    `Time to mine block: ${timeDiff}ms. Difficulty: ${nextBlock.difficulty}. Average time:${average}`
  );
}

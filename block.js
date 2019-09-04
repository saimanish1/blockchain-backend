const hexToBinary = require('hex-to-binary');
const { GENESIS_DATA, MINE_RATE } = require('./config');
const cryptoHash = require('./crypto-hash');

class Block {
  constructor({ timestamp, lastHash, hash, data, difficulty, nonce }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }
  static genesis() {
    return new this(GENESIS_DATA);
  }
  static mineBlock({ lastBlock, data }) {
    let hash, timestamp;
    let { difficulty } = lastBlock;
    const lastHash = lastBlock.hash;
    let nonce = 0;
    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty({ originalBlock: lastBlock, timestamp });
      hash = cryptoHash(timestamp, lastHash, nonce, difficulty, data);
    } while (hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty));
    return new this({
      timestamp,
      data,
      hash,
      difficulty,
      nonce,
      lastHash
    });
  }
  static adjustDifficulty({ originalBlock, timestamp }) {
    const { difficulty } = originalBlock;
    if (difficulty < 1) return 1;
    const difference = timestamp - originalBlock.timestamp;
    if (difference > MINE_RATE) return difficulty - 1;
    return difficulty + 1;
  }
}

module.exports = Block;

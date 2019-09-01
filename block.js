const { GENESIS_DATA } = require('./config');
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
    const { difficulty } = lastBlock;
    const lastHash = lastBlock.hash;
    let nonce = 0;
    do {
      nonce++;
      timestamp = Date.now();
      hash = cryptoHash(timestamp, lastHash, nonce, difficulty, data);
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));
    return new this({
      timestamp,
      data,
      hash,
      difficulty,
      nonce,
      lastHash
    });
  }
}

module.exports = Block;

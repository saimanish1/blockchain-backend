class TransactionMiner {
  mineTransaction(blockchain, transactionPool, wallet, pubsub) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.pubsub = pubsub;
    // get the transaction pool's valid transactions
    // generate the miner's reward
    // add a block consisting of these transactions to the blockchains
    // broadcast the updated blockchain
    // clear the pool
  }
}

module.export = TransactionMiner;

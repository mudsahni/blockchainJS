import BlockChain from "./BlockChain.ts";
import Transaction from "./Transaction.ts";




let quackCoin = new BlockChain()

quackCoin.createTransaction(new Transaction('address1', 'address2', 100))
quackCoin.createTransaction(new Transaction('address2', 'address1', 50))

console.log('\n starting the miner...')
quackCoin.minePendingTransactions('mudit')
console.log('\n balance for mudit: ', quackCoin.getBalanceOfAddress('mudit'))
console.log('\n starting the miner again...')
quackCoin.minePendingTransactions('mudit')
console.log('\n balance for mudit: ', quackCoin.getBalanceOfAddress('mudit'))
console.log('\n starting the miner again...')
quackCoin.minePendingTransactions('mudit')
console.log('\n balance for mudit: ', quackCoin.getBalanceOfAddress('mudit'))

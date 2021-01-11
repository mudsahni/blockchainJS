import Block from './Block.ts'
import Transaction from './Transaction.ts'

class BlockChain {
    chain: Block[]
    difficulty: number
    pendingTransactions: Transaction[]
    miningReward: number

    constructor() {
        this.chain = [this.createGenisisBlock()]
        this.difficulty = 3
        this.pendingTransactions = []
        this.miningReward = 100
    }

    createGenisisBlock = (): Block => {
        return new Block(Date.now(), [])
    }

    getLatestBlock = (): Block => {
        return this.chain[this.chain.length - 1]
    }

    minePendingTransactions = (miningRewardAddress: string) => {
        let block = new Block(Date.now(), this.pendingTransactions)
        block.mineBlock(this.difficulty)
        console.log('Block successfully mined.')
        this.chain.push(block)
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ]

    }

    createTransaction = (transaction: Transaction) => {
        this.pendingTransactions.push(transaction)
    }

    getBalanceOfAddress = (address: string) => {
        let balance = 0
        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount
                }

                if (trans.toAddress === address) {
                    balance += trans.amount
                }
            }
        }
        return balance
    }

    isChainValid = () => {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i - 1]

            // check if the hash of the current block is actually valid
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false
            }

            // check if our current block points to the previous block
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false
            }
        }

        return true
    }
}

export default BlockChain
import { createHash } from "https://deno.land/std@0.83.0/hash/mod.ts";
import Transaction from "./Transaction.ts";

class Block {

    // timestamp - when the block was created
    timestamp: number
    // data - information living in the block
    transactions: Transaction[]
    // previousHash - string containing the hash of the previous block
    previousHash: string
    // hash - hash of this block
    hash: string
    // nonce - random number value for proof-of-work
    nonce: number

    constructor(timestamp: number, transactions: Transaction[], previousHash: string = '') {
        this.timestamp = timestamp
        this.transactions = transactions
        this.previousHash = previousHash
        this.hash = this.calculateHash()
        this.nonce = 0
    }

    calculateHash = () => {
        // calculate the hash function of this block
        // take the properties of this block
        // run them through a hash function
        // use the value as the hash
        const hash = createHash("sha3-256")
        hash.update(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce)
        return hash.toString("base64")
    }

    mineBlock = (difficulty: number) => {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++
            this.hash = this.calculateHash()
        }
        console.log("Block mined.")
        console.log(this.hash)
    }

}

export default Block
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { Alchemy, Network } = require('alchemy-sdk')

dotenv.config()

const settings = {
	apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
	network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())


app.get("/getBlockNumber", async (req, res) => {
	/* Gets latest block Number */
	try {
		const blockNumber = await alchemy.core.getBlockNumber()
		return res.json(blockNumber)
	} catch (error) {
		return res.json(error)
	}
})


app.get("/getBlock/:number", async (req, res) => {
	/* Gets block details by number */
	try {
		const number = req.params.number

		const block = await alchemy.core.getBlock()

		return res.json(block)
	} catch (error) {
		return res.json(error)
	}
})

app.get("/transaction/:hash", async (req, res) => {
	/* Get transaction by hash */
	try {
		const hash = req.params.hash

		const transaction = await alchemy.core.getTransaction(hash)

		return res.json(transaction)
	} catch (error) {
		return res.json(error)
	}
})

app.get("/balance/:address", async (req, res) => {
	/* Get balance by address */

	try {
		const address = req.params.address

		const balance = await alchemy.core.getBalance(address)

		return res.json(balance)
	} catch (error) {
		return res.json(error)
	}
})

app.listen(port, () => {
	console.log("Server is listening on port", port)
})

module.exports = app


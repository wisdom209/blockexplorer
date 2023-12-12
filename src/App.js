import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import BalanceModal from "./components/BalanceModal";
import BlockModal from './components/BlockModal';
import TransactionModal from './components/TransactionModal';
import IdentifierInput from './components/IdentifierInput';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
	apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
	network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

// methods eth_getBalance, eth_getTransactionByHash

function App() {
	const [address, setAddress] = useState("")
	const [blockNumber, setBlockNumber] = useState("")
	const [txHash, setTxHash] = useState("")
	const [displayDetails, setDisplayDetails] = useState({})
	const [balanceModalOpen, setBalanceModalOpen] = useState(false)
	const [transactionModal, setTransactionModal] = useState(false)
	const [blockModal, setBlockModal] = useState(false)
	const [latestBlockNumber, setLatestBlockNumber] = useState(null)
	const [lastTenBlockNum, setLastTenBlockNums] = useState([])

	useEffect(() => {
		const getBlockNumber = async () => {
			//setLatestBlockNumber(await alchemy.core.getBlockNumber())
			setTimeout(() => {
				let lastNum = 18769760
				setLatestBlockNumber(lastNum)

				let lasttenNums = Array(10).fill("_").map((v, i, a) => {
					if ((i === 0)) return latestBlockNumber
					else {
						return a[i - 1] - 1
					}
				})
				
				setLastTenBlockNums(lasttenNums)

			}, 2000)
		}
		getBlockNumber()
	}, [latestBlockNumber])


	const validEthAddress = (address) => {
		let addressRegex = /^(0x)?[0-9a-fA-F]{40}$/

		if (address.startsWith("0x"))
			address = address.substring(2)

		return addressRegex.test(address)
	}

	const validTxHash = (hash) => {
		let addressRegex = /^(0x)?[0-9a-fA-F]{64}$/

		return addressRegex.test(hash)
	}

	const openBalanceModal = async () => {
		if (validEthAddress(address)) {
			setDisplayDetails(null)
			setBalanceModalOpen(true)
			const balance = await alchemy.core.getBalance(address)
			setDisplayDetails({
				type: "Balance",
				walletAddress: address,
				"result": balance
			})

		} else {
			alert("Invalid Wallet Address")
		}

	}

	const openBlockModal = () => {
		if (Number(blockNumber) || Number(blockNumber) === 0) {
			setDisplayDetails(null)
			setBlockModal(true)
			setTimeout(() => {	//ajax request will take place here
				setDisplayDetails({
					type: "Block",
					blockNumber: Number(blockNumber),
					"jsonrpc": "2.0",
					"id": 0,
					"result": {
						"number": "0x1b4",
						"difficulty": "0x4ea3f27bc",
						"extraData": "0x476574682f4c5649562f76312e302e302f6c696e75782f676f312e342e32",
						"gasLimit": "0x1388",
						"gasUsed": "0x0",
						"hash": "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
						"logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
						"miner": "0xbb7b8287f3f0a933474a79eae42cbca977791171",
						"mixHash": "0x4fffe9ae21f1c9e15207b1f472d5bbdd68c9595d461666602f2be20daf5e7843",
						"nonce": "0x689056015818adbe",
						"parentHash": "0xe99e022112df268087ea7eafaf4790497fd21dbeeb6bd7a1721df161a6657a54",
						"receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
						"sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
						"size": "0x220",
						"stateRoot": "0xddc8b0234c2e0cad087c8b389aa7ef01f7d79b2570bccb77ce48648aa61c904d",
						"timestamp": "0x55ba467c",
						"totalDifficulty": "0x78ed983323d",
						"transactions": [],
						"transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
						"uncles": []
					}
				})
			}, 2000);
		} else {
			alert("Enter a valid block number")
		}
	}

	const openTransactionModal = async () => {
		setDisplayDetails(null)
		if (validTxHash(txHash)) {
			const result = await alchemy.core.getTransaction(txHash)
			setTransactionModal(true)
			setDisplayDetails({
				type: "Transaction",
				hash: txHash,
				result
			})
		} else {
			alert(`Invalid transaction hash: ${txHash}`)
		}
	}



	const operations = [{
		name: "Balance",
		label: "Retrieve account balance",
		placeholder: "Enter wallet address"
	}, {
		name: "Transaction",
		label: "Retrieve transaction details",
		placeholder: "Enter transaction hash"
	}, {
		name: "Block",
		label: "Retrieve details of a block",
		placeholder: "Enter block number"
	}]

	return <div>

		<header>
			<nav className="navbar navbar-expand navbar-light bg-light p-3">
				<div className="nav navbar-nav ">
					<h1>The Ethereum Blockchain Explorer {latestBlockNumber}</h1>
				</div>
			</nav>
		</header>
		<main>
			<div
				className="container-fluid"
			>
				<div
					className="row justify-content-center align-items-center g-2"
				>
					{operations.map(({ name, label, placeholder }, i) => <div key={i} className='col'>
						<div
							className="card text-white bg-primary"
						>
							<div className="card-body">
								<h4 className="card-title">{name}</h4>
								<div className="mb-3">
									<div className="form-label">{label}</div>
									<div className="input-group mb-3">
										{name === "Balance" && <IdentifierInput identifier={address} placeholder={placeholder} setIdentifier={setAddress} />}
										{name === "Transaction" && <IdentifierInput identifier={txHash} placeholder={placeholder} setIdentifier={setTxHash} />}
										{name === "Block" && <IdentifierInput identifier={blockNumber} placeholder={placeholder} setIdentifier={setBlockNumber} />}

										<button
											className="input-group-text"
											id="suffixId"
											onClick={() => {
												name === "Balance" && openBalanceModal()
												name === "Transaction" && openTransactionModal()
												name === "Block" && openBlockModal()
											}}>
											Go
										</button>
									</div>

								</div>

							</div>
						</div>
					</div>)
					}
				</div>

				<BalanceModal modalOpen={balanceModalOpen} setModalOpen={setBalanceModalOpen} details={displayDetails} />
				<TransactionModal modalOpen={transactionModal} setModalOpen={setTransactionModal} details={displayDetails} />
				<BlockModal modalOpen={blockModal} setModalOpen={setBlockModal} details={displayDetails} />

				<div className='row d-flex justify-content-center align-items-center g-2 mt-2'>
					<div
						className="col table-responsive"
					>
						<b>Latest blocks</b>
						<table
							className="table table-primary"
						>
							<thead>
								<tr>
									<th scope="col">Block No</th>
									<th scope="col">Miner</th>
									<th scope="col">Time</th>
								</tr>
							</thead>
							<tbody>
								{Array(10).fill("_").map((v, i) => <tr key={i} className="">
									<td><button onClick={() => {
										setBlockNumber(10)
										openBlockModal()
									}}>{blockNumber}</button></td>
									<td>{Math.random() * 100}</td>
									<td>{Math.random() * 100}</td>
								</tr>)
								}
							</tbody>
						</table>
					</div>
					<div
						className="col table-responsive"
					>
						<b>Latest Transactions</b>
						<table
							className="table table-primary"
						>
							<thead>
								<tr>
									<th scope="col">Transaction Hash</th>
									<th scope="col">From/ To</th>
									<th scope="col">Value</th>
									<th scope="col">Time</th>
								</tr>
							</thead>
							<tbody>
								{Array(10).fill("_").map((v, i) => <tr key={i} className="">
									<td><button onClick={() => {
										setTxHash("0x5b73e239c55d790e3c9c3bbb84092652db01bb8dbf49ccc9e4a318470419d9a0")
										openTransactionModal()
									}}>{`${txHash.substring(0, 5)}...${txHash.substring(59)}`}</button></td>
									<td>{Math.random() * 100}</td>
									<td>{Math.random() * 100}</td>
									<td>{Math.round(Math.random() * 100)}</td>
								</tr>)
								}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</main >
		<footer style={{ textAlign: "center", marginBottom: "10px" }}>
			<b> &copy; Copyright 2023</b>
		</footer>
	</div >
}

export default App;

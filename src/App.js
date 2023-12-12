import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import BalanceModal from "./components/BalanceModal";
import BlockModal from './components/BlockModal';
import ClipBoard from './components/ClipBoard';
import IdentifierInput from './components/IdentifierInput';
import TransactionModal from './components/TransactionModal';

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


function App() {
	const [address, setAddress] = useState("")
	const [blockNumber, setBlockNumber] = useState("")
	const [txHash, setTxHash] = useState("")
	const [displayDetails, setDisplayDetails] = useState({})
	const [balanceModalOpen, setBalanceModalOpen] = useState(false)
	const [transactionModal, setTransactionModal] = useState(false)
	const [blockModal, setBlockModal] = useState(false)
	const [tenBlocks, setTenBlocks] = useState(Array(10).fill("..."))
	const [tenTransactions, setTenTransactions] = useState(null)

	useEffect(() => {
		const getBlockNumber = async () => {
			let lastNum = await alchemy.core.getBlockNumber()
			let lasttenNums = Array(10).fill("_").map((v, i, a) => {
				if ((i === 0)) return lastNum
				else {
					return --lastNum
				}
			})
			try {
				const blockDetailsPromises = lasttenNums.map(v => alchemy.core.getBlock(Number(v)))
				const blockDetails = await Promise.all(blockDetailsPromises)

				setTenBlocks(blockDetails)
				const transactionDetailsPromises = blockDetails[0].transactions.map((v, i) => {
					return i < 10 && alchemy.core.getTransaction(v)
				})
				const transactionDetails = await Promise.all(transactionDetailsPromises)

				setTenTransactions(transactionDetails)
			} catch (e) {
				alert(e.message)
			}
		}
		getBlockNumber()
	}, [])


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

	const openBlockModal = async () => {
		if (Number(blockNumber) || Number(blockNumber) === 0) {
			const result = await alchemy.core.getBlock(Number(blockNumber))
			setDisplayDetails(null)
			setBlockModal(true)
			setDisplayDetails({
				type: "Block",
				blockNumber: Number(blockNumber),
				"result": result
			})
		} else {
			alert("Enter a valid block number")
		}
	}

	const openTransactionModal = async () => {
		setDisplayDetails(null)
		if (validTxHash(txHash)) {
			setTransactionModal(true)
			const result = await alchemy.core.getTransaction(txHash)
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

	return <div style={{ display: 'flex', flexDirection: 'column', height: "100%" }}>

		<header>
			<nav className="navbar navbar-expand navbar-light bg-light p-3">
				<div className="nav navbar-nav ">
					<h1>The Ethereum Blockchain Explorer</h1>
				</div>
			</nav>
		</header>
		<main style={{ flexGrow: 1 }}>
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
				<BlockModal modalOpen={blockModal} setModalOpen={setBlockModal} details={displayDetails} setBlockNumber={setBlockNumber} />
				{
					tenTransactions ?
						<div className='row d-flex justify-content-center g-2 mt-2'>
							<div
								className="col-sm-12 col-md-4 table-responsive"
							>
								<b>Latest blocks</b>
								<table
									className="table table-primary"
								>
									<thead>
										<tr>
											<th scope="col">Block No</th>
											<th scope="col">Miner</th>
										</tr>
									</thead>
									<tbody>
										{tenBlocks.map((v, i) => <tr key={i} className="">
											<td>
												{v.number}
												<ClipBoard textToCopy={v.number} /></td>
											<td>
												{`${v.miner.substring(0, 5)}...${v.miner.substring(35)}`}
												<ClipBoard textToCopy={v.miner} /></td>
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
											<th scope="col">From</th>
											<th scope="col">To</th>
											<th scope="col">Value</th>
										</tr>
									</thead>
									<tbody>
										{tenTransactions.map((v, i) => {
											if (i < 10)
												return <tr key={i} className="">
													<td>
														{`${v?.hash?.substring(0, 5)}...${v?.hash?.substring(59)}`}
														<ClipBoard textToCopy={v.hash} />
													</td>
													<td>
														{`${v?.from?.substring(0, 5)}...${v?.from?.substring(35)}`}
														<ClipBoard textToCopy={v.from} />
													</td>
													<td>
														{`${v?.to?.substring(0, 5)}...${v?.to?.substring(35)}`}
														<ClipBoard textToCopy={v.to} />
													</td>
													<td>
														{(Number(v.value) / (10 ** 18)).toFixed(7) || 0} eth
													</td>
												</tr>
										})
										}
									</tbody>
								</table>
							</div>
						</div> :
						<div style={{ marginTop: "100px" }}
							class="d-flex justify-content-center align-items-center"
						>
							<div
								class="spinner-border"
								role="status"
							>
								<span class="visually-hidden">Loading...</span>
							</div>
						</div>

				}
			</div>
		</main >
		<footer style={{ textAlign: "center", marginTop: "auto" }}>
			{tenTransactions && <b> &copy; Copyright 2023</b>}
		</footer>
	</div >
}

export default App;

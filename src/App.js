import { Alchemy, Network } from 'alchemy-sdk';
import { useState } from 'react';
import BalanceModal from "./components/BalanceModal";
import BlockModal from './components/BlockModal';
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
	const [identifier, setIdentifier] = useState("")
	const [displayDetails, setDisplayDetails] = useState({})
	const [balanceModalOpen, setBalanceModalOpen] = useState(false)
	const [transactionModal, setTransactionModal] = useState(false)
	const [blockModal, setBlockModal] = useState(false)

	const validEthAddress = (address) => {
		let addressRegex = /^(0x)?[0-9a-fA-F]{40}$/

		if (address.startsWith("0x"))
			address = address.substring(2)

		return addressRegex.test(address)
	}

	const openBalanceModal = () => {
		
		if (validEthAddress(identifier)) {
			setBalanceModalOpen(true)
			setTimeout(() => {
				setDisplayDetails({
					walletAddress: identifier,
					"jsonrpc": "2.0",
					"id": 1,
					"result": "0x7f49b9052e509c"
				})
			}, 2000);
		} else {
			alert("Invalid Wallet Address")
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
					<h1>The Ethereum Blockchain Explorer</h1>
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
										<input
											type="text"
											value={identifier}
											className="form-control"
											placeholder={placeholder}
											onChange={(e) => setIdentifier(e.target.value)}
											aria-describedby="suffixId"
										/>
										<button
											className="input-group-text"
											id="suffixId"
											onClick={() => {
												name === "Balance" && openBalanceModal()
												name === "Transaction" && setTransactionModal(true)
												name === "Block" && setBlockModal(true)
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
				<TransactionModal modalOpen={transactionModal} setModalOpen={setTransactionModal} />
				<BlockModal modalOpen={blockModal} setModalOpen={setBlockModal} />

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
									<td>R1C1</td>
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
									<td>R1C1</td>
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

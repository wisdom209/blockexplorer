import React from 'react'
import Modal from "react-modal"
import { Utils } from 'alchemy-sdk'

const TransactionModal = ({ modalOpen, setModalOpen, details, name }) => {
	const txHash = details && details?.type === "Transaction" && details.hash

	return (
		<Modal
			className="card"
			isOpen={modalOpen}
			onRequestClose={() => setModalOpen(false)}
			ariaHideApp={false}
			style={{
				content: {
					top: "20%",
					right: "auto",
					bottom: "auto",
					left: "20%",
					width: "60vw",
					backdround: "white",

				}
			}}
		>

			<div className="card-header d-flex justify-content-between align-items-center g-2">
				<div>Transaction Receipt</div>
				<button className="text-danger" onClick={() => setModalOpen(false)}>x</button>
			</div>
			{details && details?.type === "Transaction" && details?.result ?
				<div className="card-body">
					<h6 className="card-title">Transaction: {txHash}</h6>
					<p className="card-text">From: {details.result.from}</p>
					<p className="card-text">To: {details.result.to}</p>
					<p className="card-text">Value: {Utils.formatEther(details.result.value)} eth</p>
					<p className="card-text">BlockNumber: {Number(details.result.blockNumber)}</p>
					<p className="card-text">
						Gas Limit {Utils.formatUnits(details.result.gasLimit)}</p>
					<p className="card-text">Gas Price: {Number(Utils.formatEther(details.result.gasPrice))}</p>
				</div> :

				<div
					className="spinner-border"
					role="status"
				>
					<span className="visually-hidden">Loading...</span>
				</div>
			}
		</Modal>
	)
}

export default TransactionModal

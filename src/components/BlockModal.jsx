import React from 'react'
import Modal from "react-modal"

const BlockModal = ({ modalOpen, setModalOpen, details }) => {
	
	return (
		<Modal
			className="card"
			isOpen={modalOpen}
			onRequestClose={() => setModalOpen(false)}
			ariaHideApp={false}
			style={{
				content: {
					top: "20%",
					bottom: "auto",
					right: "auto",
					left: "20%",
					width: "60vw",
					backdround: "white",

				}
			}}
		>

			<div className="card-header d-flex justify-content-between align-items-center g-2">
				<div>Block Details</div>
				<button className="text-danger" onClick={() => setModalOpen(false)}>x</button>
			</div>
			{details && details.type === "Block" ?
				<div className="card-body">
					<h6 className="card-title">Block Hash: {details.result.hash}</h6>
					<p className="card-text">Nonce: {Number(details.result.nonce)}</p>
					<p className="card-text">Block Number: {details.blockNumber}</p>
					<p className="card-text">Timestamp: {details.result.timestamp}</p>
					<p className="card-text">Miner: {details.result.miner}</p>
					<p className="card-text">Gas used: {Number(details.result.gasUsed)}</p>
					<p className="card-text">Gas Limit: {Number(details.result.gasLimit)}</p>
					<p className="card-text">Number of Transactions: {details.result.transactions.length}</p>
					<p className="card-text">Transactions: <em>{details.result.transactions.map(v => v?.hash)}</em></p>
				</div> :
				<div
					className="spinner-border  "
					role="status"
				>
					<span className="visually-hidden">Loading...</span>
				</div>

			}

		</Modal>
	)
}

export default BlockModal

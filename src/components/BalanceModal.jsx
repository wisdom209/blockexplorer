import React from 'react'
import Modal from "react-modal"
import { Utils } from 'alchemy-sdk'

const BalanceModal = ({ modalOpen, setModalOpen, details }) => {
	const balance = details.result && Utils.formatEther(details.result).substring(0, 7)
	const address = details.walletAddress

	return (
		<Modal
			className="card"
			isOpen={modalOpen}
			onRequestClose={() => setModalOpen(false)}
			ariaHideApp={false}
			style={{
				content: {
					top: "30%",
					bottom: "auto",
					right: "auto",
					left: "20%",
					width: "60vw",
					backdround: "white",

				}
			}}
		>

			<div className="card-header d-flex justify-content-between align-items-center g-2">
				<div>Account Balance</div>
				<button className="text-danger" onClick={() => setModalOpen(false)}>x</button>
			</div>
			<div className="card-body">
				<h5 className="card-title">Wallet: {address}</h5>
				{
					balance ?
						<p className="card-text">Balance: {balance} eth</p> :
						<div
							className="spinner-border"
							role="status"
						>
							<span className="visually-hidden">Loading...</span>
						</div>
				}
			</div>
		</Modal>
	)
}

export default BalanceModal

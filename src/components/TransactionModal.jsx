import React from 'react'
import Modal from "react-modal"

const TransactionModal = ({ modalOpen, setModalOpen, details }) => {
	return (
		<Modal
			className="card"
			isOpen={modalOpen}
			onRequestClose={() => setModalOpen(false)}
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

			<div class="card-header d-flex justify-content-between align-items-center g-2">
				<div>Transaction Receipt</div>
				<button class="text-danger" onClick={() => setModalOpen(false)}>x</button>
			</div>
			<div class="card-body">
				<h4 class="card-title">Transaction: {Math.round(Math.random() * 1000)}</h4>
				<p class="card-text">From: {Math.round(Math.random() * 1000)}</p>
				<p class="card-text">To: {Math.round(Math.random() * 1000)}</p>
				<p class="card-text">Value: {Math.round(Math.random() * 1000)}</p>
				<p class="card-text">BlockNumber: {Math.round(Math.random() * 1000)}</p>
				<p class="card-text">Gas Limit: {Math.round(Math.random() * 1000)}</p>
				<p class="card-text">Gas Price: {Math.round(Math.random() * 1000)}</p>
			</div>


		</Modal>
	)
}

export default TransactionModal

import React from 'react'
import Modal from "react-modal"

const BlockModal = ({ modalOpen, setModalOpen, details }) => {
	return (
		<Modal
			className="card"
			isOpen={modalOpen}
			onRequestClose={() => setModalOpen(false)}
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

			<div class="card-header d-flex justify-content-between align-items-center g-2">
				<div>Block Details</div>
				<button class="text-danger" onClick={() => setModalOpen(false)}>x</button>
			</div>
			<div class="card-body">
				<h4 class="card-title">Block Hash: {Math.round(Math.random() * 1000)}</h4>
				<p class="card-text">Nonce: {Math.round(Math.random() * 1000)}</p>
				<p class="card-text">Timestamp: {Math.round(Math.random() * 1000)}</p>
				<p class="card-text">Miner: {Math.round(Math.random() * 1000)}</p>
				<p class="card-text">Gas used: {Math.round(Math.random() * 1000)}</p>
				<p class="card-text">Gas Limit: {Math.round(Math.random() * 1000)}</p>
				<p class="card-text">Number of Transactions: 10</p>
				<p class="card-text">Transactions: <em>{Array(10).fill(Math.random() * 100).join(", ")}</em></p>
			</div>


		</Modal>
	)
}

export default BlockModal

import React, { useEffect, useState } from 'react'

const ClipBoard = ({ textToCopy }) => {
	const [copySuccess, setCopySuccess] = useState(false)

	useEffect(() => {
	  setTimeout(() => {
		setCopySuccess(false)
	  }, 1000);
	}, [copySuccess])
	

	return (
		<div
			style={{ display: 'inline-block' }}
		><img src='/clipboard_icon.png' onClick={async () => {
			await navigator.clipboard.writeText(textToCopy)
			setCopySuccess(true)
		}}
			style={{
				width: "20px",
				height: "20px",
				marginLeft: "8px",
				marginBottom: "3px"
			}}
			/>
			<span style={{ fontSize: "12px", fontFamily: 'monospace' }}>{copySuccess && "copied!"}</span>
		</div>
	)
}

export default ClipBoard	

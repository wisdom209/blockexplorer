import React from 'react'

const IdentifierInput = ({ placeholder, identifier, setIdentifier }) => {
	return (
		<input
			type="text"
			value={identifier}
			className="form-control"
			placeholder={placeholder}
			onChange={(e) => setIdentifier(e.target.value)}
			aria-describedby="suffixId"
		/>
	)
}

export default IdentifierInput

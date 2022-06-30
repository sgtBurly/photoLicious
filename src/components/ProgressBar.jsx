import React from 'react'

const ProgressBar = ({progress}) => {
	
    /*
    power-black: #0e0c01,
	slate: #26282a,
	outer-space: #494848,
	granite: #676767,
	soft-gray: #bbbbbb,
	vanilla: #e7ddd2,
	soft-white: #fbfaf5,
    */

	const Parentdiv = {
		height: '3rem',
		width: '100%',
		backgroundColor: '#494848',
		borderRadius: 5,
	}
	
	const Childdiv = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
		height: '100%',
		width: `${progress}%`,
		backgroundColor: '#bbbbbb',
        borderRadius: 5,
		textAlign: 'center'
	}
	
	const progresstext = {
		color: '#fbfaf5',
		fontWeight: 900
	}
		
	return (
	<div style={Parentdiv}>
        <div style={Childdiv}>
            <span style={progresstext}>{`${progress}%`}</span>
        </div>
	</div>
	)
}

export default ProgressBar;

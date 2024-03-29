import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
	return (
		<div>
			<p className ='light-pink f3'>
				{'This magic brain will detect faces in your pictures. Give it a try! '}
			</p>
			<div className ='center'>
				<div className='form center pa3 br2 shadow-5'>
					<input className ='f4 pa2 w-70 center' type= 'text' onChange={onInputChange}/>
					<button 
					className ='f4 grow w-30 link ph3 pv2 dib white bg-light-purple'
					onClick = {onButtonSubmit} > 
						Detect 
					</button>
				</div>
			</div>	
		</div>
	);
}

export default ImageLinkForm;
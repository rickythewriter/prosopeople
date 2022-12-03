import React, { useContext, useEffect } from 'react';
import { ImageModalContext } from '../../../contexts/ImageModalContext';
import './ImageModal.css'

const ImageModal = () => {

    const { image, closeImageModal } = useContext(ImageModalContext);

    useEffect(() => {
        const onPressKey = e => {
            switch (e.key){
                case "Escape":
                    closeImageModal();
                    break;
                default:
                    break;
            }
        }
        window.addEventListener('keydown', onPressKey)
    }, [])

    return (
        <div className='modal-background' id='image-modal' onClick={closeImageModal}>
            <div id='photo-frame' onClick={ e => e.stopPropagation() }>
                <img id='modal-image' src={image.signed_url}/>
            </div>
        </div>
    )
}

export default ImageModal;
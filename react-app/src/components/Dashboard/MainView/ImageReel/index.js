import React from 'react';
import ImageArea from './ImageArea';
import './ImageReel.css'

const ImageReel = () => {

    // save image objects
    // save range of image objects for display on filmstrip
    // save functions for prev and next to be props for left and right arrows

    return (
        <div id='reel'>
            <div className='nav-arrow' id='left-arrow'>◀</div>
            <div id="filmstrip">
                <ImageArea isAddButton={true}/>
                <ImageArea />
                <ImageArea />
            </div>
            <div className='nav-arrow' id='right-arrow'>▶</div>
        </div>
    )
}

export default ImageReel;
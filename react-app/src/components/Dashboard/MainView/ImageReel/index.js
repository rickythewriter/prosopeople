import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import ImageArea from './ImageArea';
import { loadImages } from '../../../../store/image';
import './ImageReel.css'

const ADD_BUTTON_PLACEHOLDER = {isAddButton: true};

const ImageReel = () => {

    const entry = useSelector(state => state.entry);
    const images = useSelector(state => state.images);
    const imageList = Object.values(images).sort((a,b) => new Date(b.created_at) - new Date(a.created_at))
    const [reelStartIdx, setReelStartIdx] = useState(0);    

    const dispatch = useDispatch();

    /* When an entry is chosen... */
    useEffect(() => {
        const hasEntry = Object.keys(entry).length > 0
        if (hasEntry) {
            dispatch(loadImages(entry));
            setReelStartIdx(0);
        }
    }, [entry])

    const addButton = (<ImageArea isAddButton={true} />)
    const filledImageAreas = imageList.map((image) => (<ImageArea image={image} />))
    const imageAreaList = [addButton, ...filledImageAreas]

    function getVisibleImageAreas(reelStartIdx, numImageAreas=3) {
        const dummyImageArea = (<ImageArea />)
        const visibleFilmStrip = imageAreaList.slice(reelStartIdx, reelStartIdx + numImageAreas)
        while (visibleFilmStrip.length < numImageAreas) {
            visibleFilmStrip.push(dummyImageArea);
        }
        return visibleFilmStrip;
    }

    function slideReel(isSlidingToNext, numImageAreas = 1) {

        const PREV = 0;
        const NEXT = 1;
        
        const direction = isSlidingToNext ? NEXT : PREV;
        
        switch(direction) {
            case NEXT:
                const idxNext = reelStartIdx + numImageAreas;
                const idxEndOfReel = imageList.length;
                if (idxNext <= idxEndOfReel) setReelStartIdx(idxNext);
                break;
            case PREV:
                const idxPrev = reelStartIdx - numImageAreas;
                if (idxPrev >= 0) setReelStartIdx(idxPrev);
                break;
            default:
                break;
        }
    }

    return (
        <>
            <div id='reel'>
                <div 
                    className='nav-arrow' 
                    id='left-arrow'
                    onClick={() => slideReel(0)}
                >
                    ◀
                </div>
                <div id="filmstrip">
                    {getVisibleImageAreas(reelStartIdx)}
                </div>
                <div 
                    className='nav-arrow' 
                    id='right-arrow'
                    onClick={() => slideReel(1)}
                >
                    ▶
                </div>
            </div>
        </>
    )
}

export default ImageReel;
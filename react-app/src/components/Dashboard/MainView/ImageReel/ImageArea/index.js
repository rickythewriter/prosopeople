import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uploadImage, createImage } from '../../../../../store/image'
import './ImageArea.css'

const ImageArea = ({image=null, isAddButton=false}) => {

    const user = useSelector(state => state.session.user);
    const person = useSelector(state => state.person);
    const entry = useSelector(state => state.entry);

    const dispatch = useDispatch()

    const changeHandler = async e => {

        /* Upload image to AWS. Get file name. */
        const image = e.target.files[0]
        const jsonFilename = await dispatch(uploadImage(image));
        const filename = jsonFilename.filename;

        /* Add image to database */
        const payload = {
            filename,
            caption: '',
            entry_id: entry.id,
            person_id: person.id,
            user_id: user.id,
        }
        dispatch(createImage(payload))
    }

    if (image) {
        return (
            <div className='image-area'>
                <img className='filmstrip-image' src={image.signed_url} alt={image.caption}/>
            </div>
        )
    }

    if (isAddButton){
        return (
            <div className='image-area upload-form'>
                <label htmlFor='upload-image' id='upload-label'>
                    <input
                        type='file'
                        id='upload-image'
                        name='image'
                        accept='image/jpg, image/jpeg, image/png, image/gif'
                        onChange={changeHandler}
                    />
                    +
                </label>
            </div>
        )
    }   

    return (
        <div className='image-area placeholder-image-area'>
        </div>
    )
    
}

export default ImageArea;
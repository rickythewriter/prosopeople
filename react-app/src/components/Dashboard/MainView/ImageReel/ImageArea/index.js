import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uploadImage, createImage } from '../../../../../store/image'
import './ImageArea.css'

const ImageArea = ({isAddButton=false}) => {

    const user = useSelector(state => state.session.user);
    const person = useSelector(state => state.person);
    const entry = useSelector(state => state.entry);
    const [caption, setCaption] = useState('');
    const [errors, setErrors] = useState([])

    const dispatch = useDispatch()

    const changeHandler = async e => {
        const image = e.target.files[0]
        const jsonFilename = await dispatch(uploadImage(image));
        const filename = jsonFilename.filename;

        const payload = {
            filename,
            caption,
            entry_id: entry.id,
            person_id: person.id,
            user_id: user.id,
        }
        console.log(payload);

        const imageWithCaption = await dispatch(createImage(payload))
        setErrors([])
    }

    if (isAddButton) {
        return (
            <div className='image-area' id='upload-form'>
                <label for='upload-image' id='upload-label'>
                    <input
                        type='file'
                        id='upload-image'
                        name='image'
                        onChange={changeHandler}
                    />
                    +
                </label>
            </div>
        )
    }
    return (
        <div className='image-area' id='placeholder-image-area'>
            {/* square */}
        </div>
    )
}

export default ImageArea;
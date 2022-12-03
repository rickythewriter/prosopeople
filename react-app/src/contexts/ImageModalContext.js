import { createContext, useState } from "react";
import { useSelector } from "react-redux";

export const ImageModalContext = createContext({
    seeImageModal: null,
    openImageModal: null,
    closeImageModal: null,
    image: {
        caption: null,
        created_at: null,
        filename: null,
        id: null,
        signed_url: null,
    },
    selectImage: null,
})

export function ImageModalContextProvider({children}) {
    const [image, setImage] = useState(null);
    const [seeImageModal, setSeeImageModal] = useState(false);

    const openImageModal = () => {
        setSeeImageModal(true);
    }

    const closeImageModal = () => {
        setSeeImageModal(false);
    }

    const selectImage = (img) => {
        setImage(img);
    }

    return (
        <ImageModalContext.Provider value={{
            seeImageModal,
            openImageModal,
            closeImageModal,
            image,
            selectImage,
        }}>
            {children}
        </ImageModalContext.Provider>
    );
}
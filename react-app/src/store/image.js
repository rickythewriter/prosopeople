/*---------------------------------------------------------------------/
    Dispatch Functions
/---------------------------------------------------------------------*/

export const uploadImage = (image) => async dispatch => {
    const form = new FormData();
    form.append('image', image);

    console.log('body: ', image);
    const res = await fetch(`/api/images/upload`, {
        method: 'POST',
        body: form,
    });
    const data = await res.json();
    if (res.ok) {
        return data
    }
}

export const createImage = (newImageWithCaption) => async dispatch => {

    const res = await fetch(`/api/images/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newImageWithCaption),
    });
    const data = await res.json();
}
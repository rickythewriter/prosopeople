/*----------------------------------------------------------------------/
    Returns error message associated with field,
        by identifying error from event object's errors array.
    Assumes 
        there is only one error returned per field , and
        that the error element is formatted "<fieldName> : <error>".
/----------------------------------------------------------------------*/

export default function formatValidationError(errorsFromEvent, fieldName) {
    const errorWithFieldNameArr = errorsFromEvent.filter(error => error.includes(`${fieldName} : `));
    const errorWithFieldNameStr = errorWithFieldNameArr.toString();
    const errorWithoutFieldName = errorWithFieldNameStr.split(': ')[1];
    return errorWithoutFieldName;
}
import './submitModal.css'

const SubmitEntriesModal = (props) => {
    const visibleFlag = props.visibleFlag
    const handleCloseClick = props.handleCloseClick

    return(
        <>
        {visibleFlag && <div className='shadow'></div>}
        {visibleFlag &&
            <div className='modal'>
                <br/><br/>
                <h3>You have successfully submitted your rankings.</h3>
                <p>If you need to make any changes, do so before the first episode premieres. This page will be updated with teams after the first episode has premiered.</p>
                <button className='close-button' onClick={()=>handleCloseClick()}>Close</button>
            </div>}
        </>
        
    )
}

export default SubmitEntriesModal;
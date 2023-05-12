import './submitModal.css'
import { Link } from 'react-router-dom';

const SubmitEntriesModal = (props) => {
    const visibleFlag = props.visibleFlag
    const currUser = props.currUser;
    const handleCloseClick = props.handleCloseClick
    const basename = process.env.PUBLIC_URL || '';

    return(
        <>
        {visibleFlag && <div className='shadow'></div>}
        {visibleFlag &&
            <div className='modal'>
                <br/><br/>
                <h3>You have successfully submitted your rankings.</h3>
                <p>If you need to make any changes, do so before the first episode premieres. This page will be updated with teams after the first episode has premiered.</p>
                <Link to={`/${currUser.username}-selection`}><button className='close-button' onClick={()=>handleCloseClick()}>Close</button></Link>
            </div>}
        </>
        
    )
}

export default SubmitEntriesModal;
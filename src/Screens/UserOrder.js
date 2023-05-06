import { Table, TableCell, TableRow } from '@mui/material';
import './UserOrder.css'
import { Link } from 'react-router-dom';


const UserOrder = (props) => {
    const currUser = props;

    const queens = [
        <img src={require("../Images/queens/alexis.jpeg")} className="order-icon"/>,
        <img src={require("../Images/queens/darienne.jpeg")} className="order-icon"/>,
        <img src={require("../Images/queens/heidi.jpeg")} className="order-icon"/>,
        <img src={require("../Images/queens/jaymes.jpeg")} className="order-icon"/>,
        <img src={require("../Images/queens/jessica.jpeg")} className="order-icon"/>,
        <img src={require("../Images/queens/jimbo.jpeg")} className="order-icon"/>,
        <img src={require("../Images/queens/kahana.jpeg")} className="order-icon"/>,
        <img src={require("../Images/queens/kandy.jpeg")} className="order-icon"/>,
        <img src={require("../Images/queens/kasha.jpeg")} className="order-icon"/>,
        <img src={require("../Images/queens/lala.jpeg")} className="order-icon"/>,
        <img src={require("../Images/queens/monica.jpeg")} className="order-icon"/>,
        <img src={require("../Images/queens/naysha.jpeg")} className="order-icon"/>,
    ]

    const queenNames = [
        "Alexis Michelle", 
        "Darienne Lake",
        "Heidi N Closet",
        "Jaymes Mansfield",
        "Jessica Wild",
        "Jimbo",
        "Kahanna Montrese",
        "Kandy Muse",
        "Mrs. Kasha Davis",
        "LaLa Ri",
        "Monica Beverly Hillz",
        "Naysha Lopes"
    ]

    const selectedQueens = currUser.currUser.draftOrder;

    let queenImgs = []

    const renderQueens = () => {
        selectedQueens.forEach((element,index) => {
            let queenBlock = (
                <TableRow className='queen-block'>
                    <TableCell align="right"><p className='rank-cell'>{index+1}</p></TableCell>
                    <TableCell className="drafted-queen">{queens[element]}</TableCell>
                    <TableCell><p className='drafted-label'><b>{queenNames[element]}</b></p></TableCell>
                </TableRow>
            )
            queenImgs.push(queenBlock);
        });
    }
    return (
        <>
        <div className="order-banner">
            <p>Your draft order is as shown below:</p>
        </div>
        {renderQueens()}
        <div className='order-frame'>
            <Table>
                {queenImgs}
            </Table>
        </div>
        <p>If you want redo your selection, please click <Link to="/all-stars/makeSelection">here.</Link></p>
        </>
    )
}

export default UserOrder;
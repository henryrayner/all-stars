import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Selection.css';
import SubmitEntriesModal from '../Modals/SubmitEntriesModal';


const SelectionScreen = (props) => {
    const [submitModalFlag, setSubmitModalFlag] = useState(false)
    const [submitEnabledFlag, setSubmitEnabledFlag] = useState(false)

    const queens = [
        <img src={require("../Images/queens/alexis.jpeg")} className="icon"/>,
        <img src={require("../Images/queens/darienne.jpeg")} className="icon"/>,
        <img src={require("../Images/queens/heidi.jpeg")} className="icon"/>,
        <img src={require("../Images/queens/jaymes.jpeg")} className="icon"/>,
        <img src={require("../Images/queens/jessica.jpeg")} className="icon"/>,
        <img src={require("../Images/queens/jimbo.jpeg")} className="icon"/>,
        <img src={require("../Images/queens/kahana.jpeg")} className="icon"/>,
        <img src={require("../Images/queens/kandy.jpeg")} className="icon"/>,
        <img src={require("../Images/queens/kasha.jpeg")} className="icon"/>,
        <img src={require("../Images/queens/lala.jpeg")} className="icon"/>,
        <img src={require("../Images/queens/monica.jpeg")} className="icon"/>,
        <img src={require("../Images/queens/naysha.jpeg")} className="icon"/>,
    ]

    const overlayNumbers = [
        <img src={require("../Images/numbers/1.png")} className="overlay" id="overlay1"/>,
        <img src={require("../Images/numbers/2.png")} className="overlay" id="overlay2"/>,
        <img src={require("../Images/numbers/3.png")} className="overlay" id="overlay3"/>,
        <img src={require("../Images/numbers/4.png")} className="overlay" id="overlay4"/>,
        <img src={require("../Images/numbers/5.png")} className="overlay" id="overlay5"/>,
        <img src={require("../Images/numbers/6.png")} className="overlay" id="overlay6"/>,
        <img src={require("../Images/numbers/7.png")} className="overlay" id="overlay7"/>,
        <img src={require("../Images/numbers/8.png")} className="overlay" id="overlay8"/>,
        <img src={require("../Images/numbers/9.png")} className="overlay" id="overlay9"/>,
        <img src={require("../Images/numbers/10.png")} className="overlay" id="overlay10"/>,
        <img src={require("../Images/numbers/11.png")} className="overlay" id="overlay11"/>,
        <img src={require("../Images/numbers/12.png")} className="overlay" id="overlay12"/>]

    const pickedNumbers = [
            <img src={require("../Images/numbers/1.png")} className="picked" id="overlay1"/>,
            <img src={require("../Images/numbers/2.png")} className="picked" id="overlay2"/>,
            <img src={require("../Images/numbers/3.png")} className="picked" id="overlay3"/>,
            <img src={require("../Images/numbers/4.png")} className="picked" id="overlay4"/>,
            <img src={require("../Images/numbers/5.png")} className="picked" id="overlay5"/>,
            <img src={require("../Images/numbers/6.png")} className="picked" id="overlay6"/>,
            <img src={require("../Images/numbers/7.png")} className="picked" id="overlay7"/>,
            <img src={require("../Images/numbers/8.png")} className="picked" id="overlay8"/>,
            <img src={require("../Images/numbers/9.png")} className="picked" id="overlay9"/>,
            <img src={require("../Images/numbers/10.png")} className="picked" id="overlay10"/>,
            <img src={require("../Images/numbers/11.png")} className="picked" id="overlay11"/>,
            <img src={require("../Images/numbers/12.png")} className="picked" id="overlay12"/>]

    const [currOverlayImage, setCurrOverlayImage] = useState(overlayNumbers[0]);
    const [currCount, setCurrCount] = useState(1);
    const [clickableFlags, setClickableFlags] = useState([true, true, true, true, true, true, true, true, true, true, true, true])
    const [overlays, setOverlays] = useState([currOverlayImage,currOverlayImage,currOverlayImage,currOverlayImage,currOverlayImage,currOverlayImage,currOverlayImage,currOverlayImage,currOverlayImage,currOverlayImage,currOverlayImage, currOverlayImage])
    const [actionQueue, setActionQueue] = useState([])
    const [selections, setSelections] = useState([]);
    const [draftOrder, setDraftOrder] = useState([]);
    const {currUser, setCurrUser} = props;

    const handleClick = (number) => {
        if(clickableFlags[number]){
            const tempOverlays = Array.from(overlays);
            tempOverlays[number] = pickedNumbers[currCount-1];
            setOverlays(tempOverlays)

            const tempFlags = Array.from(clickableFlags);
            tempFlags[number] = false;
            setClickableFlags(tempFlags)

            setCurrCount(currCount+1)
            setCurrOverlayImage(overlayNumbers[currCount]);

            actionQueue.push(number)
            setSelections([...selections, number]);
            setDraftOrder([...draftOrder,number])
        }
        
        setSubmitEnabledFlag(currCount === 12)
    }

    const undoMove = () => {
        var number = actionQueue.pop();
        selections.pop();

        const tempFlags = Array.from(clickableFlags);
        tempFlags[number] = true;
        setClickableFlags(tempFlags)

        setCurrCount(currCount-1);
        const tempOverlays = Array.from(overlays);
        tempOverlays[number] = pickedNumbers[currCount];
        setOverlays(tempOverlays)

        setCurrOverlayImage(overlayNumbers[currCount-2]);
        setSubmitEnabledFlag(currCount-2 === 12)
        draftOrder.pop();
    }

    const UndoButton = () => {
        if(currCount > 1){
            return <img src={require("../Images/undo-arrow.png")} className="undo" onClick={()=>undoMove()}/>
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        
        var newBody = {username:currUser.username, password: currUser.password, draftOrder: draftOrder};
        localStorage.setItem('user', JSON.stringify(newBody))

        await fetch(`https://all-stars-8-henry-y5e3xhjq5q-ue.a.run.app/update/${currUser.username}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: 
            JSON.stringify(newBody),
        })

        setSubmitModalFlag(true)
        setTimeout(5000);
    }

    const handleModalClose = () => {
        
    }


    return (
        <>
        <div className="selection-banner">
            <p>Make Your Selection</p>
        </div>
        <p className='instructions-top'>Rank the All-Stars by clicking on their pictures in your desired draft order, from most preferred to least preferred pick. </p>
        <p className='instructions-bottom'>Once all entries have been submitted for the league, assignments will be made using a snake draft algorithm.</p>
        <div className="all-stars">
            <div className="icon-container" onClick={() => handleClick(0)}>
                {queens[0]}
                {clickableFlags[0] ? currOverlayImage : overlays[0]}
                <label>Alexis Michelle</label>
            </div>
            <div className="icon-container" onClick={() => handleClick(1)}>
                {queens[1]}
                {clickableFlags[1] ? currOverlayImage : overlays[1]}
                <label>Darienne Lake</label>
            </div>
            <div className="icon-container" onClick={()=>handleClick(2)}>
                {queens[2]}
                {clickableFlags[2] ? currOverlayImage : overlays[2]}
                <label>Heidi N Closet</label>
            </div>
            <div className="icon-container" onClick={()=>handleClick(3)}>
                {queens[3]}
                {clickableFlags[3] ? currOverlayImage : overlays[3]}
                <label>Jaymes Mansfield</label>
            </div>
            <div className="icon-container" onClick={()=>handleClick(4)}>
                {queens[4]}
                {clickableFlags[4] ? currOverlayImage : overlays[4]}
                <label>Jessica Wild</label>
            </div>
            <div className="icon-container" onClick={()=>handleClick(5)}>
                {queens[5]}
                {clickableFlags[5] ? currOverlayImage : overlays[5]}
                <label>Jimbo</label>
            </div>
            <br/>
            <div className="icon-container" onClick={()=>handleClick(6)}>
                {queens[6]}
                {clickableFlags[6] ? currOverlayImage : overlays[6]}
                <label>Kahanna Monstrese</label>
            </div>
            <div className="icon-container" onClick={()=>handleClick(7)}>
                {queens[7]}
                {clickableFlags[7] ? currOverlayImage : overlays[7]}
                <label>Kandy Muse</label>
            </div>
            <div className="icon-container" onClick={()=>handleClick(8)}>
                {queens[8]}
                {clickableFlags[8] ? currOverlayImage : overlays[8]}
                <label>Mrs. Kasha Davis</label>
            </div>
            <div className="icon-container" onClick={()=>handleClick(9)}>
                {queens[9]}
                {clickableFlags[9] ? currOverlayImage : overlays[9]}
                <label>Lala Ri</label>
            </div>
            <div className="icon-container" onClick={()=>handleClick(10)}>
                {queens[10]} 
                {clickableFlags[10] ? currOverlayImage : overlays[10]}
                <label>Monica Beverly Hillz</label>
            </div>
            <div className="icon-container" onClick={()=>handleClick(11)}>
                {queens[11]} 
                {clickableFlags[11] ? currOverlayImage : overlays[11]}
                <label>Naysha Lopez</label>
            </div>

            <button className={"submit" + (submitEnabledFlag ? " enabled" : " disabled")} disabled={!submitEnabledFlag} onClick={(e)=>handleSubmit(e)}>Submit</button>
            <UndoButton/>
        </div>
        <SubmitEntriesModal visibleFlag={submitModalFlag} handleCloseClick={()=>setSubmitModalFlag(!submitModalFlag)} currUser={currUser}/>
        </>
    );
}

export default SelectionScreen;
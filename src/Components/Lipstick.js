
const Lipstick = () => {
    return(
        <div className="image-container">
            <img src={require('../Images/lipstick.png')} alt="My Image" width="125px"/>
            <div className="text-overlay">My Text Overlay</div>
        </div>
    )
}

export default Lipstick;
import './Lipstick.css';
import { useRef, useEffect } from 'react';

export default function Lipstick(props) {
    const containerRef = useRef(null);
    const imgRef = useRef(null);
    const h1Ref = useRef(null);
  
    useEffect(() => {
        const container = containerRef.current;
        const img = imgRef.current;
        const h1 = h1Ref.current;
      
        const containerLeft = container.offsetLeft;
        const imgWidth = img.offsetWidth;
        const h1Width = h1.offsetWidth;
        const h1MarginLeft = parseFloat(window.getComputedStyle(h1).marginLeft);
      
        const textLeft = containerLeft + imgWidth - h1Width + h1MarginLeft - 85;
        h1.style.left = `${textLeft}px`;
        console.log({textLeft})
      }, []);
  
    return(
        <div ref={containerRef} className="container">
            <img ref={imgRef} src={require("../Images/lipstick.png")} alt="Lipstick" width="125px" />
            <div className="img-container">
                <h1 ref={h1Ref} id="lipstick-label">{props.text}</h1>
            </div>
        </div>
    )
}
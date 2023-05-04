import './Lipstick.css';
import { useRef, useEffect } from 'react';

export default function Lipstick(props) {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const h1Ref = useRef(null);
  

  useEffect(() => {
    const h1 = h1Ref.current;
    const container = containerRef.current;

    
    
    if (h1 && container) {
      const containerWidth = container.offsetWidth;
      const h1Width = h1.offsetWidth;
      const text = props.text;
      const span = document.createElement("span");
      span.innerText = text;
      document.body.appendChild(span);
      const textWidth = span.offsetWidth;
      document.body.removeChild(span);
      
      if (textWidth > containerWidth - 70) {
        const fontSize = Math.floor((containerWidth - 89) / textWidth * 16) * 2 + "px";
        setTimeout(() => {
          h1.style.fontSize = fontSize;

          // create a new span to measure the updated text width
          const updatedSpan = document.createElement("span");
          updatedSpan.style.fontSize = fontSize;
          updatedSpan.innerText = text;
          document.body.appendChild(updatedSpan);
          const updatedTextWidth = updatedSpan.offsetWidth;
          document.body.removeChild(updatedSpan);
          h1.style.left = `${Math.floor((85-updatedTextWidth)/2)+36}px`
        }, 0);
      } else {
          h1.style.fontSize = "16px";
          // create a new span to measure the updated text width
          const updatedSpan = document.createElement("span");
          updatedSpan.style.fontSize = "16px";
          updatedSpan.innerText = text;
          document.body.appendChild(updatedSpan);
          const updatedTextWidth = updatedSpan.offsetWidth;
          document.body.removeChild(updatedSpan);
          h1.style.left = `${Math.floor((85-updatedTextWidth)/2)+36}px`
      }

    }

  }, [props.text]);

  return (
    <div ref={containerRef} className="lipstick-container">
        <img
          ref={imgRef}
          src={require('../Images/lipstick.png')}
          alt="Lipstick"
          width={125}
          className="image"
        />
        <h1 ref={h1Ref} id="lipstick-label">
          <b>{props.text}</b>
        </h1>
    </div>
  );
}

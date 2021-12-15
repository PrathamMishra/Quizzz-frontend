import React, { useRef, useState } from 'react'
import Webcam from "react-webcam";

const videoConstraints = {
    width: 220,
    height: 200,
    facingMode: "user"
};

function GetImage({faceapi, setFaceMatcher, setImg}) {
    const webcamRef = useRef(null);
    const [image,setImage] = useState("");
    const [text,setText] = useState("Make sure your face has proper amount of light!");
    const imgRef= useRef(null);

    const capture = React.useCallback(
        async () => {
          try{
            const imageSrc = webcamRef.current.getScreenshot();
            setImg(imageSrc);
            setImage(imageSrc);
            const faces = await faceapi.detectAllFaces(imgRef.current).withFaceLandmarks().withFaceDescriptors();
            if(faces.length>1)setText("More than 1 person");
            if(faces.length===0)setText("No Face found");
            else{
                setText("One person found");
                setFaceMatcher(new faceapi.FaceMatcher(faces, 0.4));
            }
          }
          catch(e){
            console.log(e);
          }
        },
        [webcamRef]
    );
    return (
    <div>
        <h1>{text}</h1>
        <Webcam
            audio={false}
            height={200}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={220}
            videoConstraints={videoConstraints}
        />
        <button className="btn btn-primary" onClick={(e)=>{e.preventDefault();capture();}}>
            Capture
        </button>
        <img src = {image} alt="Your Photo" ref={imgRef}/>
    </div>
    )
}

export default GetImage
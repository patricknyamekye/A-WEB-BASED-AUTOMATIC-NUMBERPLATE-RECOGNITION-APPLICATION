import React, { useRef, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Camerapage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleOpenCamera = async () => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (err) {
        console.error("Error accessing the camera: ", err);
      }
    };

    await MySwal.fire({
      title: 'Camera',
      html: (
        <div>
          <video 
            ref={videoRef} 
            width="640" 
            height="480" 
            autoPlay 
            onLoadedMetadata={handleLoadedMetadata}
          />
          <button onClick={capture}>Capture</button>
        </div>
      ),
      didOpen: () => {
        getUserMedia();
      },
      showConfirmButton: false,
      showCloseButton: true,
      width: '700px'
    });
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const capture = async () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    
    const dataUrl = canvas.toDataURL('image/png');
    console.log(dataUrl);

    const blob = await fetch(dataUrl).then(res => res.blob());

    const formData = new FormData();
    formData.append('image', blob, 'captured.png');

    try {
      const response = await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Image uploaded successfully:', response.data);
    } catch (err) {
      console.error('Error uploading image:', err);
    }
  };

  return (
    <div>
      <button onClick={handleOpenCamera}>Open Camera</button>
      <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }} />
    </div>
  );
};

export default Camerapage;

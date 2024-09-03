import React, { useState, useRef } from 'react';
import axios from 'axios';
import './camerapage.css'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'


const CameraApp = () => {
    const navigate = useNavigate()
  const [stream, setStream] = useState(null);
  const [imageDataUrl, setImageDataUrl] = useState('');
  const [file, setFile] = useState(null);
  const [inputText, setInputText] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const cardRef = useRef(null);

  const handleOpenCamera = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(mediaStream => {
          setStream(mediaStream);
          videoRef.current.srcObject = mediaStream;
          videoRef.current.style.display = 'block';
          document.getElementById('takePictureButton').style.display = 'inline-block';
          document.getElementById('openCameraButton').style.display = 'none';

          if (cardRef.current) {
            cardRef.current.style.display = 'none';
          }
        })
        .catch(error => {
          console.error('Error accessing webcam:', error);
          alert('Could not access the webcam. Please check permissions and try again.');
        });
    } else {
      alert('Sorry, your device does not support accessing the webcam.');
    }
  };

  const handleTakePicture = () => {
    const context = canvasRef.current.getContext('2d');
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const imageData = canvasRef.current.toDataURL('image/png');
    setImageDataUrl(imageData);

    stream.getTracks().forEach(track => track.stop());
    videoRef.current.style.display = 'none';
    document.getElementById('takePictureButton').style.display = 'none';
    document.getElementById('openCameraButton').style.display = 'inline-block';

    document.getElementById('imageContainer').style.display = 'flex';
    document.getElementById('sendButton').style.display = 'block';
  };

  const handleCloseImage = () => {
    document.getElementById('imageContainer').style.display = 'none';
    document.getElementById('sendButton').style.display = 'none';
  };



  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleSendImage = async () => {
    try {
      // Show the loader
      Swal.fire({
        title: 'Processing...',
        text: 'Please wait while we process your request.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
  
      const formData = new FormData();
      formData.append('image', dataURLtoFile(imageDataUrl, 'captured_image.png'));
      if (file) {
        formData.append('file', file);
      }
      formData.append('text', inputText);
  
      const response = await axios.post('http://localhost:8000/api/img-gemini', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      // Close the loader
      Swal.close();
  
      if (response.status === 200) {
        console.log(response);
        navigate('/logpage', { state: { data: response.data.data[0] } });
      }
    } catch (error) {
      if (error.response) {
        // Check if error.response is defined before accessing status
        if (error.response.status === 404) {
          Swal.fire({
            icon: 'error',
            text: 'Invalid Number Plate'
          });
        } else if (error.response.status === 500) {
          Swal.fire({
            icon: 'error',
            text: 'Internal Server Error'
          });
        } else {
          Swal.fire({
            icon: 'error',
            text: `Error submitting data: ${error.message}`
          });
        }
      } else {
        // Handle cases where error.response is undefined (e.g., network errors)
        Swal.fire({
          icon: 'error',
          text: 'Network error or server is unreachable. Please try again later.'
        });
      }
        console.error('Error uploading file:', error);
        
       
    }
  };

  ///////////////////////
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
  
    if (!file) {
      Swal.fire({
        icon: 'warning',
        title: 'No File Selected',
        text: 'Please select a file first.',
      });
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      // Show loading indicator
      Swal.fire({
        title: 'Validating your image...',
        text: 'Please wait while analysing the validity.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
  
      const response = await axios.post('http://localhost:8000/api/img-gemini', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        console.log(response);
        Swal.fire({
          icon: 'success',
          title: 'Valid',
          text: 'valid Ghanaian number plate detected!',
        });
        navigate('/logpage', { state: { data: response.data.data[0] } });
      }
    } catch (error) {
      
    if (error.response) {
      // Check if error.response is defined before accessing status
      if (error.response.status === 404) {
        Swal.fire({
          icon: 'error',
          text: 'Invalid Number Plate'
        });
      } else if (error.response.status === 500) {
        Swal.fire({
          icon: 'error',
          text: 'Internal Server Error'
        });
      } else {
        Swal.fire({
          icon: 'error',
          text: `Error submitting data: ${error.message}`
        });
      }
    } else {
      // Handle cases where error.response is undefined (e.g., network errors)
      Swal.fire({
        icon: 'error',
        text: 'Network error or server is unreachable. Please try again later.'
      });
    }
      console.error('Error uploading file:', error);
      
     
  
     
    }
  };

///
const [option, setOption] = useState('AS');
const [text, setText] = useState('');
const [year, setYear] = useState('24');

const generateYearOptions = () => {
  const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)); // A-Z
  const numbers = Array.from({ length: 16 }, (_, i) => (i + 9).toString().padStart(2, '0')); // 09-24
  return [...letters, ...numbers];
};



const handleOptionChange = (event) => setOption(event.target.value);
const handleTextChange = (event) => setText(event.target.value);
const handleYearChange = (event) => setYear(event.target.value);

const formatInput = () => {
  return `${option} ${text}-${year}`;
};


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!option || !text || !year) {
    Swal.fire({icon:'question', text:'Please enter some text.'});
    return;
  }

  const formattedInput = formatInput();

  try {
          // Show loading indicator
          Swal.fire({
            title: 'Validating your image...',
            text: 'Please wait while analysing the validity.',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
      
    const response = await axios.post('http://localhost:8000/api/numberinput', {
      number: formattedInput
    });
 // Close the loading indicator
    Swal.close();

    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Valid',
        text: 'Valid Ghanaian number plate detected!',
      });
      console.log(response);
      navigate('/logpage', { state: { data: response.data.data[0] } });
    } else if (response.status === 404) {
      console.log(response);
      Swal.fire('Invalid Number Plate');
    }
  } catch (error) {
    console.error('Error submitting data:', error);

    if (error.response) {
      // Check if error.response is defined before accessing status
      if (error.response.status === 404) {
        Swal.fire({
          icon: 'error',
          text: 'Invalid Number Plate'
        });
      } else if (error.response.status === 500) {
        Swal.fire({
          icon: 'error',
          text: 'Internal Server Error'
        });
      } else {
        Swal.fire({
          icon: 'error',
          text: `Error submitting data: ${error.message}`
        });
      }
    } else {
      // Handle cases where error.response is undefined (e.g., network errors)
      Swal.fire({
        icon: 'error',
        text: 'Network error or server is unreachable. Please try again later.'
      });
    }
  }
};




// const handleSubmit = async (e) => {
//   e.preventDefault();
//   if (!option || !text || !year ) {
//       alert('Please enter some text.');
//       return;
//   }
//   const formattedInput = formatInput();
//   try {
//     const response = await axios.post('http://localhost:8000/api/numberinput', {
//       number: formattedInput
//     });
//     if(response.status === 200){
//       console.log(response) 
//          navigate('/logpage', { state: { data: response.data.data[0]}});  
//         }else if(response.status === 404){
//           console.log(response)   
//           Swal.fire('Invalid Number Plate')
//           }
//         }
//    catch (error) {
//     console.error('Error submitting data:', error);
//      if(error.response.status === 404){
//       Swal.fire({
//         icon:'error',
//         text:'Invalid Number Plate'
//       })
//     }
//     if(error.response.status === 500){
//       Swal.fire({
//         icon:'error',
//         text:'Internal Server Error'
//       })
//     }
//     Swal.fire({
//       icon:'error',
//       text:'Error submitting data:'}
//     )
//   }
// };
const handlelogout = () =>{
  localStorage.clear("serviceId")
  navigate('/')
}
  return (
    
    <div className='back-g'>
    <div onClick={handlelogout} className='logout'>Logout</div>

    <section className="front-page">

      <div className="input-container2">
      <select value={option} onChange={handleOptionChange} className="dropdown2">
      <option value="AC">AC</option>
      <option value="AE">AE</option>
      <option value="AK">AK</option>
      <option value="AP">AP</option>
      <option value="AS">AS</option>
      <option value="AW">AW</option>
      <option value="BA">BA</option>
      <option value="BR">BR</option>
      <option value="BS">BS</option>
      <option value="BT">BT</option>
      <option value="BW">BW</option>
      <option value="CR">CR</option>
      <option value="CS">CS</option>
      <option value="EN">EN</option>
      <option value="ER">ER</option>
      <option value="ES">ES</option>
      <option value="GC">GC</option>
      <option value="GE">GE</option>
      <option value="GL">GL</option>
      <option value="GM">GM</option>
      <option value="GN">GN</option>
      <option value="GR">GR</option>
      <option value="GS">GS</option>
      <option value="GT">GT</option>
      <option value="GW">GW</option>
      <option value="GX">GX</option>
      <option value="GG">GG</option>
      <option value="GY">GY</option>
      <option value="NR">NR</option>
      <option value="UE">UE</option>
      <option value="UW">UW</option>
      <option value="VD">VD</option>
      <option value="VR">VR</option>
      <option value="WR">WR</option>
      <option value="WT">WT</option>

      </select>
      <input
        type="text"
        value={text}
        onChange={handleTextChange}
        className="text-input2"
      />
       <select value={year} onChange={handleYearChange} className="dropdown2">
        {generateYearOptions().map(value => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <button onClick={handleSubmit} className="submit-button">Submit</button>
    </div>
      <div className="input-div">
        <input 
          className="input" 
          name="file" 
          type="file" 
          id="fileInput" 
          onChange={handleFileChange} 
        />
        <svg xmlns="" width="1em" height="1em" stroke-linejoin="round" stroke-linecap="round" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor" className="icon">
          <polyline points="16 16 12 12 8 16"></polyline>
          <line y2="21" x2="12" y1="12" x1="12"></line>
          <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
          <polyline points="16 16 12 12 8 16"></polyline>
        </svg>
      </div>

      <div className="camera-button-container">
        <button className="camera-button" id="openCameraButton" onClick={handleOpenCamera}>
          <img src="cameraPNG.png" alt="Camera Icon" />
        </button>
        <button className="camera-button" id="takePictureButton" style={{ display: 'none' }} onClick={handleTakePicture}>
          <img src="cameraPNG.png" alt="Camera Icon" />
        </button>
      </div>

      <video id="videoElement" ref={videoRef} autoPlay playsInline style={{ display: 'none' }}></video>
      <canvas id="canvasElement" ref={canvasRef} style={{ display: 'none' }}></canvas>

      <div id="imageContainer" className="image-container" style={{ display: 'none' }}>
        <button className="close-button" id="closeImageButton" onClick={handleCloseImage}>X</button>
        <img id="capturedImage" src={imageDataUrl} alt="Captured Image" />
        <button id="sendButton" className="send-button" style={{ display: 'none' }} onClick={handleSendImage}>Send</button>
      </div>
    </section>
    </div>
  );
};

export default CameraApp;

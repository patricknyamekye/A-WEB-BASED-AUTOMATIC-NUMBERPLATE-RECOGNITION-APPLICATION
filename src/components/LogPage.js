import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import './popcard.css';
import LogCards from './cards/LogCards';
import "./logpage.css"
import { useLocation, useNavigate } from 'react-router-dom';


const LogPage = () => {
    const navigate = useNavigate()
    
    const location = useLocation();
    const responseData = location.state;

    const carDetails = responseData
    

    useEffect(()=>{
        console.log(carDetails.data)
    },[])

    

    const Pv = () => {
        
            Swal.fire({
              html: `
                <div class="card44">
                  <h2>Plate Validation</h2>
                  <p><strong>VIN No. : </strong> ${carDetails.data.VIN} </p>
                  <p><strong>License Plate : </strong> ${carDetails.data.LICENSE_PLATE} </p>
                </div>
              `,
              showConfirmButton: false,
              showCancelButton: false,
            });
    
    }
    const Ci = () => {
            Swal.fire({
              html: `
                <div class="card44">
                  <h2>Car Information</h2>
                  <p><strong>Owner name :</strong> ${carDetails.data.NAMES} </p>
                  <p><strong> Company : </strong> ${carDetails.data.CAR_COMPANY}</p>
                  <p><strong> Model : </strong> ${carDetails.data.CAR_MODEL}</p>
                  <p><strong> Registration Year : </strong>20${carDetails.data.REGISTRATION_YEAR}</p>
                  <p><strong> Engine No. : </strong> ${carDetails.data.ENGINE_NUMBER}</p>
                  <p><strong> License Plate : </strong>${carDetails.data.LICENSE_PLATE}</p>
                  <p><strong> Vehicle Identification Number (VIN) : </strong> ${carDetails.data.VIN} </p>
                  <p><strong>Vehicle type : </strong> ${carDetails.data.VEHICLE_TYPE}</p>
                  <p><strong>Fuel Type : </strong> ${carDetails.data.FUEL_TYPE}</p>
                </div>
              `,
              showConfirmButton: false,
              showCancelButton: false,
            });
    
    }
  
    const Rwd = () => {
        
            Swal.fire({
              html: `
                <div class="card44">
                  <h2>Road Worthiness Validation </h2>
                  <p><strong>Owner Name :</strong> ${carDetails.data.NAMES}</p>
                  <p><strong>Vehicle Identification Number (VIN) :</strong> ${carDetails.data.VIN}</p>
                  <p><strong>License Plate :</strong>${carDetails.data.LICENSE_PLATE} </p>
                  <p><strong>Expiry Date :</strong> ${carDetails.data.EXPIRE_DATE}</p>
                </div>
              `,
              showConfirmButton: false,
              showCancelButton: false,
            });
    
    }



    const Od = () => {
        
            Swal.fire({
              html: `
                <div class="card44">
                  <h2>Owner Details</h2>
                  <p><strong>Owner name :</strong> ${carDetails.data.NAMES} </p>
                  <p><strong> License Plate : </strong> ${carDetails.data.LICENSE_PLATE} </p>
                  <p><strong> Date Of Ownership : </strong> ${carDetails.data.DATE_OF_OWNERSHIP} </p>
                </div>
              `,
              showConfirmButton: false,
              showCancelButton: false,
            });
    
    }
    const handlelogout = () =>{
      localStorage.clear('serviceId')
      navigate('/')
    }
  return (
    <div className="logpagewrapper">
          <div onClick={handlelogout} className='logout'>Logout</div>

    <div className="logPageContainer">
      <div className="logInner">
        <div className='11'>
      <div class="card33" >
        <div class="card33-border-top"></div>
        <div
    className="img img3"
    style={{
      backgroundImage: `url(/numplate.jpg)`,
      backgroundSize: 'cover', // Adjust the background size to cover the div
      backgroundPosition: 'center', // Center the background image
      backgroundRepeat: 'no-repeat' // Prevent the background image from repeating
      
    }}
  ></div>
        <span> Plate Validation</span>
        <button onClick={Pv}> Check</button>
      </div>
      <div class="card33" >
        <div class="card33-border-top"></div>
        <div
    className="img img3"
    style={{
      backgroundImage: `url(/car12.jpg)`,
      backgroundSize: 'cover', // Adjust the background size to cover the div
      backgroundPosition: 'center', // Center the background image
      backgroundRepeat: 'no-repeat' // Prevent the background image from repeating
    }}
  ></div>
        <span> Car Information</span>
        <button  onClick={Ci}> Check</button>
      </div>
      </div>
      <div>
      <div className="card33">
  <div className="card33-border-top"></div>
  <div
    className="img img3"
    style={{
      backgroundImage: `url(/rc.jpg)`,
      backgroundSize: 'cover', // Adjust the background size to cover the div
      backgroundPosition: 'center', // Center the background image
      backgroundRepeat: 'no-repeat' // Prevent the background image from repeating
    }}
  ></div>
  <span> Road Worthiness Validation</span>
  <button onClick={Rwd}>Check</button>
</div>
      <div class="card33" >
        <div class="card33-border-top"></div>
        <div
    className="img img3"
    style={{
      backgroundImage: `url(/own.jpg)`,
      backgroundSize: 'cover', // Adjust the background size to cover the div
      backgroundPosition: 'center', // Center the background image
      backgroundRepeat: 'no-repeat' // Prevent the background image from repeating
    }}
  ></div>
        <span> Owner Details</span>
        <button onClick={Od}> Check</button>
      </div>
      </div>
      </div>
    </div>
    </div>
  );
}

export default LogPage
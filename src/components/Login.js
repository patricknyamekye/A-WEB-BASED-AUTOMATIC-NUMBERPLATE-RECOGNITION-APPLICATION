import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Loader from './Loader'; // Adjust the import path as necessary
import './login.css';

const MySwal = withReactContent(Swal);

const Login = () => {
  const navigate = useNavigate();
  const [serviceId, setServiceId] = useState('');

  const showLoader = (event) => {
    event.preventDefault();

    MySwal.fire({
      title: 'Please wait...',
      html: <Loader />,
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        MySwal.showLoading();
      }
    });

    // Simulate a server-side check for demonstration
    setTimeout(() => {
      if (serviceId === 'user123') { // Replace with real check in production
        Swal.close();
        localStorage.setItem('serviceId', "user123")
        navigate('/C');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Service ID',
          text: 'Please try again.',
        });
      }
    }, 2000); // Simulated delay (2 seconds)
  };

  return (
    <div className="back-g">
      <section className="back-g">
        <div className="main">
          <div className="login">
            <div className="login-con">
              <img src="dvla.png" alt="" className="login-img" />
            </div>

            <form className="form" onSubmit={showLoader}>
              <label htmlFor="chk" aria-hidden="true" className="lab">
                Enter Your Credentials
              </label>
              <input
                className="input-serviceId"
                type="text"
                name="mixedInput"
                placeholder="Service ID"
                required
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
              />
              <button type="submit">Log in</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;

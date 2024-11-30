import React from 'react'
// import authService from '../../utils/authService.ts';
import { AuthService } from '../../utils/authService.ts';

const Home = () => {
  const authService = new AuthService();
  const handleGoogleLogin = () => {
    if (!AuthService.isAuthenticated()) {
      authService.login();
    }
  };

  return (
    <div>
      {/* <Link to={'/dashboard'}> */}
        <button onClick={handleGoogleLogin}>
          Login
        </button>
      {/* </Link> */}
    </div>
  )
}
export default Home;
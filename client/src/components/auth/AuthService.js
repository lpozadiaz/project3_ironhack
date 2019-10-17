import axios from 'axios';

class AuthService {
  constructor() {
    this.service = axios.create({
      // baseURL: `${process.env.REACT_APP_URL}/api/auth`,
      baseURL: 'http://localhost:3010/api/auth',
      withCredentials: true
    });
  }

  signup = (username, password, email) => {
    return this.service.post('/signup', {username, password, email})
    .then(response => response.data)
  }

  login = (username, password) => {
    return this.service.post('/login', {username, password})
    .then(response => response.data)
  }
  
  loggedin = () => {
    return this.service.get('/currentUser',)
    .then(response => response.data)
  }

  logout = () => {
    return this.service.get('/logout',)
    .then(response => response.data)
  }
}

export default AuthService;
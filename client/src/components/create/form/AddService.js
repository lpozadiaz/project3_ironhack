import axios from 'axios';

class AddService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_URL}/api/place`,
      withCredentials: true
    });
  }

  create = (address, latitude, longitude, comment) => {
    return this.service.post('/create', {address, latitude, longitude, comment})
    .then(response => response.data)
  }

}

export default AddService;
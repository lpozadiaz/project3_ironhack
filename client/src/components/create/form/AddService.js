import axios from 'axios';

class AddService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:3010/api/place',
      withCredentials: true
    });
  }

  create = (address, latitude, longitude) => {
    return this.service.post('/create', {address, latitude, longitude})
    .then(response => response.data)
  }

  comment = (comment) => {
    return this.service.post('/:placeid/new-comment', {comment})
    .then(response => response.data)
  }
}

export default AddService;
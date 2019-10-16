import axios from 'axios';

class AddService {
  constructor() {
    this.service = axios.create({
      // baseURL: `${process.env.REACT_APP_URL}/api/place`,
      baseURL: 'http://localhost:3010/api/place',
      withCredentials: true
    });
  }

  create = (address, latitude, longitude, comment, type) => {
    return this.service.post('/create', {address, latitude, longitude, comment, type})
    .then(response => response.data)
  }

  update = (comment, commentId) => {
    return this.service.put('/edit', {comment, commentId})
    .then(response => response.data)
  }

  delete = (placeId, commentId) => {
    return this.service.put('/delete', {placeId, commentId})
    .then(response => response.data)
  }

}

export default AddService;
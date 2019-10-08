import axios from 'axios';

class MapService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:3010/api/map',
      withCredentials: true
    });
  }

  search = (username, password, latitude, longitude) => {
    return this.service.get('/search', {username, password, latitude, longitude})
    .then(response => response.data)
  }

}

export default MapService;
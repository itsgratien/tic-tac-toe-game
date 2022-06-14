import axios from 'axios';

const axiosSetup = () => {
  return axios.create({
    baseURL: '/api',
  });
};

export default axiosSetup;

const Config = {
    //apiUrl: 'http://localhost:3000/', //local
    apiUrl: 'https://api.astrohawan.com/', //Live
    endpoints: {
      pujastore: 'api/pujastore',
      pujastoreAdmin: 'api/pujastore/admin/store',
      SignIn: 'api/login',
      SignUp: 'api/register'
      //getpujaProducts: (id) => `/product/${id}`,
      //deletepujaProduct: (id) => `/delete/${id}`,
      //searchProduct: (id) => `/searchProduct/${id}`,
    },
  };
  
  export default Config;


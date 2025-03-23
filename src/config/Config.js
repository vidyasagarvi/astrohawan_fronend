const live = true;

const Config = {
    apiUrl: live 
        ? 'https://www.thesatim.com/api2/api2/'  // Live
        : 'http://localhost:4000/api2/',   // Local

    imageUrl: live 
        ? 'https://www.thesatim.com/api2/api2/'  // Live
        : 'http://localhost:4000/api2/',   // Local

    endpoints: {
      pujastore: 'api/pujastore',
      pujastoreAdmin: 'api/pujastore/admin/store',
      SignIn: 'api/login',
      SignUp: 'api/register'
    },
};

export default Config;

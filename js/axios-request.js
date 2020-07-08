let requestConfig = {
    url: '',
    method: '',
    baseURL: 'http://200.90.65.77:8888/',
    // transformResponse: [function (data) {
    //     // Do whatever you want to transform the data
    
    //     return data;
    //   }],
    params: {},
    validateStatus: function (status) {
        return status >= 200 && status <= 500; // default
    },
    timeout: 1500,
    withCredentials: true,
    
}
let requestConfig = {
    url: '',
    method: '',
    baseURL: 'https://elber.pythonanywhere.com/',
    // transformResponse: [function (data) {
    //     // Do whatever you want to transform the data
    
    //     return data;
    //   }],
    headers:{'X-CSRF-TOKEN': localStorage.getItem('csrf_access_token')},
    params: {},
    validateStatus: function (status) {
        return status >= 200 && status <= 500; // default
    },
    timeout: 3000,
    withCredentials: true,
    
}
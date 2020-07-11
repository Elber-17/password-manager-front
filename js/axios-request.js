function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

let requestConfig = {
    url: '',
    method: '',
    baseURL: 'http://200.90.65.77:8888/',
    // transformResponse: [function (data) {
    //     // Do whatever you want to transform the data
    
    //     return data;
    //   }],
    headers:{'X-CSRF-TOKEN': getCookie('csrf_access_token')},
    params: {},
    validateStatus: function (status) {
        return status >= 200 && status <= 500; // default
    },
    timeout: 1500,
    withCredentials: true,
    
}
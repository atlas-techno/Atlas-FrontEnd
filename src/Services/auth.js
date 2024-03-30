export const usuarioAutenticado = () => localStorage.getItem('usuario-login') !== null;

// export const parseJwt = () => {

//     let base64 = localStorage.getItem('usuario-login').split('.')[1];

//     return JSON.parse( window.atob(base64) );
// };

export const parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}
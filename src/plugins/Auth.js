const AuthPlugin = {
  setToken(token, expiration) {
    if (this.getToken()) {
      localStorage.authToken = token;
      localStorage.authTokenExpiration = expiration;
    } else {
      localStorage.setItem('authToken', token);
      localStorage.setItem('authTokenExpiration', expiration);
    }
  },
  getToken() {
    const token = localStorage.getItem('authToken');
    const expiration = localStorage.getItem('authTokenExpiration');

    if (!token && !expiration) {
      return null;
    }

    if (Date.now > parseInt(expiration, 10)) {
      this.destroyToken();
      this.destroyData();
      return null;
    }

    return { token, expiration };
  },
  getUserData() {
    const token = this.getToken();
    if (token) {
      const data = JSON.parse(localStorage.getItem('authData'));
      return data;
    }
    return null;
  },
  setUserData(data) {
    localStorage.setItem('authData', JSON.stringify(data));
  },
  destroyToken() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authTokenExpiration');
  },
  destroyData() {
    localStorage.removeItem('authData');
  },
  isLoggedIn() {
    if (this.getToken()) {
      return true;
    }
    return false;
  },
  logout() {
    this.destroyToken();
    this.destroyData();
  },
};

export default function (Vue) {
  Vue.auth = AuthPlugin;

  Object.defineProperties(Vue.prototype, {
    $auth: {
      get: () => Vue.auth,
    },
  });
}

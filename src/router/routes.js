const Home = (resolve) => {
  require.ensure([], () => resolve(require('@/components/pages/Home')), 'home');
};

const About = (resolve) => {
  require.ensure([], () => resolve(require('@/components/pages/About')), 'about');
};

const Login = (resolve) => {
  require.ensure([], () => resolve(require('@/components/auth/Login')), 'auth');
};

const NotFound = (resolve) => {
  require.ensure([], () => resolve(require('@/components/pages/NotFound')), '404');
};

export default [
  {
    path: '/',
    name: 'homeURL',
    component: Home,
  },
  {
    path: '/about',
    name: 'aboutURL',
    component: About,
  },
  {
    path: '/login',
    name: 'loginURL',
    component: Login,
  },
  {
    path: '*',
    name: '404URL',
    component: NotFound,
  },
];

// Layouts
const LayoutMain = (resolve) => {
  require.ensure([], () => resolve(require('@/components/layouts/Main')), 'main');
};

const LayoutSimple = (resolve) => {
  require.ensure([], () => resolve(require('@/components/layouts/Simple')), 'simple');
};


// Page
const Home = (resolve) => {
  require.ensure([], () => resolve(require('@/components/pages/Home')), 'home');
};

const Profile = (resolve) => {
  require.ensure([], () => resolve(require('@/components/pages/Profile')), 'user-profile');
};


// Static Page
const About = (resolve) => {
  require.ensure([], () => resolve(require('@/components/pages/About')), 'about');
};

const NotFound404 = (resolve) => {
  require.ensure([], () => resolve(require('@/components/pages/NotFound404')), '404');
};


// Auth Pages
const Login = (resolve) => {
  require.ensure([], () => resolve(require('@/components/auth/Login')), 'login');
};

const Logout = (resolve) => {
  require.ensure([], () => resolve(require('@/components/auth/Logout')), 'logout');
};

const Register = (resolve) => {
  require.ensure([], () => resolve(require('@/components/auth/Register')), 'register');
};

export default [
  {
    path: '/auth',
    component: LayoutSimple,
    redirect: { name: 'loginURL' },
    children: [
      {
        path: 'login',
        name: 'loginURL',
        component: Login,
        meta: {
          requiresGuest: true,
        },
      },
      {
        path: 'register',
        name: 'registerURL',
        component: Register,
        meta: {
          requiresGuest: true,
        },
      },
      {
        path: 'logout',
        name: 'logoutURL',
        component: Logout,
      },
    ],
  },
  {
    path: '/',
    component: LayoutMain,
    children: [
      {
        path: '',
        name: 'homeURL',
        component: Home,
      },
      {
        path: 'about',
        name: 'aboutURL',
        component: About,
      },
      {
        path: ':username?',
        name: 'profileURL',
        component: Profile,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '*',
    name: '404URL',
    component: NotFound404,
  },
];

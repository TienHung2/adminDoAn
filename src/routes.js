import React from 'react';

// const Tabs = React.lazy(() => import('./views/Base/Tabs'));
const LeTienHung = React.lazy(() => import('./views/Base/LeTienHung'));
const Blogs = React.lazy(() => import('./views/Setting/Blogs/Blogs'));
const Blog = React.lazy(() => import('./views/Setting/Blogs/Blog'));
const CreateBlog = React.lazy(() => import('./views/Setting/Blogs/CreateBlog'));
const Categories = React.lazy(() => import('./views/Setting/Categories'));
const CreateCategory = React.lazy(() => import('./views/Setting/Categories/CreateCategory'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));
const CreateUser = React.lazy(() => import('./views/Users/CreateUser'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/setting', exact: true, name: 'Setting', component: Blogs },
  { path: '/setting/blogs',exact: true, name: 'Blogs', component: Blogs },
  { path: '/setting/blogs/getblog/:id', exact: true, name: 'Blog Details', component: Blog },
  { path: '/setting/blogs/createblog', exact: true, name: 'Create Blog', component: CreateBlog },
  { path: '/setting/categories', exact: true, name: 'Categories', component: Categories },
  { path: '/setting/categories/createcategory', exact: true, name : 'Create Category', component: CreateCategory },
  // { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/letienhung', name: 'LeTienHung', component: LeTienHung },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/getuser/:id', exact: true, name: 'User Details', component: User },
  { path: '/users/create/createuser', exact: true, name: 'Create User', component: CreateUser },
];

export default routes;

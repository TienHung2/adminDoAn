export default {
  items: [
    {
      title: true,
      name: 'About Us',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Team',
      url: '/base',
      icon: 'icon-puzzle',
      children: [

        // {
        //   name: 'Tabs',
        //   url: '/base/tabs',
        //   icon: 'icon-puzzle',
        // },
        {
          name: 'Le Tien Hung',
          url: '/base/letienhung',
          icon: 'icon-puzzle',
        },
      ],
    },
    {
      title: true,
      name: 'Setting',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Blogs',
      url: '/setting/blogs',
      icon: 'icon-drop',
    },
    {
      name: 'Categories',
      url: '/setting/categories',
      icon: 'icon-pencil',
    },
    
  ],
};

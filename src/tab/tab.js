import Vue from 'vue';

import "vue-awesome/icons";
import Icon from "vue-awesome/components/Icon";
Vue.component("icon", Icon);

import Element from 'element-ui';
Vue.use(Element, { size: 'small', zIndex: 3000 });

import App from './App';
new Vue({
  el: '#app',
  render: h => h(App)
});

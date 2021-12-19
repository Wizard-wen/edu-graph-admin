import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {
  Button, Input, Modal, Tree, Select, Form,
  PageHeader, Switch, Spin, Card, Steps, Comment,
  DatePicker, Checkbox, Radio, Dropdown, Menu,
  Avatar, Pagination, Upload, List, Tag, Drawer,
  Descriptions, Col, Row, Empty, Table, Popconfirm,
  Layout, Breadcrumb
} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
// import '@ant-design/icons-vue';

const apiLocalBaseURL = 'http://localhost:7250/';
const apiTestBaseURL = 'http://edu.songxiwen.com.cn/';
const apiBaseURL = apiLocalBaseURL;

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers = {
    ...config.headers,
    'edu-admin-token': 'e2202030-e133-11eb-8d38-217cc0d4d57c'
  };
  config.baseURL = apiBaseURL;
  return config;
});

axios.interceptors.response.use((response: AxiosResponse) =>
// 对响应数据做点什么
// response 是请求回来的数据
    response,
  (error) =>
// 对响应错误做点什么
    Promise.reject(error));
const app = createApp(App);
app.component('AntLayout', Layout);
app.component('AntLayoutHeader', Layout.Header);
app.component('AntLayoutContent', Layout.Content);
app.component('AntLayoutSider', Layout.Sider);
app.component('AntBreadcrumb', Breadcrumb);
app.component('AntBreadcrumbItem', Breadcrumb.Item);
app.component('AntCol', Col);
app.component('AntRow', Row);
app.component('AntTree', Tree);
app.component('AntDrawer', Drawer);
app.component('AntEmpty', Empty);
app.component('AntPopconfirm', Popconfirm);
app.component('AntDescriptions', Descriptions);
app.component('AntDescriptionsItem', Descriptions.Item);
app.component('AntDirectoryTree', Tree.DirectoryTree);
app.component('AntTreeNode', Tree.TreeNode);
app.component('AntModal', Modal);
app.component('AntButton', Button);
app.component('AntTable', Table);
app.component('AntForm', Form);
app.component('AntFormItem', Form.Item);
app.component('AntSelect', Select);
app.component('AntSelectOption', Select.Option);
app.component('AntCheckbox', Checkbox);
app.component('AntCheckboxGroup', Checkbox.Group);
app.component('AntRadio', Radio);
app.component('AntRadioGroup', Radio.Group);
app.component('AntInput', Input);
app.component('AntTextArea', Input.TextArea);
app.component('AntInputSearch', Input.Search);
app.component('AntInputPassword', Input.Password);
app.component('AntUpload', Upload);
app.component('AntDatePicker', DatePicker);
app.component('AntPageHeader', PageHeader);
app.component('AntSwitch', Switch);
app.component('AntSpin', Spin);
app.component('AntCard', Card);
app.component('AntSteps', Steps);
app.component('AntStep', Steps.Step);
app.component('AntComment', Comment);
app.component('AntMenu', Menu);
app.component('AntMenuItem', Menu.Item);
app.component('AntDropdown', Dropdown);
app.component('AntAvatar', Avatar);
app.component('AntPagination', Pagination);
app.component('AntList', List);
app.component('AntListItem', List.Item);
app.component('AntListItemMeta', List.Item.Meta);
app.component('AntTag', Tag);
app.use(store)
  .use(router)
  .mount('#app')

import { createApp } from 'vue'
import 'vant/lib/index.css';
import './style.css';
import App from './App.vue';

import VueApexCharts from 'vue3-apexcharts';
import { Col, Row, List, Search, Button, Toast, Tab, Tabs, Card, Cell, CellGroup } from 'vant';

import router from './router';

const app = createApp(App);

app.use(VueApexCharts)

app.use(router);
app.use(Col);
app.use(Row);
app.use(List);
app.use(Search);
app.use(Button);
app.use(Toast);
app.use(Tab);
app.use(Tabs);
app.use(Card);
app.use(Cell);
app.use(CellGroup);

app.mount('#app');

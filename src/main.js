import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import { gantt } from "dhtmlx-gantt";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

// 设置甘特图语言
gantt.i18n.setLocale("cn");

// 鼠标悬浮工具提示文本配置
gantt.plugins({ tooltip: true });

createApp(App).use(store).use(router).use(Antd).mount("#app");

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-2 col-md-push-10">
        <div class="panel panel-default">
          <div class="panel-body">
            <ul class="nav nav-pills nav-stacked" id="gantt_info"></ul>
          </div>
          <div class="gantt_control">
            <button @click="updateCriticalPath">Show Critical Path</button>
          </div>
        </div>
      </div>
      <div class="col-md-10 col-md-pull-2">
        <div class="gantt_wrapper panel" id="gantt_here"></div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

var demo_tasks = {
  data: [
    {
      id: 1,
      wbs: "1",
      cover: "✔",
      area: "陕西",
      text: "电力接入批复",
      type: gantt.config.types.project,
      progress: 0.4,
      open: false,
      finish_date: "2018-04-18",
    },
    {
      id: 2,
      wbs: "1.1",
      cover: "✔",
      area: "陕西",
      text: "电力接入批复采购",
      type: gantt.config.types.project,
      start_date: "02-04-2018",
      duration: "10",
      end_date: "2018-04-18",
      progress: 0.6,
      parent: "1",
      open: true,
    },
    {
      id: 3,
      wbs: "1.2",
      cover: "✔",
      area: "陕西",
      text: "编制《项目接入系统方案》",
      type: gantt.config.types.project,
      start_date: "11-04-2018",
      duration: "11",
      finish_date: "2018-04-18",
      parent: "1",
      progress: 0.6,
      open: true,
    },
    {
      id: 4,
      wbs: "1.2.1",
      cover: "✔",
      area: "陕西",
      text: "备案文件",
      type: gantt.config.types.project,
      start_date: "13-04-2018",
      duration: "6",
      finish_date: "2018-04-18",
      parent: "3",
      progress: 0.5,
      open: true,
    },
    {
      id: 5,
      wbs: "1.2.2",
      cover: "✔",
      area: "陕西",
      text: "可研报告",
      start_date: "02-04-2018",
      duration: "7",
      parent: "3",
      finish_date: "2018-04-18",
      progress: 0.6,
      open: true,
    },
    {
      id: 6,
      wbs: "1.2.3",
      cover: "✔",
      area: "陕西",
      text: "根据备案和可研编制《项目接入系统方案》初版",
      start_date: "03-04-2018",
      duration: "7",
      parent: "3",
      finish_date: "2018-04-18",
      progress: 0.6,
      open: true,
    },
    {
      id: 7,
      wbs: "1.3",
      cover: "✔",
      area: "新疆",
      text: "向市供电公司递交资料",
      start_date: "11-04-2018",
      duration: "8",
      parent: "1",
      finish_date: "2018-04-18",
      progress: 0.6,
      open: true,
    },
    {
      id: 8,
      wbs: "1.3.1",
      cover: "✔",
      area: "陕西",
      text: "间隔使用协议",
      start_date: "14-04-2018",
      duration: "5",
      parent: "7",
      finish_date: "2018-04-18",
      progress: 0.5,
      open: true,
    },
    {
      id: 9,
      wbs: "1.3.2",
      cover: "✔",
      area: "陕西",
      text: "土地使用意见",
      start_date: "14-04-2018",
      duration: "4",
      parent: "7",
      finish_date: "2018-04-18",
      progress: 0.5,
      open: true,
    },
    {
      id: 10,
      wbs: "1.3.3",
      cover: "✔",
      area: "公用",
      text: "建设单位公用文件",
      start_date: "14-04-2018",
      duration: "3",
      parent: "7",
      finish_date: "2018-04-18",
      progress: 0.5,
      open: true,
    },
    {
      id: 11,
      wbs: "1.3.4",
      cover: "✔",
      area: "陕西",
      text: "《项目接入系统方案》初版",
      type: gantt.config.types.project,
      progress: 0.6,
      parent: "7",
      open: true,
      finish_date: "2018-04-18",
    },
    {
      id: 12,
      wbs: "1.4",
      cover: "✔",
      area: "陕西",
      text: "《项目接入系统方案》初版内部评审",
      start_date: "03-04-2018",
      duration: "5",
      parent: "1",
      progress: 1,
      open: true,
      finish_date: "2018-04-18",
    },
    {
      id: 13,
      wbs: "1.4.1",
      cover: "✔",
      area: "陕西",
      text: "PMS流程审批",
      type: gantt.config.types.project,
      start_date: "02-04-2018",
      duration: "12",
      finish_date: "2018-04-18",
      parent: "11",
      progress: 0.5,
      open: true,
    },
    {
      id: 14,
      wbs: "1.4.2",
      cover: "✔",
      area: "陕西",
      text: "《项目接入系统方案》初版内部评审意见",
      start_date: "02-04-2018",
      finish_date: "2018-04-18",
      duration: "6",
      parent: "12",
      progress: 0.8,
      open: true,
    },
    {
      id: 15,
      wbs: "1.5",
      cover: "✔",
      area: "陕西",
      text: "地区电网公司专家评审",
      type: gantt.config.types.project,
      start_date: "02-04-2018",
      finish_date: "2018-04-18",
      duration: "5",
      parent: "1",
      progress: 0.2,
      open: false,
    },
    {
      id: 16,
      wbs: "1.5.1",
      cover: "✔",
      area: "陕西",
      text: "协调市供电公司发策部确定评审会时间",
      start_date: "02-04-2018",
      finish_date: "2018-04-18",
      duration: "7",
      parent: "15",
      progress: 0,
      open: true,
    },
    {
      id: 17,
      wbs: "1.5.2",
      cover: "✔",
      area: "陕西",
      text: "专家组评审意见",
      start_date: "03-04-2018",
      finish_date: "2018-04-18",
      duration: "2",
      parent: "15",
      progress: 1,
      open: true,
    },
    {
      id: 25,
      wbs: "1.5.3",
      cover: "✔",
      area: "河北",
      text: "《项目接入系统方案》送审版",
      start_date: "06-04-2018",
      finish_date: "2018-04-18",
      type: gantt.config.types.milestone,
      parent: "15",
      progress: 0,
      open: true,
    },
    {
      id: 18,
      wbs: "1.6",
      cover: "✔",
      area: "陕西",
      text: "报省电网发展部",
      start_date: "08-04-2018",
      finish_date: "2018-04-18",
      duration: "2",
      parent: "1",
      progress: 0.8,
      open: true,
    },
    {
      id: 19,
      wbs: "1.6.1",
      cover: "✔",
      area: "陕西",
      text: "建设单位共用文件",
      start_date: "10-04-2018",
      finish_date: "2018-04-18",
      duration: "4",
      parent: "18",
      progress: 0.2,
      open: true,
    },
    {
      id: 20,
      wbs: "1.6.2",
      cover: "✔",
      area: "陕西",
      text: "备案文件",
      start_date: "10-04-2018",
      finish_date: "2018-04-18",
      duration: "4",
      parent: "18",
      progress: 0,
      open: true,
    },
    {
      id: 21,
      wbs: "1.6.3",
      cover: "✔",
      area: "陕西",
      text: "《项目接入系统方案》送审版",
      start_date: "03-04-2018",
      finish_date: "2018-04-18",
      duration: "4",
      parent: "18",
      progress: 0.5,
      open: true,
    },
    {
      id: 22,
      wbs: "1.6.4",
      cover: "✔",
      area: "陕西",
      text: "组卷资料并提交至省电网发展部受理评审",
      start_date: "03-04-2018",
      finish_date: "2018-04-18",
      duration: "4",
      parent: "18",
      progress: 0.1,
      open: true,
    },
    {
      id: 23,
      wbs: "1.7",
      cover: "✔",
      area: "内蒙古",
      text: "省电网组织各部门评审",
      start_date: "03-04-2018",
      finish_date: "2018-04-18",
      duration: "20",
      parent: "1",
      progress: 0,
      open: true,
    },
    {
      id: 22,
      wbs: "1.7.1",
      cover: "✔",
      area: "陕西",
      text: "组卷资料并提交至省电网发展部受理评审",
      start_date: "03-04-2018",
      finish_date: "2018-04-18",
      duration: "4",
      parent: "23",
      progress: 0.1,
      open: true,
    },
    {
      id: 24,
      wbs: "1.7.2",
      cover: "✔",
      area: "陕西",
      text: "协调省电网发展部确定评审会时间",
      start_date: "15-04-2018",
      finish_date: "2018-04-18",
      type: gantt.config.types.milestone,
      parent: "23",
      progress: 0,
      open: true,
    },
  ],
  links: [
    // { "finish_to_start":"0", "start_to_start":"1", "finish_to_finish":"2", "start_to_finish":"3" }
    { id: "1", source: "1", target: "2", type: "1" },
    { id: "2", source: "2", target: "3", type: "0" },
    { id: "3", source: "3", target: "4", type: "0" },
    { id: "4", source: "2", target: "5", type: "2" },
    { id: "5", source: "2", target: "6", type: "2" },
    { id: "6", source: "3", target: "7", type: "2" },
    { id: "7", source: "4", target: "8", type: "2" },
    { id: "8", source: "4", target: "9", type: "2" },
    { id: "9", source: "4", target: "10", type: "2" },

    { id: "10", source: "11", target: "12", type: "1" },
    { id: "11", source: "11", target: "13", type: "1" },
    { id: "12", source: "11", target: "14", type: "1" },
    { id: "13", source: "11", target: "15", type: "1" },
    { id: "14", source: "11", target: "16", type: "1" },

    { id: "15", source: "13", target: "17", type: "1" },
    { id: "16", source: "17", target: "25", type: "0" },
    { id: "23", source: "25", target: "18", type: "0" },
    { id: "17", source: "18", target: "19", type: "0" },
    { id: "18", source: "19", target: "20", type: "0" },
    { id: "19", source: "15", target: "21", type: "2" },
    { id: "20", source: "15", target: "22", type: "2" },
    { id: "21", source: "15", target: "23", type: "2" },
    { id: "22", source: "13", target: "24", type: "0" },
  ],
};

var getListItemHTML = function (type, count, active) {
  return (
    "<div" +
    (active ? ' class="active"' : "") +
    '><a href="#">' +
    type +
    's <span class="badge">' +
    count +
    "</span></a></div>"
  );
};

var opts = [
  { key: 1, label: "High" },
  { key: 2, label: "Normal" },
  { key: 3, label: "Low" },
];

var updateInfo = function () {
  var state = gantt.getState(),
    tasks = gantt.getTaskByTime(state.min_date, state.max_date),
    types = gantt.config.types,
    result = {},
    html = "",
    active = false;

  // get available types
  result[types.task] = 0;
  result[types.project] = 0;
  result[types.milestone] = 0;

  // sort tasks by type
  for (var i = 0, l = tasks.length; i < l; i++) {
    if (tasks[i].type && result[tasks[i].type] != "undefined")
      result[tasks[i].type] += 1;
    else result[types.task] += 1;
  }
  // render list items for each type
  for (var j in result) {
    if (j == types.task) active = true;
    else active = false;
    html += getListItemHTML(j, result[j], active);
  }

  document.getElementById("gantt_info").innerHTML = html;
};

import { gantt } from "dhtmlx-gantt";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  created() {
    gantt.clearAll(); // 先清空，再添加，就不会有缓存
  },
  mounted() {
    gantt.templates.scale_cell_class = function (date) {
      if (date.getDay() == 0 || date.getDay() == 6) {
        return "weekend";
      }
    };
    gantt.templates.timeline_cell_class = function (item, date) {
      if (date.getDay() == 0 || date.getDay() == 6) {
        return "weekend";
      }
    };

    gantt.templates.rightside_text = function (start, end, task) {
      if (task.type == gantt.config.types.milestone) {
        return task.text;
      }
      return "";
    };

    gantt.config.columns = [
      { name: "wbs", label: "WBS编码", width: "60", align: "left" },
      {
        name: "text",
        label: "任务名称",
        align: "left",
        width: 400,
        tree: true,
      },
      { name: "cover", label: "是否涉及", align: "center", width: 80 },
      { name: "area", label: "地域", align: "center", width: 60 },
      { name: "duration", label: "Duration", align: "center", width: 60 },
      { name: "start_date", label: "Start", align: "center", width: 100 },
      { name: "end_date", label: "Finish", align: "center", width: 100 },
      { name: "add", label: "", width: 44 },
    ];

    gantt.config.lightbox.sections = [
      {
        name: "description",
        label: "任务名称",
        height: 38,
        map_to: "text",
        type: "textarea",
        focus: true,
      },
      {
        name: "priority",
        height: 22,
        map_to: "priority",
        type: "select",
        options: opts,
      },
      { name: "time", height: 72, map_to: "auto", type: "duration" },
    ];

    gantt.plugins({
      critical_path: true,
    });

    gantt.config.grid_width = 800;
    gantt.config.work_time = true;
    // gantt.config.date_grid = "%F %d";
    gantt.config.scale_height = 60;
    gantt.config.scales = [
      { unit: "day", step: 1, format: "%d %M" },
      { unit: "week", step: 1, format: "Week #%W" },
    ];
    // gantt.config.highlight_critical_path = true;
    gantt.init("gantt_here");
    gantt.parse(demo_tasks);
    updateInfo();
  },
  methods: {
    updateCriticalPath() {
      gantt.config.highlight_critical_path = true;
      gantt.render();
    },
  },
};
</script>

<style>
html,
body {
  height: 100%;
  padding: 0px;
  margin: 0px;
}

.weekend {
  background: #f4f7f4 !important;
}

.gantt_selected .weekend {
  background: #fff3a1 !important;
}

.well {
  text-align: right;
}

@media (max-width: 991px) {
  .nav-stacked > li {
    float: left;
  }
}

.container-fluid .row {
  margin-bottom: 10px;
}

.container-fluid .gantt_wrapper {
  height: 700px;
  width: 100%;
}

.gantt_container {
  border-radius: 4px;
}

.gantt_grid_scale {
  background-color: transparent;
}

.gantt_hor_scroll {
  margin-bottom: 1px;
}
</style>

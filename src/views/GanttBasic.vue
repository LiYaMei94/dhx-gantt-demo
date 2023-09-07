<template>
  <div class="gantt_control">
    <input
      @click="exportToPDF"
      value="Export to PDF"
      type="button"
      class="control-item"
    />
    <input
      @click="exportToPNG"
      value="Export to png"
      type="button"
      class="control-item"
    />
    <input
      type="button"
      id="default"
      @click="toggleChart"
      value="Toggle main Timeline"
    />
    <a-tree-select
      style="width: 100%"
      :tree-data="[]"
      tree-checkable
      allow-clear
      placeholder="Please select"
      tree-node-filter-prop="label"
      id="gantt_grid_editor_placeholder_1"
    />
  </div>
  <div ref="ganttRef1" class="gantt-container"></div>
  <a-modal v-model:visible="visible" title="设置前置任务" @ok="handleOk">
    <EditRow
      :columns="tableColumns"
      :dataSource="dataSource"
      :editColumns="['source', 'type']"
    ></EditRow>
    <!-- <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
    >
      <a-form-item label="前置任务" name="task">
        <a-select
          v-model:value="formState.task"
          mode="multiple"
          style="width: 100%"
          placeholder="Please select"
          :options="taskData"
          :fieldNames="{ label: 'text', value: 'id' }"
        ></a-select>
        <a-tree-select
          v-model:value="formState.task"
          style="width: 100%"
          tree-checkable
          tree-default-expand-all
          :height="233"
          :tree-data="taskTreeData"
          :max-tag-count="10"
          :fieldNames="{ children: 'children', label: 'text', value: 'id' }"
          tree-node-filter-prop="text"
        >
        </a-tree-select>
      </a-form-item>

      <a-form-item label="类型" name="type">
        <a-radio-group v-model:value="formState.type">
          <template v-for="item in linkTypes" :key="item.value">
            <a-radio :value="item.value">{{ item.label }}</a-radio>
          </template>
        </a-radio-group>
      </a-form-item>
    </a-form> -->
  </a-modal>
</template>
<script setup lang="jsx">
import { gantt } from "dhtmlx-gantt";
import { onMounted, ref, h } from "vue";
import { tasks } from "../mock/tasks.js";
import { columns } from "../mock/columns.js";
import "../utils/gantt-export-api.js";
import { arrToTree, filterEnum } from "../utils/utils.js";
import _ from "lodash";
import EditRow from "../components/EditTable/EditRow";

const ganttRef1 = ref(null);
const visible = ref(false);
let currentId = null; // 当前在编辑任务的ID
const formState = ref({});
const dataSource = ref([]);
const taskData = _.map(_.cloneDeep(tasks?.data), (item) => {
  const newItem = _.cloneDeep(item);
  delete item["parent"];
  item.parentID = newItem["parent"];
  return item;
});
const linkTypes = [
  {
    label: "finish_to_start",
    value: "0",
    desc: "FS",
  },
  {
    label: "start_to_start",
    value: "1",
    desc: "SS",
  },
  {
    label: "finish_to_finish",
    value: "2",
    desc: "FF",
  },
  {
    label: "start_to_finish",
    value: "3",
    desc: "SF",
  },
];
const tableColumns = [
  {
    dataIndex: "source",
    title: "前置任务",
    el: "select",
    props: {
      options: taskData,
      fieldNames: { label: "text", value: "id" },
    },
  },
  {
    dataIndex: "type",
    title: "类型",
    el: "select",
    props: {
      options: linkTypes,
    },
  },
];

const taskTreeData = arrToTree(taskData, "id", "parentID");

// 导出pdf
const exportToPDF = () => {
  gantt.exportToPDF({
    name: "哈哈哈.pdf",
  });
};

// 导出png图片
const exportToPNG = () => {
  gantt.exportToPNG();
};

const toggleChart = () => {
  gantt.config.show_chart = !gantt.config.show_chart;
  gantt.render();
};

// 操作
const actionClick = (id, action) => {
  switch (action) {
    case "edit":
      gantt.showLightbox(id);
      break;
    case "add":
      gantt.createTask(null, id);
      break;
    case "delete":
      gantt.confirm({
        title: gantt.locale.labels.confirm_deleting_title,
        text: gantt.locale.labels.confirm_deleting,
        callback: function (res) {
          if (res) gantt.deleteTask(id);
        },
      });
      break;
  }
};

// 当前任务的所有前置任务
const getCurrentTaskLink = (id) => {
  const currentTask = gantt.getTask(id);
  const target = currentTask.$target;
  const links = [];
  target.forEach(function (linkId) {
    const link = gantt.getLink(linkId);
    links.push(link);
  });
  return links;
};

// 点击弹出modal
const predecessorsClick = (id) => {
  visible.value = true;
  currentId = id;
  const links = getCurrentTaskLink(2);
  console.log("links", links);
  dataSource.value = links;
  // const currentTask = gantt.getTask(id);
  // formState.value = { task: currentTask?.source ,type:};
};

const handleOk = () => {
  const currentTask = gantt.getTask(currentId);
  const type = filterEnum(
    formState.value?.type,
    linkTypes,
    { label: "desc" },
    true
  );
  const target = currentTask.$target;
  const newTask = {
    id: 2,
    start_date: "02-06-2023",
    duration: "8",
    predecessors: `${formState.value?.task?.join(",")} ${type?.desc}`,
  };

  if (target.length) {
    // 当前任务的前置任务
    target.forEach(function (linkId) {
      const link = gantt.getLink(linkId);
      link.type = type?.value;
      console.log(link);
      gantt.updateLink(link?.id);
    });
  } else {
    formState.value?.task.forEach(function (item) {
      gantt.addLink({
        source: item,
        target: currentId,
        type: formState.value?.type,
      });
    });
  }

  // 更新当前任务
  gantt.updateTask(currentId, newTask);
  visible.value = false;
};

window.actionClick = actionClick;
window.predecessorsClick = predecessorsClick;

gantt.clearAll(); // 先清空，再添加，就不会有缓存
onMounted(() => {
  // 设置甘特图语言
  // gantt.i18n.setLocale("cn");

  // 鼠标悬浮工具提示文本配置
  gantt.plugins({ tooltip: true, marker: true });
  // 设置甘特图 progress 表头的时间格式
  // FIXME:gantt.config.date_scale优先级高于gantt.config.scales
  //   gantt.config.date_scale = "%Y-%m-%d";

  // 设置日期marker
  const today = new Date("2023-06-16");
  gantt.addMarker({
    start_date: today,
    css: "today",
    text: "2023-06-16",
    title: "Today: " + "2023-06-16",
  });

  // 设置甘特图 progress 表头展示方式
  gantt.config.scale_height = 20 * 3;
  gantt.config.row_height = 30;
  var weekScaleTemplate = function (date) {
    var dateToStr = gantt.date.date_to_str("%m/%d");
    var weekNum = gantt.date.date_to_str("(week %W)");
    var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
    return dateToStr(date) + " ~ " + dateToStr(endDate) + " " + weekNum(date);
  };

  gantt.config.scales = [
    { unit: "month", step: 1, format: "%Y, %F" },
    { unit: "week", step: 1, format: weekScaleTemplate },
    { unit: "day", step: 1, format: "%D, %d" },
  ];

  // 设置甘特图task中的时间格式
  //   gantt.config.date_format = "%Y-%m-%d";

  // 开始结束时间，如果task中的时间不在当前规定的范围内就不展示
  // gantt.config.start_date = new Date("2023-04-01");
  // gantt.config.end_date = new Date("2023-12-20");

  const actionHeader =
    '<div class="gantt_grid_head_cell gantt_grid_head_add" onclick="gantt.createTask()"></div>';
  const predecessorsRender = function (task) {
    const text = task?.predecessors ? task?.predecessors : "添加";
    return (
      '<div class="" onclick="predecessorsClick(' +
      task.id +
      ')">' +
      text +
      "</div>"
    );
  };
  const actionRender = function (task) {
    return (
      '<span class="fa  gantt_grid_edit" onclick="actionClick(' +
      task.id +
      ", 'edit')\">edit</span>" +
      '<span class="fa  gantt_grid_add" onclick="actionClick(' +
      task.id +
      ", 'add')\">add</span>" +
      '<span class="fa  gantt_grid_delete" onclick="actionClick(' +
      task.id +
      ", 'delete')\">delete</span>"
    );
  };

  gantt.config.columns = columns({
    predecessors: { colRender: predecessorsRender },
    actions: {
      headerRender: actionHeader,
      colRender: actionRender,
    },
  });

  // 鼠标悬浮提示配置
  gantt.templates.tooltip_text = function (start, end, task) {
    return (
      "<b>标题:</b> " +
      task.text +
      "<br/><span>开始:</span> " +
      gantt.templates.tooltip_date_format(start) +
      "<br/><span>结束:</span> " +
      gantt.templates.tooltip_date_format(end) +
      "<br/><span>进度:</span> " +
      Math.round(task.progress * 100) +
      "%"
    );
  };

  // 面板布局
  gantt.config.layout = {
    css: "gantt_container",
    rows: [
      {
        cols: [
          { view: "grid", width: "*", scrollY: "scrollVer" },
          { resizer: true, width: 1 },
          { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
          { resizer: true, width: 1 },
          { view: "scrollbar", id: "scrollVer" },
        ],
      },
      { view: "scrollbar", id: "scrollHor", height: 20 },
    ],
  };

  // 初始化甘特图
  gantt.init(ganttRef1.value);
  gantt.parse(tasks);
});
</script>
<style>
.gantt_control {
  padding: 20px 0;
}
.control-item {
  margin: 10px;
}
.gantt-container {
  width: 100%;
  height: 100%;
}
.fa {
  margin: 0 10px;
}
.gantt_grid_edit {
  color: #ffa011;
}
.gantt_grid_add {
  color: #328ea0;
}
.gantt_grid_delete {
  color: red;
}
</style>

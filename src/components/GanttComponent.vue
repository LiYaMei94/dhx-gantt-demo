<template>
  <div ref="ganttContainer"></div>
</template>

<script>
import { gantt } from "dhtmlx-gantt";
export default {
  props: {
    tasks: {
      type: Object,
      default() {
        return { data: [], links: [] };
      },
    },
  },
  created() {
    gantt.clearAll(); // 先清空，再添加，就不会有缓存
  },

  mounted: function () {
    gantt.config.date_format = "%Y-%m-%d";
    gantt.config.columns = [
      { name: "text", label: "Task name", width: "*", tree: true },
      { name: "start_date", label: "Start time", align: "center", width: 60 },
      { name: "duration", label: "Duration", align: "center", width: 60 },
      { name: "add", label: "", width: 44 },
    ];
    gantt.config.grid_width = 390;
    gantt.config.date_grid = "%F %d";
    gantt.config.scale_height = 60;
    gantt.config.scales = [
      { unit: "day", step: 1, format: "%d %M" },
      { unit: "week", step: 1, format: "Week #%W" },
    ];

    gantt.config.highlight_critical_path = true;

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
    gantt.init(this.$refs.ganttContainer);
    gantt.parse(this.$props.tasks);
  },
};
</script>

<style>
@import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
</style>

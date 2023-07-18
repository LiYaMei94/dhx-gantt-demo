<template>
  <div ref="ganttRef2" class="gantt-container"></div>
</template>
<script>
import { gantt } from "dhtmlx-gantt";
import { onMounted, ref } from "vue";
import { tasks } from "../mock/tasks.js";
import "../utils/gantt-export-api.js";
export default {
  setup() {
    const ganttRef2 = ref(null);
    gantt.clearAll(); // 先清空，再添加，就不会有缓存
    onMounted(() => {
      gantt.plugins({
        marker: true,
      });

      var dateToStr = gantt.date.date_to_str(gantt.config.task_date);
      var today = new Date();
      gantt.addMarker({
        start_date: today,
        css: "today",
        text: "Today",
        title: "Today: " + dateToStr(today),
      });

      gantt.config.scale_height = 50;
      gantt.config.scales = [
        { unit: "day", step: 1, format: "%j, %D" },
        { unit: "month", step: 1, format: "%F, %Y" },
      ];
      // 初始化甘特图
      gantt.init(ganttRef2.value);
      gantt.parse(tasks);
    });

    return {
      ganttRef2,
    };
  },
};
</script>
<style scoped>
.gantt-container {
  width: 100%;
  height: 100%;
}
</style>
<style>
.gantt_marker {
  background-color: blueviolet;
}
</style>

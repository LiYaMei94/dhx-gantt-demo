<template>
  <div class="gantt_control">
    <!-- <input
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
    /> -->
  </div>
  <div ref="ganttRef3" class="gantt-container"></div>
</template>
<script>
import { gantt } from "dhtmlx-gantt";
import { onMounted, ref } from "vue";
import { tasks } from "../mock/tasks.js";
import { columns } from "../mock/columns.js";
import "../utils/gantt-export-api.js";
import { holidayMap, getExchangeDay } from "../mock/holidays.js";
export default {
  setup() {
    const ganttRef3 = ref(null);

    // // 导出pdf
    // const exportToPDF = () => {
    //   gantt.exportToPDF({
    //     name: "哈哈哈.pdf",
    //   });
    // };

    // // 导出png图片
    // const exportToPNG = () => {
    //   gantt.exportToPNG();
    // };

    // const toggleChart = () => {
    //   gantt.config.show_chart = !gantt.config.show_chart;
    //   gantt.render();
    // };
    gantt.clearAll(); // 先清空，再添加，就不会有缓存
    onMounted(() => {
      gantt.config.min_column_width = 80;

      // 设置甘特图语言
      // gantt.i18n.setLocale("cn");

      // 鼠标悬浮工具提示文本配置
      gantt.plugins({ marker: true });
      gantt.plugins({
        marker: true,
      });

      var dateToStr = gantt.date.date_to_str(gantt.config.task_date);
      var today = new Date(2023, 3, 5);
      gantt.addMarker({
        start_date: today,
        css: "today",
        text: "Today",
        title: "Today: " + dateToStr(today),
      });

      var start = new Date(2023, 2, 28);
      gantt.addMarker({
        start_date: start,
        css: "status_line",
        text: "Start project",
        title: "Start project: " + dateToStr(start),
      });

      // 设置甘特图 progress 表头的时间格式
      // FIXME:gantt.config.date_scale优先级高于gantt.config.scales
      //   gantt.config.date_scale = "%Y-%m-%d";

      // 设置甘特图 progress 表头展示方式
      gantt.config.scale_height = 20 * 3;
      gantt.config.row_height = 30;
      var weekScaleTemplate = function (date) {
        var dateToStr = gantt.date.date_to_str("%m/%d");
        var weekNum = gantt.date.date_to_str("(week %W)");
        var endDate = gantt.date.add(
          gantt.date.add(date, 1, "week"),
          -1,
          "day"
        );
        return (
          dateToStr(date) + " ~ " + dateToStr(endDate) + " " + weekNum(date)
        );
      };

      gantt.config.scales = [
        { unit: "month", step: 1, format: "%Y, %F" },
        // { unit: "week", step: 1, format: weekScaleTemplate },
        { unit: "day", step: 1, format: "星期%D, %m/%d" },
      ];

      // 设置甘特图task中的时间格式
      //   gantt.config.date_format = "%Y-%m-%d";

      // 开始结束时间，如果task中的时间不在当前规定的范围内就不展示
      gantt.config.start_date = new Date("2023-04-01");
      gantt.config.end_date = new Date("2023-12-20");

      // 设置左侧任务栏
      gantt.config.columns = columns;

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
      // gantt.config.layout = {
      //   css: "gantt_container",
      //   rows: [
      //     {
      //       cols: [
      //         { view: "grid", width: "*", scrollY: "scrollVer" },
      //         { resizer: true, width: 1 },
      //         { view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer" },
      //         { resizer: true, width: 1 },
      //         {
      //           view: "grid",
      //           width: 150,
      //           bind: "task",
      //           scrollY: "scrollVer",
      //           config: {
      //             columns: [
      //               {
      //                 name: "status",
      //                 label: "Status",
      //                 width: 60,
      //                 align: "center",
      //                 template: function (task) {
      //                   var progress = task.progress || 0;
      //                   return Math.floor(progress * 100) + "";
      //                 },
      //               },
      //               {
      //                 name: "impact",
      //                 width: 80,
      //                 label: "Impact",
      //                 template: function (task) {
      //                   return (task.duration * 1000).toLocaleString("zh", {
      //                     style: "currency",
      //                     currency: "CNY",
      //                   });
      //                 },
      //               },
      //             ],
      //           },
      //         },
      //         { view: "scrollbar", id: "scrollVer" },
      //       ],
      //     },
      //     { view: "scrollbar", id: "scrollHor", height: 20 },
      //   ],
      // };

      // 标记周末时间
      // gantt.config.work_time = true;
      //   gantt.templates.timeline_cell_class = function (task, date) {
      //     if (!gantt.isWorkTime(date)) return "week_end";
      //     return "";
      //   };

      // 标记周末&节假日
      for (let key in holidayMap) {
        if (holidayMap[key].holiday) {
          gantt.setWorkTime({
            date: new Date(holidayMap[key].date),
            hours: false,
          });
        }
      }
      gantt.templates.timeline_cell_class = function (task, date) {
        var calendar = gantt.getTaskCalendar(task);

        // 踢出周末节假日周末调休
        const exchangeDay = getExchangeDay();
        const flag = exchangeDay.some((item) => {
          return item === date.getTime();
        });

        if (!calendar.isWorkTime(date) && !flag) return "weekend";
        return "";
      };

      gantt.templates.scale_cell_class = function (date) {};

      gantt.config.columns[3].template = function (obj) {
        return "  <b>" + obj.progress * 100 + "%</b>";
      };

      // 初始化甘特图
      gantt.init(ganttRef3.value);

      gantt.parse(tasks);
    });

    return {
      // exportToPDF,
      // exportToPNG,
      // toggleChart,
      ganttRef3,
    };
  },
};
</script>
<style scoped>
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
</style>
<style>
.gantt_task_cell.weekend {
  background-color: #eff5fd;
}

.gantt_task_row.gantt_selected .gantt_task_cell.weekend {
  background-color: #f8ec9c;
}
.status_line {
  background-color: #0ca30a;
}
.gantt_task .gantt_task_scale .gantt_scale_cell {
  /* width: 100px!important; */
}
</style>

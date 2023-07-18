export const columns = [
  {
    name: "text",
    label: "任务名称",
    tree: true,
    width: "220",
    align: "left",
    template: function (obj) {
      return obj.text;
    },
  },
  {
    name: "start_date",
    label: "开始时间",
    width: "80",
    align: "center",
    template: function (obj) {
      return obj.start_date;
    },
  },
  // {
  //     name: "end_date",
  //     label: "结束时间",
  //     width: "*",
  //     align: "center",
  //     template: function (obj) {
  //       return obj.end_date;
  //     },
  //   },
  {
    name: "duration",
    label: "duration",
    width: "40",
    align: "center",
    template: function (obj) {
      return obj.duration;
    },
  },
  {
    name: "progress",
    label: "进度",
    width: "40",
    align: "center",
    template: function (obj) {
      return `${obj.progress * 100}%`;
    },
  },
  { name: "add", width: "40",label: "" },
];

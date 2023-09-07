export const columns = (options) => {
  const { actions, predecessors } = options || {};
  return [
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
    {
      name: "end_date",
      label: "结束时间",
      width: "80",
      align: "center",
      template: function (obj) {
        return obj.end_date;
      },
    },
    {
      name: "predecessors",
      label: "前置任务",
      align: "center",
      resize: true,
      width: 100,
      template: predecessors?.colRender,
    },
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
    {
      name: "actions",
      label: actions?.headerRender,
      width: 175,
      template: actions?.colRender,
    },
  ];
};

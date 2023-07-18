export const tasks = {
  data: [
    {
      id: 1,
      text: "Office itinerancyOffice itinerancyOffice itinerancyOffice itinerancyOffice itinerancy",
      type: gantt.config.types.project,
      progress: 0.8,
      open: true,
      color: "yellow",
    },
    {
      id: 2,
      text: "Office facing",
      type: gantt.config.types.project,
      start_date: "02-06-2023",
      duration: "8",
      progress: 0.6,
      parent: "1",
      open: true,
    },
    {
      id: 3,
      text: "Furniture installation",
      type: gantt.config.types.project,
      start_date: "03-06-2023",
      duration: "8",
      parent: "1",
      progress: 0.6,
      open: true,
    },
    {
      id: 4,
      text: "The employee relocation",
      type: gantt.config.types.project,
      start_date: "04-06-2023",
      duration: "6",
      parent: "1",
      progress: 0.5,
      open: true,
    },
    {
      id: 5,
      text: "Interior office",
      start_date: "05-06-2023",
      duration: "7",
      parent: "2",
      progress: 0.6,
      open: true,
    },
    {
      id: 6,
      text: "Air conditioners check",
      start_date: "06-06-2023",
      duration: "7",
      parent: "2",
      progress: 0.6,
      open: true,
    },
    {
      id: 7,
      text: "Workplaces preparation",
      start_date: "07-06-2023",
      duration: "8",
      parent: "3",
      progress: 0.6,
      open: true,
    },
    {
      id: 8,
      text: "Preparing workplaces",
      start_date: "08-06-2023",
      duration: "5",
      parent: "4",
      progress: 0.5,
      open: true,
    },
    {
      id: 9,
      text: "Workplaces importation",
      start_date: "09-06-2023",
      duration: "4",
      parent: "4",
      progress: 0.5,
      open: true,
    },
    {
      id: 10,
      text: "Workplaces exportation",
      start_date: "10-06-2023",
      duration: "3",
      parent: "4",
      progress: 0.5,
      open: true,
    },
    {
      id: 11,
      text: "Product launch",
      type: gantt.config.types.project,
      progress: 0.6,
      open: true,
    },
    {
      id: 12,
      text: "Perform Initial testing",
      start_date: "11-06-2023",
      duration: "5",
      parent: "11",
      progress: 1,
      open: true,
    },
    {
      id: 13,
      text: "Development",
      type: gantt.config.types.project,
      start_date: "15-06-2023",
      duration: "7",
      parent: "11",
      progress: 0.5,
      open: true,
    },
    {
      id: 14,
      text: "Analysis",
      start_date: "20-06-2023",
      duration: "6",
      parent: "11",
      progress: 0.8,
      open: true,
    },
    {
      id: 15,
      text: "Design",
      type: gantt.config.types.project,
      start_date: "22-06-2023",
      duration: "5",
      parent: "11",
      progress: 0.2,
      open: false,
    },
    {
      id: 16,
      text: "Documentation creation",
      start_date: "23-06-2023",
      duration: "7",
      parent: "11",
      progress: 0,
      open: true,
    },
    {
      id: 17,
      text: "Develop System",
      start_date: "24-06-2023",
      duration: "2",
      parent: "13",
      progress: 1,
      open: true,
    },
    {
      id: 25,
      text: "Beta Release",
      start_date: "13-07-2023",
      type: gantt.config.types.milestone,
      parent: "13",
      progress: 0,
      open: true,
    },
    {
      id: 18,
      text: "Integrate System",
      start_date: "15-07-2023",
      duration: "2",
      parent: "13",
      progress: 0.8,
      open: true,
    },
    {
      id: 19,
      text: "Test",
      start_date: "17-07-2023",
      duration: "4",
      parent: "13",
      progress: 0.2,
      open: true,
    },
    {
      id: 20,
      text: "Marketing",
      start_date: "20-07-2023",
      duration: "4",
      parent: "13",
      progress: 0,
      open: true,
    },
    {
      id: 21,
      text: "Design database",
      start_date: "25-07-2023",
      duration: "4",
      parent: "15",
      progress: 0.5,
      open: true,
    },
    {
      id: 22,
      text: "Software design",
      start_date: "30-07-2023",
      duration: "4",
      parent: "15",
      progress: 0.1,
      open: true,
    },
    {
      id: 23,
      text: "Interface setup",
      start_date: "01-08-2023",
      duration: "5",
      parent: "15",
      progress: 0,
      open: true,
    },
    {
      id: 24,
      text: "Release v1.0",
      start_date: "05-08-2023",
      type: gantt.config.types.milestone,
      parent: "11",
      progress: 0,
      open: true,
    },
  ],
  // { "finish_to_start":"0", "start_to_start":"1", "finish_to_finish":"2", "start_to_finish":"3" }
  links: [
    { id: "1", source: "1", target: "2", type: "0" },
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
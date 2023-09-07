import _ from "lodash";
export const arrToTree = (arr, id, parentId) => {
  const result = [];
  //判断参数是否为数组
  if (!Array.isArray(arr)) {
    return result;
  }
  //防止参数对象数组中，存在children
  arr.forEach((item) => {
    delete item.children;
  });
  //id为key
  let map = new Map();
  arr.forEach((item) => {
    map.set(item[id], item);
  });
  //parentId为父节点
  arr.forEach((item) => {
    if (map.has(item[parentId])) {
      let parent = map.get(item[parentId]);
      (parent.children || (parent.children = [])).push(item);
    } else {
      result.push(item);
    }
  });
  return result;
};

/**
 * @description 根据枚举列表查询当需要的数据（如果指定了 label 和 value 的 key值，会自动识别格式化）
 * @param {String} callValue 当前单元格值
 * @param {Array} enumData 字典列表
 * @param {Array} fieldNames label && value && children 的 key 值
 * @param {String} type 过滤类型（目前只有 tag）
 * @returns {String}
 * */
export const filterEnum = (callValue, enumData, fieldNames, isAll) => {
  const value = fieldNames?.value ?? "value";
  const label = fieldNames?.label ?? "label";
  const children = fieldNames?.children ?? "children";
  let filterData = {};
  // 判断 enumData 是否为数组
  if (Array.isArray(enumData))
    filterData = findItemNested(enumData, callValue, value, children);
  // 判断是否输出的结果为 tag 类型
  if (isAll) {
    return filterData;
  } else {
    return filterData ? filterData[label] : callValue;
  }
};

/**
 * @description 递归查找 callValue 对应的 enum 值
 * */
export const findItemNested = (enumData, callValue, value, children) => {
  return enumData.reduce((accumulator, current) => {
    if (accumulator) return accumulator;
    if (current[value] === callValue) return current;
    if (current[children])
      return findItemNested(current[children], callValue, value, children);
  }, null);
};

export const isNull = (val) => {
  return (
    val === "undefined" ||
    val === undefined ||
    val == null ||
    val === "null" ||
    val.toString().trim() === "" ||
    _.isNaN(val) ||
    val === "unknown"
  );
};

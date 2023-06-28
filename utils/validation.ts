export function isValidUserName(userName: string) {
  // 不能为空
  // 长度不大于10
  const trimmedUserName = userName.trim(); // 去除字符串两端的空格
  if (trimmedUserName && trimmedUserName.length <= 10) {
    return true; // 字符串不为空且长度不大于10
  } else {
    return false; // 字符串为空或长度大于10
  }
}

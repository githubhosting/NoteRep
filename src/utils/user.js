export const getOrCreateUserId = () => {
  let deviceId = localStorage.getItem('userId')
  if (!deviceId) {
    deviceId =
      Math.random().toString(36).substring(2) +
      new Date().getTime().toString(36)
    localStorage.setItem('userId', deviceId)
  }
  return deviceId
}

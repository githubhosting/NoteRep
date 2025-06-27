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

/**
 * Generates a random username using adjective-noun combinations.
 * @returns {string} A random username.
 */
export const generateRandomUsername = () => {
  const adjectives = [
    'Happy',
    'Brave',
    'Clever',
    'Swift',
    'Bright',
    'Calm',
    'Bold',
    'Wise',
    'Gentle',
    'Fierce',
    'Lucky',
    'Proud',
    'Silent',
    'Wild',
    'Cool',
    'Sharp',
    'Vivid',
    'Kind',
    'Strong',
    'Mighty',
    'Sly',
    'Daring',
    'Quiet',
    'Lively',
    'Warm',
    'Chilly',
    'Dark',
    'Light',
    'Golden',
    'Silver',
  ]
  const nouns = [
    'Tiger',
    'Wizard',
    'Star',
    'Fox',
    'Bear',
    'Hawk',
    'Wolf',
    'Lion',
    'Deer',
    'Owl',
    'River',
    'Mountain',
    'Cloud',
    'Storm',
    'Flame',
    'Shadow',
    'Knight',
    'Ranger',
    'Sage',
    'Hunter',
    'Phoenix',
    'Dragon',
    'Eagle',
    'Panther',
    'Raven',
    'Cobra',
    'Falcon',
    'Bison',
    'Moose',
    'Lynx',
  ]

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)]
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]
  return `${randomAdjective}${randomNoun}`
}

/**
 * Gets or creates a random username for an anonymous user.
 * @returns {string} The stored or newly generated random username.
 */
export const getOrCreateRandomUsername = () => {
  let username = localStorage.getItem('randomUsername')
  if (!username) {
    username = generateRandomUsername()
    localStorage.setItem('randomUsername', username)
  }
  return username
}

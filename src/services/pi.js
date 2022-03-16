import { sfold } from '../utils/sfold.js'

const CHALLENGE_SIZE = 5

async function getPI() {
  const response = await fetch('/pi.txt')
  const pi = await response.text()

  return pi
}

export async function getDailyChallenge() {
  const pi = await getPI()
  const date = (new Date()).toDateString()
  const maxLength = pi.length - CHALLENGE_SIZE - 1

  const index = sfold(date, maxLength)

  return pi.substring(index, index + CHALLENGE_SIZE)
}

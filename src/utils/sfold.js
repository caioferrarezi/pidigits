export function sfold(string, multiplier) {
  let sum = 0, mul = 1

  for (let i = 0; i < string.length; i++) {
    mul = (i % 4 == 0) ? 1 : mul * 256
    sum += string.charCodeAt(i) * mul
  }

  return Math.floor(Math.abs(sum) % multiplier)
}

import { randomNumberBetween } from "./randomNumberBetween"

export function randomFromArray(arr) {
    return arr[randomNumberBetween(0, arr.length)]
  }
  
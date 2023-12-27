import { generate } from "silly-animal"

export function useUser() {
  const randomName = generate()

  return randomName;
}

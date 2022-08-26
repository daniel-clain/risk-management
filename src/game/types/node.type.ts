

export type Node_D = {
  id: string
  completed: boolean
  disabled: boolean
}

export type Node_A = {
  [P in keyof Node_D]?: Node_D[P]
} & {
  id: string
  completed: boolean
  disabled: boolean
}
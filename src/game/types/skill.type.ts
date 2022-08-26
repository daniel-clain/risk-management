

export type SkillAreas = 'Star' | 'Square' | 'Triangle' | 'Circle'

type SkillArea = {
  name: SkillAreas
  level: number
}

export type Skill = {
  areas: SkillArea[]
}
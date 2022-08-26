
export type KnowledgeAreas = 'Blue' | 'Yellow' | 'Red' | 'Green'  

type KnowledgeArea = {
  name: KnowledgeAreas
  level: number
}

export type Knowledge = {
  areas: KnowledgeArea[]
}
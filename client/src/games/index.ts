import type { ComponentType } from 'react'
import { EcoLabWeek1, EcoLabWeek2, EcoLabWeek3, EcoLabWeek4 } from './EcoLab'
import { MindLabWeek1, MindLabWeek2, MindLabWeek3, MindLabWeek4 } from './MindLab'
import { ArtLabWeek1, ArtLabWeek2, ArtLabWeek3, ArtLabWeek4 } from './ArtLab'
import { TechLabWeek1, TechLabWeek2, TechLabWeek3, TechLabWeek4 } from './TechLab'
import { LifeLabWeek1, LifeLabWeek2, LifeLabWeek3, LifeLabWeek4 } from './LifeLab'

export interface GameProps {
  groupLevel: string
  onComplete: (score: number) => void
}

type GameMap = Record<string, Record<number, ComponentType<GameProps> | undefined> | undefined>

const GAMES: GameMap = {
  ECO_LAB: {
    1: EcoLabWeek1,
    2: EcoLabWeek2,
    3: EcoLabWeek3,
    4: EcoLabWeek4,
  },
  MIND_LAB: {
    1: MindLabWeek1,
    2: MindLabWeek2,
    3: MindLabWeek3,
    4: MindLabWeek4,
  },
  ART_LAB: {
    1: ArtLabWeek1,
    2: ArtLabWeek2,
    3: ArtLabWeek3,
    4: ArtLabWeek4,
  },
  TECH_LAB: {
    1: TechLabWeek1,
    2: TechLabWeek2,
    3: TechLabWeek3,
    4: TechLabWeek4,
  },
  LIFE_LAB: {
    1: LifeLabWeek1,
    2: LifeLabWeek2,
    3: LifeLabWeek3,
    4: LifeLabWeek4,
  },
}

export function getGame(lab: string, week: number): ComponentType<GameProps> | null {
  return GAMES[lab]?.[week] ?? null
}

export const LAB_ORDER = [
  'ECO_LAB',
  'MIND_LAB',
  'ART_LAB',
  'TECH_LAB',
  'LIFE_LAB',
] as const

export type Lab = (typeof LAB_ORDER)[number]

export const LAB_META: Record<Lab, { label: string; emoji: string; color: string; description: string }> = {
  ECO_LAB:  { label: 'EcoLab',  emoji: '🌿', color: '#22c55e', description: 'Tabiatni asrash va chiqindilarni saralash' },
  MIND_LAB: { label: 'MindLab', emoji: '🧩', color: '#6366f1', description: 'Mantiq o\'yinlari va topishmoqlar' },
  ART_LAB:  { label: 'ArtLab',  emoji: '🎨', color: '#f59e0b', description: 'Rang berish, chizish va kollaj' },
  TECH_LAB: { label: 'TechLab', emoji: '⚙️', color: '#0ea5e9', description: 'Uylar va shaharlar qurish' },
  LIFE_LAB: { label: 'LifeLab', emoji: '🏠', color: '#ec4899', description: 'Kundalik hayot ko\'nikmalari' },
}

export type GroupLevel = 'KICHIK' | 'ORTA' | 'KATTA' | 'TAYYORLOV'

export const LEVEL_ORDER: GroupLevel[] = ['KICHIK', 'ORTA', 'KATTA', 'TAYYORLOV']

export const LEVEL_META: Record<GroupLevel, { label: string; color: string }> = {
  KICHIK:    { label: 'Kichik guruh',    color: '#84cc16' },
  ORTA:      { label: 'O\'rta guruh',    color: '#22c55e' },
  KATTA:     { label: 'Katta guruh',     color: '#16a34a' },
  TAYYORLOV: { label: 'Tayyorlov guruh', color: '#f59e0b' },
}

export const GROUP_EMOJI: Record<string, string> = {
  'Qushcha':       '🐦',
  'Ayiqcha':       '🐻',
  'Xoʻrozcha':     '🐓',
  'Yulduzcha':     '⭐',
  'Momoqaymoq':    '🌼',
  'Chumchuqcha':   '🐤',
  'Quyoncha':      '🐰',
  'Boʻgʻirsoq':    '🍩',
  'Qoʻngʻiroqcha': '🔔',
  'Bulbulcha':     '🎶',
}

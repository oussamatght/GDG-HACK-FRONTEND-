export type World = {
  id: number
  name: string
  theme: string
  colorPalette: {
    primary: string
    secondary: string
    dark: string
    accent: string
  }
  stages: number
  unlocked: boolean
}

export type PlayerStats = {
  hp: number
  maxHp: number
  iq: number
  gold: number
  diamonds: number
  username: string
  avatar: string
  level: "beginner" | "intermediate" | "senior" | "hero"
}

export type Stage = {
  id: number
  worldId: number
  name: string
  stars: number
  completed: boolean
  locked: boolean
  isBoss: boolean
  isFinalBoss: boolean
}

export const WORLDS: World[] = [
  {
    id: 1,
    name: "Inferno Gate",
    theme: "hell",
    colorPalette: {
      primary: "#FF4136",
      secondary: "#FF851B",
      dark: "#85144b",
      accent: "#FFDC00",
    },
    stages: 80,
    unlocked: true,
  },
  {
    id: 2,
    name: "Abyssal Depths",
    theme: "ocean",
    colorPalette: {
      primary: "#0074D9",
      secondary: "#7FDBFF",
      dark: "#001f3f",
      accent: "#39CCCC",
    },
    stages: 80,
    unlocked: false,
  },
  {
    id: 3,
    name: "Scorched Sands",
    theme: "desert",
    colorPalette: {
      primary: "#FFDC00",
      secondary: "#FF851B",
      dark: "#8B4513",
      accent: "#F4D03F",
    },
    stages: 80,
    unlocked: false,
  },
  {
    id: 4,
    name: "Eden Protocol",
    theme: "nature",
    colorPalette: {
      primary: "#2ECC40",
      secondary: "#01FF70",
      dark: "#3D9970",
      accent: "#FFFFFF",
    },
    stages: 80,
    unlocked: false,
  },
]

export const DEFAULT_PLAYER: PlayerStats = {
  hp: 100,
  maxHp: 100,
  iq: 85,
  gold: 0,
  diamonds: 0,
  username: "Player",
  avatar: "/pixel-art-warrior-avatar.png",
  level: "beginner",
}

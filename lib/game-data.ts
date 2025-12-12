export interface Stage {
  id: number
  name: string
  stars: number
  maxStars: number
  locked: boolean
  isBoss: boolean
  isFinalBoss: boolean
  completed: boolean
}

export interface World {
  id: string
  name: string
  level: string
  description: string
  backgroundImage: string
  themeColor: string
  stages: Stage[]
  unlocked: boolean
}

export const worlds: World[] = [
  {
    id: "hell",
    name: "Inferno Core",
    level: "Beginner",
    description: "The heart of the corrupted network. Master the basics of how the Internet works.",
    backgroundImage: "/images/world-hell.gif",
    themeColor: "from-red-900 to-orange-600",
    unlocked: true,
    stages: generateStages(50, "hell"),
  },
  {
    id: "ocean",
    name: "Digital Depths",
    level: "Intermediate",
    description: "Dive into the data streams. Learn HTML, CSS, and responsive design.",
    backgroundImage: "/images/world-ocean1.gif",
    themeColor: "from-blue-900 to-cyan-500",
    unlocked: false,
    stages: generateStages(60, "ocean"),
  },
  {
    id: "desert",
    name: "Ancient Archives",
    level: "Senior",
    description: "Uncover the secrets of JavaScript and modern frameworks.",
    backgroundImage: "/images/world-desert.gif",
    themeColor: "from-yellow-700 to-amber-400",
    unlocked: false,
    stages: generateStages(70, "desert"),
  },
  {
    id: "forest",
    name: "Evercode Grove",
    level: "Hero",
    description: "The final frontier. Master advanced patterns and full-stack development.",
    backgroundImage: "/images/world-ocean.gif",
    themeColor: "from-green-900 to-emerald-500",
    unlocked: false,
    stages: generateStages(80, "forest"),
  },
]

function generateStages(count: number, worldId: string): Stage[] {
  const stages: Stage[] = []
  let bossCounter = 0

  for (let i = 1; i <= count; i++) {
    bossCounter++
    const isBoss = bossCounter >= 7 && bossCounter <= 9 && Math.random() > 0.5
    const isFinalBoss = i === count

    if (isBoss || isFinalBoss) {
      bossCounter = 0
    }

    stages.push({
      id: i,
      name: isFinalBoss ? "Final Boss" : isBoss ? `Mini Boss ${Math.ceil(i / 8)}` : `Stage ${i}`,
      stars: worldId === "hell" && i <= 3 ? Math.floor(Math.random() * 3) + 1 : 0,
      maxStars: 3,
      locked: worldId !== "hell" || i > 4,
      isBoss,
      isFinalBoss,
      completed: worldId === "hell" && i <= 3,
    })
  }

  return stages
}

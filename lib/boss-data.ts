export type Boss = {
  id: string
  name: string
  title: string
  worldId: number
  isFinal: boolean
  hp: number
  difficulty: number
  timeLimit: number // in seconds
  rewards: {
    gold: { min: number; max: number }
    diamonds: { min: number; max: number }
    iq: number
    item?: string
  }
  challenge: {
    title: string
    description: string
    requirements: string[]
  }
}

export const BOSSES: Boss[] = [
  // World 1 - Mini Bosses
  {
    id: "corrupted-tag",
    name: "Corrupted Tag",
    title: "Guardian of Invalid Markup",
    worldId: 1,
    isFinal: false,
    hp: 100,
    difficulty: 3,
    timeLimit: 900, // 15 minutes
    rewards: {
      gold: { min: 30, max: 50 },
      diamonds: { min: 1, max: 3 },
      iq: 4,
    },
    challenge: {
      title: "Fix the Broken Page",
      description: "The Corrupted Tag has scrambled all HTML elements. Fix all validation errors to defeat it.",
      requirements: [
        "Fix all unclosed tags",
        "Correct improper nesting",
        "Add required attributes",
        "Ensure semantic structure",
      ],
    },
  },
  {
    id: "syntax-demon",
    name: "Syntax Demon",
    title: "Lord of Missing Semicolons",
    worldId: 1,
    isFinal: false,
    hp: 120,
    difficulty: 4,
    timeLimit: 1200, // 20 minutes
    rewards: {
      gold: { min: 40, max: 60 },
      diamonds: { min: 2, max: 4 },
      iq: 5,
    },
    challenge: {
      title: "Debug the Stylesheet",
      description: "The Syntax Demon has corrupted all CSS rules. Find and fix every syntax error.",
      requirements: [
        "Fix missing colons and semicolons",
        "Correct property names",
        "Fix invalid values",
        "Ensure proper selector syntax",
      ],
    },
  },
  // World 1 - Final Boss
  {
    id: "inferno-lord",
    name: "Inferno Lord",
    title: "Master of Corrupted Code",
    worldId: 1,
    isFinal: true,
    hp: 200,
    difficulty: 5,
    timeLimit: 7200, // 2 hours
    rewards: {
      gold: { min: 100, max: 200 },
      diamonds: { min: 10, max: 20 },
      iq: 12,
      item: "Knowledge Book: World 1",
    },
    challenge: {
      title: "Personal Portfolio Project",
      description:
        "Build a complete personal portfolio website from scratch. This is your first major project from roadmap.sh!",
      requirements: [
        "Create a responsive header with navigation",
        "Build an about section with your info",
        "Add a projects showcase section",
        "Include a contact form",
        "Ensure mobile responsiveness",
        "Use semantic HTML throughout",
      ],
    },
  },
]

export function getBossById(id: string): Boss | undefined {
  return BOSSES.find((b) => b.id === id)
}

export function getWorldBosses(worldId: number): Boss[] {
  return BOSSES.filter((b) => b.worldId === worldId)
}

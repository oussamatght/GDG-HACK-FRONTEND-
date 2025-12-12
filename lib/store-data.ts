export type StoreItem = {
  id: string
  name: string
  description: string
  category: "clothing" | "weapons" | "consumables" | "special"
  price: number
  currency: "gold" | "diamonds"
  rarity: "common" | "rare" | "epic" | "legendary"
  effect?: string
  owned?: boolean
  image?: string
}

export const STORE_ITEMS: StoreItem[] = [
  // Clothing - using the pixel art characters
  {
    id: "basic-outfit",
    name: "Basic Outfit",
    description: "Starting gear for new coders",
    category: "clothing",
    price: 0,
    currency: "gold",
    rarity: "common",
    image: "/images/chatgpt-20image-20dec-2012-2c-202025-2c-2009-46-49-20ampoi.png",
  },
  {
    id: "archer-outfit",
    name: "Ranger Attire",
    description: "Swift and agile coding gear",
    category: "clothing",
    price: 150,
    currency: "gold",
    rarity: "rare",
    image: "/images/chatgpt-20image-20dec-2012-2c-202025-2c-2009-46-49-20ammnkm.png",
  },
  {
    id: "warrior-outfit",
    name: "Warrior Garb",
    description: "Battle-ready developer attire",
    category: "clothing",
    price: 30,
    currency: "diamonds",
    rarity: "epic",
    image: "/images/chatgpt-20image-20dec-2012-2c-202025-2c-2009-46-49-20amuihhjkl.png",
  },

  // Weapons - using the pixel art weapons
  {
    id: "iron-sword",
    name: "Iron Sword",
    description: "A sturdy blade for bug slaying",
    category: "weapons",
    price: 200,
    currency: "gold",
    rarity: "common",
    effect: "+2% gold drops",
    image: "/images/chatgpt-20image-20dec-2012-2c-202025-2c-2009-49-45-20am.png",
  },
  {
    id: "battle-axe",
    name: "Battle Axe",
    description: "Heavy strikes for tough bugs",
    category: "weapons",
    price: 300,
    currency: "gold",
    rarity: "rare",
    effect: "+5% hint effectiveness",
    image: "/images/chatgpt-20image-20dec-2012-2c-202025-2c-2009-49-45-20amyjfhjg.png",
  },
  {
    id: "golden-shield",
    name: "Golden Shield",
    description: "Protection from code failures",
    category: "weapons",
    price: 50,
    currency: "diamonds",
    rarity: "epic",
    effect: "-10% HP loss on fail",
    image: "/images/chatgpt-20image-20dec-2012-2c-202025-2c-2009-49-45-20amyiui.png",
  },

  // Consumables - using the potion
  {
    id: "health-potion",
    name: "Health Potion",
    description: "Restore your coding stamina",
    category: "consumables",
    price: 25,
    currency: "gold",
    rarity: "common",
    effect: "+50 HP",
    image: "/images/dffsdf.png",
  },
  {
    id: "mega-potion",
    name: "Mega Potion",
    description: "Full health restoration",
    category: "consumables",
    price: 10,
    currency: "diamonds",
    rarity: "rare",
    effect: "+100 HP",
    image: "/images/dffsdf.png",
  },
  {
    id: "hint-potion",
    name: "Hint Potion",
    description: "Reveals one hint in challenges",
    category: "consumables",
    price: 30,
    currency: "gold",
    rarity: "common",
    effect: "Reveals 1 hint",
    image: "/images/dffsdf.png",
  },

  // Special items
  {
    id: "lucky-charm",
    name: "Lucky Charm",
    description: "Fortune favors the prepared",
    category: "special",
    price: 15,
    currency: "diamonds",
    rarity: "rare",
    effect: "+10% item drop rate (1 hour)",
  },
  {
    id: "focus-crystal",
    name: "Focus Crystal",
    description: "Enhanced concentration",
    category: "special",
    price: 100,
    currency: "gold",
    rarity: "rare",
    effect: "+1 star bonus (3 stages)",
  },
  {
    id: "wisdom-scroll",
    name: "Wisdom Scroll",
    description: "Ancient knowledge revealed",
    category: "special",
    price: 20,
    currency: "diamonds",
    rarity: "epic",
    effect: "+2 IQ on next boss",
  },
]

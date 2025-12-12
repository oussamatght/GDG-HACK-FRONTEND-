import { useState } from 'react';
import { Coins, Diamond, Sparkles, Heart, Zap, Shield, Sword, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StoreItem {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: 'gold' | 'diamond';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  icon: React.ReactNode;
  category: 'consumables' | 'cosmetics' | 'boosts';
}

const storeItems: StoreItem[] = [
  {
    id: '1',
    name: 'Health Potion',
    description: 'Restore 25 HP instantly',
    price: 50,
    currency: 'gold',
    rarity: 'common',
    icon: <Heart className="w-6 h-6" />,
    category: 'consumables',
  },
  {
    id: '2',
    name: 'Hint Pack (3)',
    description: 'Get 3 extra hints for stages',
    price: 100,
    currency: 'gold',
    rarity: 'common',
    icon: <Sparkles className="w-6 h-6" />,
    category: 'consumables',
  },
  {
    id: '3',
    name: 'Time Extender',
    description: 'Add 2 extra minutes to timer',
    price: 75,
    currency: 'gold',
    rarity: 'rare',
    icon: <Zap className="w-6 h-6" />,
    category: 'boosts',
  },
  {
    id: '4',
    name: 'Shield of Focus',
    description: 'Prevent HP loss on next failure',
    price: 5,
    currency: 'diamond',
    rarity: 'epic',
    icon: <Shield className="w-6 h-6" />,
    category: 'boosts',
  },
  {
    id: '5',
    name: 'Pixel Sword',
    description: 'Cosmetic weapon for your avatar',
    price: 10,
    currency: 'diamond',
    rarity: 'epic',
    icon: <Sword className="w-6 h-6" />,
    category: 'cosmetics',
  },
  {
    id: '6',
    name: 'Golden Crown',
    description: 'Legendary cosmetic headgear',
    price: 25,
    currency: 'diamond',
    rarity: 'legendary',
    icon: <Crown className="w-6 h-6" />,
    category: 'cosmetics',
  },
];

const rarityColors = {
  common: 'border-muted-foreground/30 bg-muted/20',
  rare: 'border-blue-500/50 bg-blue-500/10',
  epic: 'border-purple-500/50 bg-purple-500/10',
  legendary: 'border-gold/50 bg-gold/10',
};

const rarityGlow = {
  common: '',
  rare: 'shadow-blue-500/20',
  epic: 'shadow-purple-500/20',
  legendary: 'shadow-gold/30 shadow-lg',
};

export const StorePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [userGold] = useState(1250);
  const [userDiamonds] = useState(15);

  const filteredItems = selectedCategory === 'all' 
    ? storeItems 
    : storeItems.filter(item => item.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'consumables', label: 'Consumables' },
    { id: 'boosts', label: 'Boosts' },
    { id: 'cosmetics', label: 'Cosmetics' },
  ];

  return (
    <div className="space-y-6">
      {/* Header with currency */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-pixel text-2xl text-primary mb-1">STORE</h1>
          <p className="text-muted-foreground text-sm">Upgrade your journey with items and boosts</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2">
            <Coins className="w-5 h-5 text-gold" />
            <span className="font-pixel text-gold">{userGold}</span>
          </div>
          <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2">
            <Diamond className="w-5 h-5 text-diamond" />
            <span className="font-pixel text-diamond">{userDiamonds}</span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm transition-all border',
              selectedCategory === cat.id
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card border-border text-muted-foreground hover:text-foreground hover:border-primary/50'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className={cn(
              'relative p-4 rounded-xl border-2 transition-all hover:scale-[1.02]',
              rarityColors[item.rarity],
              rarityGlow[item.rarity]
            )}
          >
            {/* Rarity badge */}
            <span className={cn(
              'absolute top-2 right-2 text-[10px] font-pixel uppercase px-2 py-0.5 rounded',
              item.rarity === 'legendary' && 'bg-gold/20 text-gold',
              item.rarity === 'epic' && 'bg-purple-500/20 text-purple-400',
              item.rarity === 'rare' && 'bg-blue-500/20 text-blue-400',
              item.rarity === 'common' && 'bg-muted text-muted-foreground'
            )}>
              {item.rarity}
            </span>

            {/* Icon */}
            <div className={cn(
              'w-12 h-12 rounded-lg flex items-center justify-center mb-3',
              item.rarity === 'legendary' && 'bg-gold/20 text-gold',
              item.rarity === 'epic' && 'bg-purple-500/20 text-purple-400',
              item.rarity === 'rare' && 'bg-blue-500/20 text-blue-400',
              item.rarity === 'common' && 'bg-muted text-muted-foreground'
            )}>
              {item.icon}
            </div>

            {/* Info */}
            <h3 className="font-pixel text-sm text-foreground mb-1">{item.name}</h3>
            <p className="text-xs text-muted-foreground mb-4">{item.description}</p>

            {/* Price & Buy */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {item.currency === 'gold' ? (
                  <Coins className="w-4 h-4 text-gold" />
                ) : (
                  <Diamond className="w-4 h-4 text-diamond" />
                )}
                <span className={cn(
                  'font-pixel text-sm',
                  item.currency === 'gold' ? 'text-gold' : 'text-diamond'
                )}>
                  {item.price}
                </span>
              </div>
              <button className="pixel-btn bg-primary text-primary-foreground px-4 py-1 text-xs">
                BUY
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

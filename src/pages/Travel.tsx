import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, DollarSign, Clock, Users } from 'lucide-react';

const cities = [
  {
    name: 'Phnom Penh',
    country: 'Cambodia',
    status: 'Current Base',
    duration: '8+ months',
    cost: '$600/month',
    highlights: ['Raw energy', 'Low cost', 'Growing tech scene', 'Easy visa'],
    description: 'Cambodia\'s capital is experiencing rapid growth. The entrepreneurial energy is infectious, costs are low, and the government is surprisingly tech-friendly.',
    sleep: 'BKK1 area, $300-500/month for decent 1BR',
    eat: 'Street food $1-2, nice restaurants $5-10',
    workout: 'Fitness First, outdoor running along riverside',
    meet: 'Impact Hub, various co-working spaces, expat Facebook groups',
    lessons: 'Patience required for infrastructure. Banking can be challenging for foreigners. Rainy season is serious.',
    image: '/api/placeholder/400/250'
  },
  {
    name: 'Bangkok',
    country: 'Thailand',
    status: 'Regular Visits',
    duration: '2-3 weeks/quarter',
    cost: '$1200/month',
    highlights: ['World-class infrastructure', 'Amazing food', 'Great healthcare', 'Easy travel hub'],
    description: 'Still the gold standard for digital nomads in SEA. More expensive than Cambodia but infrastructure and convenience are unmatched.',
    sleep: 'Sukhumvit area, $600-1000/month for serviced apartments',
    eat: 'Street food $2-3, high-end dining $15-30',
    workout: 'Virgin Active, Fitness First, great parks for running',
    meet: 'HUBBA-TO, various co-working spaces, strong startup community',
    lessons: 'Visa runs every 30-60 days. Traffic is brutal. Worth the higher cost for comfort.',
    image: '/api/placeholder/400/250'
  },
  {
    name: 'Ho Chi Minh City',
    country: 'Vietnam',
    status: 'Exploring',
    duration: '2 weeks',
    cost: '$800/month',
    highlights: ['Incredible food scene', 'Motivated young workforce', 'Growing startup ecosystem'],
    description: 'Vietnam\'s tech hub. More structured than Cambodia, less expensive than Thailand. Strong engineering talent.',
    sleep: 'District 1 or 3, $400-700/month',
    eat: 'Phenomenal street food $1-2, Western $8-15',
    workout: 'California Fitness, many outdoor options',
    meet: 'Dreamplex, HCMC startup community events',
    lessons: 'Visa process more complex. Language barrier higher. Amazing coffee culture.',
    image: '/api/placeholder/400/250'
  }
];

const Travel = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Travel</h1>
        <p className="text-content-muted font-content text-lg leading-relaxed">
          Living and building across Southeast Asia. 
          Practical notes on costs, logistics, and what it's really like 
          to run a business while constantly moving.
        </p>
      </div>

      <div className="grid gap-8">
        {cities.map((city) => (
          <Card key={city.name} className="p-8 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-semibold text-foreground">{city.name}</h2>
                  <Badge variant="outline" className="text-xs">
                    {city.country}
                  </Badge>
                </div>
                <div className="flex items-center gap-6 text-sm text-content-muted">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {city.status}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {city.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    {city.cost}
                  </div>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="flex flex-wrap gap-2">
              {city.highlights.map((highlight) => (
                <Badge key={highlight} variant="secondary" className="text-xs">
                  {highlight}
                </Badge>
              ))}
            </div>

            {/* Description */}
            <p className="text-content font-content leading-relaxed">
              {city.description}
            </p>

            {/* Practical Info Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Sleep
                  </h4>
                  <p className="text-sm text-content-muted">{city.sleep}</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Eat</h4>
                  <p className="text-sm text-content-muted">{city.eat}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Workout</h4>
                  <p className="text-sm text-content-muted">{city.workout}</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Meet</h4>
                  <p className="text-sm text-content-muted">{city.meet}</p>
                </div>
              </div>
            </div>

            {/* Lessons Learned */}
            <div className="pt-4 border-t border-border">
              <h4 className="font-medium text-foreground mb-2">Costs & Lessons Learned</h4>
              <p className="text-sm text-content font-content leading-relaxed">
                {city.lessons}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Travel;
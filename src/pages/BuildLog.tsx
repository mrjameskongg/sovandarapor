import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Minus, Calendar, DollarSign, Users, Target } from 'lucide-react';

const buildUpdates = [
  {
    date: '2024-01-15',
    revenue: '$18,500',
    revenueChange: '+12%',
    trend: 'up' as const,
    team: '8 people',
    kpis: [
      { label: 'MRR', value: '$18,500', change: '+12%' },
      { label: 'Customers', value: '47', change: '+8%' },
      { label: 'Churn', value: '3.2%', change: '-1.1%' },
      { label: 'CAC', value: '$340', change: '+5%' }
    ],
    shipped: [
      'Multi-currency payment processing for Cambodia/Thailand',
      'SMS notifications in Khmer and Thai',
      'Automated invoice generation',
      'Customer dashboard redesign'
    ],
    blockers: [
      'Banking integration delays in Cambodia',
      'Regulatory approval taking longer than expected',
      'Need senior frontend engineer'
    ],
    nextBets: [
      'Launch beta in Ho Chi Minh City',
      'Add QR code payment option',
      'Build mobile app MVP',
      'Hire country manager for Vietnam'
    ]
  },
  {
    date: '2023-12-28',
    revenue: '$16,500',
    revenueChange: '+40%',
    trend: 'up' as const,
    team: '6 people',
    kpis: [
      { label: 'MRR', value: '$16,500', change: '+40%' },
      { label: 'Customers', value: '43', change: '+25%' },
      { label: 'Churn', value: '4.3%', change: '+0.8%' },
      { label: 'CAC', value: '$325', change: '-15%' }
    ],
    shipped: [
      'Cambodia market launch',
      'Hired 3 engineers in Phnom Penh',
      'Local banking partnerships established',
      'Khmer language support'
    ],
    blockers: [
      'Slower adoption than Thailand',
      'Need more local market knowledge',
      'Cash-heavy economy challenges'
    ],
    nextBets: [
      'Focus on SME education',
      'Partner with local business associations',
      'Add cash-to-digital on-ramps',
      'Explore Vietnam expansion'
    ]
  },
  {
    date: '2023-11-30',
    revenue: '$11,800',
    revenueChange: '+15%',
    trend: 'up' as const,
    team: '4 people',
    kpis: [
      { label: 'MRR', value: '$11,800', change: '+15%' },
      { label: 'Customers', value: '34', change: '+21%' },
      { label: 'Churn', value: '3.5%', change: '-2.1%' },
      { label: 'CAC', value: '$380', change: '+12%' }
    ],
    shipped: [
      'Thai language interface',
      'Local payment methods integration',
      'Customer onboarding flow redesign',
      'Basic analytics dashboard'
    ],
    blockers: [
      'Payment processor integration challenges',
      'Need better customer support in local language',
      'Compliance documentation backlog'
    ],
    nextBets: [
      'Expand to Cambodia',
      'Build referral program',
      'Add automated bookkeeping features',
      'Hire local business development'
    ]
  }
];

const BuildLog = () => {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Build Log</h1>
        <p className="text-content-muted font-content text-lg leading-relaxed">
          Monthly updates on building a fintech product for SMEs across Southeast Asia. 
          Revenue, team growth, what shipped, current blockers, and next bets.
        </p>
      </div>

      <div className="space-y-8">
        {buildUpdates.map((update) => (
          <Card key={update.date} className="p-8 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-content-muted" />
                <h2 className="text-xl font-semibold text-foreground">{update.date}</h2>
                <Badge variant="outline" className="flex items-center gap-1">
                  {getTrendIcon(update.trend)}
                  {update.revenueChange}
                </Badge>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 text-2xl font-bold text-gold">
                  <DollarSign className="w-6 h-6" />
                  {update.revenue}
                </div>
                <div className="flex items-center gap-1 text-sm text-content-muted">
                  <Users className="w-3 h-3" />
                  {update.team}
                </div>
              </div>
            </div>

            {/* KPIs Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {update.kpis.map((kpi) => (
                <div key={kpi.label} className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-xs text-content-muted mb-1">{kpi.label}</div>
                  <div className="font-semibold text-foreground">{kpi.value}</div>
                  <div className="text-xs text-content-muted">{kpi.change}</div>
                </div>
              ))}
            </div>

            {/* Content Sections */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Shipped */}
              <div>
                <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4 text-green-500" />
                  What Shipped
                </h4>
                <ul className="space-y-2">
                  {update.shipped.map((item, index) => (
                    <li key={index} className="text-sm text-content-muted flex items-start gap-2">
                      <span className="text-green-500 mt-1.5">•</span>
                      <span className="font-content">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Blockers */}
              <div>
                <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <Minus className="w-4 h-4 text-red-500" />
                  Current Blockers
                </h4>
                <ul className="space-y-2">
                  {update.blockers.map((item, index) => (
                    <li key={index} className="text-sm text-content-muted flex items-start gap-2">
                      <span className="text-red-500 mt-1.5">•</span>
                      <span className="font-content">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Next Bets */}
              <div>
                <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-gold" />
                  Next Bets
                </h4>
                <ul className="space-y-2">
                  {update.nextBets.map((item, index) => (
                    <li key={index} className="text-sm text-content-muted flex items-start gap-2">
                      <span className="text-gold mt-1.5">•</span>
                      <span className="font-content">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BuildLog;
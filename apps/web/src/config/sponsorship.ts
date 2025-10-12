import {
  Heart,
  Zap,
  Trophy,
  Sparkles,
  Github,
  type LucideIcon,
} from 'lucide-react'

export interface SponsorshipTier {
  name: string
  price: string
  icon: LucideIcon
  color: string
  bgColor: string
  emailColor: string
  emailBgColor: string
  popular?: boolean
  benefits: string[]
}

export interface QuickLink {
  title: string
  description: string
  icon: LucideIcon
  href: string
  color: string
}

export const sponsorshipTiers: SponsorshipTier[] = [
  {
    name: 'Bronze',
    price: '$50',
    icon: Heart,
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-50 dark:bg-orange-950/20',
    emailColor: '#ea580c',
    emailBgColor: '#fff7ed',
    benefits: [
      'Your name in our README',
      'Sponsor badge on profile',
      'Early access to new features',
      'Community discord access',
    ],
  },
  {
    name: 'Silver',
    price: '$100',
    icon: Zap,
    color: 'text-slate-600 dark:text-slate-300',
    bgColor: 'bg-slate-50 dark:bg-slate-950/20',
    emailColor: '#475569',
    emailBgColor: '#f8fafc',
    popular: true,
    benefits: [
      'Everything in Bronze',
      'Logo in project documentation',
      'Priority issue responses',
      'Monthly sponsor newsletter',
      'Request features',
    ],
  },
  {
    name: 'Gold',
    price: '$250',
    icon: Trophy,
    color: 'text-yellow-600 dark:text-yellow-400',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
    emailColor: '#ca8a04',
    emailBgColor: '#fefce8',
    benefits: [
      'Everything in Silver',
      'Logo on project homepage',
      'Dedicated support channel',
      'Quarterly video calls',
      'Custom integration assistance',
      'Company listing',
    ],
  },
  {
    name: 'Platinum',
    price: '$500+',
    icon: Sparkles,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-950/20',
    emailColor: '#9333ea',
    emailBgColor: '#faf5ff',
    benefits: [
      'Everything in Gold',
      'Premium logo placement',
      'Custom development hours',
      'Private consulting sessions',
      'Influence project roadmap',
      'Exclusive partnership status',
    ],
  },
]

export const quickLinks: QuickLink[] = [
  {
    title: 'Buy Me a Coffee',
    description: 'One-time contributions welcome',
    icon: Heart,
    href: 'https://www.buymeacoffee.com/rijvi.mahmud',
    color: 'text-yellow-600 dark:text-yellow-400',
  },
  {
    title: 'GitHub Repository',
    description: 'Star us on GitHub',
    icon: Github,
    href: 'https://github.com/rijvi-mahmud/shaddy',
    color: 'text-gray-900 dark:text-white',
  },
]

export const tierOptions = [
  { value: 'general', text: 'General Inquiry' },
  { value: 'Bronze', text: 'Bronze - $50/month' },
  { value: 'Silver', text: 'Silver - $100/month' },
  { value: 'Gold', text: 'Gold - $250/month' },
  { value: 'Platinum', text: 'Platinum - $500+/month' },
]

// Helper function to get tier data by name
export function getTierByName(tierName: string): SponsorshipTier | undefined {
  return sponsorshipTiers.find((tier) => tier.name === tierName)
}

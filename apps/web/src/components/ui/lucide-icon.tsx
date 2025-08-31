import { icons } from 'lucide-react'

export const LucideIcon = ({
  name,
  color,
  size,
  className,
}: {
  name: keyof typeof icons
  color: string
  size: number
  className?: string
}) => {
  const Icon = icons[name as keyof typeof icons]

  return <Icon color={color} size={size} className={className} />
}

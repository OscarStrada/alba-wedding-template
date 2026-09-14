import { cn } from '../../lib/utils'

interface DividerProps {
  className?: string
  width?: string
}

export function Divider({ className, width = 'w-16' }: DividerProps) {
  return <div className={cn(width, 'h-px bg-alba-ink/30', className)} />
}

export function Ornament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 20"
      className={cn('h-4 w-14 text-alba-ink/50', className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line x1="0" y1="10" x2="22" y2="10" stroke="currentColor" strokeWidth="1" />
      <circle cx="30" cy="10" r="3" stroke="currentColor" strokeWidth="1" />
      <line x1="38" y1="10" x2="60" y2="10" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

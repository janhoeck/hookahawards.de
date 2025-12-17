type TimeUnitProps = {
  value: number
  label: string
}

export const TimeUnit = ({ value, label }: TimeUnitProps) => (
  <div className='flex min-w-[80px] flex-col items-center justify-center'>
    <div className='text-foreground mb-1 text-4xl font-bold tabular-nums md:text-6xl'>
      {String(value).padStart(2, '0')}
    </div>
    <div className='text-muted-foreground text-xs font-light tracking-[0.3em] uppercase md:text-sm'>{label}</div>
  </div>
)

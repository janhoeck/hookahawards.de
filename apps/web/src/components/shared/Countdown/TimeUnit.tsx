type TimeUnitProps = {
  value: number
  label: string
}

export const TimeUnit = ({ value, label }: TimeUnitProps) => (
  <div className='flex flex-col items-center justify-center min-w-[80px]'>
    <div className='text-5xl md:text-6xl font-bold text-foreground mb-1 tabular-nums'>
      {String(value).padStart(2, '0')}
    </div>
    <div className='text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground font-light'>{label}</div>
  </div>
)

import { Headline } from '@/components/shared/Headline'

export const ImprintView = () => {
  return (
    <div className='text-muted-foreground container mx-auto max-w-6xl'>
      <Headline>Impressum</Headline>
      <div className='space-y-2'>
        <div>Aykut_Hookah - Aykut Sakarkaya</div>
        <div>c/o Online-Impressum.de #5231</div>
        <div>Europaring 90</div>
        <div>53757 Sankt Augustin</div>
      </div>
      <br />
      <div>E-Mail: aykut-hookah@mail.online-impressum.de</div>
      <br />
      <div className='space-y-2'>
        <div>Zuständige Regulierungs- und Aufsichtsbehörde:</div>
        <div>Medienanstalt Rheinland-Pfalz</div>
        <div>Sitz: Deutschland</div>
      </div>
      <br />
      <div className='text-muted-foreground'>
        Kein Umsatzsteuerausweis aufgrund Anwendung der Kleinunternehmerregelung gemäß § 19 UStG.
      </div>
    </div>
  )
}

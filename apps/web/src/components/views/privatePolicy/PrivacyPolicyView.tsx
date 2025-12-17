import { Headline } from '@/components/shared/Headline'
import { H2, H3, List, P, Small } from '@janhoeck/ui'

export const PrivacyPolicyView = () => {
  return (
    <div className='container mx-auto max-w-6xl'>
      <Headline>Datenschutz</Headline>

      <div className='space-y-4'>
        <section>
          <H2>1. Verantwortlicher</H2>
          <div className='text-muted-foreground space-y-1'>
            <div>Aykut_Hookah - Aykut Sakarkaya</div>
            <div>c/o Online-Impressum.de #5231</div>
            <div>Europaring 90</div>
            <div>53757 Sankt Augustin</div>
          </div>
        </section>

        <section>
          <H2>2. Allgemeine Hinweise zur Datenverarbeitung</H2>
          <P className='text-muted-foreground'>
            Wir verarbeiten personenbezogene Daten der Nutzer unserer Website nur, soweit dies zur Bereitstellung einer
            funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist. Die Verarbeitung
            personenbezogener Daten erfolgt regelmäßig nur nach Einwilligung des Nutzers oder wenn die Verarbeitung
            durch gesetzliche Vorschriften gestattet ist.
          </P>
        </section>

        <section>
          <H2>3. Datenverarbeitung bei Nutzung „Login mit Twitch“</H2>
          <H3 className='ml-4'>3.1 Anbieter</H3>
          <P className='text-muted-foreground ml-4'>
            Der Login-Dienst wird bereitgestellt von: <br />
            <strong>Twitch Interactive, Inc.</strong> <br />
            350 Bush Street, 2nd Floor <br />
            San Francisco, CA 94104, USA
          </P>
          <P className='text-muted-foreground ml-4'>
            Datenschutzerklärung Twitch: https://www.twitch.tv/p/de-de/legal/privacy-notice/
          </P>

          <H3 className='ml-4'>3.2 Zweck der Verarbeitung</H3>
          <P className='text-muted-foreground ml-4'>
            Die Verarbeitung der Daten erfolgt zum Zweck der Authentifizierung des Nutzers, zur Bereitstellung eines
            Nutzerkontos und ggf. zur Speicherung von nutzerbezogenen Einstellungen.
          </P>

          <H3 className='ml-4'>3.3 Umfang der verarbeiteten Daten</H3>
          <P className='text-muted-foreground ml-4'>Wir erhalten je nach Benutzerfreigabe folgende Daten von Twitch:</P>
          <List className='text-muted-foreground ml-10 list-disc'>
            <li>Twitch User-ID</li>
            <li>Benutzername</li>
            <li>Avatar/Profilbild</li>
            <li>E-Mail-Adresse (falls durch Nutzer freigegeben)</li>
            <li>Weitere freigegebene Profildaten</li>
          </List>

          <H3 className='ml-4'>3.4 Rechtsgrundlage</H3>
          <P className='text-muted-foreground ml-4'>
            Die Verarbeitung erfolgt gemäß <strong>Art. 6 Abs. 1 lit. b DSGVO</strong>, sofern die Anmeldung der
            Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen dient. In allen anderen Fällen erfolgt die
            Verarbeitung auf Grundlage der <strong>Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO</strong>.
          </P>

          <H3 className='ml-4'>3.5 Speicherdauer</H3>
          <P className='text-muted-foreground ml-4'>
            Wir speichern die erhaltenen Daten nur so lange, wie sie für die Bereitstellung unserer Dienste erforderlich
            sind oder bis der Nutzer sein Konto löscht.
          </P>

          <H3 className='ml-4'>3.6 Widerruf der Einwilligung / Löschen des Accounts</H3>
          <P className='text-muted-foreground ml-4'>
            Nutzer können ihre Einwilligung jederzeit widerrufen und die Löschung ihres Accounts verlangen. Eine
            formlose Mitteilung an die oben genannte Kontaktadresse genügt.
          </P>
        </section>

        <section>
          <H2>4. Server-Logfiles</H2>
          <P className='text-muted-foreground'>Bei jedem Zugriff werden folgende Daten automatisch gespeichert:</P>
          <List className='text-muted-foreground list-disc'>
            <li>IP-Adresse</li>
            <li>Datum und Uhrzeit</li>
            <li>Browsertyp und -version</li>
            <li>Verwendetes Betriebssystem</li>
            <li>Referrer URL</li>
          </List>
          <P className='text-muted-foreground'>Die Daten werden nach spätestens 30 Tagen gelöscht.</P>
        </section>

        <section>
          <H2>5. Cookies</H2>
          <P className='text-muted-foreground'>
            Falls Cookies verwendet werden, informieren wir hierüber und holen erforderliche Einwilligungen ein.
          </P>
        </section>

        <section>
          <H2>6. Rechte der betroffenen Personen</H2>
          <List className='text-muted-foreground list-disc'>
            <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
            <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
            <li>Recht auf Löschung (Art. 17 DSGVO)</li>
            <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Recht auf Widerspruch (Art. 21 DSGVO)</li>
            <li>Recht auf Beschwerde (Art. 77 DSGVO)</li>
          </List>
        </section>

        <section>
          <H2>7. Kontakt für Datenschutzanfragen</H2>
          <P className='text-muted-foreground'>Bitte wenden Sie sich an die oben genannte Kontaktadresse.</P>
        </section>

        <Small className='text-muted-foreground pt-4'>Stand: Dezember 2025</Small>
      </div>
    </div>
  )
}

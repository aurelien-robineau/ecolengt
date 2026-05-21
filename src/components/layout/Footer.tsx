import { siteConfig } from '@/config/site'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer id="contact" className="bg-foreground py-20 text-foreground-subtle">
      <Container>
        <div className="mb-14">
          <Logo variant="white" href={undefined} className="mb-5 max-h-11" />
          <p className="font-serif text-base text-surface-muted">{siteConfig.name}</p>
          <p className="font-serif text-base text-surface-muted">{siteConfig.subtitle}</p>
        </div>

        <div className="mb-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
          <div>
            <h4 className="mb-6 text-[11px] tracking-[0.2em] text-brand uppercase">Adresse</h4>
            <address className="text-sm not-italic leading-8">
              {siteConfig.address.street}
              <br />
              {siteConfig.address.city}
            </address>
          </div>

          <div>
            <h4 className="mb-6 text-[11px] tracking-[0.2em] text-brand uppercase">Contact</h4>
            {siteConfig.contact.phones.map((phone) => (
              <a
                key={phone.href}
                href={phone.href}
                className="block text-sm leading-8 text-foreground-subtle no-underline transition-colors hover:text-brand"
              >
                {phone.display}
              </a>
            ))}
            <a
              href={siteConfig.contact.email.href}
              className="mt-2 block text-sm leading-8 text-foreground-subtle no-underline transition-colors hover:text-brand"
            >
              {siteConfig.contact.email.display}
            </a>
          </div>

          <div>
            <h4 className="mb-6 text-[11px] tracking-[0.2em] text-brand uppercase">
              Réseaux sociaux
            </h4>
            <a
              href={siteConfig.social.instagram}
              className="block text-sm leading-8 no-underline transition-colors hover:text-brand"
            >
              Instagram
            </a>
            <a
              href={siteConfig.social.facebook}
              className="block text-sm leading-8 no-underline transition-colors hover:text-brand"
            >
              Facebook
            </a>
          </div>
        </div>

        <div className="border-t border-[#222] pt-8">
          <p className="text-xs text-[#606060]">
            © {year} {siteConfig.name} — {siteConfig.subtitle}
          </p>
        </div>
      </Container>
    </footer>
  )
}

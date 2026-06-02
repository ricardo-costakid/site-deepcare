import Image from 'next/image'

const FOOTER_LINKS = [
  { label: 'Soluções',      href: '#solucoes' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Mentoria',      href: '#mentoria' },
  { label: 'Sobre',         href: '#sobre' },
]

export default function Footer() {
  return (
    <footer className="bg-bg-dark border-t border-brand-green/10 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">

          {/* Logo + location */}
          <div className="flex flex-col gap-2">
            <Image
              src="/logo/deepcare-sidebar-dark.svg"
              alt="DeepCare Analytics"
              height={28}
              width={125}
            />
            <p className="text-text-secondary text-xs mt-1">São José do Rio Preto – SP</p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            {FOOTER_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="text-text-secondary text-sm hover:text-text-primary transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </nav>

        </div>

        <div className="mt-8 pt-6 border-t border-brand-green/10 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-text-secondary text-xs">
            © 2026 DeepCare Analytics · São José do Rio Preto – SP
          </p>
          <p className="text-text-secondary text-xs">deepcareanalytics.com</p>
        </div>
      </div>
    </footer>
  )
}

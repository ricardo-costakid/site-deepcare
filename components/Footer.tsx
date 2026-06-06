import Image from 'next/image'

const FOOTER_LINKS = [
  { label: 'Soluções',      href: '#solucoes' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Mentoria',      href: '#mentoria' },
  { label: 'Sobre',         href: '#sobre' },
]

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border-subtle py-12">
      <div className="max-w-[1200px] mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Coluna 1 — Logo + descrição */}
          <div className="flex flex-col gap-3">
            <Image
              src="/logo/deepcare-logo-clara.svg"
              alt="DeepCare Analytics"
              height={28}
              width={140}
            />
            <p className="text-sm" style={{ color: '#555555' }}>
              Inteligência artificial implementada com ética, segurança e resultado mensurável.
            </p>
          </div>

          {/* Coluna 2 — Navegação */}
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium" style={{ color: '#111111' }}>Navegação</p>
            <nav className="flex flex-col gap-2">
              {FOOTER_LINKS.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="text-[14px] text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Coluna 3 — Contato */}
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium mb-3" style={{ color: '#111111' }}>Contato</p>
            <a
              href="mailto:contato@deepcareanalytics.com"
              className="text-[14px] hover:opacity-80 transition-opacity"
              style={{ color: '#5B8F7A' }}
            >
              contato@deepcareanalytics.com
            </a>
            <a
              href="https://wa.me/5517992449351?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20DeepCare%20e%20quero%20mais%20informa%C3%A7%C3%B5es."
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] hover:opacity-80 transition-opacity"
              style={{ color: '#5B8F7A' }}
            >
              (17) 99244-9351
            </a>
            <a
              href="https://linkedin.com/in/ricardo-costa-139780ba"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] hover:opacity-80 transition-opacity"
              style={{ color: '#5B8F7A' }}
            >
              LinkedIn
            </a>
          </div>

        </div>

        <div className="mt-10 pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-[13px] text-text-muted">
            © 2026 DeepCare Analytics · São José do Rio Preto – SP
          </p>
          <p className="text-[13px] text-text-muted">deepcareanalytics.com</p>
        </div>

      </div>
    </footer>
  )
}

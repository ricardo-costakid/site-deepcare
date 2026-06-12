import { BarChart2, Eye } from 'lucide-react'

export default function EntrarPage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center px-6 py-12">

      <img
        src="/logo/deepcare-logo-dark.svg"
        alt="DeepCare Analytics"
        style={{ height: "70px", width: "auto", display: "block" }}
      />

      <h1
        className="mt-10 text-center"
        style={{ fontSize: "48px", fontWeight: 600, color: "#ffffff", letterSpacing: "-1px", fontFamily: "'Inter', sans-serif", lineHeight: 1.1 }}
      >
        Soluções AI First da DeepCare Analytics
      </h1>

      <p
        className="mt-3 text-center"
        style={{ fontSize: "13.6px", fontWeight: 400, color: "#DA7756", letterSpacing: "0.1px", fontFamily: "'Inter', sans-serif" }}
      >
        Selecione o produto para acessar
      </p>

      <div className="mt-10 flex flex-col md:flex-row gap-4 w-full max-w-[760px]">

        {/* Card BID — clicável */}
        <a
          href="https://bid.deepcareanalytics.com/login"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex-1 flex items-start gap-4 rounded-2xl p-6 bg-[#1C1C1C] border border-white/[0.08] transition-all duration-200 ease-in-out
            hover:bg-[#242424] hover:border-[rgba(91,143,122,0.5)] hover:shadow-[0_0_30px_rgba(91,143,122,0.15)] hover:scale-[1.02]"
        >
          <BarChart2 className="w-8 h-8 text-[#5B8F7A] flex-shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <span className="text-white text-xl font-bold">BID</span>
            <span className="text-[#5B8F7A] text-sm">Business Intelligence Department</span>
            <span className="text-gray-400 text-sm">Painel financeiro, faturamento e IA para clínicas</span>
          </div>
        </a>

        {/* Card LensTrack */}
        <a
          href="https://lenstrack.deepcareanalytics.com/login"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex-1 flex items-start gap-4 rounded-2xl p-6 bg-[#1C1C1C] border border-white/[0.08] transition-all duration-200 ease-in-out
            hover:bg-[#242424] hover:border-[rgba(91,143,122,0.5)] hover:shadow-[0_0_30px_rgba(91,143,122,0.15)] hover:scale-[1.02]"
        >
          <Eye className="w-8 h-8 text-[#5B8F7A] flex-shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <span className="text-white text-xl font-bold">LensTrack</span>
            <span className="text-[#5B8F7A] text-sm">Gestão de Lentes de Contato com IA</span>
            <span className="text-gray-400 text-sm">Controle de vendas, prazos de entrega e relacionamento com clientes</span>
          </div>
        </a>

      </div>

    </div>
  )
}

export interface ClientTool {
  nome: string;
  descricao: string;
  url: string;
  icone: string; // nome do ícone lucide-react
}

export interface ClientAccess {
  nome: string;
  tools: ClientTool[];
}

export const clientAccess: Record<string, ClientAccess> = {
  "01448506000120": {
    nome: "Cliente BID",
    tools: [
      {
        nome: "BID",
        descricao: "Business Intelligence Department — Painel financeiro, faturamento e IA para clínicas",
        url: "https://app.deepcareanalytics.com/login",
        icone: "BarChart3"
      }
    ]
  },
  "35165757000110": {
    nome: "OftoVision Clínica Oftalmológica",
    tools: [
      {
        nome: "LensTrack",
        descricao: "Gestão de Lentes de Contato com IA — Controle de vendas, prazos de entrega e relacionamento com clientes",
        url: "https://lenstrack.deepcareanalytics.com/login",
        icone: "Eye"
      },
      {
        nome: "Conciliação ClinicWeb × Porto Seguro",
        descricao: "Conciliação automática de faturamento entre ClinicWeb e Porto Seguro",
        url: "https://conciliacao.deepcareanalytics.com",
        icone: "FileCheck"
      }
    ]
  }
};

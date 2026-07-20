// app/entrar/page.tsx
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { clientAccess } from "@/lib/clientAccess";
import { maskCnpj, normalizeCnpj, isValidCnpjFormat } from "@/lib/cnpj";
import { ToolIcon } from "@/lib/toolIcons";
import { WA_URL } from "@/lib/constants";

type ViewState = "form" | "found" | "not-found";

export default function EntrarPage() {
  const [view, setView] = useState<ViewState>("form");
  const [cnpjInput, setCnpjInput] = useState("");
  const [formError, setFormError] = useState("");
  const [activeCnpj, setActiveCnpj] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isValidCnpjFormat(cnpjInput)) {
      setFormError("CNPJ inválido. Confira os 14 dígitos e tente novamente.");
      return;
    }

    setFormError("");
    const normalized = normalizeCnpj(cnpjInput);
    setActiveCnpj(normalized);
    setView(normalized in clientAccess ? "found" : "not-found");
  }

  function handleReset() {
    setView("form");
    setCnpjInput("");
    setFormError("");
    setActiveCnpj("");
  }

  const client = view === "found" ? clientAccess[activeCnpj] : undefined;

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

      <AnimatePresence mode="wait">
        {view === "form" && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-3 flex flex-col items-center w-full max-w-[420px]"
          >
            <p
              className="text-center"
              style={{ fontSize: "13.6px", fontWeight: 400, color: "#DA7756", letterSpacing: "0.1px", fontFamily: "'Inter', sans-serif" }}
            >
              Digite o CNPJ da sua empresa para acessar
            </p>

            <form onSubmit={handleSubmit} className="mt-8 w-full flex flex-col gap-3">
              <input
                type="text"
                inputMode="numeric"
                value={cnpjInput}
                onChange={(e) => setCnpjInput(maskCnpj(e.target.value))}
                placeholder="00.000.000/0000-00"
                maxLength={18}
                className="w-full rounded-xl px-4 py-3 bg-[#1C1C1C] border border-white/[0.08] text-white text-center text-lg tracking-wide focus:outline-none focus:border-[rgba(91,143,122,0.5)] transition-colors"
              />

              {formError && (
                <span className="text-center text-sm" style={{ color: "#DA7756" }}>
                  {formError}
                </span>
              )}

              <button
                type="submit"
                className="mt-2 w-full rounded-xl px-4 py-3 bg-[#5B8F7A] text-white font-semibold hover:bg-[#4d7a68] transition-colors"
              >
                Acessar
              </button>
            </form>
          </motion.div>
        )}

        {view === "found" && client && (
          <motion.div
            key="found"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-3 flex flex-col items-center w-full max-w-[760px]"
          >
            <p
              className="text-center"
              style={{ fontSize: "13.6px", fontWeight: 400, color: "#DA7756", letterSpacing: "0.1px", fontFamily: "'Inter', sans-serif" }}
            >
              {client.nome} — selecione o produto para acessar
            </p>

            <div className="mt-10 flex flex-col md:flex-row gap-4 w-full">
              {client.tools.map((tool) => (
                <a
                  key={tool.nome}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-1 flex items-start gap-4 rounded-2xl p-6 bg-[#1C1C1C] border border-white/[0.08] transition-all duration-200 ease-in-out
                    hover:bg-[#242424] hover:border-[rgba(91,143,122,0.5)] hover:shadow-[0_0_30px_rgba(91,143,122,0.15)] hover:scale-[1.02]"
                >
                  <ToolIcon name={tool.icone} className="w-8 h-8 text-[#5B8F7A] flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1">
                    <span className="text-white text-xl font-bold">{tool.nome}</span>
                    <span className="text-gray-400 text-sm">{tool.descricao}</span>
                  </div>
                </a>
              ))}
            </div>

            <button
              onClick={handleReset}
              className="mt-8 text-sm text-gray-500 hover:text-gray-300 transition-colors underline underline-offset-2"
            >
              usar outro CNPJ
            </button>
          </motion.div>
        )}

        {view === "not-found" && (
          <motion.div
            key="not-found"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-3 flex flex-col items-center w-full max-w-[420px] text-center"
          >
            <p className="text-white text-lg font-semibold">CNPJ não encontrado</p>
            <p className="mt-2 text-gray-400 text-sm">
              Não localizamos esse CNPJ na nossa base. Fale com a DeepCare para liberar o
              acesso da sua empresa.
            </p>

            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 rounded-xl px-5 py-3 bg-[#5B8F7A] text-white font-semibold hover:bg-[#4d7a68] transition-colors"
            >
              Falar com a DeepCare no WhatsApp
            </a>

            <button
              onClick={handleReset}
              className="mt-6 text-sm text-gray-500 hover:text-gray-300 transition-colors underline underline-offset-2"
            >
              usar outro CNPJ
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

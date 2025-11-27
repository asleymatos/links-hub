"use client";

import { useEffect, useState } from "react";
import { Github, Linkedin, Instagram, Link } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

// Configuração do Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Mapa de ícones
const iconLookup: Record<string, React.ElementType> = {
  Github: Github,
  Linkedin: Linkedin,
  Instagram: Instagram,
};

// Tipo dos dados
interface LinkType {
  id: number;
  title: string;
  url: string;
  icon?: string;
  clicks?: number; // Adicionei clicks aqui como opcional
}

export default function Home() {
  const [links, setLinks] = useState<LinkType[]>([]);

  // Busca os links ao carregar a página
  useEffect(() => {
    async function fetchLinks() {
      const { data } = await supabase.from("links").select("*");
      setLinks(Array.isArray(data) ? data : []);
    }
    fetchLinks();
  }, []);

  // --- AQUI ESTÁ A MUDANÇA PARA O DEBUG ---
  const handleLinkClick = async (id: number) => {
    console.log("🖱️ Tentando contar clique para o ID:", id);

    // Chama a função no banco de dados
    const { error } = await supabase.rpc("increment_clicks", { link_id: id });

    if (error) {
      console.error("❌ Erro do Supabase:", error);
    } else {
      console.log("✅ Sucesso! O banco confirmou a contagem.");
    }
  };
  // ----------------------------------------

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="flex flex-col items-center bg-gray-800 rounded-xl p-8 shadow-lg">
        {/* Foto de perfil */}
        <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center mb-4">
          <img
            src="/foto.png"
            alt="Foto de perfil"
            className="w-22 h-22 rounded-full object-cover border border-gray-500"
          />
        </div>
        
        {/* Nome de usuário */}
        <div className="text-white font-bold text-xl mb-1">Asley Matos</div>
        <div className="text-gray-300 text-sm mb-6 text-center">
          Tech Lead | SQL | Power BI | Python | 
        <div className="text-gray-300 text-sm mb-6 text-center">
          Análise de Dados | React | Next.JS
        </div></div>
        
        {/* Lista de links */}
        <div className="w-60 flex flex-col gap-4">
          {links.map((link, idx) => {
            const Icon = iconLookup[link.icon ?? ""] || Link;
            return (
              <a
                key={link.id || link.title || idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition flex items-center justify-start gap-3 pl-4"
                // Aqui chamamos a função de clique
                onClick={() => handleLinkClick(link.id)}
              >
                <Icon className="w-5 h-5 text-gray-400" />
                {link.title}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
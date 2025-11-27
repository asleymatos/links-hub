import { Github, Linkedin, Instagram, Link } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const iconLookup: Record<string, React.ElementType> = {
  Github: Github,
  Linkedin: Linkedin,
  Instagram: Instagram,
};

export default async function Home() {
  // Busca os dados do banco
  const { data: links, error } = await supabase.from("links").select("*");

  // Fallback caso não haja dados ou erro
  const safeLinks = Array.isArray(links) ? links : [];

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="flex flex-col items-center bg-gray-800 rounded-xl p-8 shadow-lg">
        {/* Foto de perfil (placeholder) */}
        <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center mb-4">
          {/* Ícone de usuário como placeholder */}
          <img
            src="/foto.png"
            alt="Foto de perfil"
            className="w-22 h-22 rounded-full object-cover border border-gray-500"
          />
        </div>
        {/* Nome de usuário */}
        <div className="text-white font-bold text-xl mb-6">Asley Matos</div>
        {/* Lista de links */}
        <div className="w-60 flex flex-col gap-4">
          {safeLinks.map((link, idx) => {
            const Icon = iconLookup[link.icon] || Link;
            return (
              <a
                key={link.id || link.title || idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition flex items-center justify-start gap-3 pl-4"
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

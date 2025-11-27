import { Github, Linkedin, Instagram } from "lucide-react";

export default function Home() {
  // Array de links com nome, url e ícone
  const links = [
    {
      name: "Meu Portfolio",
      url: "https://github.com/asleymatos",
      icon: Github,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/asleymatos/",
      icon: Linkedin,
    },
    {
      name: "Instagram",
      url: "https://instagram.com/asleymatos",
      icon: Instagram,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="flex flex-col items-center bg-gray-800 rounded-xl p-8 shadow-lg">
        {/* Foto de perfil (placeholder) */}
        <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center mb-4">
          {/* Ícone de usuário como placeholder */}
          <img
            src="/perfil.jpg"
            alt="Foto de perfil"
            className="w-12 h-12 rounded-full object-cover border border-gray-500"
          />
        </div>
        {/* Nome de usuário */}
        <div className="text-white font-bold text-xl mb-6">Asley Matos</div>
        {/* Lista de links */}
        <div className="w-60 flex flex-col gap-4">
          {links.map((link, idx) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition flex items-center justify-start gap-3 pl-4"
              >
                <Icon className="w-5 h-5 text-gray-400" />
                {link.name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}


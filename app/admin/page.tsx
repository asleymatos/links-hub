"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { Trash2, LogOut } from "lucide-react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface LinkType {
  id: number;
  title: string;
  url: string;
  icon?: string;
  clicks: number; // campo de cliques adicionado
}

export default function AdminPage() {
  const [titulo, setTitulo] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [links, setLinks] = useState<LinkType[]>([]);
  const [deleteLoadingId, setDeleteLoadingId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchLinks() {
    setLoading(true);
    const { data, error } = await supabase.from("links").select("*").order("id", { ascending: false });
    if (!error && Array.isArray(data)) {
      setLinks(data as LinkType[]);
    }
    setLoading(false);
  }

  async function handleAddLink(e: FormEvent) {
    e.preventDefault();
    if (!titulo || !url) {
      alert("Preencha o título e o URL!");
      return;
    }
    setLoading(true);

    const { error } = await supabase.from("links").insert([
      {
        title: titulo,
        url: url,
        icon: "Link", // valor padrão
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Erro ao adicionar link: " + error.message);
    } else {
      setTitulo("");
      setUrl("");
      await fetchLinks();
      alert("Link adicionado com sucesso!");
    }
  }

  async function handleDelete(id: number) {
    const confirmDelete = window.confirm("Tem certeza que deseja deletar este link?");
    if (!confirmDelete) return;

    setDeleteLoadingId(id);

    const { error } = await supabase.from("links").delete().eq("id", id);

    setDeleteLoadingId(null);

    if (error) {
      alert("Erro ao deletar link: " + error.message);
    } else {
      await fetchLinks();
      // alert("Link deletado com sucesso!"); // opcional, ou pode remover o alert.
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header com título e botão de Sair */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Painel de Gestão de Links</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-1 rounded-md bg-gray-700 hover:bg-red-700 transition text-sm font-medium text-gray-200 hover:text-white"
            title="Sair"
            type="button"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>

        {/* Formulário de Adição */}
        <form
          onSubmit={handleAddLink}
          className="flex flex-col md:flex-row gap-4 items-center bg-gray-800 p-6 rounded-xl shadow-lg mb-8"
        >
          <input
            type="text"
            placeholder="Título"
            className="flex-1 px-4 py-2 rounded-md bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            disabled={loading}
            required
          />
          <input
            type="url"
            placeholder="URL"
            className="flex-1 px-4 py-2 rounded-md bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400"
            value={url}
            onChange={e => setUrl(e.target.value)}
            disabled={loading}
            required
          />
          <button
            type="submit"
            className={`px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition font-semibold ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? "Salvando..." : "Adicionar"}
          </button>
        </form>

        {/* Lista de Links */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Links cadastrados</h2>
          {loading ? (
            <div className="text-gray-400">Carregando...</div>
          ) : (
            <ul className="space-y-3">
              {links.length === 0 && (
                <li className="text-gray-400">Nenhum link cadastrado ainda.</li>
              )}
              {links.map(link => (
                <li key={link.id} className="flex items-center gap-4 border-b border-gray-700 pb-2">
                  <span className="font-medium flex items-center gap-2">
                    {link.title}
                    <span className="text-sm text-gray-400">
                      {(link.clicks ?? 0)} cliques
                    </span>
                  </span>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline break-all">
                    {link.url}
                  </a>
                  <button
                    onClick={() => handleDelete(link.id)}
                    disabled={deleteLoadingId === link.id || loading}
                    className={`ml-auto p-2 rounded-full ${
                      deleteLoadingId === link.id || loading
                        ? "opacity-60 cursor-not-allowed"
                        : "hover:bg-red-800"
                    } bg-red-700 transition`}
                    title="Deletar"
                    aria-label="Deletar"
                    type="button"
                  >
                    <Trash2 className="w-5 h-5 text-white" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });
    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-xl shadow-lg flex flex-col gap-6 w-full max-w-md"
      >
        <div className="flex justify-center">
          <img
            src="/logo.png" // Certifique-se que o nome do arquivo na pasta public está igual
            alt="Logo LinksHub"
            className="w-16 h-16 mb-2 rounded-full object-cover" // Ajuste o tamanho (w-16 h-16) como preferir
          />
        </div>
        <h2 className="text-2xl font-bold text-white text-center mb-2">Login</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-gray-300 font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="rounded-md px-4 py-2 bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="senha" className="text-gray-300 font-medium">
            Senha
          </label>
          <input
            id="senha"
            type="password"
            className="rounded-md px-4 py-2 bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            autoComplete="current-password"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-md bg-blue-600 hover:bg-blue-700 transition text-white font-semibold ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}

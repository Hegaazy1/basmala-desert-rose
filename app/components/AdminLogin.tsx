"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Props = {
  onLogin: (username: string) => void;
};

export default function AdminLogin({ onLogin }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

async function login() {
  const { data, error } = await supabase
    .from("admins")
    .select("*")
    .eq("username", username)
    .eq("password", password)
    .single();

  console.log("Data:", data);
  console.log("Error:", error);

  if (error || !data) {
    alert("اسم المستخدم أو كلمة السر غلط");
    return;
  }

  localStorage.setItem("adminLogged", "true");
  localStorage.setItem("adminUsername", data.username);

  onLogin(data.username);
}

  return (
    <div className="w-full max-w-2xl rounded-3xl border border-yellow-500/30 bg-black/60 backdrop-blur-xl p-12 shadow-2xl">

      <img
        src="/logo/logo.png"
        alt="Memoris"
        className="w-[420px] max-w-full mx-auto mb-10"
      />

      <h1 className="text-center text-5xl font-bold text-white mb-10">
        Admin Login
      </h1>

      <input
        className="w-full rounded-xl bg-white/10 border border-white/20 p-4 text-lg text-white placeholder:text-gray-300 mb-6 outline-none focus:border-yellow-500"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") login();
        }}
      />

      <input
        type="password"
        className="w-full rounded-xl bg-white/10 border border-white/20 p-4 text-lg text-white placeholder:text-gray-300 mb-8 outline-none focus:border-yellow-500"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") login();
        }}
      />

      <button
        onClick={login}
        className="w-full rounded-xl bg-yellow-500 py-4 text-xl font-bold text-black transition hover:bg-yellow-400"
      >
        LOGIN
      </button>

    </div>
  );
}
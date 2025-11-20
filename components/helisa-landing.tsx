"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Zap,
  Code2,
  Layers,
  ArrowRight,
  Github,
  BookOpen,
  Package,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Logo from "./logo";

export default function HelisaLanding() {
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Componentes Premium",
      description:
        "Colección curada de componentes UI diseñados para proyectos modernos",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Tailwind 4 Native",
      description:
        "Optimizado para Tailwind CSS 4, aprovechando las últimas características",
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "React Ready",
      description:
        "Integración perfecta con React 18+ y hooks para una experiencia de desarrollo fluida",
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Shadcn Compatible",
      description: "Construido sobre shadcn registry para máxima flexibilidad",
    },
  ];

  const codeExample = `
  # Agrega el registry en components.json  
  # Luego puedes instalar componentes con:
  npx shadcn@latest add @helisa/form-field`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
            animationDelay: "1s",
          }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
          style={{
            transform: `translateY(${scrollY * 0.4}px)`,
            animationDelay: "2s",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-6 py-6">
        <nav className="flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-6">
            <a href="/docs" className="hover:text-purple-400 transition-colors">
              Docs
            </a>
            {/* <a href="#components" className="hover:text-purple-400 transition-colors">Componentes</a> */}
            <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg transition-all">
              <Github className="w-4 h-4" />
              GitHub
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 pt-20 pb-32">
        <div
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
            <Package className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">
              Construido con shadcn registry
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Componentes UI{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              extraordinarios
            </span>{" "}
            para tus aplicaciones
          </h1>

          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Una librería de componentes custom premium para React con Tailwind 4
            y basada en Shadcn. Rápida, flexible y lista para producción.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              className="group flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
              onClick={() => router.push("/docs")}
            >
              Comenzar ahora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-8 py-4 rounded-xl font-semibold text-lg transition-all border border-white/20"
              onClick={() => router.push("/docs")}
            >
              <BookOpen className="w-5 h-5" />
              Ver documentación
            </button>
          </div>

          {/* Code Preview */}
          <div className="max-w-2xl mx-auto bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 text-left hover:border-purple-500/50 transition-all">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="ml-auto text-xs text-slate-500">terminal</span>
            </div>
            <pre className="text-purple-300 font-mono text-sm overflow-x-auto">
              {codeExample}
            </pre>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Construye más rápido con{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Helisa
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-slate-900/30 backdrop-blur-sm border border-slate-700 hover:border-purple-500/50 rounded-2xl p-8 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-6 py-32">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-purple-500/30 rounded-3xl p-12">
          <h2 className="text-4xl font-bold mb-6">
            ¿Listo para transformar tu UI?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Únete a developers que ya están construyendo experiencias increíbles
            con Helisa
          </p>
          <button
            className="group inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 hover:shadow-2xl"
            onClick={() => router.push("/docs")}
          >
            Empezar gratis
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xl font-bold">
              <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span>Helisa</span>
            </div>
            <p className="text-slate-400 text-sm">
              © 2025 Helisa. Construido con React y Tailwind 4
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Discord
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

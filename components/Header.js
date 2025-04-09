import React from "react";

function Header() {
  return (
    <header>
      <h1>GlowApp</h1>
      <nav>
        <a href="/">Inicio</a>
        <a href="/products">Productos y Servicios</a>
        <a href="/about">Quiénes Somos</a>
        <a href="/blog">Blog</a>
        <a href="/contact">Contacto</a>
        <a href="/privacy">Política de Privacidad</a>
      </nav>
    </header>
  );
}

export default Header;

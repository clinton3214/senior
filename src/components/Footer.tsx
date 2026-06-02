import React from "react";

export default function Footer() {
  const footerLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Accessibility Statement", href: "#" },
    { label: "Contact Us", href: "#" },
  ];

  return (
    <footer className="w-full bg-surface-container-low border-t-4 border-outline-variant mt-auto">
      <div className="max-w-max-width mx-auto px-4 md:px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand & Copy */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <span className="font-display text-headline-md font-bold text-primary tracking-tight">
            Senior Demo
          </span>
          <p className="font-body-md text-body-md text-secondary text-center md:text-left font-bold max-w-md leading-relaxed">
            © 2026 Senior Demo Community. Designed for absolute clarity, readability, and connection.
          </p>
        </div>

        {/* Footer Navigation */}
        <nav 
          className="flex flex-wrap justify-center gap-x-8 gap-y-4 font-label-md text-label-md"
          aria-label="Footer links"
        >
          {footerLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="text-secondary hover:text-primary transition-colors font-bold underline decoration-2 decoration-outline-variant hover:decoration-primary min-h-[48px] flex items-center px-2"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

"use client";

import { Couple } from "@/types/invitation";
import React from "react";
import { DiamondDivider, LotusOrnament } from "./KhmerOrnaments";

interface FooterProps {
  couple: Couple;
}

export const RoyalFooter: React.FC<FooterProps> = ({ couple }) => {
  return (
    <footer
      className="relative py-16 px-6 text-center overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.12) 0%, transparent 60%),
          linear-gradient(180deg, #2C1810 0%, #1a0e08 100%)
        `,
        borderTop: "1px solid rgba(201,168,76,0.15)",
      }}
    >
      <div className="max-w-lg mx-auto space-y-6">
        <div className="flex justify-center items-center animate-subtle-float">
          <LotusOrnament size={55} />
        </div>

        <div className="space-y-1">
          <p
            className="font-serif-en text-xs tracking-[0.4em] uppercase"
            style={{ color: "var(--rk-gold)", opacity: 0.6 }}
          >
            With love &amp; gratitude
          </p>
          <h3
            className="font-khmer-title text-xl"
            style={{ color: "var(--rk-gold-light)", lineHeight: 1.7 }}
          >
            {couple.groom.nameKh} &amp; {couple.bride.nameKh}
          </h3>
          <p
            className="font-serif-en italic text-sm"
            style={{ color: "var(--rk-ivory)", opacity: 0.4 }}
          >
            {couple.groom.nameEn} &amp; {couple.bride.nameEn}
          </p>
        </div>

        <DiamondDivider />

        <p
          className="font-khmer-body text-xs leading-relaxed"
          style={{
            color: "var(--rk-ivory)",
            opacity: 0.4,
            maxWidth: "260px",
            margin: "0 auto",
          }}
        >
          សូមអរគុណចំពោះការចូលរួមប្រារព្ធពិធីអាពាហ៍ពិពាហ៍របស់យើង
        </p>
        <p
          className="font-serif-en text-xs italic"
          style={{ color: "var(--rk-ivory)", opacity: 0.25 }}
        >
          Thank you for celebrating our special day with us.
        </p>

        <div
          className="pt-4 border-t"
          style={{ borderColor: "rgba(201,168,76,0.1)" }}
        >
          <p
            className="font-serif-en text-[10px] tracking-widest uppercase"
            style={{ color: "var(--rk-gold)", opacity: 0.25 }}
          >
            Srolanh Wedding · Royal Khmer Template
          </p>
        </div>
      </div>
    </footer>
  );
};

export default RoyalFooter;

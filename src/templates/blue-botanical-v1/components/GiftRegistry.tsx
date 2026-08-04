"use client";

import { GiftRegistryItem } from "@/types/invitation";
import { m } from "framer-motion";
import React from "react";

interface GiftProps {
  registries: GiftRegistryItem[];
}

export const GiftRegistry: React.FC<GiftProps> = ({ registries }) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text.replace(/\s+/g, ""));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="py-20 px-6" style={{ background: "transparent" }}>
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center space-y-2">
          <p
            className="font-serif-en text-xs tracking-[0.4em] uppercase"
            style={{ color: "#9BB0C8" }}
          >
            Gift Registry
          </p>
          <h2
            className="font-khmer-title text-xl"
            style={{ color: "#2C3E56", lineHeight: 1.7 }}
          >
            អំណោយអាពាហ៍ពិពាហ៍
          </h2>
          <div
            className="h-[1px] w-20 mx-auto"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(106,140,178,0.4), transparent)",
            }}
          />
          <p className="font-khmer-body text-sm" style={{ color: "#7A8EA8" }}>
            ប្រសិនបើអ្នកចង់ផ្ញើអំណោយ អ្នកអាចធ្វើប្រតិបត្តិការតាមរយៈ :
          </p>
        </div>

        {registries.map((item, i) => (
          <m.div
            key={item.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="rounded-2xl overflow-hidden"
            style={{
              background:
                "linear-gradient(185deg, rgba(28, 48, 74, 0.94) 0%, rgba(14, 28, 48, 0.98) 100%)",
              border: "1px solid rgba(106, 140, 178, 0.3)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }}
          >
            <div
              className="px-5 py-3 flex items-center justify-between"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderBottom: "1px solid rgba(106, 140, 178, 0.3)",
              }}
            >
              <span
                className="font-serif-en text-xs font-bold tracking-widest uppercase"
                style={{ color: "#E8C97A" }}
              >
                {item.bankName}
              </span>
              <span style={{ color: "#E8C97A", opacity: 0.6 }}>✦</span>
            </div>
            <div className="p-5 flex gap-4 items-center">
              {item.qrCodeUrl && (
                <div
                  className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden p-1"
                  style={{
                    border: "1px solid rgba(106, 140, 178, 0.3)",
                    background: "rgba(255,255,255,0.05)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- QR sources may be data URLs. */}
                  <img
                    src={item.qrCodeUrl}
                    alt={item.bankName}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              )}
              <div className="space-y-2">
                <div>
                  <p
                    className="font-serif-en text-[10px] tracking-widest uppercase"
                    style={{ color: "rgba(232, 201, 122, 0.7)" }}
                  >
                    Account Name
                  </p>
                  <p
                    className="font-khmer-body font-bold"
                    style={{ color: "#FAF6EF" }}
                  >
                    {item.accountName}
                  </p>
                </div>
                <div>
                  <p
                    className="font-serif-en text-[10px] tracking-widest uppercase"
                    style={{ color: "rgba(232, 201, 122, 0.7)" }}
                  >
                    Account Number
                  </p>
                  <div className="flex items-center gap-3">
                    <p
                      className="font-serif-en font-bold tracking-widest"
                      style={{ color: "#FAF6EF", fontSize: "1rem" }}
                    >
                      {item.accountNumber}
                    </p>
                    <button
                      onClick={() =>
                        copyToClipboard(item.accountNumber, item.id)
                      }
                      className="p-2 rounded-lg transition-colors flex items-center gap-1.5"
                      style={{
                        background:
                          copiedId === item.id
                            ? "#E8C97A"
                            : "rgba(232, 201, 122, 0.15)",
                        color: copiedId === item.id ? "#141c27" : "#E8C97A",
                      }}
                    >
                      {copiedId === item.id ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </m.div>
        ))}
      </div>
    </section>
  );
};
export default GiftRegistry;

import { MessageCircle } from "lucide-react";
import { SHOP } from "@/lib/shop-config";

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${SHOP.whatsappNumber}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Scrivici su WhatsApp"
      className="fixed bottom-24 right-4 z-[65] flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 md:bottom-8 md:right-6"
    >
      <MessageCircle size={22} strokeWidth={1.4} />
    </a>
  );
}

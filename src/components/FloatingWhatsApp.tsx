import { MessageCircle } from "lucide-react";
import { wa } from "@/lib/site";

export function FloatingWhatsApp({
  message = "Hello Beelove Farm, I'd like to make an enquiry.",
}: {
  message?: string;
}) {
  return (
    <a
      href={wa(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 bg-[color:var(--whatsapp)] text-white p-4 rounded-full shadow-xl ring-1 ring-black/10 hover:scale-105 transition-transform"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}

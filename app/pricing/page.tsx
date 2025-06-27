import Navigation from "@/components/navigation"
import PricingContent from "@/components/pricing-content"
import ChatBot from "@/components/chat-bot"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <PricingContent />
      <ChatBot />
    </div>
  )
}

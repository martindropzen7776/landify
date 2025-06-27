"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Check, Zap, Crown, Rocket, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const plans = [
  {
    name: "Starter",
    description: "Perfect for individuals getting started",
    monthlyPrice: 0,
    yearlyPrice: 0,
    icon: Zap,
    features: [
      "3 landing pages per month",
      "Basic AI templates",
      "Standard export (HTML/CSS)",
      "Community support",
      "Basic analytics",
      "Mobile responsive designs",
    ],
    limitations: ["Landify AI branding", "Limited customization", "No custom domain"],
    popular: false,
    cta: "Get Started Free",
  },
  {
    name: "Pro",
    description: "Best for professionals and small teams",
    monthlyPrice: 29,
    yearlyPrice: 290,
    icon: Crown,
    features: [
      "Unlimited landing pages",
      "Advanced AI templates",
      "Premium export options",
      "Priority support",
      "Advanced analytics",
      "Custom branding",
      "A/B testing",
      "Custom domains",
      "Team collaboration (5 members)",
      "API access",
    ],
    limitations: [],
    popular: true,
    cta: "Start Pro Trial",
  },
  {
    name: "Enterprise",
    description: "For large teams and organizations",
    monthlyPrice: 99,
    yearlyPrice: 990,
    icon: Rocket,
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "White-label solution",
      "Custom AI training",
      "Dedicated account manager",
      "SLA guarantee",
      "Advanced integrations",
      "Custom templates",
      "Bulk operations",
      "Enterprise security",
    ],
    limitations: [],
    popular: false,
    cta: "Contact Sales",
  },
]

const faqs = [
  {
    question: "Can I change my plan at any time?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
  },
  {
    question: "What happens to my landing pages if I downgrade?",
    answer:
      "Your existing landing pages will remain active, but you'll be limited to the new plan's monthly creation limit.",
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 30-day money-back guarantee for all paid plans. No questions asked.",
  },
  {
    question: "Can I export my landing pages?",
    answer:
      "Yes, all plans include export functionality. Pro and Enterprise plans offer additional export formats and options.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, we offer a 14-day free trial for Pro and Enterprise plans. No credit card required.",
  },
]

export default function PricingContent() {
  const [isYearly, setIsYearly] = useState(false)
  const { toast } = useToast()

  const handlePlanSelect = (planName: string) => {
    if (planName === "Enterprise") {
      toast({
        title: "Contact Sales",
        description: "Our sales team will reach out to discuss your enterprise needs.",
      })
    } else {
      toast({
        title: `${planName} Plan Selected`,
        description: "Redirecting to checkout...",
      })
    }
  }

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-6">
            <Star className="w-4 h-4 mr-2" />
            Simple, Transparent Pricing
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Choose the perfect plan for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              your needs
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Start free and scale as you grow. All plans include our core AI-powered landing page builder.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`text-sm font-medium ${!isYearly ? "text-gray-900" : "text-gray-500"}`}>Monthly</span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span className={`text-sm font-medium ${isYearly ? "text-gray-900" : "text-gray-500"}`}>
              Yearly
              <Badge className="ml-2 bg-green-100 text-green-700 hover:bg-green-100">Save 20%</Badge>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative border-0 shadow-lg hover:shadow-2xl transition-all duration-300 ${
                plan.popular
                  ? "ring-2 ring-purple-600 transform scale-105 bg-gradient-to-br from-purple-50 to-blue-50"
                  : "hover:transform hover:scale-105"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center">
                  <plan.icon className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <p className="text-gray-600 mt-2">{plan.description}</p>
                <div className="mt-6">
                  <div className="text-4xl font-bold text-gray-900">
                    ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    {plan.monthlyPrice > 0 && (
                      <span className="text-lg text-gray-500 font-normal">/{isYearly ? "year" : "month"}</span>
                    )}
                  </div>
                  {isYearly && plan.monthlyPrice > 0 && (
                    <p className="text-sm text-gray-500 mt-1">
                      ${Math.round((plan.yearlyPrice / 12) * 100) / 100}/month billed annually
                    </p>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <Button
                  onClick={() => handlePlanSelect(plan.name)}
                  className={`w-full ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      : "bg-gray-900 hover:bg-gray-800"
                  } shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  {plan.cta}
                </Button>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">What's included:</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.limitations.length > 0 && (
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Limitations:</h4>
                    <ul className="space-y-2">
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="text-sm text-gray-500">
                          • {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of creators building amazing landing pages with AI</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="px-8 py-3 bg-white text-purple-600 hover:bg-gray-100"
              onClick={() => handlePlanSelect("Pro")}
            >
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 border-white text-white hover:bg-white/10 bg-transparent"
              onClick={() => handlePlanSelect("Enterprise")}
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

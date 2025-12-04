import { FileText, Shield, Zap, TrendingUp, CheckCircle2, Star, ArrowRight, Users, Award, Clock } from 'lucide-react';

interface HomepageProps {
  onGetStarted: (tier?: string) => void;
}

export function Homepage({ onGetStarted }: HomepageProps) {
  const features = [
    {
      icon: Shield,
      title: 'Risk Assessment',
      description: 'Comprehensive analysis identifying potential vulnerabilities and legal risks in your contracts.',
      color: 'bg-blue-500'
    },
    {
      icon: Zap,
      title: 'Instant Analysis',
      description: 'Get detailed scorecards and actionable feedback within seconds of uploading your document.',
      color: 'bg-purple-500'
    },
    {
      icon: TrendingUp,
      title: 'Smart Recommendations',
      description: 'Receive tailored suggestions to strengthen your contract and protect your interests.',
      color: 'bg-green-500'
    },
    {
      icon: Award,
      title: 'Expert-Backed',
      description: 'Analysis framework developed with input from experienced real estate attorneys.',
      color: 'bg-orange-500'
    },
    {
      icon: Users,
      title: 'Multi-Party Review',
      description: 'Share analysis results with your team, agents, and legal advisors seamlessly.',
      color: 'bg-pink-500'
    },
    {
      icon: Clock,
      title: 'Historical Tracking',
      description: 'Compare multiple versions and track changes across contract iterations.',
      color: 'bg-indigo-500'
    }
  ];

  const benefits = [
    'Avoid costly mistakes before signing',
    'Negotiate from a position of knowledge',
    'Save thousands in legal review fees',
    'Identify missing protections and clauses',
    'Understand complex legal language',
    'Make informed decisions faster'
  ];

  const pricingTiers = [
    {
      name: 'Starter',
      price: '29',
      period: 'month',
      description: 'Perfect for individuals buying or selling their first property',
      features: [
        '5 contract analyses per month',
        'Basic scorecard report',
        'Email support',
        'Standard recommendations',
        'PDF export',
        '7-day analysis history'
      ],
      highlighted: false,
      tier: 'starter'
    },
    {
      name: 'Professional',
      price: '79',
      period: 'month',
      description: 'Ideal for real estate agents and active investors',
      features: [
        'Unlimited contract analyses',
        'Advanced detailed reports',
        'Priority email & chat support',
        'Custom recommendations',
        'Multiple export formats',
        'Unlimited analysis history',
        'Team collaboration (up to 3)',
        'Comparison tools',
        'API access'
      ],
      highlighted: true,
      tier: 'professional'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'For brokerages, law firms, and large organizations',
      features: [
        'Everything in Professional',
        'Unlimited team members',
        'White-label reports',
        'Dedicated account manager',
        'Custom integrations',
        'SLA guarantee',
        'Advanced analytics',
        'Training & onboarding',
        'Custom AI model tuning'
      ],
      highlighted: false,
      tier: 'enterprise'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'First-time Home Buyer',
      content: 'ContractIQ caught three major issues my realtor missed. Saved me from a terrible deal!',
      rating: 5
    },
    {
      name: 'James Rodriguez',
      role: 'Real Estate Investor',
      content: 'I analyze dozens of contracts monthly. This tool has become absolutely essential to my workflow.',
      rating: 5
    },
    {
      name: 'Emily Chen',
      role: 'Real Estate Attorney',
      content: 'Impressive accuracy. Great for initial screening before my detailed legal review.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-slate-900">ContractIQ</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#features" className="text-slate-600 hover:text-slate-900 transition-colors">Features</a>
              <a href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors">Pricing</a>
              <a href="#testimonials" className="text-slate-600 hover:text-slate-900 transition-colors">Testimonials</a>
              <button
                onClick={() => onGetStarted()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try It Free
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-6">
                <Zap className="w-4 h-4" />
                <span className="text-sm">Trusted by 10,000+ users</span>
              </div>
              <h1 className="text-slate-900 mb-6">
                Analyze Real Estate Contracts with AI-Powered Precision
              </h1>
              <p className="text-slate-600 mb-8 text-lg">
                Don't sign a contract you don't fully understand. Get instant analysis, risk assessment, 
                and expert recommendations in seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onGetStarted()}
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  Start Free Analysis
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="px-8 py-4 bg-white border-2 border-slate-300 text-slate-700 rounded-lg hover:border-slate-400 transition-colors">
                  Watch Demo
                </button>
              </div>
              <p className="text-slate-500 text-sm mt-4">
                No credit card required • Free trial includes 1 analysis
              </p>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                    <span className="text-slate-600">Overall Score</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center border-4 border-green-500">
                        <span className="text-green-700">87</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {['Legal Compliance', 'Financial Terms', 'Property Condition', 'Contingencies'].map((category, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-slate-700 text-sm">{category}</span>
                          <span className="text-slate-600 text-sm">{85 + index * 2}/100</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                            style={{ width: `${85 + index * 2}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-sm">Analysis complete</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-200 rounded-full blur-3xl opacity-50" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-50" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-slate-900 mb-4">Why Choose ContractIQ?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Empower yourself with professional-grade contract analysis before making one of life's biggest decisions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-slate-700">{benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-slate-900 mb-4">Powerful Features</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Everything you need to analyze, understand, and improve your real estate contracts.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group hover:scale-105 transition-transform"
                >
                  <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all h-full">
                    <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-slate-900 mb-3">{feature.title}</h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-slate-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Choose the plan that's right for you. All plans include our core analysis features.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 ${
                  tier.highlighted
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl scale-105'
                    : 'bg-white border border-slate-200'
                } relative`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-400 text-slate-900 rounded-full text-sm">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className={tier.highlighted ? 'text-white' : 'text-slate-900'}>
                    {tier.name}
                  </h3>
                  <div className="mt-4 mb-2">
                    {tier.price === 'Custom' ? (
                      <div className="text-slate-900">Custom</div>
                    ) : (
                      <>
                        <span className={`text-5xl ${tier.highlighted ? 'text-white' : 'text-slate-900'}`}>
                          ${tier.price}
                        </span>
                        <span className={tier.highlighted ? 'text-blue-100' : 'text-slate-600'}>
                          /{tier.period}
                        </span>
                      </>
                    )}
                  </div>
                  <p className={`text-sm ${tier.highlighted ? 'text-blue-100' : 'text-slate-600'}`}>
                    {tier.description}
                  </p>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        tier.highlighted ? 'text-blue-200' : 'text-green-600'
                      }`} />
                      <span className={`text-sm ${tier.highlighted ? 'text-white' : 'text-slate-600'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => onGetStarted(tier.tier)}
                  className={`w-full py-3 rounded-lg transition-colors ${
                    tier.highlighted
                      ? 'bg-white text-blue-600 hover:bg-blue-50'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {tier.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-slate-900 mb-4">Trusted by Thousands</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              See what our users have to say about ContractIQ.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-2xl p-8 border border-slate-200"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <p className="text-slate-900">{testimonial.name}</p>
                  <p className="text-slate-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-6">
            Ready to Analyze Your Contract?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Join thousands of smart buyers, sellers, and agents who use ContractIQ 
            to make informed decisions.
          </p>
          <button
            onClick={() => onGetStarted()}
            className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
          >
            Start Your Free Analysis
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-white">ContractIQ</span>
              </div>
              <p className="text-slate-400 text-sm">
                AI-powered real estate contract analysis for smarter decisions.
              </p>
            </div>
            <div>
              <h4 className="text-white mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Disclaimer</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
            <p>© 2025 ContractIQ. All rights reserved. This tool provides informational analysis only and does not constitute legal advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

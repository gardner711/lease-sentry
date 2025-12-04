import { FileText, Shield, Zap, TrendingUp, CheckCircle2, Star, ArrowRight, Users, Award, Clock, Scale, Building2, FileCheck, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Homepage2Props {
  onGetStarted: (tier?: string) => void;
}

export function Homepage2({ onGetStarted }: Homepage2Props) {
  const { theme, setTheme } = useTheme();
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
      name: 'Free',
      price: '0',
      period: 'month',
      description: 'Perfect for trying out our platform',
      features: [
        'Residential Only Support',
        'Critical Clauses',
        'Risk Summary',
        'Q&A Example',
        'Deal Sheet Sample',
        'One Contract at a Time'
      ],
      highlighted: false,
      tier: 'free'
    },
    {
      name: 'Starter',
      price: '19.95',
      period: 'month',
      description: 'Ideal for individuals buying or selling property',
      features: [
        'Residential Only Support',
        'Critical Clauses',
        'Full Risk Score Card',
        'Q&A Interactive',
        'Deal Sheet',
        'State Specific Clause Analysis',
        '24 Hour Storage'
      ],
      highlighted: true,
      tier: 'starter'
    },
    {
      name: 'Pro',
      price: '49.95',
      period: 'month',
      description: 'For real estate professionals and investors',
      features: [
        'Residential and Commercial Support',
        'Critical Clauses',
        'Full Risk Score Card',
        'Q&A Interactive',
        'Deal Sheet',
        'State Specific Clause Analysis',
        'Unlimited Storage'
      ],
      highlighted: false,
      tier: 'pro'
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

  const stats = [
    { value: '10,000+', label: 'Contracts Analyzed' },
    { value: '98%', label: 'Accuracy Rate' },
    { value: '$2.5M+', label: 'Saved in Legal Fees' },
    { value: '50+', label: 'States Covered' }
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-900/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-white">ContractIQ</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</a>
              <a href="#testimonials" className="text-slate-300 hover:text-white transition-colors">Testimonials</a>
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-slate-800"
                aria-label="Toggle theme"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </button>
              <button
                onClick={() => onGetStarted()}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/50"
              >
                Try It Free
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Image Background */}
      <section className="relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1681505526188-b05e68c77582?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFsJTIwZXN0YXRlJTIwY29udHJhY3QlMjBzaWduaW5nfGVufDF8fHx8MTc2NDgwNDQxMHww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Real Estate Contract"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-purple-900/95"></div>
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-purple-600/20 animate-pulse"></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 z-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-blue-200 rounded-full mb-6 border border-white/20">
              <Scale className="w-4 h-4" />
              <span className="text-sm">Powered by Advanced Legal AI</span>
            </div>
            <h1 className="text-white mb-6 leading-tight">
              Your Guardian for Real Estate Contracts
            </h1>
            <p className="text-slate-200 mb-8 text-xl max-w-3xl mx-auto">
              Don't let legal complexities overwhelm you. Get instant, AI-powered analysis
              that protects your interests and ensures you make informed decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => onGetStarted()}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all inline-flex items-center justify-center gap-2 shadow-2xl shadow-blue-500/50"
              >
                Analyze Your Contract Free
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-lg hover:bg-white/20 transition-all">
                Watch Demo
              </button>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-white mb-1">{stat.value}</div>
                  <p className="text-slate-300 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      </section>

      {/* Floating Icons Section */}
      <section className="relative bg-slate-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/50">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-white mb-2">Real Estate Focused</h3>
              <p className="text-slate-400">
                Built specifically for residential and commercial property transactions
              </p>
            </div>
            <div className="group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/50">
                <Scale className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-white mb-2">Legal Precision</h3>
              <p className="text-slate-400">
                Trained on thousands of contracts with attorney-verified standards
              </p>
            </div>
            <div className="group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-green-500/50">
                <FileCheck className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-white mb-2">Instant Clarity</h3>
              <p className="text-slate-400">
                Transform complex legal documents into clear, actionable insights
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section with Image */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900"></div>
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1759429255330-51145b170dad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWdhbCUyMGNvbnRyYWN0JTIwZG9jdW1lbnRzfGVufDF8fHx8MTc2NDY1MTQ5Mnww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Legal Documents"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-white mb-4">Why Choose ContractIQ?</h2>
            <p className="text-slate-300 mb-12">
              Empower yourself with professional-grade contract analysis before making one of life's biggest decisions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all hover:border-white/20"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-slate-200">{benefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-white mb-4">Powerful Features</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
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
                  <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-slate-600 hover:shadow-2xl transition-all h-full">
                    <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-white mb-3">{feature.title}</h3>
                    <p className="text-slate-400">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section with Background */}
      <section id="pricing" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZWFsJTIwZXN0YXRlfGVufDF8fHx8MTc2NDY0Mjc2M3ww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Luxury Real Estate"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/95"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Choose the plan that's right for you. All plans include our core analysis features.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 ${tier.highlighted
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-2xl scale-105 border-2 border-white/20'
                    : 'bg-slate-800/80 backdrop-blur-sm border border-slate-700'
                  } relative`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-400 text-slate-900 rounded-full text-sm shadow-lg">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className={tier.highlighted ? 'text-white' : 'text-white'}>
                    {tier.name}
                  </h3>
                  <div className="mt-4 mb-2">
                    {tier.price === 'Custom' ? (
                      <div className={tier.highlighted ? 'text-white' : 'text-white'}>Custom</div>
                    ) : (
                      <>
                        <span className={`text-5xl ${tier.highlighted ? 'text-white' : 'text-white'}`}>
                          ${tier.price}
                        </span>
                        <span className={tier.highlighted ? 'text-blue-100' : 'text-slate-400'}>
                          /{tier.period}
                        </span>
                      </>
                    )}
                  </div>
                  <p className={`text-sm ${tier.highlighted ? 'text-blue-100' : 'text-slate-400'}`}>
                    {tier.description}
                  </p>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${tier.highlighted ? 'text-blue-200' : 'text-green-500'
                        }`} />
                      <span className={`text-sm ${tier.highlighted ? 'text-white' : 'text-slate-300'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => onGetStarted(tier.tier)}
                  className={`w-full py-3 rounded-lg transition-all ${tier.highlighted
                      ? 'bg-white text-blue-600 hover:bg-blue-50 shadow-lg'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
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
      <section id="testimonials" className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-white mb-4">Trusted by Thousands</h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              See what our users have to say about ContractIQ.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-slate-600 transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <p className="text-white">{testimonial.name}</p>
                  <p className="text-slate-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-6">
            Ready to Analyze Your Contract?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Join thousands of smart buyers, sellers, and agents who use ContractIQ
            to make informed decisions.
          </p>
          <button
            onClick={() => onGetStarted()}
            className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all inline-flex items-center gap-2 shadow-2xl"
          >
            Start Your Free Analysis
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-blue-200 text-sm mt-4">
            No credit card required • Get results in seconds
          </p>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
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
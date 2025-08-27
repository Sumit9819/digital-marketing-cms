import { Search, MousePointer, PenTool, BarChart3, Share2, Megaphone, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: Search,
    title: 'Search Engine Optimization (SEO)',
    description: 'Improve your organic search rankings and drive qualified traffic to your website with our comprehensive SEO strategies.',
    features: [
      'Comprehensive keyword research and analysis',
      'On-page optimization and technical SEO',
      'High-quality link building campaigns',
      'Local SEO for location-based businesses',
      'SEO audits and competitor analysis',
      'Monthly reporting and performance tracking'
    ],
    process: [
      'SEO Audit & Strategy Development',
      'Keyword Research & Competitor Analysis',
      'On-Page & Technical Optimization',
      'Content Creation & Link Building',
      'Monitoring & Continuous Improvement'
    ]
  },
  {
    icon: MousePointer,
    title: 'Pay-Per-Click (PPC) Advertising',
    description: 'Get immediate results with targeted PPC campaigns across Google Ads, Facebook, and other platforms.',
    features: [
      'Google Ads campaign management',
      'Facebook and Instagram advertising',
      'LinkedIn and Twitter ads',
      'Landing page optimization',
      'Conversion tracking and analytics',
      'A/B testing and campaign optimization'
    ],
    process: [
      'Campaign Strategy & Goal Setting',
      'Keyword Research & Audience Targeting',
      'Ad Creation & Landing Page Setup',
      'Campaign Launch & Monitoring',
      'Optimization & Performance Reporting'
    ]
  },
  {
    icon: PenTool,
    title: 'Content Marketing',
    description: 'Engage your audience and drive conversions with compelling, valuable content that builds trust and authority.',
    features: [
      'Content strategy development',
      'Blog writing and article creation',
      'Video content production',
      'Email marketing campaigns',
      'Social media content',
      'Content performance analytics'
    ],
    process: [
      'Content Strategy & Planning',
      'Content Creation & Production',
      'Content Distribution & Promotion',
      'Performance Tracking & Analysis',
      'Strategy Refinement & Optimization'
    ]
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reporting',
    description: 'Make data-driven decisions with comprehensive analytics, tracking, and detailed performance reports.',
    features: [
      'Google Analytics setup and configuration',
      'Custom dashboard creation',
      'ROI tracking and attribution',
      'Monthly performance reports',
      'Conversion funnel analysis',
      'Competitive benchmarking'
    ],
    process: [
      'Analytics Setup & Configuration',
      'Goal & Conversion Tracking',
      'Data Collection & Analysis',
      'Report Generation & Insights',
      'Strategy Recommendations'
    ]
  },
  {
    icon: Share2,
    title: 'Social Media Marketing',
    description: 'Build your brand presence and engage with customers across all major social media platforms.',
    features: [
      'Social media strategy development',
      'Content creation and curation',
      'Community management',
      'Paid social advertising',
      'Influencer partnerships',
      'Social media analytics'
    ],
    process: [
      'Social Media Audit & Strategy',
      'Content Planning & Creation',
      'Community Engagement & Management',
      'Paid Social Campaign Management',
      'Performance Analysis & Optimization'
    ]
  },
  {
    icon: Megaphone,
    title: 'Conversion Rate Optimization',
    description: 'Maximize your website\'s potential with data-driven conversion rate optimization strategies.',
    features: [
      'Website and funnel analysis',
      'A/B testing and multivariate testing',
      'User experience optimization',
      'Landing page optimization',
      'Checkout process improvement',
      'Conversion tracking and reporting'
    ],
    process: [
      'Conversion Audit & Analysis',
      'Hypothesis Development & Testing',
      'A/B Test Implementation',
      'Results Analysis & Implementation',
      'Continuous Optimization'
    ]
  }
];

export function ServicesPage() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Digital Marketing Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive digital marketing solutions designed to help your business 
            grow, reach new customers, and achieve measurable results.
          </p>
        </div>

        {/* Services */}
        <div className="space-y-20">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center mb-6">
                    <Icon className="h-12 w-12 text-blue-600 mr-4" />
                    <h2 className="text-3xl font-bold text-gray-900">
                      {service.title}
                    </h2>
                  </div>
                  <p className="text-lg text-gray-600 mb-8">
                    {service.description}
                  </p>
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">What's Included:</h3>
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="bg-gray-50 p-8 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">Our Process:</h3>
                    <div className="space-y-4">
                      {service.process.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-center">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4">
                            {stepIndex + 1}
                          </div>
                          <span className="text-gray-700">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white rounded-lg p-12 text-center mt-20">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss how our digital marketing services can help you achieve your goals.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/contact">Get Free Consultation</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

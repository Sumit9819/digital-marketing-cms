import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, MousePointer, PenTool, BarChart3, Share2, Megaphone } from 'lucide-react';

const services = [
  {
    icon: Search,
    title: 'Search Engine Optimization',
    description: 'Improve your organic rankings and drive qualified traffic to your website.',
    features: ['Keyword Research', 'On-Page SEO', 'Technical SEO', 'Link Building']
  },
  {
    icon: MousePointer,
    title: 'Pay-Per-Click Advertising',
    description: 'Get immediate results with targeted PPC campaigns across Google and social platforms.',
    features: ['Google Ads', 'Facebook Ads', 'Campaign Optimization', 'Landing Pages']
  },
  {
    icon: PenTool,
    title: 'Content Marketing',
    description: 'Engage your audience with compelling content that drives conversions.',
    features: ['Blog Writing', 'Video Content', 'Email Marketing', 'Content Strategy']
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reporting',
    description: 'Track performance and optimize campaigns with detailed analytics and insights.',
    features: ['Google Analytics', 'Custom Dashboards', 'ROI Tracking', 'Monthly Reports']
  },
  {
    icon: Share2,
    title: 'Social Media Marketing',
    description: 'Build your brand presence and engage customers across social platforms.',
    features: ['Social Strategy', 'Content Creation', 'Community Management', 'Paid Social']
  },
  {
    icon: Megaphone,
    title: 'Conversion Optimization',
    description: 'Maximize your website\'s potential with data-driven conversion rate optimization.',
    features: ['A/B Testing', 'User Experience', 'Landing Page Optimization', 'Funnel Analysis']
  }
];

export function ServicesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Digital Marketing Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer comprehensive digital marketing solutions designed to help your business 
            grow and succeed in today's competitive online landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="bg-gray-50 p-8 rounded-lg hover:shadow-lg transition-shadow">
                <Icon className="h-12 w-12 text-blue-600 mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-sm text-gray-600 flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

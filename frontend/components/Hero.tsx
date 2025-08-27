import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Users, Target } from 'lucide-react';

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Grow Your Business with 
              <span className="text-blue-600"> Digital Marketing</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              We help businesses achieve measurable growth through strategic SEO, PPC, 
              content marketing, and data-driven campaigns that deliver real results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/contact">
                  Get Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/case-studies">View Case Studies</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <TrendingUp className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">200%+ Growth</h3>
              <p className="text-gray-600">Average increase in organic traffic for our clients</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Users className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">500+ Clients</h3>
              <p className="text-gray-600">Businesses we've helped grow and succeed</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg sm:col-span-2">
              <Target className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">ROI-Focused Approach</h3>
              <p className="text-gray-600">Every campaign is designed to maximize your return on investment</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

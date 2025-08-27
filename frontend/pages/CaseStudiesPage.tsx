import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import backend from '~backend/client';
import type { CaseStudy } from '~backend/content/types';

interface CaseStudyWithAuthor extends CaseStudy {
  author: any;
}

const serviceTypes = [
  'SEO',
  'PPC',
  'Content Marketing',
  'Social Media',
  'Analytics',
  'Conversion Optimization'
];

export function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudyWithAuthor[]>([]);
  const [selectedService, setSelectedService] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCaseStudies();
  }, [selectedService]);

  const loadCaseStudies = async () => {
    try {
      const response = await backend.content.listCaseStudies({
        service_type: selectedService || undefined
      });
      setCaseStudies(response.case_studies);
    } catch (error) {
      console.error('Error loading case studies:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Case Studies
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how we've helped businesses like yours achieve remarkable growth 
            through strategic digital marketing campaigns.
          </p>
        </div>

        {/* Service Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedService === '' ? 'default' : 'outline'}
              onClick={() => setSelectedService('')}
            >
              All Services
            </Button>
            {serviceTypes.map((service) => (
              <Button
                key={service}
                variant={selectedService === service ? 'default' : 'outline'}
                onClick={() => setSelectedService(service)}
              >
                {service}
              </Button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid */}
        {caseStudies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No case studies found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy) => (
              <article key={caseStudy.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                {caseStudy.featured_image && (
                  <img
                    src={caseStudy.featured_image}
                    alt={caseStudy.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    {caseStudy.service_type && (
                      <Badge variant="secondary">
                        {caseStudy.service_type}
                      </Badge>
                    )}
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(caseStudy.published_at || caseStudy.created_at)}
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    <Link to={`/case-studies/${caseStudy.slug}`} className="hover:text-blue-600 transition-colors">
                      {caseStudy.title}
                    </Link>
                  </h2>
                  
                  <p className="text-gray-600 mb-3">
                    <strong>Client:</strong> {caseStudy.client_name}
                  </p>
                  
                  {caseStudy.industry && (
                    <p className="text-gray-600 mb-4">
                      <strong>Industry:</strong> {caseStudy.industry}
                    </p>
                  )}
                  
                  {caseStudy.key_metrics && (
                    <div className="bg-green-50 p-3 rounded-lg mb-4">
                      <div className="flex items-center text-green-700 text-sm font-medium">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        Key Results
                      </div>
                      <div className="text-sm text-green-600 mt-1">
                        {Object.entries(caseStudy.key_metrics).slice(0, 2).map(([key, value]) => (
                          <div key={key}>{key}: {value}</div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <Link
                    to={`/case-studies/${caseStudy.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    Read Full Case Study →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-blue-600 text-white rounded-lg p-12 text-center mt-20">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Be Our Next Success Story?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss how we can help you achieve similar results for your business.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/contact">Get Free Consultation</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

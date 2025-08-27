import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, TrendingUp, Target, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import backend from '~backend/client';
import type { CaseStudy } from '~backend/content/types';

interface CaseStudyWithAuthor extends CaseStudy {
  author: any;
}

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const [caseStudy, setCaseStudy] = useState<CaseStudyWithAuthor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      loadCaseStudy();
    }
  }, [slug]);

  const loadCaseStudy = async () => {
    try {
      const response = await backend.content.getCaseStudy({ slug: slug! });
      setCaseStudy(response);
    } catch (error) {
      console.error('Error loading case study:', error);
      setError('Case study not found');
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !caseStudy) {
    return (
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Case Study Not Found</h1>
            <p className="text-gray-600 mb-8">The case study you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/case-studies">Back to Case Studies</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Button asChild variant="ghost">
            <Link to="/case-studies">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Case Studies
            </Link>
          </Button>
        </div>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {caseStudy.service_type && (
              <Badge variant="secondary" className="text-sm">
                {caseStudy.service_type}
              </Badge>
            )}
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDate(caseStudy.published_at || caseStudy.created_at)}
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {caseStudy.title}
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <p className="text-lg"><strong>Client:</strong> {caseStudy.client_name}</p>
            </div>
            {caseStudy.industry && (
              <div>
                <p className="text-lg"><strong>Industry:</strong> {caseStudy.industry}</p>
              </div>
            )}
          </div>

          {caseStudy.featured_image && (
            <img
              src={caseStudy.featured_image}
              alt={caseStudy.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
            />
          )}
        </header>

        {/* Key Results */}
        {caseStudy.key_metrics && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 mb-12">
            <div className="flex items-center mb-6">
              <TrendingUp className="h-6 w-6 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-green-800">Key Results</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(caseStudy.key_metrics).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{value}</div>
                  <div className="text-green-700 font-medium">{key}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Case Study Sections */}
        <div className="space-y-12">
          {/* Challenge */}
          {caseStudy.challenge && (
            <section>
              <div className="flex items-center mb-6">
                <Target className="h-6 w-6 text-red-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">The Challenge</h2>
              </div>
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: caseStudy.challenge }} />
              </div>
            </section>
          )}

          {/* Solution */}
          {caseStudy.solution && (
            <section>
              <div className="flex items-center mb-6">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">The Solution</h2>
              </div>
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: caseStudy.solution }} />
              </div>
            </section>
          )}

          {/* Results */}
          {caseStudy.results && (
            <section>
              <div className="flex items-center mb-6">
                <TrendingUp className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">The Results</h2>
              </div>
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: caseStudy.results }} />
              </div>
            </section>
          )}
        </div>

        {/* CTA Section */}
        <div className="bg-blue-50 rounded-lg p-8 mt-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Achieve Similar Results?
          </h3>
          <p className="text-gray-600 mb-6">
            Let's discuss how we can help your business grow with our proven digital marketing strategies.
          </p>
          <Button asChild size="lg">
            <Link to="/contact">Get Free Consultation</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

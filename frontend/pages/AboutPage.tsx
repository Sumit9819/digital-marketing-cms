import { Users, Award, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const team = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    bio: 'With over 10 years in digital marketing, Sarah founded DigitalPro to help businesses achieve measurable growth through strategic marketing.'
  },
  {
    name: 'Mike Chen',
    role: 'Head of SEO',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    bio: 'Mike specializes in technical SEO and has helped hundreds of websites achieve top rankings in competitive markets.'
  },
  {
    name: 'Emily Rodriguez',
    role: 'PPC Specialist',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    bio: 'Emily manages multi-million dollar ad campaigns and consistently delivers exceptional ROI for our clients.'
  },
  {
    name: 'David Kim',
    role: 'Content Strategist',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    bio: 'David creates compelling content strategies that engage audiences and drive conversions across all digital channels.'
  }
];

const stats = [
  { icon: Users, label: 'Happy Clients', value: '500+' },
  { icon: Award, label: 'Years Experience', value: '10+' },
  { icon: Target, label: 'Projects Completed', value: '1,200+' },
  { icon: TrendingUp, label: 'Average ROI Increase', value: '300%' }
];

export function AboutPage() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About DigitalPro
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're a team of passionate digital marketing experts dedicated to helping 
            businesses grow through strategic, data-driven marketing campaigns.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-6">
              At DigitalPro, we believe every business deserves to thrive in the digital landscape. 
              Our mission is to provide comprehensive, results-driven digital marketing solutions 
              that help our clients achieve sustainable growth and success.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              We combine cutting-edge technology with proven strategies to deliver measurable 
              results that make a real impact on your bottom line. From SEO and PPC to content 
              marketing and analytics, we're your trusted partner in digital growth.
            </p>
            <Button asChild size="lg">
              <Link to="/contact">Work With Us</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
                  <Icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Results-Driven</h3>
              <p className="text-gray-600">
                We focus on delivering measurable results that directly impact your business goals 
                and drive real growth.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Client-Focused</h3>
              <p className="text-gray-600">
                Your success is our success. We work as an extension of your team to achieve 
                your marketing objectives.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600">
                We stay ahead of industry trends and leverage the latest tools and strategies 
                to give you a competitive edge.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss how our team can help you achieve your digital marketing goals.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/contact">Get Started Today</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

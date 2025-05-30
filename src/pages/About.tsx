
import React from 'react';
import { Brain, Target, Users, Award, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => {
  const values = [
    {
      icon: Brain,
      title: 'Innovation',
      description: 'We leverage cutting-edge AI technology to revolutionize educational assessment and improvement.'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for the highest standards in educational quality and continuous improvement.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We believe in bringing together educators, students, and institutions for collective growth.'
    },
    {
      icon: Award,
      title: 'Integrity',
      description: 'We maintain transparency and fairness in all our evaluations and recommendations.'
    }
  ];

  const features = [
    'AI-powered college infrastructure evaluation',
    'Teacher qualification assessment and improvement tips',
    'Student progress tracking and analytics',
    'Comprehensive educational quality metrics',
    'Real-time attendance monitoring',
    'Academic performance insights'
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About EduVision</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            Transforming education through AI-powered insights, comprehensive evaluations, and data-driven improvements for colleges, teachers, and students.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At EduVision, we believe that quality education is the foundation of progress. Our mission is to empower educational institutions, teachers, and students with AI-driven insights that promote continuous improvement and excellence.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We provide comprehensive evaluation systems that assess college infrastructure, teacher qualifications, and student progress, offering actionable recommendations for enhancement.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                  <div className="text-gray-600">Colleges Evaluated</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">10K+</div>
                  <div className="text-gray-600">Teachers Assessed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">50K+</div>
                  <div className="text-gray-600">Students Tracked</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
                  <div className="text-gray-600">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do at EduVision
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What We Offer</h2>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Why Choose EduVision?</h3>
              <ul className="space-y-3">
                <li>• Advanced AI algorithms for accurate assessments</li>
                <li>• Real-time data analytics and insights</li>
                <li>• User-friendly interface for all stakeholders</li>
                <li>• Continuous support and improvement recommendations</li>
                <li>• Secure and privacy-focused platform</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Education?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of educational institutions already using EduVision to improve their standards
          </p>
          <div className="space-x-4">
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              Get Started Today
            </Button>
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;

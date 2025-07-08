import React, { useState } from "react";
import {
  Building2,
  Users,
  BarChart3,
  Award,
  CheckCircle,
  ArrowRight,
  Camera,
  FileText,
  TrendingUp,
  Shield,
  Clock,
  Star,
  Upload,
  Eye,
} from "lucide-react";
import Header from "@/components/Header";

export const College = () => {
  const [activeTab, setActiveTab] = useState("infrastructure");

  const benefits = [
    {
      icon: Building2,
      title: "Infrastructure Excellence",
      description:
        "AI-powered analysis of facilities, laboratories, libraries, and campus infrastructure with detailed improvement recommendations.",
      color: "blue",
    },
    {
      icon: Users,
      title: "Faculty Management",
      description:
        "Comprehensive assessment of teacher qualifications, performance tracking, and professional development suggestions.",
      color: "purple",
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description:
        "Real-time insights into institutional performance with comparative analysis and benchmarking tools.",
      color: "green",
    },
    {
      icon: Award,
      title: "Accreditation Support",
      description:
        "Streamlined accreditation process with automated documentation and compliance tracking.",
      color: "orange",
    },
  ];

  const features = [
    {
      id: "infrastructure",
      title: "Infrastructure Analysis",
      icon: Building2,
      content: {
        title: "AI-Powered Infrastructure Evaluation",
        description:
          "Get comprehensive analysis of your college facilities with actionable insights.",
        points: [
          "Classroom and laboratory assessment",
          "Library and resource evaluation",
          "Campus safety and accessibility audit",
          "Technology infrastructure analysis",
          "Sports and recreational facilities review",
        ],
        metrics: [
          { label: "Facilities Evaluated", value: "500+", color: "blue" },
          {
            label: "Improvement Areas Identified",
            value: "2K+",
            color: "green",
          },
          { label: "Average Score Improvement", value: "23%", color: "purple" },
        ],
      },
    },
    {
      id: "faculty",
      title: "Faculty Assessment",
      icon: Users,
      content: {
        title: "Comprehensive Faculty Evaluation",
        description:
          "Analyze teacher qualifications, performance, and development needs.",
        points: [
          "Qualification verification and assessment",
          "Teaching methodology evaluation",
          "Student feedback analysis",
          "Professional development tracking",
          "Performance benchmarking",
        ],
        metrics: [
          { label: "Teachers Assessed", value: "10K+", color: "purple" },
          { label: "Qualifications Verified", value: "50K+", color: "blue" },
          { label: "Performance Improved", value: "85%", color: "green" },
        ],
      },
    },
    {
      id: "analytics",
      title: "Performance Analytics",
      icon: BarChart3,
      content: {
        title: "Advanced Educational Analytics",
        description:
          "Data-driven insights for continuous improvement and strategic planning.",
        points: [
          "Student performance tracking",
          "Institutional benchmarking",
          "Predictive analytics for outcomes",
          "Resource utilization analysis",
          "Trend identification and forecasting",
        ],
        metrics: [
          { label: "Data Points Analyzed", value: "1M+", color: "green" },
          { label: "Prediction Accuracy", value: "95%", color: "blue" },
          { label: "Institutions Compared", value: "500+", color: "purple" },
        ],
      },
    },
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      position: "Principal, Metropolitan College",
      quote:
        "EduVision transformed our evaluation process. The AI insights helped us identify infrastructure gaps we never noticed before.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b332e234?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Prof. Michael Chen",
      position: "Dean of Engineering, Tech Institute",
      quote:
        "The faculty assessment feature provided invaluable insights into our teaching quality and helped improve our accreditation score.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Dr. Priya Sharma",
      position: "Vice Chancellor, State University",
      quote:
        "Outstanding platform! The analytics dashboard gives us real-time insights that drive our strategic decisions.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
  ];

  const steps = [
    {
      step: 1,
      title: "Register Your Institution",
      description:
        "Create your college profile and provide basic institutional information.",
      icon: FileText,
    },
    {
      step: 2,
      title: "Upload Documentation",
      description:
        "Submit photos, certificates, and relevant documents for AI analysis.",
      icon: Upload,
    },
    {
      step: 3,
      title: "AI Analysis",
      description:
        "Our advanced AI algorithms evaluate your infrastructure and faculty.",
      icon: Eye,
    },
    {
      step: 4,
      title: "Get Insights",
      description:
        "Receive detailed reports with scores, rankings, and improvement recommendations.",
      icon: TrendingUp,
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      green: "bg-green-500/10 text-green-400 border-green-500/20",
      orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const activeFeature = features.find((f) => f.id === activeTab);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Header />
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Elevate Your College with
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent block">
                AI-Powered Insights
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Transform your educational institution with comprehensive AI
              analysis of infrastructure, faculty qualifications, and
              institutional performance. Get actionable insights for continuous
              improvement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 transform hover:scale-105">
                <span className="font-semibold">Start Free Evaluation</span>
                <ArrowRight size={20} />
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-slate-900 transition-all duration-300">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Why Choose EduVision for Your College?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive solutions designed specifically for educational
              institutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div
                    className={`w-16 h-16 rounded-xl ${getColorClasses(
                      benefit.color
                    )} flex items-center justify-center mb-6 border`}
                  >
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Comprehensive Evaluation Features
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Explore our advanced features designed to enhance your
              institution's performance
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Tab Navigation */}
            <div className="space-y-4">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <button
                    key={feature.id}
                    onClick={() => setActiveTab(feature.id)}
                    className={`w-full p-6 rounded-xl text-left transition-all duration-300 ${
                      activeTab === feature.id
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-900"
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <Icon size={24} />
                      <span className="text-lg font-semibold">
                        {feature.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="bg-slate-50 rounded-xl p-8">
              {activeFeature && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-900">
                    {activeFeature.content.title}
                  </h3>
                  <p className="text-slate-600 text-lg">
                    {activeFeature.content.description}
                  </p>

                  <div className="space-y-3">
                    {activeFeature.content.points.map((point, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-slate-700">{point}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-6">
                    {activeFeature.content.metrics.map((metric, index) => (
                      <div key={index} className="text-center">
                        <div
                          className={`text-2xl font-bold ${
                            metric.color === "blue"
                              ? "text-blue-600"
                              : metric.color === "green"
                              ? "text-green-600"
                              : "text-purple-600"
                          }`}
                        >
                          {metric.value}
                        </div>
                        <div className="text-sm text-slate-600">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Simple 4-step process to get comprehensive insights about your
              institution
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Icon className="h-10 w-10 text-blue-600" />
                  </div>
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              What College Leaders Say
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Hear from educators who have transformed their institutions with
              EduVision
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-slate-50 rounded-xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-slate-700 mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-slate-900">
                      {testimonial.name}
                    </div>
                    <div className="text-slate-600 text-sm">
                      {testimonial.position}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your College?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of institutions already using EduVision to achieve
            educational excellence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all duration-300 font-semibold">
              Start Free Evaluation
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
              Contact Our Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default College;

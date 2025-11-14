
import React from 'react';
import { Building2, Users, GraduationCap, TrendingUp, Camera, Award } from 'lucide-react';

const FeatureCards = () => {
  const features = [
    {
      icon: Building2,
      title: "College Infrastructure Analysis",
      description: "AI-powered evaluation of college facilities, laboratories, libraries, and campus infrastructure.",
      color: "blue"
    },
    {
      icon: Users,
      title: "Teacher Qualification Assessment",
      description: "Comprehensive analysis of faculty credentials, experience, and teaching methodologies.",
      color: "purple"
    },
    {
      icon: GraduationCap,
      title: "Student Progress Tracking",
      description: "Monitor academic performance, attendance, and receive personalized enhancement recommendations.",
      color: "green"
    },
    {
      icon: TrendingUp,
      title: "Performance Analytics",
      description: "Advanced analytics and insights to drive continuous improvement in educational standards.",
      color: "orange"
    },
    {
      icon: Camera,
      title: "Visual Documentation",
      description: "Upload and analyze images of facilities, certificates, and achievements for comprehensive evaluation.",
      color: "pink"
    },
    {
      icon: Award,
      title: "Certification & Rankings",
      description: "Generate detailed reports and rankings based on comprehensive AI analysis.",
      color: "indigo"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      green: "bg-green-500/10 text-green-400 border-green-500/20",
      orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      pink: "bg-pink-500/10 text-pink-400 border-pink-500/20",
      indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Comprehensive Educational Evaluation
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Our AI-powered platform provides in-depth analysis and actionable insights 
            for colleges, teachers, and students to achieve educational excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-200"
              >
                <div className={`w-16 h-16 rounded-xl ${getColorClasses(feature.color)} flex items-center justify-center mb-6 border`}>
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;

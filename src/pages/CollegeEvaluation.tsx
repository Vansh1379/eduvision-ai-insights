import React, { useState } from "react";
import {
  Upload,
  FileText,
  Camera,
  CheckCircle,
  ArrowRight,
  Building2,
  Users,
  Award,
  BarChart3,
  Eye,
  TrendingUp,
  Clock,
  AlertCircle,
  X,
  Download,
} from "lucide-react";
import Header from "@/components/Header";

export const CollegeEvaluation = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [collegeInfo, setCollegeInfo] = useState({
    name: "",
    type: "",
    location: "",
    establishedYear: "",
    accreditation: "",
    studentCount: "",
  });

  const steps = [
    { id: 1, title: "College Information", icon: FileText },
    { id: 2, title: "Document Upload", icon: Upload },
    { id: 3, title: "Infrastructure Photos", icon: Camera },
    { id: 4, title: "AI Analysis", icon: Eye },
    { id: 5, title: "Results & Insights", icon: TrendingUp },
  ];

  const documentTypes = [
    {
      id: "accreditation",
      title: "Accreditation Certificates",
      description: "Upload NAAC, UGC, or other accreditation documents",
      required: true,
      icon: Award,
    },
    {
      id: "faculty",
      title: "Faculty Credentials",
      description: "Teacher qualification certificates and CVs",
      required: true,
      icon: Users,
    },
    {
      id: "infrastructure",
      title: "Infrastructure Reports",
      description:
        "Building certificates, lab equipment lists, library catalog",
      required: true,
      icon: Building2,
    },
    {
      id: "academic",
      title: "Academic Records",
      description: "Syllabus, curriculum, examination results",
      required: false,
      icon: BarChart3,
    },
  ];

  const photoCategories = [
    {
      id: "classrooms",
      title: "Classrooms",
      description: "Lecture halls, smart classrooms, seating arrangements",
      maxFiles: 10,
    },
    {
      id: "laboratories",
      title: "Laboratories",
      description: "Science labs, computer labs, research facilities",
      maxFiles: 15,
    },
    {
      id: "library",
      title: "Library",
      description: "Reading rooms, book collection, digital resources",
      maxFiles: 8,
    },
    {
      id: "sports",
      title: "Sports & Recreation",
      description: "Sports facilities, gymnasium, playgrounds",
      maxFiles: 10,
    },
    {
      id: "hostel",
      title: "Hostel & Dining",
      description: "Accommodation facilities, mess, common areas",
      maxFiles: 12,
    },
    {
      id: "campus",
      title: "Campus Overview",
      description: "General campus views, gardens, parking",
      maxFiles: 8,
    },
  ];

  const handleFileUpload = (type, files) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [type]: [...(prev[type] || []), ...Array.from(files)],
    }));
  };

  const removeFile = (type, index) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      setCurrentStep(5);
    }, 5000);
  };

  const mockResults = {
    overallScore: 8.7,
    infrastructure: { score: 8.5, status: "Excellent" },
    faculty: { score: 9.2, status: "Outstanding" },
    accreditation: { score: 8.8, status: "Very Good" },
    recommendations: [
      "Upgrade computer lab equipment in the CS department",
      "Expand library digital resources collection",
      "Improve hostel recreational facilities",
      "Enhance classroom audio-visual systems",
    ],
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-12">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;

        return (
          <div key={step.id} className="flex items-center">
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                isCompleted
                  ? "bg-green-500 border-green-500 text-white"
                  : isActive
                  ? "bg-blue-500 border-blue-500 text-white"
                  : "bg-gray-100 border-gray-300 text-gray-400"
              }`}
            >
              {isCompleted ? <CheckCircle size={20} /> : <Icon size={20} />}
            </div>
            <div className="ml-3 mr-8">
              <div
                className={`text-sm font-medium ${
                  isActive
                    ? "text-blue-600"
                    : isCompleted
                    ? "text-green-600"
                    : "text-gray-400"
                }`}
              >
                {step.title}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 w-16 ${
                  isCompleted ? "bg-green-500" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              College Information
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  College Name
                </label>
                <input
                  type="text"
                  value={collegeInfo.name}
                  onChange={(e) =>
                    setCollegeInfo({ ...collegeInfo, name: e.target.value })
                  }
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter college name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  College Type
                </label>
                <select
                  value={collegeInfo.type}
                  onChange={(e) =>
                    setCollegeInfo({ ...collegeInfo, type: e.target.value })
                  }
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select type</option>
                  <option value="engineering">Engineering</option>
                  <option value="medical">Medical</option>
                  <option value="arts">Arts & Science</option>
                  <option value="business">Business</option>
                  <option value="university">University</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={collegeInfo.location}
                  onChange={(e) =>
                    setCollegeInfo({ ...collegeInfo, location: e.target.value })
                  }
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="City, State"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Established Year
                </label>
                <input
                  type="number"
                  value={collegeInfo.establishedYear}
                  onChange={(e) =>
                    setCollegeInfo({
                      ...collegeInfo,
                      establishedYear: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="YYYY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Current Accreditation
                </label>
                <input
                  type="text"
                  value={collegeInfo.accreditation}
                  onChange={(e) =>
                    setCollegeInfo({
                      ...collegeInfo,
                      accreditation: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="NAAC Grade, UGC Status, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Student Count
                </label>
                <input
                  type="number"
                  value={collegeInfo.studentCount}
                  onChange={(e) =>
                    setCollegeInfo({
                      ...collegeInfo,
                      studentCount: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Total enrolled students"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Upload Documents
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {documentTypes.map((docType) => {
                const Icon = docType.icon;
                const files = uploadedFiles[docType.id] || [];

                return (
                  <div
                    key={docType.id}
                    className="bg-white border border-slate-200 rounded-xl p-6"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <Icon className="h-6 w-6 text-blue-600" />
                      <h3 className="text-lg font-semibold text-slate-900">
                        {docType.title}
                      </h3>
                      {docType.required && (
                        <span className="text-red-500 text-sm">*</span>
                      )}
                    </div>
                    <p className="text-slate-600 mb-4">{docType.description}</p>

                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(e) =>
                          handleFileUpload(docType.id, e.target.files)
                        }
                        className="hidden"
                        id={`upload-${docType.id}`}
                      />
                      <label
                        htmlFor={`upload-${docType.id}`}
                        className="cursor-pointer"
                      >
                        <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-slate-600">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-slate-400 text-sm">
                          PDF, DOC, DOCX, JPG, PNG (max 10MB each)
                        </p>
                      </label>
                    </div>

                    {files.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {files.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-slate-50 p-2 rounded"
                          >
                            <span className="text-sm text-slate-700">
                              {file.name}
                            </span>
                            <button
                              onClick={() => removeFile(docType.id, index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="max-w-6xl mx-auto space-y-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Infrastructure Photos
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photoCategories.map((category) => {
                const files = uploadedFiles[category.id] || [];

                return (
                  <div
                    key={category.id}
                    className="bg-white border border-slate-200 rounded-xl p-6"
                  >
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {category.title}
                    </h3>
                    <p className="text-slate-600 mb-4">
                      {category.description}
                    </p>
                    <p className="text-sm text-slate-500 mb-4">
                      Max {category.maxFiles} photos
                    </p>

                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        multiple
                        accept=".jpg,.jpeg,.png"
                        onChange={(e) =>
                          handleFileUpload(category.id, e.target.files)
                        }
                        className="hidden"
                        id={`photo-${category.id}`}
                      />
                      <label
                        htmlFor={`photo-${category.id}`}
                        className="cursor-pointer"
                      >
                        <Camera className="h-6 w-6 text-slate-400 mx-auto mb-2" />
                        <p className="text-slate-600 text-sm">Upload Photos</p>
                      </label>
                    </div>

                    {files.length > 0 && (
                      <div className="mt-4">
                        <div className="grid grid-cols-2 gap-2">
                          {files.slice(0, 4).map((file, index) => (
                            <div key={index} className="relative">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`${category.title} ${index + 1}`}
                                className="w-full h-20 object-cover rounded"
                              />
                              <button
                                onClick={() => removeFile(category.id, index)}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                        {files.length > 4 && (
                          <p className="text-sm text-slate-500 mt-2">
                            +{files.length - 4} more photos
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              AI Analysis
            </h2>
            {!isAnalyzing && !analysisComplete && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <Eye className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Ready for Analysis
                  </h3>
                  <p className="text-slate-600 mb-4">
                    Our AI will analyze your documents and photos to provide
                    comprehensive insights about your college infrastructure,
                    faculty qualifications, and educational standards.
                  </p>
                  <button
                    onClick={startAnalysis}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 mx-auto"
                  >
                    <span>Start AI Analysis</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {isAnalyzing && (
              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <Clock className="h-12 w-12 text-yellow-600 mx-auto mb-4 animate-spin" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Analysis in Progress
                  </h3>
                  <p className="text-slate-600">
                    Our AI is analyzing your documents and photos. This may take
                    a few minutes...
                  </p>
                  <div className="mt-4 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full animate-pulse"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Evaluation Results
            </h2>

            <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl p-6 text-center">
              <h3 className="text-2xl font-bold mb-2">Overall Score</h3>
              <div className="text-5xl font-bold mb-2">
                {mockResults.overallScore}/10
              </div>
              <p className="text-lg">Excellent Performance</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <Building2 className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Infrastructure
                </h3>
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {mockResults.infrastructure.score}/10
                </div>
                <p className="text-slate-600">
                  {mockResults.infrastructure.status}
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <Users className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Faculty
                </h3>
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {mockResults.faculty.score}/10
                </div>
                <p className="text-slate-600">{mockResults.faculty.status}</p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <Award className="h-8 w-8 text-green-600 mb-3" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Accreditation
                </h3>
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {mockResults.accreditation.score}/10
                </div>
                <p className="text-slate-600">
                  {mockResults.accreditation.status}
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Improvement Recommendations
              </h3>
              <div className="space-y-3">
                {mockResults.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-700">{rec}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Download size={20} />
                <span>Download Report</span>
              </button>
              <button className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                Schedule Consultation
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              College Evaluation
            </h1>
            <p className="text-xl text-slate-600">
              Comprehensive AI-powered assessment of your institution
            </p>
          </div>

          <StepIndicator />

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            {renderStepContent()}
          </div>

          <div className="flex justify-between">
            <button
              onClick={handlePreviousStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg transition-colors ${
                currentStep === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              Previous
            </button>

            {currentStep < 4 && (
              <button
                onClick={handleNextStep}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next Step
              </button>
            )}

            {currentStep === 5 && (
              <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Start New Evaluation
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeEvaluation;

import React, { useState } from 'react';
import { ExternalLink, Github, Filter, Search, Eye } from 'lucide-react';

const ProjectFilter = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [previewProject, setPreviewProject] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: "Result Dashboard",
      description: "A modern, responsive admin dashboard for school result  management with real-time analytics..",
      image: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React", "Tailwind CSS", "Chart.js", "Firebase"],
      githubUrl: "https://github.com/anastasiandoh/ecommerce-dashboard",
      liveUrl: "https://ecommerce-dashboard-demo.vercel.app",
      category: "Web Application",
      featured: true,
      status: "Completed",
      year: "2024"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with drag-and-drop functionality, real-time updates, and team collaboration features.",
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Zustand"],
      githubUrl: "https://github.com/anastasiandoh/task-manager",
      liveUrl: "https://task-manager-demo.vercel.app",
      category: "Productivity",
      featured: true,
      status: "Completed",
      year: "2024"
    },
    {
      id: 3,
      title: "Weather Forecast App",
      description: "A beautiful weather application with location-based forecasts, interactive maps, and detailed weather analytics.",
      image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React", "OpenWeather API", "CSS3", "Responsive Design"],
      githubUrl: "https://github.com/anastasiandoh/weather-app",
      liveUrl: "https://weather-forecast-demo.vercel.app",
      category: "Web Application",
      featured: false,
      status: "Completed",
      year: "2023"
    },
    {
      id: 4,
      title: "AI Chat Interface",
      description: "An intelligent chat interface with natural language processing, context awareness, and modern UI design patterns.",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React", "TypeScript", "OpenAI API", "Tailwind CSS"],
      githubUrl: "https://github.com/anastasiandoh/ai-chat",
      liveUrl: "https://ai-chat-demo.vercel.app",
      category: "AI/ML",
      featured: true,
      status: "In Progress",
      year: "2024"
    },
    {
      id: 5,
      title: "Expense Tracker",
      description: "A comprehensive expense tracking application with budget management, spending analytics, and financial goal setting.",
      image: "https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React", "JavaScript", "Chart.js", "Local Storage"],
      githubUrl: "https://github.com/anastasiandoh/expense-tracker",
      liveUrl: "https://expense-tracker-demo.vercel.app",
      category: "Finance",
      featured: false,
      status: "Completed",
      year: "2023"
    },
    {
      id: 6,
      title: "Cybersecurity Dashboard",
      description: "A security monitoring dashboard with threat detection, vulnerability scanning, and real-time security metrics.",
      image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800",
      technologies: ["React", "D3.js", "Node.js", "MongoDB"],
      githubUrl: "https://github.com/anastasiandoh/security-dashboard",
      liveUrl: "https://security-dashboard-demo.vercel.app",
      category: "Security",
      featured: true,
      status: "In Progress",
      year: "2024"
    }
  ];

  const categories = ['All', 'Web Application', 'Productivity', 'AI/ML', 'Finance', 'Security'];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedFilter === 'All' || project.category === selectedFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'In Progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Search and Filter Controls */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedFilter === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="text-center text-gray-600 dark:text-gray-400">
          Showing {filteredProjects.length} of {projects.length} projects
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
          >
            {/* Project Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
              
              {/* Overlay Controls */}
              <div className="absolute top-4 left-4 flex space-x-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
                {project.featured && (
                  <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </span>
                )}
              </div>

              <div className="absolute top-4 right-4">
                <span className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {project.year}
                </span>
              </div>

              {/* Preview Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => setPreviewProject(previewProject === project.id ? null : project.id)}
                  className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-4 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
                >
                  <Eye className="h-4 w-4" />
                  <span>Quick Preview</span>
                </button>
              </div>
            </div>

            {/* Project Content */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  {project.title}
                </h3>
                <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-semibold">
                  {project.category}
                </span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  <Github className="h-5 w-5 mr-2" />
                  Code
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Live Demo
                </a>
              </div>
            </div>

            {/* Quick Preview */}
            {previewProject === project.id && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-700">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Quick Preview</h4>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1 bg-gray-100 dark:bg-gray-600 rounded px-2 py-1 text-xs text-gray-600 dark:text-gray-400">
                      {project.liveUrl}
                    </div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-600 rounded h-32 flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                      Live preview would load here
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <Filter className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            No projects found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search terms or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectFilter;
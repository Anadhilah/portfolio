import React, { useState } from 'react';
import { Code, Database, Globe, Palette, Shield, Zap, Star } from 'lucide-react';

const InteractiveSkills = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skillCategories = [
    {
      id: 'frontend',
      title: "Frontend Development",
      icon: <Code className="h-8 w-8" />,
      color: "blue",
      description: "Building beautiful, responsive user interfaces",
      skills: [
        { name: "HTML/CSS", level: 90, experience: "3+ years", projects: 15 },
        { name: "JavaScript", level: 85, experience: "2+ years", projects: 12 },
        { name: "React", level: 80, experience: "1.5+ years", projects: 8 },
        { name: "Tailwind CSS", level: 85, experience: "1+ year", projects: 10 },
        { name: "TypeScript", level: 75, experience: "1+ year", projects: 6 }
      ]
    },
    {
      id: 'design',
      title: "Design & UX",
      icon: <Palette className="h-8 w-8" />,
      color: "purple",
      description: "Creating intuitive and visually appealing designs",
      skills: [
        { name: "UI/UX Design", level: 75, experience: "2+ years", projects: 8 },
        { name: "Responsive Design", level: 90, experience: "2+ years", projects: 15 },
        { name: "Figma", level: 70, experience: "1+ year", projects: 5 },
        { name: "Adobe XD", level: 65, experience: "1+ year", projects: 4 }
      ]
    },
    {
      id: 'tools',
      title: "Development Tools",
      icon: <Zap className="h-8 w-8" />,
      color: "green",
      description: "Efficient development workflow and tooling",
      skills: [
        { name: "Git & GitHub", level: 85, experience: "2+ years", projects: 20 },
        { name: "VS Code", level: 95, experience: "3+ years", projects: 25 },
        { name: "npm/yarn", level: 80, experience: "2+ years", projects: 15 },
        { name: "Webpack/Vite", level: 70, experience: "1+ year", projects: 8 }
      ]
    },
    {
      id: 'backend',
      title: "Backend & Database",
      icon: <Database className="h-8 w-8" />,
      color: "orange",
      description: "Server-side development and data management",
      skills: [
        { name: "Node.js", level: 60, experience: "6+ months", projects: 4 },
        { name: "MongoDB", level: 65, experience: "8+ months", projects: 3 },
        { name: "Firebase", level: 70, experience: "1+ year", projects: 5 },
        { name: "REST APIs", level: 75, experience: "1+ year", projects: 6 }
      ]
    }
  ];

  const getColorClasses = (color: string, isSelected: boolean = false) => {
    const colorMap = {
      blue: isSelected 
        ? "bg-blue-600 text-white border-blue-600" 
        : "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400",
      purple: isSelected 
        ? "bg-purple-600 text-white border-purple-600" 
        : "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400",
      green: isSelected 
        ? "bg-green-600 text-white border-green-600" 
        : "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-600 dark:text-green-400",
      orange: isSelected 
        ? "bg-orange-600 text-white border-orange-600" 
        : "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400"
    };
    return colorMap[color as keyof typeof colorMap] || "bg-gray-50 border-gray-200";
  };

  const getProgressColor = (color: string) => {
    const colorMap = {
      blue: "bg-blue-600",
      purple: "bg-purple-600",
      green: "bg-green-600",
      orange: "bg-orange-600"
    };
    return colorMap[color as keyof typeof colorMap] || "bg-gray-600";
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Category Selection */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {skillCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
            className={`p-6 border-2 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${getColorClasses(category.color, selectedCategory === category.id)}`}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-3">
                {React.cloneElement(category.icon, {
                  className: selectedCategory === category.id ? "h-8 w-8 text-white" : `h-8 w-8 text-${category.color}-600 dark:text-${category.color}-400`
                })}
              </div>
              <h3 className="font-bold text-sm lg:text-base mb-2">
                {category.title}
              </h3>
              <p className="text-xs opacity-80 hidden lg:block">
                {category.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Skills Display */}
      {selectedCategory && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          {skillCategories
            .filter(cat => cat.id === selectedCategory)
            .map((category) => (
              <div key={category.id} className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {category.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {category.skills.map((skill, index) => (
                    <div
                      key={skill.name}
                      className="relative p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer"
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-semibold text-gray-800 dark:text-white">
                          {skill.name}
                        </span>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(skill.level / 20)
                                  ? `text-${category.color}-500 fill-current`
                                  : 'text-gray-300 dark:text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                          <span>Proficiency</span>
                          <span>{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-1000 ease-out ${getProgressColor(category.color)}`}
                            style={{
                              width: `${skill.level}%`,
                              animation: `slideIn 1s ease-out ${index * 0.1}s both`
                            }}
                          />
                        </div>
                      </div>

                      {hoveredSkill === skill.name && (
                        <div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-xl border-2 border-gray-200 dark:border-gray-600 z-10">
                          <h4 className="font-bold text-gray-800 dark:text-white mb-2">
                            {skill.name}
                          </h4>
                          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <p><strong>Experience:</strong> {skill.experience}</p>
                            <p><strong>Projects:</strong> {skill.projects} completed</p>
                            <p><strong>Level:</strong> {skill.level >= 80 ? 'Expert' : skill.level >= 60 ? 'Intermediate' : 'Beginner'}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}

      {!selectedCategory && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
            <Zap className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Select a Category
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Click on any category above to explore my skills in detail
          </p>
        </div>
      )}
    </div>
  );
};

export default InteractiveSkills;
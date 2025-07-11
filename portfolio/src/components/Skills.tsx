import React from 'react';
import { Code, Database, Globe, Palette, Shield, Zap } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Code className="h-8 w-8 text-blue-600" />,
      color: "blue",
      skills: [
        { name: "HTML/CSS", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "React", level: 80 },
        { name: "Tailwind CSS", level: 85 },
        { name: "TypeScript", level: 75 }
      ]
    },
    {
      title: "Design & UX",
      icon: <Palette className="h-8 w-8 text-purple-600" />,
      color: "purple",
      skills: [
        { name: "UI/UX Design", level: 75 },
        { name: "Responsive Design", level: 90 },
        { name: "Figma", level: 70 },
        { name: "Adobe XD", level: 65 }
      ]
    },
    {
      title: "Development Tools",
      icon: <Zap className="h-8 w-8 text-green-600" />,
      color: "green",
      skills: [
        { name: "Git & GitHub", level: 85 },
        { name: "VS Code", level: 95 },
        { name: "npm/yarn", level: 80 },
        { name: "Webpack/Vite", level: 70 }
      ]
    },
    {
      title: "Backend & Database",
      icon: <Database className="h-8 w-8 text-orange-600" />,
      color: "orange",
      skills: [
        { name: "Node.js", level: 60 },
        { name: "MongoDB", level: 65 },
        { name: "Firebase", level: 70 },
        { name: "REST APIs", level: 75 }
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "bg-blue-50 border-blue-200",
      purple: "bg-purple-50 border-purple-200",
      green: "bg-green-50 border-green-200",
      orange: "bg-orange-50 border-orange-200"
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
    <section id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Skills & Expertise
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Here's an overview of my technical skills and the tools I use to bring ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className={`border-2 rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${getColorClasses(category.color)}`}
            >
              <div className="flex items-center mb-6">
                {category.icon}
                <h3 className="text-xl font-bold text-gray-800 ml-3">
                  {category.title}
                </h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 font-medium">{skill.name}</span>
                      <span className="text-gray-600 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-1000 ease-out ${getProgressColor(category.color)}`}
                        style={{
                          width: `${skill.level}%`,
                          animation: `slideIn 1s ease-out ${skillIndex * 0.1}s both`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-8">
            Other Technologies & Interests
          </h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {[
              "Cybersecurity",
              "AI & Machine Learning",
              "Python",
              "Linux",
              "Docker",
              "AWS",
              "GraphQL",
              "Testing (Jest)",
              "Agile/Scrum",
              "Problem Solving",
              "Team Collaboration",
              "Technical Writing"
            ].map((skill, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm hover:bg-gray-200 transition-colors duration-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            width: 0%;
          }
          to {
            width: var(--target-width);
          }
        }
      `}</style>
    </section>
  );
};

export default Skills;
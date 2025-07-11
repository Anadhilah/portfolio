import React, { useState } from 'react';
import { Calendar, MapPin, Award, BookOpen, Code, Target, Star, ChevronRight } from 'lucide-react';

const JourneyTimeline = () => {
  const [selectedMilestone, setSelectedMilestone] = useState<number | null>(null);

  const milestones = [
    

   {
  id: 0,
  year: "2019",
  title: "Discovered Tech in SHS",
  subtitle: "Methodist Girls Highh School",
  description: "This was the spark. I got introduced to robotics and basic programming during Robotics club activities. It was here my love for coding and innovation began.",
  icon: <BookOpen className="h-6 w-6" />,
  color: "blue",
  achievements: [
    "Joined STEM & Robotics Club",
    "Built my first Arduino project",
    "My my first webpage with HTML"
  ],
  location: "Mamfe - Eastern Region, Ghana"
},

    {
      id: 1,
      year: "2022",
      title: "Started University",
      subtitle: "University of Ghana",
      description: "Enrolled in BSc Information Technology. Focused on foundational IT skills while exploring web development and programming languages.",
      icon: <Calendar className="h-6 w-6" />,
      color: "blue",
      achievements: [
        "Completed 3 years and counting year with distinction",
        "Learned HTML, CSS, JavaScript basics, React, some programming languages etc ",
        "Built first  website"
      ],
      location: "University of Ghana, Legon"
    },


    
    {
      id: 2,
      year: "2023",
      title: "More Web Projects",
      subtitle: "Frontend Development Focus",
      description: "Started building real projects with HTML, CSS, and JavaScript. Created my first interactive web applications and learned responsive design principles.",
      icon: <Code className="h-6 w-6" />,
      color: "green",
      achievements: [
        "Built 3+ static websites",
        "Learned JavaScript fundamentals",
        "Learned CSS Grid & Flexbox",
        "Created first portfolio website"
      ],
      location: "Self-taught & University Projects"
    },
    {
      id: 3,
      year: "2023",
      title: "React & Modern Tools",
      subtitle: "Advanced Frontend Skills",
      description: "Discovered React and modern development tools. Started using Git, learned component-based architecture, and built more  applications for fun",
      icon: <Star className="h-6 w-6" />,
      color: "purple",
      achievements: [
        "Learned React fundamentals",
        "Started using Git & GitHub",
        "Built  apps",
        "Learned React native"
      ],
      location: "Online Learning, Practice & school projects"
    },
    {
      id: 4,
      year: "2024",
      title: "Cybersecurity Interest",
      subtitle: "Expanding Knowledge Base",
      description: "Developed interest in cybersecurity while continuing frontend development. Started learning doing reasearch but paused on the learning for now.",
      icon: <Award className="h-6 w-6" />,
      color: "red",
      achievements: [
        "Learned about web vulnerabilities",
      ],
      location: "Online Courses & Self-Study"
    },
    {
      id: 5,
      year: "2024",
      title: "AI ",
      subtitle: "Exploring New Frontiers",
      description: "Currently exploring AI  applications in web development. Building AI-powered applications and learning about modern AI tools.to help me in accomplishing tasks",
      icon: <Target className="h-6 w-6" />,
      color: "orange",
      achievements: [
        "Built AI chat interface",
        "Learned about LLMs",
        "Integrated AI APIs with the help of AIs",
      
      ],
      location: "Current Focus Area",
      current: true
    },
    {
      id: 6,
      year: "2025",
      title: "Future Goals",
      subtitle: "Career Aspirations",
      description: "Planning to graduate and start my career as a frontend developer while continuing to explore cybersecurity and AI. Specific goals are yet to be discovered.",
      icon: <ChevronRight className="h-6 w-6" />,
      color: "gray",
      achievements: [
        "Graduate with BSc IT",
        "Land first developer job",
        "Contribute to open source",
        "Build full-stack applications"
      ],
      location: "Future Plans",
      future: true
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "bg-blue-500 border-blue-200 text-blue-600",
      green: "bg-green-500 border-green-200 text-green-600",
      purple: "bg-purple-500 border-purple-200 text-purple-600",
      red: "bg-red-500 border-red-200 text-red-600",
      orange: "bg-orange-500 border-orange-200 text-orange-600",
      gray: "bg-gray-400 border-gray-200 text-gray-600"
    };
    return colorMap[color as keyof typeof colorMap] || "bg-gray-500 border-gray-200 text-gray-600";
  };

  const getCardColor = (color: string) => {
    const colorMap = {
      blue: "border-blue-200 bg-blue-50 dark:bg-blue-900/10 dark:border-blue-800",
      green: "border-green-200 bg-green-50 dark:bg-green-900/10 dark:border-green-800",
      purple: "border-purple-200 bg-purple-50 dark:bg-purple-900/10 dark:border-purple-800",
      red: "border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-800",
      orange: "border-orange-200 bg-orange-50 dark:bg-orange-900/10 dark:border-orange-800",
      gray: "border-gray-200 bg-gray-50 dark:bg-gray-900/10 dark:border-gray-800"
    };
    return colorMap[color as keyof typeof colorMap] || "border-gray-200 bg-gray-50";
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            My Journey
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            From university student to aspiring developer - here's how my passion for technology has evolved
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600"></div>

            {/* Timeline Items */}
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={milestone.id} className="relative flex items-start">
                  {/* Timeline Dot */}
                  <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 ${getColorClasses(milestone.color)} ${milestone.current ? 'animate-pulse' : ''}`}>
                    <div className="bg-white dark:bg-gray-800 rounded-full p-2">
                      {React.cloneElement(milestone.icon, {
                        className: `h-6 w-6 ${milestone.future ? 'text-gray-400' : `text-${milestone.color}-600`}`
                      })}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="ml-8 flex-1">
                    <div
                      className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${getCardColor(milestone.color)} ${selectedMilestone === milestone.id ? 'shadow-xl scale-105' : ''} ${milestone.future ? 'opacity-75' : ''}`}
                      onClick={() => setSelectedMilestone(selectedMilestone === milestone.id ? null : milestone.id)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-bold ${milestone.future ? 'bg-gray-200 text-gray-600' : `bg-${milestone.color}-100 text-${milestone.color}-800`} dark:bg-opacity-20`}>
                            {milestone.year}
                          </span>
                          {milestone.current && (
                            <span className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                              Current
                            </span>
                          )}
                          {milestone.future && (
                            <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-semibold">
                              Future
                            </span>
                          )}
                        </div>
                        <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${selectedMilestone === milestone.id ? 'rotate-90' : ''}`} />
                      </div>

                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 font-medium mb-3">
                        {milestone.subtitle}
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                        {milestone.description}
                      </p>

                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <MapPin className="h-4 w-4 mr-1" />
                        {milestone.location}
                      </div>

                      {/* Expanded Content */}
                      {selectedMilestone === milestone.id && (
                        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                          <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                            Key Achievements:
                          </h4>
                          <ul className="space-y-2">
                            {milestone.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-center text-gray-700 dark:text-gray-300">
                                <div className={`w-2 h-2 rounded-full mr-3 bg-${milestone.color}-500`}></div>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-3xl font-bold text-blue-600 mb-2">2+</div>
            <div className="text-gray-600 dark:text-gray-400">Years Learning</div>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-3xl font-bold text-green-600 mb-2">5+</div>
            <div className="text-gray-600 dark:text-gray-400">Projects Built </div>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-3xl font-bold text-purple-600 mb-2">8+</div>
            <div className="text-gray-600 dark:text-gray-400">Technologies</div>
          </div>
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-3xl font-bold text-orange-600 mb-2">3</div>
            <div className="text-gray-600 dark:text-gray-400">Focus Areas</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;
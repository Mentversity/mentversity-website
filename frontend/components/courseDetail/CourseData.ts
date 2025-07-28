// components/courseDetail/CourseData.ts

export interface CourseDetailType {
  id: string;
  title: string;
  category: string;
  level: string;
  instructor: {
    name: string;
    title: string;
    bio: string;
    image: string;
    social: {
      linkedin?: string;
      twitter?: string;
      website?: string;
    };
  };
  rating: number;
  reviews: number;
  price: number;
  image: string;
  description: string;
  longDescription: string;
  duration: string;
  isPopular: boolean;
  whatYouWillLearn: string[];
  prerequisites: string[];
  syllabus: {
    module: string;
    topics: string[];
  }[];
  // Add more fields as needed for a real course
}

export const MOCK_COURSE_DETAIL: CourseDetailType = {
  id: "c1",
  title: "Full Stack Web Development Masterclass",
  category: "Web Development",
  level: "Advanced",
  instructor: {
    name: "Jane Doe",
    title: "Senior Software Engineer at TechCorp",
    bio: "Jane is a seasoned full-stack developer with over 10 years of experience building scalable web applications. She specializes in React, Node.js, and cloud architecture, and is passionate about teaching the next generation of developers.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDBwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Professional headshot
    social: {
      linkedin: "https://linkedin.com/in/janedoe",
      twitter: "https://twitter.com/janedoe_dev",
      website: "https://janedoe.dev",
    },
  },
  rating: 4.8,
  reviews: 1250,
  price: 4999,
  image:
    "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  description:
    "Master front-end and back-end technologies to build scalable web applications.",
  longDescription:
    "This comprehensive masterclass covers everything you need to become a proficient full-stack developer. From building responsive user interfaces with React to designing robust APIs with Node.js and deploying applications to the cloud, you will gain hands-on experience with industry-standard tools and practices. The course emphasizes practical projects, real-world scenarios, and best practices for modern web development.",
  duration: "6 months",
  isPopular: true,
  whatYouWillLearn: [
    "Build dynamic and interactive user interfaces with React and Next.js.",
    "Develop robust and scalable backend APIs using Node.js and Express.",
    "Manage databases with MongoDB and PostgreSQL.",
    "Implement authentication and authorization securely.",
    "Deploy full-stack applications to cloud platforms like AWS/Vercel.",
    "Write clean, maintainable, and testable code.",
    "Understand CI/CD pipelines and DevOps principles.",
  ],
  prerequisites: [
    "Basic understanding of HTML, CSS, and JavaScript.",
    "Familiarity with command-line interface.",
    "Prior programming experience is a plus but not strictly required for dedicated learners.",
  ],
  syllabus: [
    {
      module: "Module 1: Frontend Fundamentals",
      topics: [
        "HTML5 & CSS3 Deep Dive",
        "Advanced JavaScript (ES6+)",
        "Responsive Design & Tailwind CSS",
        "Introduction to React.js",
      ],
    },
    {
      module: "Module 2: React.js & State Management",
      topics: [
        "React Components & Props",
        "State, Hooks & Context API",
        "Routing with Next.js",
        "Form Handling & Validation",
      ],
    },
    {
      module: "Module 3: Backend with Node.js & Express",
      topics: [
        "Node.js Basics & NPM",
        "Building RESTful APIs with Express.js",
        "Middleware & Error Handling",
        "Authentication with JWT",
      ],
    },
    {
      module: "Module 4: Database Integration",
      topics: [
        "Introduction to MongoDB & Mongoose",
        "SQL vs NoSQL Databases",
        "PostgreSQL & Prisma ORM",
        "Database Design & Normalization",
      ],
    },
    {
      module: "Module 5: Deployment & DevOps",
      topics: [
        "Containerization with Docker",
        "Introduction to CI/CD",
        "Deploying to Vercel/Netlify",
        "Basic AWS Services (EC2, S3, RDS)",
      ],
    },
    {
      module: "Module 6: Advanced Topics & Capstone Project",
      topics: [
        "WebSockets for Real-time Apps",
        "Testing (Jest, React Testing Library)",
        "Performance Optimization",
        "Building a Capstone Project",
      ],
    },
  ],
};

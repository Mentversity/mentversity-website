// The CourseType and ALL_COURSES data are now defined directly here for self-containment
// In a real application, you would typically import these from a separate data file (e.g., ../../data/courses)

export const ALL_COURSES = [
  {
    id: "c1",
    title: "Full Stack Web Development Masterclass",
    slug: "full-stack-web-development-masterclass",
    category: "Web Development",
    level: "Advanced",
    instructor: {
      name: "Jane Doe",
      title: "Senior Software Engineer at TechCorp",
      bio: "Jane is a seasoned full-stack developer with over 10 years of experience building scalable web applications. She specializes in React, Node.js, and cloud architecture, and is passionate about teaching the next generation of developers.",
      image:
        "https://www.shutterstock.com/image-photo/passport-photo-portrait-young-man-260nw-2437772333.jpg",
      social: {
        linkedin: "https://linkedin.com/in/janedoe",
        twitter: "https://twitter.com/janedoe_dev",
        website: "https://janedoe.dev",
      },
    },
    rating: 4.8,
    reviews: 1250,
    price: 1,
    originalPrice: Math.round(5999 / 0.4), // Calculated: 5999 / (1 - 0.60) = 14997.5 -> 14998
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
  },
  {
    id: "c2",
    title: "Data Science with Python",
    slug: "data-science-with-python",
    category: "Data Science",
    level: "Intermediate",
    instructor: {
      name: "John Smith",
      title: "Lead Data Scientist at DataGenius",
      bio: "John is a passionate data scientist with expertise in machine learning, statistical modeling, and data visualization. He has worked on various projects across finance and healthcare industries.",
      image:
        "https://www.shutterstock.com/image-photo/passport-photo-portrait-young-man-260nw-2437772333.jpg", // Example professional headshot
      social: {
        linkedin: "https://linkedin.com/in/johnsmith",
        twitter: "https://twitter.com/johnsmith_ds",
      },
    },
    rating: 4.7,
    reviews: 980,
    price: 11999,
    originalPrice: Math.round(11999 / 0.4), // Calculated: 11999 / (1 - 0.60) = 29997.5 -> 29998
    image:
      "https://media.istockphoto.com/id/1388196419/photo/top-view-of-laptop-with-text-data-science.jpg?s=2048x2048&w=is&k=20&c=xKN4zF0edLdnJ8bpMdQ39Md7By56xRyGJoNiKUHbalw=",
    description:
      "Learn data analysis, machine learning, and visualization using Python.",
    longDescription:
      "This course provides a strong foundation in data science using Python. You will learn essential libraries like NumPy, Pandas, Matplotlib, and scikit-learn. Topics include data manipulation, exploratory data analysis, supervised and unsupervised learning, and building predictive models. Practical exercises and case studies will help solidify your understanding.",
    duration: "4 months",
    isPopular: false,
    whatYouWillLearn: [
      "Master Python for data analysis and manipulation.",
      "Perform exploratory data analysis and visualization.",
      "Implement various machine learning algorithms (regression, classification, clustering).",
      "Evaluate model performance and interpret results.",
      "Work with real-world datasets and solve practical problems.",
    ],
    prerequisites: [
      "Basic programming knowledge (preferably Python).",
      "Fundamental understanding of mathematics and statistics.",
    ],
    syllabus: [
      {
        module: "Module 1: Python for Data Science",
        topics: ["Python Basics", "NumPy & Pandas", "Data Cleaning"],
      },
      {
        module: "Module 2: Data Visualization",
        topics: ["Matplotlib & Seaborn", "Interactive Plots"],
      },
      {
        module: "Module 3: Machine Learning Fundamentals",
        topics: ["Supervised Learning", "Unsupervised Learning"],
      },
      {
        module: "Module 4: Model Evaluation & Deployment",
        topics: ["Metrics", "Hyperparameter Tuning", "Introduction to MLOps"],
      },
    ],
  },
  {
    id: "c3",
    title: "Cloud Computing Fundamentals (AWS)",
    slug: "cloud-computing-fundamentals-aws",
    category: "Cloud Computing",
    level: "Beginner",
    instructor: {
      name: "Alice Johnson",
      title: "Cloud Solutions Architect at GlobalTech",
      bio: "Alice is a certified AWS Solutions Architect with extensive experience designing and implementing cloud solutions for enterprises. She enjoys demystifying complex cloud concepts for beginners.",
      image:
        "https://www.shutterstock.com/image-photo/passport-photo-portrait-young-man-260nw-2437772333.jpg", // Example professional headshot
      social: {
        linkedin: "https://linkedin.com/in/alicejohnson",
      },
    },
    rating: 4.9,
    reviews: 1500,
    price: 6999,
    originalPrice: Math.round(6999 / 0.4), // Calculated: 6999 / (1 - 0.60) = 17497.5 -> 17498
    image:
      "https://media.istockphoto.com/id/2114295998/photo/asian-and-indian-developer-devops-team-discussion-about-coding-promgram-with-software.jpg?s=2048x2048&w=is&k=20&c=815QNju4g70uc0fFTGiDFsEhhSej2qs99M3o0Hx8ChE=",
    description:
      "Get started with Amazon Web Services and cloud infrastructure.",
    longDescription:
      "This course introduces you to the core concepts of cloud computing and Amazon Web Services (AWS). You'll learn about essential AWS services like EC2, S3, VPC, IAM, and RDS. The course focuses on practical application, helping you understand how to deploy and manage applications in the cloud securely and efficiently.",
    duration: "3 months",
    isPopular: true,
    whatYouWillLearn: [
      "Understand the fundamentals of cloud computing and AWS.",
      "Navigate the AWS Management Console.",
      "Launch and manage EC2 instances.",
      "Store and retrieve data using S3.",
      "Configure virtual networks with VPC.",
      "Manage user access with IAM.",
      "Deploy basic web applications to AWS.",
    ],
    prerequisites: [
      "Basic computer literacy.",
      "Familiarity with internet concepts.",
    ],
    syllabus: [
      {
        module: "Module 1: Introduction to Cloud & AWS",
        topics: ["Cloud Concepts", "AWS Global Infrastructure"],
      },
      {
        module: "Module 2: Core AWS Services",
        topics: ["EC2", "S3", "VPC", "IAM"],
      },
      {
        module: "Module 3: Databases & Networking on AWS",
        topics: ["RDS", "Route 53", "Load Balancers"],
      },
      {
        module: "Module 4: Security & Monitoring",
        topics: ["CloudWatch", "CloudTrail", "Basic Security Practices"],
      },
    ],
  },
  {
    id: "c4",
    title: "Mobile App Development (React Native)",
    slug: "mobile-app-development-react-native",
    category: "Mobile Development",
    level: "Intermediate",
    instructor: {
      name: "Robert Brown",
      title: "Lead Mobile Developer at InnovateApps",
      bio: "Robert has spent 8 years building native and cross-platform mobile applications. He's an expert in React Native and loves creating intuitive user experiences.",
      image:
        "https://www.shutterstock.com/image-photo/passport-photo-portrait-young-man-260nw-2437772333.jpg", // Example professional headshot
      social: {
        linkedin: "https://linkedin.com/in/robertbrown",
        website: "https://robertbrown.dev",
      },
    },
    rating: 4.6,
    reviews: 720,
    price: 5999,
    originalPrice: Math.round(5999 / 0.4), // Calculated: 5999 / (1 - 0.60) = 14997.5 -> 14998
    image:
      "https://img.freepik.com/free-vector/app-development-banner_33099-1720.jpg",
    description: "Build cross-platform mobile applications with React Native.",
    longDescription:
      "This course focuses on building high-performance, cross-platform mobile applications using React Native. You'll learn to set up your development environment, build UI components, manage state, integrate with APIs, and deploy your apps to both iOS and Android app stores. Emphasis is placed on best practices for mobile UX/UI.",
    duration: "5 months",
    isPopular: false,
    whatYouWillLearn: [
      "Set up a React Native development environment.",
      "Build responsive mobile UIs with React Native components.",
      "Implement navigation and state management.",
      "Integrate with external APIs and handle data.",
      "Access native device features (camera, location).",
      "Prepare and deploy apps to Apple App Store and Google Play Store.",
    ],
    prerequisites: [
      "Strong understanding of JavaScript and React.js.",
      "Familiarity with mobile development concepts is a plus.",
    ],
    syllabus: [
      {
        module: "Module 1: React Native Basics",
        topics: ["Setup", "Components", "Styling"],
      },
      {
        module: "Module 2: Navigation & State",
        topics: ["React Navigation", "Redux/Context API"],
      },
      {
        module: "Module 3: API Integration & Data",
        topics: ["Fetching Data", "Local Storage"],
      },
      {
        module: "Module 4: Native Features & Deployment",
        topics: ["Camera/GPS", "Build & Deploy"],
      },
    ],
  },
  {
    id: "c5",
    title: "Cybersecurity Essentials",
    slug: "cybersecurity-essentials",
    category: "Cybersecurity",
    level: "Beginner",
    instructor: {
      name: "Emily White",
      title: "Cybersecurity Analyst at SecureNet",
      bio: "Emily is a dedicated cybersecurity professional with a focus on network security and threat detection. She is passionate about educating individuals on digital safety and best practices.",
      image:
        "https://www.shutterstock.com/image-photo/passport-photo-portrait-young-man-260nw-2437772333.jpg", // Example professional headshot
      social: {
        linkedin: "https://linkedin.com/in/emilywhite",
      },
    },
    rating: 4.7,
    reviews: 850,
    price: 2499,
    originalPrice: Math.round(2499 / 0.4), // Calculated: 2499 / (1 - 0.60) = 6247.5 -> 6248
    image:
      "https://iirfranking.com/courses/wp-content/uploads/2022/07/Cyber-Security.jpeg",
    description: "Understand fundamental cybersecurity concepts and practices.",
    longDescription:
      "This introductory course covers the essential principles of cybersecurity. You will learn about common cyber threats, vulnerabilities, and defense mechanisms. Topics include network security, cryptography basics, digital forensics, and secure coding practices. This course is ideal for anyone looking to understand and protect their digital assets.",
    duration: "3 months",
    isPopular: false,
    whatYouWillLearn: [
      "Identify common cyber threats and attacks.",
      "Understand basic network security principles.",
      "Learn about encryption and digital signatures.",
      "Explore concepts of digital forensics.",
      "Implement basic secure computing practices.",
      "Protect personal and organizational data.",
    ],
    prerequisites: ["Basic computer and internet usage skills."],
    syllabus: [
      {
        module: "Module 1: Introduction to Cybersecurity",
        topics: ["Threats & Vulnerabilities", "Security Principles"],
      },
      {
        module: "Module 2: Network Security",
        topics: ["Firewalls", "IDS/IPS", "VPNs"],
      },
      {
        module: "Module 3: Cryptography & Data Protection",
        topics: ["Encryption", "Hashing", "Data Privacy"],
      },
      {
        module: "Module 4: Incident Response & Forensics",
        topics: ["Attack Detection", "Recovery"],
      },
    ],
  },
  {
    id: "c6",
    title: "DevOps & CI/CD with Docker & Kubernetes",
    slug: "devops-ci-cd-docker-kubernetes",
    category: "DevOps",
    level: "Advanced",
    instructor: {
      name: "Michael Green",
      title: "DevOps Lead at CloudSolutions",
      bio: "Michael is a highly experienced DevOps engineer specializing in automating infrastructure and deployment pipelines. He has a knack for optimizing development workflows and fostering collaboration.",
      image:
        "https://www.shutterstock.com/image-photo/passport-photo-portrait-young-man-260nw-2437772333.jpg", // Example professional headshot
      social: {
        linkedin: "https://linkedin.com/in/michaelgreen",
        twitter: "https://twitter.com/michaelgreen_devops",
      },
    },
    rating: 4.8,
    reviews: 1100,
    price: 6999,
    originalPrice: Math.round(6999 / 0.4), // Calculated: 6999 / (1 - 0.60) = 17497.5 -> 17498
    image: "https://itstu2pro.com/wp-content/uploads/2023/07/cover-2.jpg",
    description:
      "Automate software delivery pipelines and manage containerized applications.",
    longDescription:
      "This advanced course delves into DevOps practices and continuous integration/continuous delivery (CI/CD) pipelines. You will master containerization with Docker, orchestration with Kubernetes, and automation tools like Jenkins. The course emphasizes hands-on labs to build, deploy, and manage applications efficiently.",
    duration: "6 months",
    isPopular: true,
    whatYouWillLearn: [
      "Understand DevOps principles and culture.",
      "Containerize applications using Docker.",
      "Orchestrate containers with Kubernetes.",
      "Build automated CI/CD pipelines with Jenkins/GitLab CI.",
      "Implement infrastructure as code (IaC) with Terraform.",
      "Monitor and log applications in production.",
    ],
    prerequisites: [
      "Intermediate Linux command-line skills.",
      "Basic understanding of software development lifecycle.",
      "Familiarity with a programming language (e.g., Python, Node.js).",
    ],
    syllabus: [
      {
        module: "Module 1: Introduction to DevOps & Docker",
        topics: ["DevOps Culture", "Docker Basics", "Docker Compose"],
      },
      {
        module: "Module 2: Kubernetes Fundamentals",
        topics: ["Pods, Deployments, Services", "Kubernetes Architecture"],
      },
      {
        module: "Module 3: CI/CD Pipelines",
        topics: ["Jenkins/GitLab CI", "Automated Testing"],
      },
      {
        module: "Module 4: Monitoring & Logging",
        topics: ["Prometheus, Grafana", "ELK Stack"],
      },
    ],
  },
  {
    id: "c7",
    title: "Artificial Intelligence & Machine Learning",
    slug: "artificial-intelligence-machine-learning",
    category: "AI/ML",
    level: "Advanced",
    instructor: {
      name: "Sophia Lee",
      title: "AI Research Scientist at FutureLabs",
      bio: "Sophia is a leading AI researcher with a Ph.D. in Machine Learning. Her work focuses on deep learning, natural language processing, and computer vision. She brings cutting-edge research to practical applications.",
      image:
        "https://www.shutterstock.com/image-photo/passport-photo-portrait-young-man-260nw-2437772333.jpg", // Example professional headshot
      social: {
        linkedin: "https://linkedin.com/in/sophialee_ai",
      },
    },
    rating: 4.9,
    reviews: 1800,
    price: 11999,
    originalPrice: Math.round(11999 / 0.4), // Calculated: 11999 / (1 - 0.60) = 29997.5 -> 29998
    image: "https://sac-elearning.com/wp-content/uploads/2023/10/Ai-Ml.webp",
    description:
      "Deep dive into AI algorithms, neural networks, and deep learning.",
    longDescription:
      "This intensive course provides a deep dive into Artificial Intelligence and Machine Learning, covering advanced algorithms, neural networks, and deep learning architectures. You will work with frameworks like TensorFlow and PyTorch, tackling complex problems in areas such as natural language processing and computer vision. Ideal for aspiring AI engineers and researchers.",
    duration: "7 months",
    isPopular: true,
    whatYouWillLearn: [
      "Understand core AI and ML concepts.",
      "Implement advanced machine learning algorithms.",
      "Design and train neural networks for deep learning.",
      "Apply AI/ML to Natural Language Processing (NLP) tasks.",
      "Explore Computer Vision techniques.",
      "Work with TensorFlow and PyTorch frameworks.",
    ],
    prerequisites: [
      "Strong Python programming skills.",
      "Solid understanding of linear algebra, calculus, and statistics.",
      "Familiarity with data science concepts.",
    ],
    syllabus: [
      {
        module: "Module 1: Advanced ML Concepts",
        topics: ["Ensemble Methods", "Dimensionality Reduction"],
      },
      {
        module: "Module 2: Deep Learning Fundamentals",
        topics: ["Neural Networks", "Backpropagation", "CNNs"],
      },
      {
        module: "Module 3: Natural Language Processing",
        topics: ["RNNs, LSTMs", "Transformers"],
      },
      {
        module: "Module 4: Computer Vision",
        topics: ["Image Recognition", "Object Detection"],
      },
    ],
  },
  {
    id: "c8",
    title: "Digital Marketing Mastery",
    slug: "digital-marketing-mastery",
    category: "Digital Marketing",
    level: "Advanced",
    instructor: {
      name: "David Chen",
      title: "Head of Digital Marketing at BrandBoost",
      bio: "David is a digital marketing veteran with over 12 years of experience crafting successful online strategies. He specializes in SEO, SEM, and social media campaigns that drive measurable results.",
      image:
        "https://www.shutterstock.com/image-photo/passport-photo-portrait-young-man-260nw-2437772333.jpg", // Example professional headshot
      social: {
        linkedin: "https://linkedin.com/in/davidchen_marketing",
        twitter: "https://twitter.com/davidchen_mkt",
      },
    },
    rating: 4.5,
    reviews: 600,
    price: 5999,
    originalPrice: Math.round(5999 / 0.4), // Calculated: 5999 / (1 - 0.60) = 14997.5 -> 14998
    image:
      "https://aclm.in/wp-content/uploads/2021/08/advanced-digital-marketing.jpg",
    description:
      "Learn SEO, SEM, social media marketing, and content strategy.",
    longDescription:
      "This masterclass provides an in-depth understanding of digital marketing strategies and tools. You will learn how to optimize websites for search engines (SEO), manage paid advertising campaigns (SEM), leverage social media for brand building, and create compelling content strategies. The course is highly practical, focusing on real-world case studies and actionable techniques.",
    duration: "4 months",
    isPopular: false,
    whatYouWillLearn: [
      "Develop comprehensive digital marketing strategies.",
      "Master Search Engine Optimization (SEO) techniques.",
      "Run effective Search Engine Marketing (SEM) campaigns.",
      "Build and manage social media marketing strategies.",
      "Create engaging content for various digital platforms.",
      "Analyze marketing data and measure campaign ROI.",
    ],
    prerequisites: [
      "Basic understanding of marketing concepts.",
      "Familiarity with internet and social media platforms.",
    ],
    syllabus: [
      {
        module: "Module 1: Digital Marketing Fundamentals",
        topics: ["Strategy", "Market Research"],
      },
      {
        module: "Module 2: SEO & SEM",
        topics: ["Keyword Research", "On-Page/Off-Page SEO", "Google Ads"],
      },
      {
        module: "Module 3: Social Media Marketing",
        topics: ["Platform Strategy", "Content Creation", "Paid Social"],
      },
      {
        module: "Module 4: Content Marketing & Analytics",
        topics: ["Content Strategy", "Email Marketing", "Google Analytics"],
      },
    ],
  },
];

export type CourseType = (typeof ALL_COURSES)[0];

// Define CourseDetailType based on CourseType, adding longDescription, whatYouWillLearn, prerequisites, and syllabus
export type CourseDetailType = CourseType & {
  longDescription: string;
  whatYouWillLearn: string[];
  prerequisites: string[];
  syllabus: { module: string; topics: string[] }[];
};

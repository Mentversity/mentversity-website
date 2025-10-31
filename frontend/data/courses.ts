// Helper function to calculate discounted price
const calculateOriginalPrice = (discountedPrice: number, discountRate: number = 0.60) =>
  Math.round(discountedPrice / (1 - discountRate));

export const ALL_COURSES = [
  // --- NEW COURSE 1: Data Science with Entrepreneurship (c9) ---
  {
    id: "c9",
    title: "Data Science with Entrepreneurship",
    slug: "data-science-entrepreneurship",
    category: "Data Science & AI",
    level: "Advanced",
    instructor: {
      name: "Sophia Lee", 
      title: "AI Research Scientist at FutureLabs",
      bio: "Sophia is a leading AI researcher with a Ph.D. in Machine Learning. Her work focuses on deep learning, NLP, and computer vision. She brings cutting-edge research to practical applications and enterprise-scale ML solutions.",
      image:
        "https://www.shutterstock.com/image-photo/passport-photo-portrait-young-man-260nw-2437772333.jpg",
      social: {
        linkedin: "https://linkedin.com/in/sophialee_ai",
      },
    },
    rating: 4.8,
    reviews: 1400,
    price: 9999, // Updated price as requested
    originalPrice: 25000, // Estimated original price
    image: "https://sac-elearning.com/wp-content/uploads/2023/10/Ai-Ml.webp", 
    description:
      "Master core Data Science skills and the entrepreneurial framework to launch a data-driven product or business.",
    longDescription:
      "This intensive course combines core Data Science principles (Python, ML, Modeling) with a practical Entrepreneurship framework. You will learn to identify market opportunities using data, develop a Minimum Viable Product (MVP), and create a go-to-market strategy. The capstone project focuses on building a commercially viable data product.",
    duration: "6 months",
    isPopular: true,
    whatYouWillLearn: [
      "Perform end-to-end data analysis, cleaning, and predictive modeling using Python and scikit-learn.",
      "Master business analytics, statistical inference, and hypothesis testing for product validation.",
      "Design and develop a Minimum Viable Product (MVP) for a data-driven solution.",
      "Learn to perform market analysis and competitive benchmarking using quantitative methods.",
      "Create a robust business plan, financial model, and pitch deck for securing seed funding.",
      "Understand product management principles for data products (A/B testing, feature prioritization).",
      "Develop a data monetization strategy and understand legal/ethical considerations.",
    ],
    prerequisites: [
      "Proficiency in Python programming and data structures.",
      "Basic understanding of statistics and algebra.",
      "Familiarity with foundational Machine Learning concepts is a plus.",
    ],
    syllabus: [
      {
        module: "Module 1: Data Science Core Foundations (Python, Stats, SQL)",
        topics: [
          "Advanced Python for Data Analysis (Pandas, NumPy)",
          "Statistical Modeling and Hypothesis Testing",
          "Data Wrangling, Cleaning, and Exploratory Data Analysis (EDA)",
          "SQL and NoSQL for Data Storage and Retrieval",
        ],
      },
      {
        module: "Module 2: Machine Learning for Business Decisions",
        topics: [
          "Supervised Learning: Regression and Classification Models",
          "Unsupervised Learning: Clustering and Dimensionality Reduction",
          "Model Evaluation, Validation, and Interpretation for Business Metrics",
          "Introduction to Deep Learning and Time Series Analysis",
        ],
      },
      {
        module: "Module 3: Entrepreneurship & Data-Driven Business Strategy 🚀", 
        topics: [
          "Idea Validation: Market Sizing, Competitor Analysis, and Pain Point Identification",
          "Business Modeling: Lean Canvas, Value Proposition Design, and Revenue Streams",
          "Product Strategy: Defining the MVP, Feature Prioritization, and A/B Testing",
          "Entrepreneurial Finance: Basic Financial Modeling, Burn Rate, and Funding Stages (Seed, Series A)",
        ],
      },
      {
        module: "Module 4: Launching Your Data Product & Capstone",
        topics: [
          "Building a Data Product Pipeline (from data ingestion to user interface)",
          "Introduction to Cloud Deployment (AWS/GCP basics for data products)",
          "Creating a Professional Pitch Deck and Presentation",
          "Final Capstone Project: Develop and present a data-driven business MVP",
        ],
      },
    ],
  },
  // --- NEW COURSE 2: Agentic AI + Gen AI with Entrepreneurship (c10) ---
  {
    id: "c10",
    title: "Agentic AI + Gen AI with Entrepreneurship",
    slug: "agentic-genai-entrepreneurship",
    category: "Data Science & AI",
    level: "Advanced",
    instructor: {
      name: "Hitesh Jha", 
      title: "Data Scientist at Emergys",
      bio: "Hitesh Jha is an experienced Data Scientist at Emergys, having led high-impact AI projects with Tesla, Snowflake, and MorningStar. He specializes in Data Science, Agentic AI systems, and Generative AI solutions that integrate automation, reasoning, and creativity.",
      image:
        "https://media.istockphoto.com/id/1283652045/photo/handsome-indian-businessman.jpg?s=2048x2048&w=is&k=20&c=8mUlObv7bJgmZZ7_0nOeGshLzX2UJYnsMRQAfzMxtU=",
      social: {
        linkedin: "https://linkedin.com/in/hiteshjha",
        twitter: "https://twitter.com/hiteshjha_ds",
      },
    },
    rating: 4.9,
    reviews: 1860,
    price: 9999, // Updated price as requested
    originalPrice: 48000, 
    image:
      "/dsai.png",
    description:
      "Master Agentic AI and Generative AI, focusing on the product development lifecycle and launching a GenAI-powered startup.",
    longDescription:
      "This course is for the builder who wants to launch a GenAI-powered business. It blends core expertise in LLMs, RAG, and Autonomous Agents (LangChain/CrewAI) with the critical skills for AI product management, monetization, and ethical deployment. You'll build and launch a market-ready AI Agent prototype as your capstone project.",
    duration: "5 months",
    isPopular: true,
    whatYouWillLearn: [
      "Design and deploy intelligent Agentic AI systems using multi-agent architectures and LLMs.",
      "Master Generative AI concepts using OpenAI, Gemini, and fine-tuning techniques.",
      "Develop an AI product roadmap and monetization strategy for agent-based solutions.",
      "Implement advanced Retrieval-Augmented Generation (RAG) systems for domain-specific knowledge.",
      "Apply a Lean Startup methodology to AI product development and iterative improvement.",
      "Develop multi-agent workflows capable of reasoning, complex planning, and sophisticated tool usage.",
      "Secure initial funding by crafting a compelling pitch focused on AI's unique value proposition.",
    ],
    prerequisites: [
      "Proficiency in Python programming and data structures.",
      "Solid understanding of Machine Learning fundamentals and statistics.",
      "Familiarity with neural networks or deep learning is highly recommended.",
    ],
    syllabus: [
      {
        module: "Module 1: Generative AI & Large Language Models (LLMs)",
        topics: [
          "Transformer Architecture and LLM Mechanics",
          "Advanced Prompt Engineering (Chain of Thought, Tree of Thought)",
          "Fine-Tuning LLMs and Parameter-Efficient Fine-Tuning (PEFT)",
          "Evaluating and Benchmarking LLM Performance",
        ],
      },
      {
        module: "Module 2: Agentic AI Systems & Multi-Agent Frameworks",
        topics: [
          "Agent Architecture: Reasoning, Memory, and Tool-Use (ReAct, CoT)",
          "Building Autonomous Multi-Agent Systems with LangChain and CrewAI",
          "Integrating Agents with Complex APIs and Real-Time Data Sources",
          "Designing Agent Collaboration and Communication Protocols",
        ],
      },
      {
        module: "Module 3: Advanced Retrieval-Augmented Generation (RAG)",
        topics: [
          "Vector Embeddings, Indexing, and Search Optimization",
          "Advanced RAG Techniques (Self-Correcting RAG, RAG with Agents)",
          "Implementing Production-Ready Vector Databases (FAISS, Chroma, Pinecone)",
          "Building Multi-Modal RAG Systems (Text, Image, Video)",
        ],
      },
      {
        module: "Module 4: AI Product Entrepreneurship & Launchpad 🚀", 
        topics: [
          "AI Product Management: Identifying High-Value Agentic Use Cases",
          "Monetization & Pricing Models for AI-as-a-Service (AaaS) and APIs",
          "Legal & Ethical AI: Compliance, Data Privacy, and Bias Mitigation",
          "Pitching Your AI Startup: Value Proposition, Market Fit, and Demonstrating Agent Capabilities",
          "Capstone Project: Developing a production-ready, autonomous AI Agent MVP.",
        ],
      },
    ],
  },
  {
    id: "c1",
    title: "Full Stack Web Development Masterclass",
    slug: "full-stack-web-development-masterclass",
    category: "Web Development",
    level: "Advanced", // Updated
    instructor: {
      name: "Jane Doe",
      title: "Senior Software Engineer at TechCorp",
      bio: "Jane is a seasoned full-stack developer with over 10 years of experience building scalable web applications. She specializes in React, Node.js, and complex cloud architecture, and is passionate about teaching the next generation of developers.",
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
    price: 21999, // Updated price
    originalPrice: calculateOriginalPrice(21999), // 60% off calculation
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Master front-end and back-end technologies to build scalable, high-availability web applications using modern cloud practices.",
    longDescription:
      "This comprehensive masterclass covers everything needed to become a proficient full-stack developer with a focus on performance, security, and cloud deployment at scale. From building responsive user interfaces with Next.js/React to designing robust, microservices-based APIs with Node.js/Express, you will gain hands-on experience with industry-standard tools, advanced design patterns, and DevOps principles.",
    duration: "6 months",
    isPopular: true,
    whatYouWillLearn: [
      "Build highly optimized and interactive user interfaces with Next.js and advanced React concepts.",
      "Develop robust and scalable backend APIs using Node.js, Express, and microservices architecture.",
      "Design and manage complex databases with PostgreSQL/Prisma and advanced MongoDB patterns.",
      "Implement OAuth 2.0 and best-practice security features for authentication and authorization.",
      "Deploy full-stack applications to cloud platforms like AWS (ECS/Lambda) and understand serverless architecture.",
      "Master CI/CD pipelines, containerization (Docker), and advanced testing strategies.",
      "Apply advanced architectural patterns (like CQRS and Event Sourcing) to real-world projects.",
    ],
    prerequisites: [
      "Strong proficiency in HTML, CSS, and modern JavaScript (ES6+).",
      "Prior experience building basic applications with React or Node.js.",
      "Familiarity with Git and command-line interface.",
    ],
    syllabus: [
      {
        module: "Module 1: Advanced Frontend & Next.js",
        topics: [
          "Next.js Architecture Deep Dive (Server/Client Components)",
          "Performance Optimization & Web Vitals",
          "Advanced State Management (Zustand, Redux Toolkit)",
          "Complex UI Patterns & Accessibility",
        ],
      },
      {
        module: "Module 2: Robust Backend with Node.js & Express",
        topics: [
          "Building Microservices with Node.js",
          "Advanced API Design (GraphQL vs REST)",
          "Authentication: JWT, Session Management, OAuth 2.0",
          "API Gateway Implementation",
        ],
      },
      {
        module: "Module 3: Scalable Databases & ORMs",
        topics: [
          "Advanced SQL/NoSQL Design Patterns",
          "Optimizing Queries and Indexing",
          "Data Migration and Schema Evolution with Prisma/Knex",
          "Caching Strategies (Redis, Memcached)",
        ],
      },
      {
        module: "Module 4: Deployment, DevOps & System Design",
        topics: [
          "Advanced Containerization with Docker & Kubernetes (Introduction)",
          "CI/CD with GitHub Actions/GitLab CI",
          "Load Balancing and Auto-Scaling",
          "System Design for High-Traffic Applications",
        ],
      },
    ],
  },
  {
    id: "c7",
    title: "Artificial Intelligence & Machine Learning",
    slug: "artificial-intelligence-machine-learning",
    category: "AI/ML",
    level: "Advanced", // Updated
    instructor: {
      name: "Sophia Lee",
      title: "AI Research Scientist at FutureLabs",
      bio: "Sophia is a leading AI researcher with a Ph.D. in Machine Learning. Her work focuses on deep learning, natural language processing, and computer vision. She brings cutting-edge research to practical applications and enterprise-scale ML solutions.",
      image:
        "https://www.shutterstock.com/image-photo/passport-photo-portrait-young-man-260nw-2437772333.jpg",
      social: {
        linkedin: "https://linkedin.com/in/sophialee_ai",
      },
    },
    rating: 4.9,
    reviews: 1800,
    price: 24500, // Updated price
    originalPrice: calculateOriginalPrice(24500), // 60% off calculation
    image: "https://sac-elearning.com/wp-content/uploads/2023/10/Ai-Ml.webp",
    description:
      "Deep dive into advanced AI algorithms, neural networks, and production-ready Deep Learning architectures.",
    longDescription:
      "This intensive course provides a deep dive into advanced Artificial Intelligence and Machine Learning, covering complex algorithms, neural networks, and modern deep learning architectures. You will master frameworks like TensorFlow and PyTorch, tackling complex, real-world problems in areas such as Natural Language Processing (NLP), Computer Vision, and Reinforcement Learning. Ideal for aspiring AI engineers and researchers aiming for production-level expertise.",
    duration: "7 months",
    isPopular: true,
    whatYouWillLearn: [
      "Implement and optimize advanced deep learning architectures (e.g., GANs, VAEs, Transformers).",
      "Apply state-of-the-art AI/ML to Natural Language Processing (NLP) tasks, including sentiment analysis and text generation.",
      "Master Computer Vision techniques such as object detection, image segmentation, and video analysis.",
      "Explore the fundamentals and applications of Reinforcement Learning (RL) for decision-making systems.",
      "Design and manage production ML pipelines (MLOps) using tools like MLflow and Kubeflow.",
      "Perform model optimization, quantization, and deployment for edge devices and cloud environments.",
      "Solidify expertise with TensorFlow 2.x and PyTorch frameworks.",
    ],
    prerequisites: [
      "Strong proficiency in Python programming and libraries (NumPy, Pandas, scikit-learn).",
      "Solid understanding of linear algebra, calculus, and probability/statistics.",
      "Prior experience building and training basic machine learning models.",
    ],
    syllabus: [
      {
        module: "Module 1: Advanced Deep Learning & Optimization",
        topics: [
          "Recurrent Neural Networks (RNNs) and Long Short-Term Memory (LSTMs)",
          "Advanced Optimization Techniques (AdamW, Learning Rate Scheduling)",
          "Regularization Methods and Hyperparameter Tuning",
        ],
      },
      {
        module: "Module 2: Computer Vision Deep Dive",
        topics: [
          "Convolutional Neural Networks (CNN) Architectures (ResNet, YOLO)",
          "Object Detection and Instance Segmentation (R-CNN, Mask R-CNN)",
          "Transfer Learning and Fine-Tuning Models",
        ],
      },
      {
        module: "Module 3: Natural Language Processing (NLP)",
        topics: [
          "Transformer Models and Attention Mechanism",
          "BERT, GPT, and modern language models for text generation and classification",
          "Advanced Text Embeddings and Vector Spaces",
        ],
      },
      {
        module: "Module 4: Reinforcement Learning & MLOps",
        topics: [
          "RL Fundamentals: Q-Learning, Policy Gradients (REINFORCE, PPO)",
          "MLOps: Model Versioning, Deployment (Docker, Kubernetes)",
          "Monitoring and Drift Detection in Production ML Systems",
        ],
      },
    ],
  },
  {
    id: "c6",
    title: "DevOps & CI/CD with Docker & Kubernetes",
    slug: "devops-ci-cd-docker-kubernetes",
    category: "DevOps",
    level: "Advanced", // Updated
    instructor: {
      name: "Michael Green",
      title: "DevOps Lead at CloudSolutions",
      bio: "Michael is a highly experienced DevOps engineer specializing in automating infrastructure and high-availability deployment pipelines. He has a knack for optimizing development workflows, managing large-scale clusters, and fostering collaboration.",
      image:
        "https://www.shutterstock.com/image-photo/passport-photo-portrait-young-man-260nw-2437772333.jpg",
      social: {
        linkedin: "https://linkedin.com/in/michaelgreen",
        twitter: "https://twitter.com/michaelgreen_devops",
      },
    },
    rating: 4.8,
    reviews: 1100,
    price: 20500, // Updated price
    originalPrice: calculateOriginalPrice(20500), // 60% off calculation
    image: "https://imgs.search.brave.com/wHmsatTy0gUeUws_LBFSYMQUTHx3EeFein0YoQGJfrw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTIw/NDU1NTM3MC92ZWN0/b3IvZGV2b3BzLXNv/ZnR3YXJlLWFuZC1k/ZXZlbG9wbWVudC1v/cGVyYXRpb25zLXRl/YW0td2l0aC13b21h/bi1hbmQtbWFuLXBy/b2dyYW1tZXIuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPWpQ/WXV4MWFHMk84dkZU/MFFOWGRkVHhEX21P/ZUFkbTNmdnVrdllH/LUcwQWs9",
    description:
      "Master cloud-native DevOps practices, advanced Kubernetes orchestration, and immutable infrastructure automation.",
    longDescription:
      "This advanced course delves into enterprise-level DevOps practices and the creation of highly resilient CI/CD pipelines. You will master containerization with Docker, advanced orchestration with Kubernetes (including Helm and Operators), and automation with tools like Terraform and Ansible. The course emphasizes hands-on labs for deploying, scaling, and monitoring applications in a cloud-native, high-availability environment.",
    duration: "6 months",
    isPopular: true,
    whatYouWillLearn: [
      "Implement Infrastructure as Code (IaC) using Terraform for multi-cloud environments.",
      "Master advanced Kubernetes concepts (Helm, Operators, Networking, Security Policies).",
      "Build highly available and resilient CI/CD pipelines using Jenkins, GitLab CI, or ArgoCD.",
      "Implement robust monitoring, logging, and alerting using the Prometheus/Grafana/ELK stack.",
      "Secure and harden containerized applications and Kubernetes clusters.",
      "Apply GitOps principles for declarative infrastructure and application deployment.",
      "Troubleshoot and optimize large-scale production environments.",
    ],
    prerequisites: [
      "Proficiency in Linux command-line and scripting (Bash/Python).",
      "Solid understanding of networking fundamentals and a programming language.",
      "Prior experience with basic Docker usage.",
    ],
    syllabus: [
      {
        module: "Module 1: Advanced Docker & Containerization",
        topics: [
          "Multi-Stage Builds and Image Optimization",
          "Securing Docker Containers and Registry Management",
          "Networking and Volume Management Deep Dive",
        ],
      },
      {
        module: "Module 2: Kubernetes Orchestration Mastery",
        topics: [
          "Advanced Deployment Strategies (Canary, Blue/Green)",
          "Service Mesh (Istio/Linkerd) and Microservices Communication",
          "Kubernetes Storage and Configuration Management (ConfigMaps, Secrets)",
        ],
      },
      {
        module: "Module 3: Infrastructure as Code (IaC) with Terraform",
        topics: [
          "Terraform for Multi-Cloud Provisioning (AWS/Azure/GCP)",
          "State Management and Collaboration with Terraform",
          "Idempotent Configuration Management with Ansible/Chef",
        ],
      },
      {
        module: "Module 4: Advanced CI/CD and Observability",
        topics: [
          "Implementing GitOps with ArgoCD/Flux",
          "Advanced Monitoring with Prometheus, Grafana, and Custom Metrics",
          "Distributed Tracing and Log Aggregation (Jaeger, OpenTelemetry)",
        ],
      },
    ],
  },
  {
    id: "c3",
    title: "Cloud Computing Professional (AWS)",
    slug: "cloud-computing-professional-aws",
    category: "Cloud Computing",
    level: "Advanced", // Updated
    instructor: {
      name: "Alice Johnson",
      title: "Cloud Solutions Architect at GlobalTech",
      bio: "Alice is a certified AWS Solutions Architect with extensive experience designing and implementing complex, cost-optimized, and highly secure cloud solutions for global enterprises. She focuses on Serverless, Networking, and Security best practices.",
      image:
        "https://www.shutterstock.com/image-photo/passport-photo-portrait-young-man-260nw-2437772333.jpg",
      social: {
        linkedin: "https://linkedin.com/in/alicejohnson",
      },
    },
    rating: 4.9,
    reviews: 1500,
    price: 22500, // Updated price
    originalPrice: calculateOriginalPrice(22500), // 60% off calculation
    image:
      "https://media.istockphoto.com/id/2114295998/photo/asian-and-indian-developer-devops-team-discussion-about-coding-promgram-with-software.jpg?s=2048x2048&w=is&k=20&c=815QNju4g70uc0fFTGiDFsEhhSej2qs99M3o0Hx8ChE=",
    description:
      "Achieve expertise in AWS architecture, networking, security, and Serverless computing to design scalable cloud solutions.",
    longDescription:
      "This advanced professional course moves beyond fundamentals to focus on designing, securing, and optimizing production-grade cloud environments on AWS. You'll master advanced networking (VPC peering, Transit Gateway), security concepts (WAF, GuardDuty), and modern compute paradigms like AWS Lambda, ECS, and EKS. The course prepares you for architect-level certifications and real-world solution design.",
    duration: "4 months",
    isPopular: true,
    whatYouWillLearn: [
      "Design and implement complex networking architectures using AWS VPC, Subnets, and Gateways.",
      "Master Serverless computing using AWS Lambda, API Gateway, and DynamoDB for high scalability.",
      "Implement enterprise-level security best practices with IAM, Security Hub, and encryption mechanisms.",
      "Optimize cloud costs and performance using reserved instances, compute optimizer, and auto-scaling.",
      "Manage containerized applications using ECS/EKS and understand integration with CI/CD tools.",
      "Design disaster recovery and high availability strategies across multiple AWS regions.",
      "Prepare for the AWS Solutions Architect Professional certification.",
    ],
    prerequisites: [
      "Solid understanding of core AWS services (EC2, S3, RDS).",
      "Experience with networking concepts (IP addressing, routing).",
      "Basic scripting or programming knowledge is recommended.",
    ],
    syllabus: [
      {
        module: "Module 1: Advanced VPC and Networking",
        topics: [
          "VPC Peering, Transit Gateway, and Site-to-Site VPN",
          "Route 53 Advanced Routing Policies",
          "Network Security: NACLs, Security Groups Deep Dive",
        ],
      },
      {
        module: "Module 2: Serverless Architecture with Lambda",
        topics: [
          "Building Microservices with Lambda and API Gateway",
          "Event-Driven Architectures (SQS, SNS, EventBridge)",
          "Serverless Database Patterns (DynamoDB Advanced)",
        ],
      },
      {
        module: "Module 3: Security, Identity, and Compliance",
        topics: [
          "IAM Best Practices, Roles, and Policies",
          "Advanced Security Services (WAF, GuardDuty, Macie)",
          "Compliance Standards and Audit Logs (CloudTrail, Config)",
        ],
      },
      {
        module: "Module 4: Disaster Recovery and Cost Optimization",
        topics: [
          "Multi-Region Deployment and High Availability",
          "Backup and Recovery Strategies (DRP)",
          "Advanced Cost Management Tools and Optimization Techniques",
        ],
      },
    ],
  },
  {
    id: "c4",
    title: "Mobile App Development Professional (React Native)",
    slug: "mobile-app-development-react-native",
    category: "Mobile Development",
    level: "Advanced", // Updated
    instructor: {
      name: "Robert Brown",
      title: "Lead Mobile Developer at InnovateApps",
      bio: "Robert has spent 8 years building native and cross-platform mobile applications. He's an expert in React Native, native module development, and high-performance UI/UX. He loves creating intuitive user experiences for enterprise apps.",
      image:
        "https://www.shutterstock.com/image-photo/passport-photo-portrait-young-man-260nw-2437772333.jpg",
      social: {
        linkedin: "https://linkedin.com/in/robertbrown",
        website: "https://robertbrown.dev",
      },
    },
    rating: 4.6,
    reviews: 720,
    price: 19999, // Updated price
    originalPrice: calculateOriginalPrice(19999), // 60% off calculation
    image:
      "https://img.freepik.com/free-vector/app-development-banner_33099-1720.jpg",
    description: "Build high-performance, production-ready cross-platform mobile applications with advanced React Native techniques.",
    longDescription:
      "This advanced course focuses on building highly performant and scalable cross-platform mobile applications using advanced React Native techniques. You'll master topics like native module bridging (iOS/Android), performance optimization, advanced state management, and continuous delivery (CI/CD). Emphasis is placed on best practices for mobile UX/UI and enterprise-level application development.",
    duration: "5 months",
    isPopular: false,
    whatYouWillLearn: [
      "Master advanced React Native performance optimization techniques (Hermes, Reanimated).",
      "Implement native module bridging with Swift/Kotlin for custom functionality.",
      "Design and implement advanced state management using Redux Toolkit or MobX.",
      "Secure mobile applications using biometrics, secure storage, and network request hardening.",
      "Integrate with complex native APIs and third-party SDKs.",
      "Set up CI/CD pipelines (Fastlane, GitHub Actions) for automated build and deployment.",
      "Troubleshoot and debug performance issues in production apps.",
    ],
    prerequisites: [
      "Strong proficiency in JavaScript/TypeScript and React.js.",
      "Familiarity with basic React Native concepts and component lifecycle.",
      "Basic understanding of native mobile development environments (Xcode, Android Studio) is a plus.",
    ],
    syllabus: [
      {
        module: "Module 1: Performance & Advanced React Native",
        topics: [
          "Deep Dive into React Native Architecture (Bridge, JSI)",
          "Performance Optimization with Reanimated and Skia",
          "Advanced Custom Hooks and Component Patterns",
        ],
      },
      {
        module: "Module 2: Native Module Bridging (iOS & Android)",
        topics: [
          "Building Native Modules in Swift/Kotlin",
          "Interacting with Native UI Components",
          "Handling Complex Data Passing between JS and Native",
        ],
      },
      {
        module: "Module 3: Security & Data Management",
        topics: [
          "Advanced State Management with Redux Toolkit/RTK Query",
          "Authentication & Biometrics Integration (Face ID/Touch ID)",
          "Secure Data Storage (Keychain/Keystore)",
        ],
      },
      {
        module: "Module 4: CI/CD & Production Deployment",
        topics: [
          "Setting up Automated Build/Release with Fastlane",
          "Over-the-Air (OTA) Updates and CodePush",
          "App Store Optimization (ASO) and Deployment Best Practices",
        ],
      },
    ],
  },
  {
    id: "c5",
    title: "Cybersecurity Professional & Ethical Hacking",
    slug: "cybersecurity-essentials",
    category: "Cybersecurity",
    level: "Advanced", // Updated
    instructor: {
      name: "Emily White",
      title: "Cybersecurity Analyst at SecureNet",
      bio: "Emily is a dedicated cybersecurity professional with a focus on penetration testing, threat hunting, and incident response. She holds multiple industry certifications and is passionate about educating individuals on offensive and defensive digital strategies.",
      image:
        "https://www.shutterstock.com/image-photo/passport-photo-portrait-young-man-260nw-2437772333.jpg",
      social: {
        linkedin: "https://linkedin.com/in/emilywhite",
      },
    },
    rating: 4.7,
    reviews: 850,
    price: 23500, // Updated price
    originalPrice: calculateOriginalPrice(23500), // 60% off calculation
    image:
      "https://iirfranking.com/courses/wp-content/uploads/2022/07/Cyber-Security.jpeg",
    description: "Master ethical hacking, advanced threat detection, and professional incident response strategies.",
    longDescription:
      "This advanced course transforms foundational knowledge into professional cybersecurity expertise. You will master offensive techniques like penetration testing and vulnerability assessment using tools like Metasploit, alongside defensive strategies such as threat modeling, SIEM management, and advanced incident response. The course emphasizes hands-on lab environments for real-world simulation.",
    duration: "5 months",
    isPopular: false,
    whatYouWillLearn: [
      "Execute full-cycle Ethical Hacking and Penetration Testing methodologies.",
      "Master vulnerability assessment, exploitation, and post-exploitation techniques.",
      "Configure and utilize Security Information and Event Management (SIEM) systems for log analysis.",
      "Develop and implement advanced incident response plans and digital forensics procedures.",
      "Understand and mitigate web application vulnerabilities (OWASP Top 10) with tools like Burp Suite.",
      "Perform network and wireless security audits and understand intrusion detection systems.",
      "Apply secure coding principles and DevSecOps practices.",
    ],
    prerequisites: [
      "Solid understanding of basic networking (TCP/IP, subnetting).",
      "Familiarity with Linux command-line and scripting.",
      "Knowledge of common cyber threats and security principles.",
    ],
    syllabus: [
      {
        module: "Module 1: Ethical Hacking & Reconnaissance",
        topics: [
          "Kali Linux Environment Setup and Tooling",
          "Advanced Footprinting and Scanning (Nmap, enumeration)",
          "Vulnerability Assessment and Reporting",
        ],
      },
      {
        module: "Module 2: Exploitation & Post-Exploitation",
        topics: [
          "Exploiting Client-Side and Server-Side Vulnerabilities (Metasploit)",
          "Covering Tracks and Privilege Escalation",
          "Password Attacks and Wireless Hacking",
        ],
      },
      {
        module: "Module 3: Advanced Defense & SIEM",
        topics: [
          "Security Architecture Design and Threat Modeling",
          "SIEM Implementation and Log Correlation",
          "Intrusion Detection/Prevention System (IDS/IPS) Tuning",
        ],
      },
      {
        module: "Module 4: Incident Response & Forensics",
        topics: [
          "Developing a Professional Incident Response Plan",
          "Digital Forensics: Chain of Custody, Data Acquisition",
          "Malware Analysis Fundamentals",
        ],
      },
    ],
  },
  {
    id: "c8",
    title: "Digital Marketing & Growth Hacking Professional",
    slug: "digital-marketing-mastery",
    category: "Digital Marketing",
    level: "Advanced", // Updated
    instructor: {
      name: "David Chen",
      title: "Head of Digital Marketing at BrandBoost",
      bio: "David is a digital marketing veteran with over 12 years of experience crafting successful online strategies. He specializes in data-driven growth hacking, advanced SEO/SEM automation, and multi-channel attribution modeling.",
      image:
        "https://www.shutterstock.com/image-photo/passport-photo-portrait-young-man-260nw-2437772333.jpg",
      social: {
        linkedin: "https://linkedin.com/in/davidchen_marketing",
        twitter: "https://twitter.com/davidchen_mkt",
      },
    },
    rating: 4.5,
    reviews: 600,
    price: 20999, // Updated price
    originalPrice: calculateOriginalPrice(20999), // 60% off calculation
    image:
      "https://aclm.in/wp-content/uploads/2021/08/advanced-digital-marketing.jpg",
    description:
      "Master data-driven Growth Hacking, advanced SEO automation, and multi-channel attribution modeling for explosive business growth.",
    longDescription:
      "This masterclass provides an in-depth understanding of Advanced Digital Marketing strategies and Growth Hacking methodologies. You will learn to use sophisticated tools for SEO automation, programmatic advertising, multi-touch attribution, and A/B testing at scale. The course is highly practical, focusing on real-world case studies for achieving hyper-growth and optimizing Customer Lifetime Value (CLV).",
    duration: "4 months",
    isPopular: false,
    whatYouWillLearn: [
      "Develop and execute end-to-end Growth Hacking funnels (AARRR metrics).",
      "Master technical SEO, schema markup, and site speed optimization.",
      "Run advanced Search Engine Marketing (SEM) campaigns with dynamic creative optimization.",
      "Implement and analyze multi-touch attribution models to accurately measure channel ROI.",
      "Build and automate advanced Social Media and Influencer Marketing campaigns.",
      "Utilize marketing automation platforms (HubSpot, Marketo) for lead nurturing and personalization.",
      "Perform advanced data analysis using Google Analytics 4 and other BI tools to drive business decisions.",
    ],
    prerequisites: [
      "Solid understanding of core marketing concepts and digital channels (SEO, SEM).",
      "Experience with Google Analytics or similar web analytics tools.",
      "Familiarity with conversion rate optimization (CRO) principles.",
    ],
    syllabus: [
      {
        module: "Module 1: Growth Hacking & AARRR Framework",
        topics: [
          "Developing a Data-Driven Growth Strategy",
          "Advanced Customer Lifetime Value (CLV) Modeling",
          "Viral Loops and Referral Marketing",
        ],
      },
      {
        module: "Module 2: Advanced SEO & Content Strategy",
        topics: [
          "Technical SEO Audits and Core Web Vitals Optimization",
          "Advanced Keyword Research and Semantic SEO",
          "Content Personalization and AI-Driven Content Creation",
        ],
      },
      {
        module: "Module 3: Advanced Paid Media & Automation",
        topics: [
          "Programmatic Advertising and DSP/SSP Ecosystems",
          "Dynamic Creative Optimization (DCO) and Ad Automation",
          "Cross-Platform Retargeting Strategies",
        ],
      },
      {
        module: "Module 4: Marketing Analytics & Attribution",
        topics: [
          "Implementing and Auditing Google Analytics 4 (GA4)",
          "Multi-Touch Attribution Modeling (Linear, Time Decay, U-Shaped)",
          "A/B Testing, Multivariate Testing, and Conversion Rate Optimization (CRO)",
        ],
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
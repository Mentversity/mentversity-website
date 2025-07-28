// components/community/CommunityData.ts

export interface DiscussionPost {
  id: string;
  title: string;
  author: { name: string; avatar: string };
  category: string;
  replies: number;
  views: number;
  lastActive: string; // e.g., "2 hours ago", "Yesterday"
  isPinned?: boolean;
}

export interface StudyGroup {
  id: string;
  name: string;
  course: string;
  members: number;
  isActive: boolean;
  description: string;
  tags: string[];
}

export interface Resource {
  id: string;
  title: string;
  type: "Article" | "Tool" | "Video" | "Project";
  sharedBy: { name: string; avatar: string };
  link: string;
  likes: number;
  tags: string[];
}

export interface Announcement {
  id: string;
  title: string;
  date: string; // e.g., "July 26, 2025"
  content: string;
  type: "event" | "update" | "webinar";
}

export interface SuccessStory {
  id: string;
  title: string;
  author: { name: string; image: string; courseCompleted: string };
  quote: string;
  link: string; // Link to full story page
}

export const MOCK_DISCUSSION_POSTS: DiscussionPost[] = [
  {
    id: "d1",
    title: "Stuck on React Hook Form validation for nested objects",
    author: {
      name: "Alice Johnson",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    category: "Web Development",
    replies: 15,
    views: 320,
    lastActive: "10 minutes ago",
    isPinned: true,
  },
  {
    id: "d2",
    title: "Best practices for deploying Node.js apps on AWS EC2?",
    author: {
      name: "Bob Williams",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    category: "Cloud Computing",
    replies: 8,
    views: 180,
    lastActive: "1 hour ago",
  },
  {
    id: "d3",
    title: "Understanding Gradient Descent in Machine Learning",
    author: {
      name: "Charlie Brown",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    category: "Data Science",
    replies: 22,
    views: 500,
    lastActive: "3 hours ago",
  },
  {
    id: "d4",
    title: "Tips for acing your first tech interview?",
    author: {
      name: "Diana Prince",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    category: "Career Advice",
    replies: 12,
    views: 250,
    lastActive: "Yesterday",
  },
  {
    id: "d5",
    title: "Project Idea: Build a simple e-commerce site with Next.js & Stripe",
    author: {
      name: "Eve Adams",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    category: "Project Showcase",
    replies: 7,
    views: 110,
    lastActive: "2 days ago",
  },
];

export const MOCK_STUDY_GROUPS: StudyGroup[] = [
  {
    id: "sg1",
    name: "React Native Study Circle",
    course: "Mobile App Development (React Native)",
    members: 28,
    isActive: true,
    description:
      "Weekly sessions to discuss React Native concepts and build mini-projects together.",
    tags: ["React Native", "Mobile", "Frontend"],
  },
  {
    id: "sg2",
    name: "AWS Solutions Architect Prep",
    course: "Cloud Computing Fundamentals (AWS)",
    members: 15,
    isActive: true,
    description:
      "Preparing for the AWS Solutions Architect Associate exam. Practice questions and concept reviews.",
    tags: ["AWS", "Cloud", "Certification"],
  },
  {
    id: "sg3",
    name: "Python Data Science Deep Dive",
    course: "Data Science with Python",
    members: 42,
    isActive: false, // Example of an inactive group
    description:
      "Advanced topics in Python for Data Science, including deep learning frameworks.",
    tags: ["Python", "Data Science", "Machine Learning"],
  },
];

export const MOCK_RESOURCES: Resource[] = [
  {
    id: "r1",
    title: "The Ultimate Guide to Modern JavaScript (2024)",
    type: "Article",
    sharedBy: {
      name: "Frank Green",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    },
    link: "#", // Placeholder link
    likes: 85,
    tags: ["JavaScript", "Web Dev", "Frontend"],
  },
  {
    id: "r2",
    title: "Docker Crash Course for Beginners",
    type: "Video",
    sharedBy: {
      name: "Grace Hall",
      avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    },
    link: "#", // Placeholder link
    likes: 120,
    tags: ["DevOps", "Docker", "Beginner"],
  },
  {
    id: "r3",
    title: "Free AI/ML Datasets for Practice",
    type: "Tool",
    sharedBy: {
      name: "Harry King",
      avatar: "https://randomuser.me/api/portraits/men/8.jpg",
    },
    link: "#", // Placeholder link
    likes: 95,
    tags: ["AI/ML", "Data Science", "Datasets"],
  },
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "a1",
    title: 'New Webinar: "Cracking the Tech Interview"',
    date: "August 15, 2025",
    content:
      "Join our expert panel for insights on resume building, interview strategies, and technical assessments. Limited seats!",
    type: "webinar",
  },
  {
    id: "a2",
    title: "Platform Update: New AI/ML Course Modules Released!",
    date: "July 20, 2025",
    content:
      "Exciting news! We've just added advanced modules to our AI/ML Masterclass, covering Generative AI and Reinforcement Learning.",
    type: "update",
  },
];

export const MOCK_SUCCESS_STORIES: SuccessStory[] = [
  {
    id: "s1",
    title: "From Zero to Full Stack Developer in 6 Months",
    author: {
      name: "Priya Sharma",
      image: "https://randomuser.me/api/portraits/women/9.jpg",
      courseCompleted: "Full Stack Web Development",
    },
    quote:
      "Mentversity's hands-on approach and supportive community were game-changers for my career. I landed my dream job right after graduation!",
    link: "#", // Link to a full story page
  },
  {
    id: "s2",
    title: "How I Transitioned to Data Science with Mentversity",
    author: {
      name: "Rahul Singh",
      image: "https://randomuser.me/api/portraits/men/10.jpg",
      courseCompleted: "Data Science with Python",
    },
    quote:
      "The practical projects and instructor feedback helped me build a strong portfolio. Highly recommend for anyone serious about data science.",
    link: "#",
  },
];

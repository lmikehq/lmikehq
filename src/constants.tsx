import {
  Brain,
  Cloud,
  Cpu,
  LineChart,
  Server,
  Terminal,
  Zap,
} from "lucide-react";
import { BlogPost, ExperienceItem, ProjectItem, ResearchItem } from "./types";

// Transformed content from resume to focus on ML/AI
export const PERSONAL_INFO = {
  name: "Michael E. Adebisi",
  brand: "MikeHQ",
  title: "Machine Learning Engineer & AI Architect",
  tagline:
    "Translating complex data into actionable intelligence through scalable AI solutions.",
  email: "devmike.llc@gmail.com",
  location: "Nigeria (remote)",
  socials: {
    github: "github.com/lmikehq",
    linkedin: "linkedin.com/in/mikeadebisi",
    twitter: "twitter.com/MikeHQ",
    website: "https://mikehq.tech",
  },
};

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 1,
    role: "Lead MLE & Technical Project Lead",
    company: "Zentira",
    period: "March 2025 - Present",
    description:
      "Hold dual responsibility for leading the technical direction and execution of Machine Learning initiatives.",
    tags: [
      "MLOps",
      "Technical Leadership",
      "Project Management",
      "AWS",
      "Machine Learning",
    ],
  },
  {
    id: 2,
    role: "Chief Technology Officer",
    company: "Thrillers Travels Ltd, Lagos Nigeria",
    period: "April 2023 - March 2025",
    description:
      "Provided strategic leadership for technology initiatives, achieving company growth to serve over 10,000 users and $500k in annual revenue.",
      // Spearheaded all infrastructure and DevOps operations on AWS, including CI/CD pipeline optimization with AWS CodeBuild and CodeCommit.",
    tags: [
      "AWS",
      "DevOps",
      "CI/CD",
      "PostgreSQL",
      "Team Leadership",
      "API Design",
    ],
  },
  {
    id: 3,
    role: "Staff Software Engineer",
    company: "Checkin Inc, United States (Remote)",
    period: "Aug 2022 - July 2023",
    description:
      "Collaborated extensively with product, UX/UI, and data science teams to refine project requirements and user stories.",
      //  Conducted code reviews, provided constructive feedback, and monitored application usage to implement data-driven optimizations and influence product quality.",
    tags: [
      "Agile",
      "Collaboration",
      "Code Reviews",
      "Product Development",
      "Data Analysis",
    ],
  },
  {
    id: 4,
    role: "Software Engineer",
    company: "Punch Group, United States (Remote)",
    period: "March 2022 - June 2023",
    description:
      "Led a team of 12 developers across various projects. Key developer for 'Zwilt Tracker', built AI pipeline for candidate screening and many more projects",
      
      // a React Native application for AI pipeline analysis of customer activity. Integrated AI algorithms for automated candidate screening, and built a comprehensive E-Commerce platform fully integrated with the Amazon store.",
    tags: [
      "Team Leadership",
      "React Native",
      "AI/ML",
      "E-Commerce",
      "Computer Vision",
      "Full Stack",
    ],
  },
  {
    id: 5,
    role: "Full Stack Developer",
    company: "Thrillers Group Inc, Lagos, Nigeria",
    period: "Feb 2021 – March 2022",
    description:
      "Developed cloud-based software products using Python Django. Designed and created scalable RESTful APIs for internal and partner consumption. ",
      // Worked closely with front-end developers, utilizing an in-house Redux Toolkit solution, and converting high-fidelity mockups into responsive web code.",
    tags: [
      "Python",
      "Django",
      "RESTful API",
      "React",
      "Redux Toolkit",
      "Full Stack",
      "Agile",
    ],
  },
];

export const SKILLS_DATA = [
  {
    id: "ai",
    name: "AI & Data Science",
    icon: <Brain className="h-6 w-6" />,
    description: "Building intelligent systems that learn and adapt.",
    tools: [
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "OpenCV",
      "HuggingFace",
      "Pandas",
      "NumPy",
      "LLMs (GPT/Llama)",
    ],
  },
  {
    id: "backend",
    name: "Backend & Architecture",
    icon: <Server className="h-6 w-6" />,
    description: "Robust infrastructure to support high-scale data processing.",
    tools: [
      "Python",
      "Django",
      "FastAPI",
      "Node.js",
      "GoLang",
      "PostgreSQL",
      "GraphQL",
      "Redis",
    ],
  },
  {
    id: "cloud",
    name: "MLOps & Cloud",
    icon: <Cloud className="h-6 w-6" />,
    description: "Deploying and managing models at scale.",
    tools: [
      "AWS SageMaker",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "Terraform",
      "MLflow",
      "Prometheus",
    ],
  },
];

export const SERVICES_DATA = [
  {
    title: "AI Strategy Consulting",
    description:
      "Defining the roadmap for integrating AI into your existing business processes to drive efficiency.",
    icon: <LineChart className="h-6 w-6" />,
  },
  {
    title: "Custom ML Model Development",
    description:
      "Building bespoke predictive models, recommendation engines, and NLP solutions tailored to your data.",
    icon: <Cpu className="h-6 w-6" />,
  },
  {
    title: "MVP to Scale",
    description:
      "Rapidly prototyping AI concepts and architecting the infrastructure to scale them to millions of users.",
    icon: <Zap className="h-6 w-6" />,
  },
  {
    title: "MLOps Pipeline Automation",
    description:
      "Setting up robust CI/CD pipelines for machine learning, ensuring reliable training and deployment cycles.",
    icon: <Terminal className="h-6 w-6" />,
  },
];

export const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: "Zaid Jamshaid",
    role: "Product Manager at Punch Group",
    content:
      "Mike is an elite, true full-stack engineer who builds complete applications. He architects robust, scalable back-end services designed to handle complex data and high-traffic performance demands. ",
    // His understanding of system integrity ensures the final product is always fast, stable, and ready for production growth.",
    avatar:
      "https://media.licdn.com/dms/image/v2/D4D03AQFHZkpGAnIVsQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1725383574778?e=1766620800&v=beta&t=rCqtzkEoawY3iuTMu8AsaQPfeW_6teSv2TWytyOPIzA",
  },
  {
    id: 2,
    name: "Jude Okon",
    role: "CEO at Checkin Inc",
    content:
      "Mike was a powerhouse for our frontend. He delivered the highly responsive, pixel-perfect user interface that was directly responsible for improving our customer conversion rates. We trust him completely.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  // {
  //   id: 1,
  //   title: "Zwilt AI Recruiter",
  //   slug: "zwilt-ai-recruiter",
  //   category: "NLP & Automation",
  //   description:
  //     "An automated recruitment platform utilizing Large Language Models to parse resumes and match candidates to job descriptions with 92% accuracy.",
  //   image: "https://picsum.photos/600/400?random=1",
  //   stats: [
  //     { label: "Efficiency", value: "+40%" },
  //     { label: "Accuracy", value: "92%" },
  //   ],
  // },
  {
    id: 2,
    title: "Travel Price Predictor",
    slug: "travel-price-predictor",
    category: "Predictive Analytics",
    description:
      "A time-series forecasting model deployed for Thrillers Travels that predicts optimal booking windows for flights and hotels to maximize revenue.",
    image: "img/price-predictor.png",
    stats: [
      { label: "Data Points", value: "10M+" },
      { label: "Rev. Impact", value: "High" },
    ],
  },
  {
    id: 3,
    title: "Activity Vision",
    slug: "activity-vision",
    category: "Computer Vision",
    description:
      "A productivity monitoring tool that uses OCR and image classification to categorize workflow states from screen captures in real-time.",
    image: "img/activity-vision.png",
    stats: [
      { label: "Latency", value: "<100ms" },
      { label: "Users", value: "5k+" },
    ],
  },
  // {
  //   id: 4,
  //   title: "Neuro-Net Vis",
  //   slug: "neuro-net-vis",
  //   category: "Research Tool",
  //   description:
  //     "An interactive visualization dashboard for neural network layer activations, helping researchers debug deep learning models more effectively.",
  //   image: "https://picsum.photos/600/400?random=4",
  //   stats: [
  //     { label: "Stars", value: "1.2k" },
  //     { label: "Forks", value: "300+" },
  //   ],
  // },
];

export const RESEARCH_DATA: ResearchItem[] = [
  // {
  //   id: 1,
  //   title:
  //     "Advancing Pediatric Brain Mapping: An AI-Driven Adaptive Functional MRI Pipeline",
  //   slug: "advancing-pediatric-brain-mapping",
  //   conference: "Radiological Society of North America (RSNA)",
  //   date: "2024",
  //   abstract:
  //     "A self-supervised learning based adaptive pipeline for identification of paediatric functional brain networks, improving diagnostic accuracy in early development stages.",
  //   link: "#",
  //   tags: ["fMRI", "Deep Learning", "Healthcare"],
  // },
  // {
  //   id: 2,
  //   title:
  //     "Accelerated Motion Correction with Deep Learning for Functional MRI",
  //   slug: "accelerated-motion-correction-deep-learning",
  //   conference: "Radiological Society of North America (RSNA)",
  //   date: "2024",
  //   abstract:
  //     "A deep learning based accelerated motion correction pipeline for fMRI data using a Dual-Head ResNet Regressor to mitigate patient movement artifacts.",
  //   link: "#",
  //   tags: ["Computer Vision", "Medical Imaging", "ResNet"],
  // },
  // {
  //   id: 3,
  //   title:
  //     "Harmonizing tb-fMRI and rs-fMRI: A Generative approach for mapping Language Networks",
  //   slug: "harmonizing-tb-fmri-rs-fmri",
  //   conference: "European Congress of Radiology",
  //   date: "2024",
  //   abstract:
  //     "Utilizing generative modeling to map task-based fMRI analogous brain activity maps for Language network using rs-fMRI connectivity.",
  //   link: "https://epos.myesr.org/poster/esr/ecr2024/C-11442",
  //   tags: ["Generative AI", "Neuroscience", "GANs"],
  // },
  // {
  //   id: 4,
  //   title:
  //     "Brain Tumor Classification using a Pre-Trained Auxiliary Classifying GAN",
  //   slug: "brain-tumor-classification-gan",
  //   conference: "Journal of Medical Systems",
  //   date: "2023",
  //   abstract:
  //     "An auxiliary classifying conditional generative adversarial network based on StyleGAN, achieving ~99.5% accuracy in classifying Glioma, Meningioma, & Pituitary Brain Tumors.",
  //   link: "https://doi.org/10.1007/s10916-023-01932-x",
  //   tags: ["StyleGAN", "Oncology", "Classification"],
  // },
];

export const BLOG_DATA: BlogPost[] = [
  // {
  //   id: 1,
  //   title: "The Future of MLOps: Beyond Model Training",
  //   slug: "future-of-mlops-beyond-model-training",
  //   excerpt:
  //     "Why the real challenge in AI adoption isn't building the model, but maintaining it in production at scale.",
  //   date: "Oct 12, 2024",
  //   readTime: "5 min read",
  //   category: "MLOps",
  //   image: "https://picsum.photos/800/600?random=10",
  // },
  // {
  //   id: 2,
  //   title: "Demystifying Transformers for NLP",
  //   slug: "demystifying-transformers-for-nlp",
  //   excerpt:
  //     "A deep dive into the architecture that changed Natural Language Processing forever, explained simply.",
  //   date: "Sep 28, 2024",
  //   readTime: "8 min read",
  //   category: "Deep Learning",
  //   image: "https://picsum.photos/800/600?random=11",
  // },
  // {
  //   id: 3,
  //   title: "Optimizing AWS SageMaker Costs",
  //   slug: "optimizing-aws-sagemaker-costs",
  //   excerpt:
  //     "Practical strategies for managing cloud infrastructure costs when training large language models.",
  //   date: "Aug 15, 2024",
  //   readTime: "6 min read",
  //   category: "Cloud Engineering",
  //   image: "https://picsum.photos/800/600?random=12",
  // },
];

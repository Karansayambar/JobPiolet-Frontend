// src/types/job.ts
import logo from "../assets/auth/Logo.png";

export interface Job {
  _id: string;
  userId: string;
  jobTitle: string;
  jobRole: string;
  companyName: string;
  logo: string;
  type: string;
  minSalary: string;
  maxSalary: string;
  salaryType: string;
  education: string;
  vacancies: string;
  workMode: string;
  jobLevel: string;
  industry: string;
  jobStatus: string;
  jobFunction: string;
  workingHours: string;
  contractLength: string;
  address: string;
  posted: string;
  state: string;
  experience: string;
  deadline: string;
  city: string;
  applicants: number;
  views: number;
  jobDescription: string;
  country: string;
  jobResponsibilities: string[];
  jobRequirements: string[];
  jobBenefits: string[];
  sills: string[];
  // languages: string[];
  logo: string;
  jobPreferences: string[];
}

export const jobs: Job[] = [
  {
    _id: "68013eb3e2132658d6676b99",
    userId: "6800ac5f01c713b1e6fea235",
    jobTitle: "Frontend Developer",
    jobRole: "React.js Developer",
    companyName: "Meta Platforms, Inc. (Facebook)",
    jobDescription: "Job Description: Frontend Web Developer (React.js)...",
    minSalary: "60000",
    maxSalary: "120000",
    salaryType: "yearly",
    education: "btech",
    experience: "1",
    vacancies: "6",
    workMode: "Full-time",
    jobLevel: "mid",
    industry: "information_technology",
    jobStatus: "open",
    jobFunction: "software_engineering",
    workingHours: "10am - 7pm",
    contractLength: "12 months",
    jobBenefits: [
      "health",
      "remote",
      "bonus",
      "meals",
      "stock",
      "relocation",
      "training",
    ],
    sills: [
      "React",
      "JavaScript",
      "Node.js",
      "MongoDB",
      "HTML",
      "CSS",
      "TypeScript",
      "figma",
      "mui",
    ],
    country: "india",
    state: "Karnataka",
    city: "bangalore",
    address: "bangalore",
    jobResponsibilities: [
      "Develop and maintain user-facing features using React.js, HTML, CSS...",
      "Integrate APIs and handle data rendering with Redux/Context API.",
      "Optimize applications for maximum speed and scalability.",
      "Collaborate with designers to ensure UI/UX design feasibility and consistency.",
      "Write clean, maintainable, and well-documented code.",
    ],
    jobRequirements: [
      "Solid understanding of React.js, JavaScript (ES6+), HTML5, and CSS3.",
      "Experience with state management libraries like Redux Toolkit or Context API.",
      "Knowledge of RESTful APIs and asynchronous programming.",
      "Familiarity with version control systems (e.g., Git).",
      "Basic understanding of responsive design and cross-browser compatibility.",
    ],
    jobPreferences: [
      "Knowledge of TypeScript or testing libraries (Jest/Cypress).",
      "Experience with Tailwind CSS, Bootstrap, or Material UI.",
      "Understanding of performance optimization and code splitting.",
      "Hands-on experience with deployment tools (Vercel, Netlify, Heroku).",
      "Participation in open-source projects or a strong GitHub portfolio.",
    ],
    languages: ["English", "Hindi", "Telugu"],
    // "applicants": [],
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png",
  },
  {
    _id: "68013eb3e2132658d6676b91",
    userId: "6800ac5f01c713b1e6fea236",
    jobTitle: "Backend Developer",
    jobRole: "Node.js Developer",
    companyName: "Netflix Inc.",
    jobDescription: "Looking for an experienced Node.js backend engineer...",
    minSalary: "80000",
    maxSalary: "130000",
    salaryType: "yearly",
    education: "btech",
    experience: "2",
    vacancies: "4",
    workMode: "Remote",
    jobLevel: "mid",
    industry: "information_technology",
    jobStatus: "open",
    jobFunction: "software_engineering",
    workingHours: "Flexible",
    contractLength: "18 months",
    jobBenefits: ["health", "remote", "bonus", "stock", "training"],
    sills: ["Node.js", "Express", "MongoDB", "Docker", "AWS"],
    country: "india",
    state: "Maharashtra",
    city: "mumbai",
    address: "mumbai",
    jobResponsibilities: [
      "Design and implement REST APIs using Node.js and Express.",
      "Work with DevOps team to manage deployments on AWS.",
      "Optimize database queries and schema for performance.",
      "Integrate third-party APIs securely and efficiently.",
      "Participate in code reviews and team collaboration.",
    ],
    jobRequirements: [
      "Strong experience with Node.js and Express.js.",
      "Proficiency with MongoDB and database design.",
      "Understanding of Docker and containerized applications.",
      "Familiar with Git and CI/CD pipelines.",
      "Ability to work in an agile environment.",
    ],
    jobPreferences: [
      "Experience with GraphQL or Prisma.",
      "Knowledge of microservice architecture.",
      "Familiarity with Kubernetes and AWS services.",
      "Contributions to backend open-source projects.",
      "Strong debugging and profiling skills.",
    ],
    languages: ["English", "Hindi"],
    // "applicants": [],
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  },
  {
    _id: "68013eb3e2132658d6676b92",
    userId: "6800ac5f01c713b1e6fea237",
    jobTitle: "Full Stack Developer",
    jobRole: "MERN Stack Developer",
    companyName: "Google LLC",
    jobDescription: "Join our team as a Full Stack MERN developer...",
    minSalary: "90000",
    maxSalary: "150000",
    salaryType: "yearly",
    education: "mtech",
    experience: "3",
    vacancies: "5",
    workMode: "Hybrid",
    jobLevel: "senior",
    industry: "information_technology",
    jobStatus: "open",
    jobFunction: "software_engineering",
    workingHours: "9am - 6pm",
    contractLength: "24 months",
    jobBenefits: ["health", "remote", "bonus", "meals", "stock", "relocation"],
    sills: ["React", "Node.js", "MongoDB", "Express", "Redux", "TypeScript"],
    country: "india",
    state: "Telangana",
    city: "hyderabad",
    address: "hyderabad",
    jobResponsibilities: [
      "Build and maintain web apps using the MERN stack.",
      "Collaborate with product and design teams.",
      "Ensure scalability and responsiveness of applications.",
      "Write reusable and testable code.",
      "Deploy applications using CI/CD pipelines.",
    ],
    jobRequirements: [
      "Proven experience in full stack development.",
      "Strong understanding of React and Node.js.",
      "Familiarity with database management and APIs.",
      "Good problem-solving and communication skills.",
      "Experience with testing and debugging tools.",
    ],
    jobPreferences: [
      "Hands-on with serverless functions (AWS Lambda).",
      "Knowledge of authentication (JWT, OAuth).",
      "Experience in Agile/Scrum environments.",
      "Contribution to GitHub projects or blogs.",
      "Google Cloud experience is a plus.",
    ],
    languages: ["English"],
    // "applicants": [],
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    _id: "68013eb3e2132658d6676b93",
    userId: "6800ac5f01c713b1e6fea238",
    jobTitle: "UI/UX Designer",
    jobRole: "Product Designer",
    companyName: "Adobe Inc.",
    jobDescription: "We're looking for a creative UI/UX designer...",
    minSalary: "70000",
    maxSalary: "110000",
    salaryType: "yearly",
    education: "btech",
    experience: "2",
    vacancies: "3",
    workMode: "Full-time",
    jobLevel: "mid",
    industry: "design",
    jobStatus: "open",
    jobFunction: "design",
    workingHours: "10am - 6pm",
    contractLength: "Permanent",
    jobBenefits: ["health", "bonus", "training", "meals", "stock"],
    sills: ["Figma", "Adobe XD", "Sketch", "User Research", "Prototyping"],
    country: "india",
    state: "Tamil Nadu",
    city: "chennai",
    address: "chennai",
    jobResponsibilities: [
      "Create wireframes, prototypes, and UI mockups.",
      "Collaborate with developers to ensure smooth implementation.",
      "Conduct usability testing and gather feedback.",
      "Design UI components aligned with brand guidelines.",
      "Improve overall user experience across platforms.",
    ],
    jobRequirements: [
      "Proficiency with design tools like Figma and Adobe XD.",
      "Strong portfolio showcasing UI/UX design work.",
      "Ability to solve design problems creatively.",
      "Familiarity with frontend frameworks is a plus.",
      "Good understanding of UX principles.",
    ],
    jobPreferences: [
      "Motion design or animation skills.",
      "Experience working in Agile teams.",
      "Knowledge of accessibility standards.",
      "Basic coding skills (HTML/CSS).",
      "Experience with design systems.",
    ],
    languages: ["English", "Tamil"],
    // "applicants": [],
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Systems_logo_and_wordmark.svg",
  },
  {
    _id: "68013eb3e2132658d6676b94",
    userId: "6800ac5f01c713b1e6fea239",
    jobTitle: "DevOps Engineer",
    jobRole: "Cloud & DevOps Specialist",
    companyName: "Amazon Web Services (AWS)",
    jobDescription:
      "Seeking an experienced DevOps engineer to join our cloud team...",
    minSalary: "100000",
    maxSalary: "160000",
    salaryType: "yearly",
    education: "btech",
    experience: "3",
    vacancies: "2",
    workMode: "Remote",
    jobLevel: "senior",
    industry: "cloud_computing",
    jobStatus: "open",
    jobFunction: "cloud_engineering",
    workingHours: "Flexible",
    contractLength: "12 months",
    jobBenefits: ["health", "remote", "bonus", "stock", "relocation"],
    sills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform", "Linux"],
    country: "india",
    state: "Delhi",
    city: "new delhi",
    address: "new delhi",
    jobResponsibilities: [
      "Build and maintain CI/CD pipelines.",
      "Manage cloud infrastructure on AWS.",
      "Implement monitoring and logging systems.",
      "Ensure high availability and security of services.",
      "Automate deployments and incident responses.",
    ],
    jobRequirements: [
      "Hands-on with AWS services and cloud tools.",
      "Experience with container orchestration.",
      "Good scripting knowledge (Bash, Python).",
      "Familiar with GitOps practices.",
      "Strong troubleshooting and analytical skills.",
    ],
    jobPreferences: [
      "AWS certification preferred.",
      "Knowledge of serverless computing.",
      "Experience with multi-cloud environments.",
      "Background in cybersecurity.",
      "Participation in DevOps communities.",
    ],
    languages: ["English", "Hindi"],
    // "applicants": [],
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
  },
];

export const stateOptions = [
  { label: "Andhra Pradesh", value: "Andhra Pradesh" },
  { label: "Arunachal Pradesh", value: "Arunachal Pradesh" },
  { label: "Assam", value: "Assam" },
  { label: "Bihar", value: "Bihar" },
  { label: "Chhattisgarh", value: "Chhattisgarh" },
  { label: "Goa", value: "Goa" },
  { label: "Gujarat", value: "Gujarat" },
  { label: "Haryana", value: "Haryana" },
  { label: "Himachal Pradesh", value: "Himachal Pradesh" },
  { label: "Jharkhand", value: "Jharkhand" },
  { label: "Karnataka", value: "Karnataka" },
  { label: "Kerala", value: "Kerala" },
  { label: "Madhya Pradesh", value: "Madhya Pradesh" },
  { label: "Maharashtra", value: "Maharashtra" },
  { label: "Manipur", value: "Manipur" },
  { label: "Meghalaya", value: "Meghalaya" },
  { label: "Mizoram", value: "Mizoram" },
  { label: "Nagaland", value: "Nagaland" },
  { label: "Odisha", value: "Odisha" },
  { label: "Punjab", value: "Punjab" },
  { label: "Rajasthan", value: "Rajasthan" },
  { label: "Sikkim", value: "Sikkim" },
  { label: "Tamil Nadu", value: "Tamil Nadu" },
  { label: "Telangana", value: "Telangana" },
  { label: "Tripura", value: "Tripura" },
  { label: "Uttar Pradesh", value: "Uttar Pradesh" },
  { label: "Uttarakhand", value: "Uttarakhand" },
  { label: "West Bengal", value: "West Bengal" },

  // Union Territories
  {
    label: "Andaman and Nicobar Islands",
    value: "Andaman and Nicobar Islands",
  },
  { label: "Chandigarh", value: "Chandigarh" },
  {
    label: "Dadra and Nagar Haveli and Daman and Diu",
    value: "Dadra and Nagar Haveli and Daman and Diu",
  },
  { label: "Delhi", value: "Delhi" },
  { label: "Jammu and Kashmir", value: "Jammu and Kashmir" },
  { label: "Ladakh", value: "Ladakh" },
  { label: "Lakshadweep", value: "Lakshadweep" },
  { label: "Puducherry", value: "Puducherry" },
];

export const countryOptions = [
  // India
  { value: "mumbai", label: "Mumbai" },
  { value: "delhi", label: "Delhi" },
  { value: "bangalore", label: "Bangalore" },
  { value: "pune", label: "Pune" },

  // United States
  { value: "new-york", label: "New York" },
  { value: "san-francisco", label: "San Francisco" },
  { value: "chicago", label: "Chicago" },
  { value: "austin", label: "Austin" },

  // Canada
  { value: "toronto", label: "Toronto" },
  { value: "vancouver", label: "Vancouver" },
  { value: "montreal", label: "Montreal" },

  // United Kingdom
  { value: "london", label: "London" },
  { value: "manchester", label: "Manchester" },

  // Germany
  { value: "berlin", label: "Berlin" },
  { value: "munich", label: "Munich" },

  // Australia
  { value: "sydney", label: "Sydney" },
  { value: "melbourne", label: "Melbourne" },

  // Japan
  { value: "tokyo", label: "Tokyo" },
  { value: "osaka", label: "Osaka" },
];

export const allBenifits = [
  { value: "health", label: "Health Insurance" },
  { value: "remote", label: "Remote Work" },
  { value: "bonus", label: "Performance Bonus" },
  { value: "meals", label: "Free Meals" },
  { value: "pto", label: "Paid Time Off" },
  { value: "training", label: "Training & Development" },
  { value: "stock", label: "Stock Options" },
  { value: "internet", label: "Internet Reimbursement" },
  { value: "relocation", label: "Relocation Assistance" },
];

export const countries = [
  { value: "india", label: "India" },
  { value: "united-states", label: "United States" },
  { value: "canada", label: "Canada" },
  { value: "germany", label: "Germany" },
  { value: "australia", label: "Australia" },
  { value: "united-kingdom", label: "United Kingdom" },
  { value: "france", label: "France" },
  { value: "japan", label: "Japan" },
  { value: "brazil", label: "Brazil" },
  { value: "south-africa", label: "South Africa" },
];

export const workingHourOptions = [
  { label: "9am - 6pm", value: "9am - 6pm" },
  { label: "10am - 7pm", value: "10am - 7pm" },
  { label: "11am - 8pm", value: "11am - 8pm" },
  { label: "8am - 5pm", value: "8am - 5pm" },
  { label: "7am - 4pm", value: "7am - 4pm" },
  { label: "6am - 3pm", value: "6am - 3pm" },
  { label: "Night Shift", value: "Night shift" },
  { label: "Evening Shift", value: "Evening shift" },
  { label: "Rotational Shift", value: "Rotational shift" },
  { label: "Flexible", value: "Flexible" },
];

export const languages = [
  { label: "English", value: "English" },
  { label: "Hindi", value: "Hindi" },
  { label: "Marathi", value: "Marathi" },
  { label: "Tamil", value: "Tamil" },
  { label: "Telugu", value: "Telugu" },
  { label: "Bengali", value: "Bengali" },
  { label: "Gujarati", value: "Gujarati" },
  { label: "Kannada", value: "Kannada" },
];

export const industryOptions = [
  { label: "Information Technology", value: "information_technology" },
  { label: "Software Development", value: "software_development" },
  { label: "Marketing", value: "marketing" },
  { label: "Finance", value: "finance" },
  { label: "Healthcare", value: "healthcare" },
  { label: "Education", value: "education" },
  { label: "E-commerce", value: "e_commerce" },
  { label: "Retail", value: "retail" },
  { label: "Manufacturing", value: "manufacturing" },
  { label: "Telecommunications", value: "telecommunications" },
  { label: "Construction", value: "construction" },
  { label: "Logistics", value: "logistics" },
  { label: "Real Estate", value: "real_estate" },
  { label: "Media and Entertainment", value: "media_entertainment" },
  { label: "Automotive", value: "automotive" },
  { label: "Agriculture", value: "agriculture" },
  { label: "Energy", value: "energy" },
  { label: "Pharmaceuticals", value: "pharmaceuticals" },
];
export const jobFunctionOptions = [
  { label: "Software Engineering", value: "software_engineering" },
  { label: "Marketing", value: "marketing" },
  { label: "Design", value: "design" },
  { label: "Product Management", value: "product_management" },
  { label: "Sales", value: "sales" },
  { label: "Customer Support", value: "customer_support" },
  { label: "Data Analysis", value: "data_analysis" },
  { label: "Human Resources", value: "human_resources" },
  { label: "Finance", value: "finance" },
  { label: "Operations", value: "operations" },
];

export const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Indian", "Atlantic", "Arctic", "Pacific"],
    answer: "Pacific",
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Shakespeare", "Hemingway", "Tolstoy", "Dickens"],
    answer: "Shakespeare",
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    answer: "Carbon Dioxide",
  },
  {
    question: "What is the square root of 64?",
    options: ["6", "7", "8", "9"],
    answer: "8",
  },
  {
    question: "Which part of the plant conducts photosynthesis?",
    options: ["Root", "Stem", "Leaf", "Flower"],
    answer: "Leaf",
  },
  {
    question: "How many sides does a hexagon have?",
    options: ["4", "5", "6", "8"],
    answer: "6",
  },
  {
    question: "What is the fastest land animal?",
    options: ["Tiger", "Leopard", "Cheetah", "Lion"],
    answer: "Cheetah",
  },
  {
    question: "What is the chemical symbol for Oxygen?",
    options: ["O", "Ox", "O2", "Oy"],
    answer: "O",
  },
];

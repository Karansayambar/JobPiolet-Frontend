// src/types/job.ts

export interface Applicant {
  userId: string;
  appliedAt: string;
  status: "pending" | "shortlisted" | "rejected";
}

export interface Job {
  _id: string;
  position: string;
  company: string;
  designation: "fullTime" | "partTime" | "internship";
  avatar: string;
  locationType: "remote" | "in-office" | "hybrid";
  description: string;
  requirements: string;
  desirable: string;
  benefits: string;
  salary: string;
  location: string;
  jobOverview: {
    jobPosted: string;
    jobExpireIn: string;
    jobLevel: string;
    experience: string;
    education: string;
    jobTags: string[];
  };
  postedBy: string;
  isActive: boolean;
  applicants: Applicant[];
  createdAt: string;
  updatedAt: string;
}

export const stateOptions = [
  { label: "Andhra Pradesh", value: "Andhra Pradesh" },
  { label: "Arunachal Pradesh", value: "Arunachal Pradesh" },
  { label: "Assam", value: "Assam" },
  { label: "Ahmedhabad", value: "Ahmedhabad" },
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

export const cityOptions = [
  // India
  { value: "mumbai", label: "Mumbai" },
  { value: "delhi", label: "Delhi" },
  { value: "bangalore", label: "Bangalore" },
  { value: "pune", label: "Pune" },
  { value: "hydrabad", label: "Hydrabad" },
  { value: "noida", label: "Noida" },
  { value: "gurguan", label: "Gurguan" },

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
  {
    label: "Mobile Application Development",
    value: "mobile_application_development",
  },
  { label: "Web Development", value: "web_development" },
  { label: "Cloud Solutions", value: "cloud_solutions" },
  { label: "Data Analytics", value: "data_analytics" },
  { label: "Ecommerce", value: "ecommerce" },
  { label: "Healthcare IT", value: "healthcare_it" },
  { label: "Fintech", value: "fintech" },
  { label: "Digital Marketing", value: "digital_marketing" },
  { label: "Media and Entertainment", value: "media_and_entertainment" },
  { label: "Consulting Services", value: "consulting_services" },
  { label: "Business Process Outsourcing (BPO)", value: "bpo" },
  { label: "Manufacturing", value: "manufacturing" },
  { label: "Education and E-learning", value: "education_elearning" },
  {
    label: "Banking and Financial Services",
    value: "banking_financial_services",
  },
  { label: "Retail", value: "retail" },
  { label: "Automobile", value: "automobile" },
  { label: "Telecommunications", value: "telecommunications" },
  { label: "Hospitality", value: "hospitality" },
  { label: "Pharmaceuticals", value: "pharmaceuticals" },
  { label: "Logistics and Supply Chain", value: "logistics_supply_chain" },
  { label: "Cybersecurity", value: "cybersecurity" },
  { label: "Agritech", value: "agritech" },
  { label: "Legal and Compliance", value: "legal_compliance" },
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

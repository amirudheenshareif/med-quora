import { AlertTriangle, Clock, Heart,MessageSquare,Star,Repeat } from "lucide-react";





export const specialities = [{
    id:1,
    iconName:"❤️",
    specialityName: "Cardiology",
    noOfQuestions: 245
},{
    id:2,
    iconName:"🧴",
    specialityName: "Dermatology",
    noOfQuestions: 245
},{
    id:3,
    iconName:"🧠",
    specialityName: "Neurology",
    noOfQuestions: 245
},{
    id:4,
    iconName:"👶",
    specialityName: "Pediatrics",
    noOfQuestions: 245
},{
    id:5,
    iconName:"🦴",
    specialityName: "Orthopedics",
    noOfQuestions: 245
},{
    id:6,
    iconName:"🥗",
    specialityName: "Nutrition",
    noOfQuestions: 245
},]

export const categories = [
  { id: 1, name: "All" },
  { id: 2, name: "General Medicine" },
  { id: 3, name: "Cardiology" },
  { id: 4, name: "Dermatology" },
  { id: 5, name: "Pediatrics" },
  { id: 6, name: "Orthopedics" },
  { id: 7, name: "Neurology" },
  { id: 8, name: "Psychiatry" },
];

 export const inboxItems = [
  {
    id: 1,
    count: 1,
    label: "Emergency",
    icon: AlertTriangle,
    iconClasses: "h-10 w-10 text-red-600 bg-rose-200 rounded-md p-1",
  },
  {
    id: 2,
    count: 3,
    label: "Moderate risk",
    icon: Clock,
    iconClasses: "h-10 w-10 text-purple-600 bg-purple-200 rounded-md p-1",
  },
  {
    id: 3,
    count: 4,
    label: "Life style",
    icon: Heart,
    iconClasses: "h-10 w-10 text-white bg-slate-200 rounded-md p-1",
  },
];


export const inboxMessages = [
  {
    id: 1,
    name: "Sarah Johnson",
    badgeText: "Emergency",
    badgeClasses: "text-white bg-red-600 rounded-md",
    description: "Experiencing chest pain and shortness of breath for the past 2 hours",
    time: "5 min ago",
  },
  {
    id: 2,
    name: "David Miller",
    badgeText: "Moderate risk",
    badgeClasses: "text-white bg-purple-600 rounded-md",
    description: "Mild fever and headache since yesterday",
    time: "10 min ago",
  },
  {
    id: 3,
    name: "Emma Wilson",
    badgeText: "Lifestyle",
    badgeClasses: "text-black bg-slate-200 rounded-md",
    description: "Wants dietary advice for weight management",
    time: "15 min ago",
  },
];


export const statsData = [
  {
    id: 1,
    value: "5",
    label: "Total Answers",
    icon: MessageSquare,
    iconClasses: "h-10 w-10 text-blue-600 bg-blue-200 rounded-md p-1",
  },
  {
    id: 2,
    value: "18m",
    label: "Avg Response Time",
    icon: Clock,
    iconClasses: "h-10 w-10 text-purple-600 bg-purple-200 rounded-md p-1",
  },
  {
    id: 3,
    value: "4.6",
    label: "Avg Satisfaction",
    icon: Star,
    iconClasses: "h-10 w-10 text-yellow-600 bg-yellow-200 rounded-md p-1",
  },
  {
    id: 4,
    value: "60%",
    label: "Follow-up Rate",
    icon: Repeat,
    iconClasses: "h-10 w-10 text-green-600 bg-green-200 rounded-md p-1",
  },
];
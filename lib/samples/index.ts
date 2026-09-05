import { ExperienceTier, TargetRole } from '@/types/onboarding';

export interface SampleResume {
  id: string;
  name: string;
  rawText: string;
  metadata: {
    targetRole: TargetRole;
    experienceTier: ExperienceTier;
    careerPurpose: string;
  };
}

export const sampleResumes: SampleResume[] = [
  {
    id: 'intern-alex',
    name: 'Alex Chen',
    rawText: `Alex Chen
San Francisco, CA | alex.chen@email.com | github.com/alexchen

EDUCATION
University of California, Berkeley - B.S. Computer Science (Expected May 2027)
GPA: 3.8/4.0
Relevant Coursework: Data Structures, Algorithms, Web Development

SKILLS
Languages: HTML, CSS, JavaScript, Python
Frameworks/Tools: React, Node.js, Git, VS Code

PROJECTS
Personal Portfolio Website
- Built a responsive portfolio website using HTML, CSS, and React to showcase my personal projects.
- Hosted on GitHub Pages.

Weather App
- Created a weather application that fetches data from a public API.
- Developed with JavaScript and CSS.
- Handled API errors and displayed loading states.

EXPERIENCE
IT Support Intern - Berkeley Tech Desk
Jan 2025 - Present
- Helped students with software issues.
- Fixed network connection problems for over 50 users.
- Kept track of support tickets.`,
    metadata: {
      targetRole: 'frontend',
      experienceTier: 'intern',
      careerPurpose: 'Looking for a Summer 2026 Software Engineering Internship'
    }
  },
  {
    id: 'junior-sarah',
    name: 'Sarah Jenkins',
    rawText: `Sarah Jenkins
Austin, TX | 555-0199 | sarahj@email.com | linkedin.com/in/sarahjenkins | github.com/sarahj-dev

SUMMARY
Motivated Junior Full Stack Developer with 1.5 years of experience building web applications. Strong background in JavaScript ecosystem and relational databases.

TECHNICAL SKILLS
Languages: TypeScript, JavaScript (ES6+), SQL, HTML5/CSS3
Frontend: React.js, Next.js, Tailwind CSS, Redux
Backend: Node.js, Express, PostgreSQL, Prisma ORM
Tools: Git, Docker, Jest, Postman

EXPERIENCE
Junior Web Developer | TechStart Inc. | Austin, TX
July 2024 - Present
- Developed new features for the company's main SaaS product using Next.js and TypeScript, increasing user engagement by 15%.
- Built RESTful APIs using Express and Node.js, integrated with PostgreSQL databases.
- Optimized database queries which reduced load times on the main dashboard by 20%.
- Wrote unit tests using Jest, achieving 70% code coverage on new modules.

Web Development Intern | WebSolutions Co. | Remote
Jan 2024 - June 2024
- Assisted in migrating legacy React components to functional components with hooks.
- Fixed UI bugs and ensured responsive design across mobile and desktop.
- Collaborated with senior developers on code reviews.

PROJECTS
E-Commerce Dashboard
- Built a full-stack dashboard for small businesses to track sales and inventory using React, Node.js, and SQL.
- Implemented user authentication with JWT.`,
    metadata: {
      targetRole: 'fullstack',
      experienceTier: 'junior',
      careerPurpose: 'Seeking a mid-level full stack developer position'
    }
  },
  {
    id: 'senior-marcus',
    name: 'Marcus Vance',
    rawText: `Marcus Vance
Seattle, WA | marcus.vance@email.com | linkedin.com/in/marcusvance

PROFILE
Senior Backend Engineer with 7+ years of experience designing scalable distributed systems and cloud infrastructure. Proven track record of improving system performance, leading engineering teams, and migrating monolithic applications to microservices.

SKILLS
Languages: Go, Python, Java, SQL, Bash
Cloud & DevOps: AWS (EKS, EC2, S3, RDS), Kubernetes, Docker, Terraform, CI/CD (GitHub Actions)
Databases: PostgreSQL, Redis, MongoDB, DynamoDB
Architecture: Microservices, Event-Driven Architecture, gRPC, REST APIs

EXPERIENCE
Senior Backend Engineer | CloudScale Systems | Seattle, WA
March 2021 - Present
- Spearheaded the migration of a legacy monolithic Java application to Go microservices deployed on Kubernetes (Amazon EKS).
- Reduced average API response time by 40% and infrastructure costs by 25% through efficient resource scaling and optimizing database queries.
- Mentored a team of 4 junior and mid-level engineers, establishing coding standards and CI/CD best practices using Terraform and GitHub Actions.
- Designed and implemented a real-time event processing pipeline using Kafka that handles 5M+ events per day.

Backend Engineer | DataStream Tech | San Francisco, CA
June 2018 - Feb 2021
- Developed RESTful APIs in Python (FastAPI) to serve data to frontend applications.
- Optimized PostgreSQL database schemas and queries, decreasing reporting query latency by 60%.
- Managed deployment pipelines and implemented automated testing, increasing release frequency from bi-weekly to daily.

EDUCATION
M.S. Computer Science | University of Washington
B.S. Computer Science | Oregon State University`,
    metadata: {
      targetRole: 'backend',
      experienceTier: 'senior',
      careerPurpose: 'Looking to transition to a Staff Engineer or Lead Backend role'
    }
  }
];

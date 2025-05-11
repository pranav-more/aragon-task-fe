export const initialBoards = [
  {
    id: "board-1",
    name: "Platform Launch",
    columns: [
      {
        id: "column-1",
        name: "TODO",
        tasks: [
          {
            id: "task-1",
            title: "Build UI for onboarding flow",
            description:
              "Create all necessary UI components for the onboarding process",
            subtasks: [
              {
                id: "subtask-1",
                title: "Design welcome screen",
                isCompleted: true,
              },
              {
                id: "subtask-2",
                title: "Design user input form",
                isCompleted: false,
              },
              {
                id: "subtask-3",
                title: "Create progress indicator",
                isCompleted: false,
              },
            ],
          },
          {
            id: "task-2",
            title: "Build UI for search",
            description: "Create UI for the main search functionality",
            subtasks: [
              {
                id: "subtask-4",
                title: "Design search input",
                isCompleted: false,
              },
            ],
          },
          {
            id: "task-3",
            title: "Build settings UI",
            description: "Implement the settings page user interface",
            subtasks: [
              {
                id: "subtask-5",
                title: "Design settings page layout",
                isCompleted: false,
              },
              {
                id: "subtask-6",
                title: "Implement theme settings",
                isCompleted: false,
              },
            ],
          },
          {
            id: "task-4",
            title: "QA and test all major user journeys",
            description: "Test all core user flows and identify any issues",
            subtasks: [
              {
                id: "subtask-7",
                title: "Test onboarding flow",
                isCompleted: false,
              },
              {
                id: "subtask-8",
                title: "Test search functionality",
                isCompleted: false,
              },
            ],
          },
        ],
      },
      {
        id: "column-2",
        name: "DOING",
        tasks: [
          {
            id: "task-5",
            title: "Design settings and search pages",
            description: "Create the designs for the settings and search pages",
            subtasks: [
              {
                id: "subtask-9",
                title: "Settings page wireframe",
                isCompleted: true,
              },
              {
                id: "subtask-10",
                title: "Search page wireframe",
                isCompleted: true,
              },
              {
                id: "subtask-11",
                title: "Finalize design with team",
                isCompleted: false,
              },
            ],
          },
          {
            id: "task-6",
            title: "Add account management endpoints",
            description: "Create backend endpoints for account management",
            subtasks: [
              {
                id: "subtask-12",
                title: "Define API schema",
                isCompleted: true,
              },
              {
                id: "subtask-13",
                title: "Implement user creation endpoint",
                isCompleted: false,
              },
              {
                id: "subtask-14",
                title: "Implement user update endpoint",
                isCompleted: false,
              },
            ],
          },
          {
            id: "task-7",
            title: "Design onboarding flow",
            description: "Create the design for the onboarding process",
            subtasks: [
              {
                id: "subtask-15",
                title: "Sketch onboarding screens",
                isCompleted: true,
              },
              {
                id: "subtask-16",
                title: "Review with team",
                isCompleted: true,
              },
              {
                id: "subtask-17",
                title: "Finalize designs",
                isCompleted: false,
              },
            ],
          },
          {
            id: "task-8",
            title: "Add search endpoints",
            description: "Create backend endpoints for search functionality",
            subtasks: [
              {
                id: "subtask-18",
                title: "Define search API schema",
                isCompleted: true,
              },
              {
                id: "subtask-19",
                title: "Implement search endpoint",
                isCompleted: false,
              },
            ],
          },
          {
            id: "task-9",
            title: "Add authentication endpoints",
            description:
              "Implement authentication functionality in the backend",
            subtasks: [
              {
                id: "subtask-20",
                title: "Define auth API schema",
                isCompleted: true,
              },
              {
                id: "subtask-21",
                title: "Implement login endpoint",
                isCompleted: false,
              },
            ],
          },
          {
            id: "task-10",
            title:
              "Research pricing points of various competitors and trial different business models",
            description:
              "Look at different pricing models and business approaches",
            subtasks: [
              {
                id: "subtask-22",
                title: "Research competitor pricing",
                isCompleted: true,
              },
              {
                id: "subtask-23",
                title: "Research subscription models",
                isCompleted: true,
              },
              {
                id: "subtask-24",
                title: "Draft pricing strategy",
                isCompleted: false,
              },
            ],
          },
        ],
      },
      {
        id: "column-3",
        name: "DONE",
        tasks: [
          {
            id: "task-11",
            title: "Conduct 5 wireframe tests",
            description: "Test wireframes with 5 potential users",
            subtasks: [
              {
                id: "subtask-25",
                title: "Prepare test materials",
                isCompleted: true,
              },
            ],
          },
          {
            id: "task-12",
            title: "Create wireframe prototype",
            description: "Create a basic wireframe prototype for testing",
            subtasks: [
              {
                id: "subtask-26",
                title: "Draft wireframes",
                isCompleted: true,
              },
            ],
          },
          {
            id: "task-13",
            title: "Review results of usability tests and iterate",
            description: "Analyze test results and make necessary improvements",
            subtasks: [
              {
                id: "subtask-27",
                title: "Compile test results",
                isCompleted: true,
              },
              {
                id: "subtask-28",
                title: "Identify improvement areas",
                isCompleted: true,
              },
              {
                id: "subtask-29",
                title: "Make design adjustments",
                isCompleted: true,
              },
            ],
          },
          {
            id: "task-14",
            title:
              "Create paper prototypes and conduct 10 usability tests with potential customers",
            description: "Test paper prototypes with 10 potential users",
            subtasks: [
              {
                id: "subtask-30",
                title: "Create paper prototypes",
                isCompleted: true,
              },
              { id: "subtask-31", title: "Conduct tests", isCompleted: true },
            ],
          },
          {
            id: "task-15",
            title: "Market discovery",
            description: "Research the market for potential opportunities",
            subtasks: [
              {
                id: "subtask-32",
                title: "Industry analysis",
                isCompleted: true,
              },
            ],
          },
          {
            id: "task-16",
            title: "Competitor analysis",
            description: "Analyze main competitors in the market",
            subtasks: [
              {
                id: "subtask-33",
                title: "Identify main competitors",
                isCompleted: true,
              },
              {
                id: "subtask-34",
                title: "Analyze strengths and weaknesses",
                isCompleted: true,
              },
            ],
          },
          {
            id: "task-17",
            title: "Research the market",
            description: "Conduct market research to inform product decisions",
            subtasks: [
              {
                id: "subtask-35",
                title: "Define research questions",
                isCompleted: true,
              },
              {
                id: "subtask-36",
                title: "Collect market data",
                isCompleted: true,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "board-2",
    name: "Marketing Plan",
    columns: [
      {
        id: "column-4",
        name: "TODO",
        tasks: [
          {
            id: "task-18",
            title: "Create social media strategy",
            description: "Develop a comprehensive social media plan",
            subtasks: [
              {
                id: "subtask-37",
                title: "Platform selection",
                isCompleted: false,
              },
              {
                id: "subtask-38",
                title: "Content calendar",
                isCompleted: false,
              },
            ],
          },
        ],
      },
      {
        id: "column-5",
        name: "DOING",
        tasks: [
          {
            id: "task-19",
            title: "Design email templates",
            description: "Create responsive email templates for campaigns",
            subtasks: [
              {
                id: "subtask-39",
                title: "Newsletter template",
                isCompleted: true,
              },
              { id: "subtask-40", title: "Welcome email", isCompleted: false },
            ],
          },
        ],
      },
      {
        id: "column-6",
        name: "DONE",
        tasks: [
          {
            id: "task-20",
            title: "Competitor SEO analysis",
            description: "Analyze SEO strategies of main competitors",
            subtasks: [
              {
                id: "subtask-41",
                title: "Keyword research",
                isCompleted: true,
              },
              {
                id: "subtask-42",
                title: "Backlink analysis",
                isCompleted: true,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "board-3",
    name: "Roadmap",
    columns: [
      {
        id: "column-7",
        name: "TODO",
        tasks: [
          {
            id: "task-21",
            title: "Plan Q3 features",
            description: "Define features for Q3 development",
            subtasks: [
              {
                id: "subtask-43",
                title: "Feature prioritization",
                isCompleted: false,
              },
              {
                id: "subtask-44",
                title: "Resource allocation",
                isCompleted: false,
              },
            ],
          },
        ],
      },
      {
        id: "column-8",
        name: "DOING",
        tasks: [
          {
            id: "task-22",
            title: "Q2 feature development",
            description: "Implement features planned for Q2",
            subtasks: [
              {
                id: "subtask-45",
                title: "Feature 1 development",
                isCompleted: true,
              },
              {
                id: "subtask-46",
                title: "Feature 2 development",
                isCompleted: false,
              },
            ],
          },
        ],
      },
      {
        id: "column-9",
        name: "DONE",
        tasks: [
          {
            id: "task-23",
            title: "Q1 retrospective",
            description: "Review Q1 achievements and challenges",
            subtasks: [
              { id: "subtask-47", title: "Data collection", isCompleted: true },
              { id: "subtask-48", title: "Team feedback", isCompleted: true },
            ],
          },
        ],
      },
    ],
  },
];

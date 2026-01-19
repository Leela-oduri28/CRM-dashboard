Mini CRM Dashboard – Lead Management

A mini CRM dashboard built as a take-home assignment to demonstrate core CRM workflows, frontend architecture, and state management using a modern React stack.


-----------------------------------------------------
Tech Stack

The project strictly follows the required tech stack:
React 19+
Vite
TypeScript
Tailwind CSS
TanStack Router (navigation)
TanStack Table (data table)
shadcn/ui (UI components)
No alternative routers or table libraries are used.

-------------------------------------------------------

Application Pages

Dashboard (Fully implemented)
Leads / Customers (Mock page)
Reports (Mock page)
Navigation is implemented using TanStack Router.

-------------------------------------------------------

Dashboard Features

KPI Summary Cards
Total Leads
New Leads
Qualified Leads
Lost Leads
Values are derived directly from lead data (no duplicated state).

-------------------------------------------------------

Lead List Table (Core Feature)

Implemented using TanStack Table.
Columns
Lead Name
Email
Phone
Status
Assigned Agent
Created Date

-------------------------------------------------------

Features

Client-side pagination
Sorting by Created Date
Filtering by Status (mandatory)
Responsive layout
Loading & empty states
Lead Details Drawer
Opens on table row click
Displays lead details
Status can be updated via dropdown
Mocked activity timeline
Drawer close preserves filters, sorting, and pagination

Create New Lead (Modal)
Accessible from Dashboard

Form validation:
Required fields
Valid email format
Duplicate email prevention

On success:
Lead added instantly
KPI cards update automatically
No page refresh
Optimistic UI (Status Update)
Status updates immediately in the UI
API delay simulated using setTimeout
Random API failure simulated

On failure:
UI rolls back to previous state
Error message shown
This demonstrates real-world optimistic update handling.

-------------------------------------------------------

State Management & Architecture

Centralized state handled via a custom useLeads hook

Clean separation of concerns:
UI components
State logic
Mock service layer
No derived data stored in state
Memoization used where necessary to prevent unnecessary re-renders

Mock API Layer

All data interactions are handled via a mock service layer:
fetchLeads
createLead
updateLeadStatus

Features:
In-memory data storage
Simulated network delays
Simulated API failures
Predictable, testable behavior

-------------------------------------------------------

Folder Structure (Simplified)
src/
├── components/
│   └── ui/            # shadcn/ui components
├── pages/
│   ├── dashboard/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── DashboardPage.tsx
│   ├── leads/         # mock page
│   └── reports/       # mock page
├── services/
│   └── leads.ts       # mock API
├── types/
│   └── lead.ts
└── main.tsx

 Setup Instructions
# Install dependencies
npm install

# Run development server
npm run dev

-------------------------------------------------------

Testing the App

Use status filter to test table filtering

Click Created Date column to test sorting

Navigate pagination with large mock data

Create new leads to test validation & KPI updates

Update lead status to observe optimistic UI behavior


-------------------------------------------------------

Assumptions Made

Client-side pagination is acceptable
Mock APIs simulate real backend behavior
Authentication and role-based access are out of scope
Visual design prioritizes usability over pixel-perfect UI

-------------------------------------------------------

Improvements With More Time

Search by lead name or email
Server-side pagination & sorting
Toast notifications for user feedback
Charts for KPI visualization
Unit tests for hooks and components

-------------------------------------------------------

Final Notes

Functionality and clean logic were prioritized over visual perfection
The project is designed as an internal CRM dashboard used daily by teams
Code focuses on clarity, maintainability, and predictable behavior
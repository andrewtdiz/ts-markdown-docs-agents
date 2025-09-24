---
title: Create Your First File
description: Build a complete TS Markdown application from scratch
date: 2024-01-15
author: TS Markdown Team
tags: [tutorial, first-file, complete-example]
---

Let's build a complete TS Markdown application that demonstrates all the core features: dynamic content, conditional rendering, components, and real-time updates.

## Project Setup

```shell
mkdir my-tsm-dashboard
cd my-tsm-dashboard
bun init -y
bun add tsm
```

## Sample Data

Create `src/data/sample-data.ts`:

```typescript
export interface User {
  id: string
  name: string
  email: string
  avatar: string
  isOnline: boolean
  lastSeen: string
  preferences: {
    theme: 'light' | 'dark'
    language: string
    notifications: boolean
  }
}

export interface Todo {
  id: string
  text: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  dueDate?: string
}

export interface DashboardData {
  user: User
  todos: Todo[]
  stats: {
    completedTodos: number
    totalTodos: number
    completionRate: number
  }
  weather: {
    temperature: number
    condition: string
    location: string
  }
}

export const sampleData: DashboardData = {
  user: {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    isOnline: true,
    lastSeen: new Date().toISOString(),
    preferences: {
      theme: 'dark',
      language: 'en',
      notifications: true
    }
  },
  todos: [
    {
      id: '1',
      text: 'Learn TS Markdown',
      completed: true,
      priority: 'high',
      dueDate: '2024-01-20'
    },
    {
      id: '2',
      text: 'Build a dashboard',
      completed: false,
      priority: 'medium',
      dueDate: '2024-01-25'
    },
    {
      id: '3',
      text: 'Write documentation',
      completed: false,
      priority: 'low'
    }
  ],
  stats: {
    completedTodos: 1,
    totalTodos: 3,
    completionRate: 33.3
  },
  weather: {
    temperature: 22,
    condition: 'Sunny',
    location: 'San Francisco'
  }
}
```

## Dashboard Template

Create `src/templates/dashboard.tsm`:

```typescript
import { TSMParser, compileTSM, executeTSMTemplate } from 'tsm'

// Weather Card Component
function WeatherCard({ weather }: { weather: { temperature: number; condition: string; location: string } }) {
  return (
    <div style="padding: 16px; background: #e3f2fd; border-radius: 8px; border: 1px solid #bbdefb;">
      ## 🌤️ Weather

      **{{ weather.location }}**
      {{ weather.temperature }}°C - {{ weather.condition }}
    </div>
  )
}

// Stats Card Component
function StatsCard({ stats }: { stats: { completedTodos: number; totalTodos: number; completionRate: number } }) {
  return (
    <div style="padding: 16px; background: #f3e5f5; border-radius: 8px; border: 1px solid #ce93d8;">
      ## 📊 Progress

      {{ stats.completedTodos }} of {{ stats.totalTodos }} todos completed
      **Completion rate:** {{ stats.completionRate.toFixed(1) }}%
    </div>
  )
}

// Todo Item Component
function TodoItem({ todo, onToggle }: { todo: Todo; onToggle: (id: string) => void }) {
  return (
    <div style="display: flex; align-items: center; padding: 8px; border: 1px solid #ddd; border-radius: 4px; margin: 4px 0; background: {{ todo.completed ? '#f0f8f0' : '#fff' }};">
      <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} style="margin-right: 12px;" />
      <span style="flex: 1; text-decoration: {{ todo.completed ? 'line-through' : 'none' }};">
        {{ todo.text }}
      </span>
      <span style="font-size: 12px; color: {{ todo.priority === 'high' ? '#ff4444' : todo.priority === 'medium' ? '#ffaa00' : '#44ff44' }};">
        {{ todo.priority.toUpperCase() }}
      </span>
    </div>
  )
}

// Todo List Component
function TodoList({ todos, onToggleTodo }: { todos: Todo[]; onToggleTodo: (id: string) => void }) {
  return (
    <div>
      ## Your Todos

      {{ todos.map(todo => (
        <@TodoItem todo={todo} onToggle={onToggleTodo} />
      )) }}
    </div>
  )
}

// Main Dashboard Function
function createDashboard(data: DashboardData) {
  return (
    # Welcome {{ data.user.isOnline ? 'back' : 'aboard' }}, {{ data.user.name }}! 👋

    ## Today's Overview

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
      <@WeatherCard weather={data.weather} />
      <@StatsCard stats={data.stats} />
    </div>

    ## Your Profile

    <div style="border: 1px solid #ddd; padding: 16px; border-radius: 8px; margin: 10px 0;">
      **Name:** {{ data.user.name }}
      **Email:** {{ data.user.email }}
      **Status:** {{ data.user.isOnline ? '🟢 Online' : '🔴 Offline' }}
      **Theme:** {{ data.user.preferences.theme }}
    </div>

    ## Quick Actions

    <div style="display: flex; gap: 12px; margin: 20px 0;">
      <button
        style="padding: 8px 16px; background: #2196F3; color: white; border: none; border-radius: 4px; cursor: pointer;"
        onClick={() => alert('Hello {{ data.user.name }}!')}
      >
        Say Hello
      </button>

      <button
        style="padding: 8px 16px; background: {{ data.user.preferences.theme === 'dark' ? '#FFC107' : '#424242' }}; color: white; border: none; border-radius: 4px; cursor: pointer;"
        onClick={() => console.log('Theme toggled!')}
      >
        Toggle Theme
      </button>
    </div>

    <@TodoList todos={data.todos} onToggleTodo={(id) => console.log('Toggle todo:', id)} />

    ## Recent Activity

    {{ data.user.isOnline ? (
      <div style="padding: 16px; background: #e8f5e8; border-radius: 8px; border: 1px solid #4caf50;">
        ✅ You're currently online and active
        **Last seen:** {{ new Date(data.user.lastSeen).toLocaleString() }}
      </div>
    ) : (
      <div style="padding: 16px; background: #fff3e0; border-radius: 8px; border: 1px solid #ff9800;">
        ⏰ You were last online at {{ new Date(data.user.lastSeen).toLocaleString() }}
      </div>
    ) }}

    ## Settings

    <div style="padding: 16px; background: #f5f5f5; border-radius: 8px; margin-top: 20px;">
      ### Preferences

      - **Theme:** {{ data.user.preferences.theme }}
      - **Language:** {{ data.user.preferences.language }}
      - **Notifications:** {{ data.user.preferences.notifications ? 'Enabled' : 'Disabled' }}
    </div>
  )
}

// Compile the template
const parser = new TSMParser()
const compiledDashboard = compileTSM(parser.parse(createDashboard.toString()))
```

## Main Application

Create `src/index.ts`:

```typescript
import { executeTSMTemplate } from 'tsm'
import { sampleData, DashboardData } from './data/sample-data'
import { compiledDashboard } from './templates/dashboard'

function main() {
  console.log('=== TSM Dashboard Demo ===\n')

  // Render initial dashboard
  const initialResult = executeTSMTemplate(compiledDashboard, sampleData)
  console.log(initialResult)

  console.log('\n=== Updated Data Demo ===\n')

  // Demonstrate dynamic updates
  const updatedData: DashboardData = {
    ...sampleData,
    todos: sampleData.todos.map(todo =>
      todo.id === '2' ? { ...todo, completed: true } : todo
    ),
    stats: {
      completedTodos: 2,
      totalTodos: 3,
      completionRate: 66.7
    }
  }

  const updatedResult = executeTSMTemplate(compiledDashboard, updatedData)
  console.log(updatedResult)
}

main()
```

## HTML Output

Create `index.html`:

```html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TS Markdown Dashboard</title>
    <style>
        body {
            font-family: system-ui, -apple-system, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        /* Add some basic styling for buttons and interactive elements */
        button {
            cursor: pointer;
        }
        input[type="checkbox"] {
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div id="dashboard"></div>
    <script type="module" src="./src/index.ts"></script>
</body>
</html>
```

## Run Your Application

```shell
bun run index.ts
```

You'll see output like:

```
=== TSM Dashboard Demo ===

# Welcome back, Sarah Johnson! 👋

## Today's Overview

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
  <div style="padding: 16px; background: #e3f2fd; border-radius: 8px; border: 1px solid #bbdefb;">
    ## 🌤️ Weather

    **San Francisco**
    22°C - Sunny
  </div>
  <div style="padding: 16px; background: #f3e5f5; border-radius: 8px; border: 1px solid #ce93d8;">
    ## 📊 Progress

    1 of 3 todos completed
    **Completion rate:** 33.3%
  </div>
</div>

... (more content)
```

🎉 **Congratulations!** You've built a complete TS Markdown application!

## What You've Built

Your dashboard includes:

✅ **Dynamic Content**: User name, weather, and stats update based on data
✅ **Interactive Components**: Clickable buttons and todo checkboxes
✅ **Conditional Rendering**: Different content based on user status
✅ **Real-time Updates**: Todo completion updates the stats
✅ **Component Reusability**: Modular, maintainable components
✅ **Type Safety**: Full TypeScript integration

## Key Features Demonstrated

### 1. **Markdown Blocks**
```typescript
function createDashboard(data: DashboardData) {
  return (
    # Welcome {{ data.user.name }}!

    Regular markdown content here...
  )
}
```

### 2. **Dynamic Interpolation**
```typescript
**Name:** {{ data.user.name }}
**Status:** {{ data.user.isOnline ? '🟢 Online' : '🔴 Offline' }}
**Completion rate:** {{ data.stats.completionRate.toFixed(1) }}%
```

### 3. **Conditional Rendering**
```typescript
{{ data.user.isOnline ? (
  <div>Online content</div>
) : (
  <div>Offline content</div>
)}}
```

### 4. **Component Usage**
```typescript
<@WeatherCard weather={data.weather} />
<@TodoList todos={data.todos} onToggleTodo={handleToggle} />
```

### 5. **Dynamic Styling**
```typescript
<div style="background: {{ data.user.isOnline ? '#e8f5e8' : '#fff3e0' }};">
```

## Next Steps

Now that you have a working application, try these enhancements:

1. **Add More Components**: Create charts, calendars, or forms
2. **Data Persistence**: Save todos to localStorage or an API
3. **Real-time Updates**: Add WebSocket integration for live data
4. **Theming**: Implement a full theme system
5. **Responsive Design**: Make it work on mobile devices

## Advanced Patterns

### Data Fetching
```typescript
async function generateReport(userId: string) {
  const user = await fetchUser(userId)
  const todos = await fetchTodos(userId)

  return (
    # Report for {{ user.name }}

    <@TodoList todos={todos} onToggleTodo={handleToggle} />
  )
}
```

### Error Handling
```typescript
function safeTemplate(data: DashboardData | null) {
  return (
    {{ data ? (
      {{ createDashboard(data) }}
    ) : (
      # Error
      Unable to load dashboard data.
    ) }}
  )
}
```

### Performance Optimization
```typescript
// Compile once, use many times
const compiledDashboard = compileTSM(parser.parse(createDashboard.toString()))

function renderDashboard(data: DashboardData) {
  return executeTSMTemplate(compiledDashboard, data)
}
```

**Complete Application Built!** You now have a fully functional TS Markdown dashboard with dynamic content, interactivity, and real-time updates.

Ready to explore more features? Check out the [Syntax Guide](syntax-guide) to learn about advanced TS Markdown capabilities!

---
title: Quick Start Guide
description: Get up and running with TS Markdown in just a few minutes
date: 2024-01-15
author: TS Markdown Team
tags: [quick-start, tutorial, getting-started]
---

Get started with TS Markdown in 3 simple steps.

## Step 1: Create Your First TSM File

Create a file called `hello.tsmd`:

```tsmd
import { List } from './List';

export function HelloWorld({features}: Props) {
  const greeting = "Hello";

  return (
    ## {{ greeting }} from TS Markdown!

    Render components with:
    <@List items={features} />
  )
}
```

## Step 2: Transpile Your Code

Run the TSMD transpiler:

```shell
bun run tsmd hello.tsmd
```

## Step 3: Use Your Generated Function

Now use it like any TypeScript function:

```typescript
import HelloWorld from './HelloWorld.ts'

const features = ["Type-safety", "Reusable components", "Fast development"]

const markdown = HelloWorld({ features })

console.log(markdown)
```

Output:
```markdown
## Hello from TS Markdown!

Render components with:
- Type-safety
- Reusable components
- Fast development
```

## Core Syntax

### Dynamic Content

```tsmd
function UserProfile(user: User) {
  return (
    # {{ user.name }}'s Profile
    **Role:** {{ user.role }}
    **Location:** {{ user.city }}, {{ user.country }}
  )
}
```

### Conditional Rendering

```tsmd
function StatusMessage(user: User) {
  return (
    {{ user.isActive ? (
      You're all set! ✅
    ) : (
      Please activate your account first.
    ) }}
  )
}
```

### Components

```tsmd
function Dashboard(data: Data) {
  return (
    <@UserProfile user={data.user} />
    <@RecentActivity items={data.activity} />
  )
}
```

## Simple Examples

### Basic Template

```tsmd
function Hello(name: string) {
  return (
    # Hello {{ name }}!
    How are you today?
  )
}
```

### With Data

```tsmd
function Report(user: User, posts: Post[]) {
  return (
    # Report for {{ user.name }}

    **Posts:** {{ posts.length }}
    **Last Active:** {{ user.lastActive }}

    {{ posts.length > 0 ? (
      ## Recent Posts:
      {{ posts.slice(0, 5).map(post => (
        - {{ post.title }} ({{ post.date }})
      )) }}
    ) : (
      No posts yet.
    ) }}
  )
}
```

### Error Handling

```tsmd
function SafeTemplate(data: Data | null) {
  return (
    {{ data ? (
      # Welcome {{ data.user.name }}!
      Content based on data...
    ) : (
      # Error
      Unable to load user data. Please try again.
    ) }}
  )
}
```

## Next Steps

1. **[Syntax Guide](syntax-guide)** - Learn all TSMD features
2. **[Components](components)** - Create reusable components
3. **[Best Practices](best-practices)** - Write clean TSM code

**Quick Start Complete!** You can now write markdown in TypeScript functions.

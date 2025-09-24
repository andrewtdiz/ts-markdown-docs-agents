---
title: Components
description: Create reusable components in TS Markdown with <@ComponentName /> syntax
date: 2024-01-15
author: TS Markdown Team
tags: [syntax, components, reusability, modularity]
---

TS Markdown components let you create **reusable pieces of content** using the `<@ComponentName />` syntax. This keeps your code DRY (Don't Repeat Yourself) and makes complex layouts maintainable.

## Basic Component Usage

Define a component function and use it in your markdown:

```typescript
// Define a component
function UserCard({ user }: { user: User }) {
  return (
    **Name:** {{ user.name }}
    **Email:** {{ user.email }}
    **Status:** {{ user.isActive ? '✅ Active' : '⏸️ Inactive' }}
  )
}

// Use the component
function userList(users: User[]) {
  return (
    # Our Users

    {{ users.map(user => (
      <@UserCard user={user} />
    )) }}
  )
}
```

## Component Props

Pass data to components using props:

```tsmd
function StatusBadge({ status, type }: { status: string; type?: 'success' | 'warning' | 'error' }) {

  return (
    {{ type === "success" && "Great job!" }}
    {{ type === "warning" && "Uh oh" }}
    {{ type === "error" && (
        Oops!
        We made an error
    ) }}
    Status: {{ status }}
  )
}

function Dashboard({ info }: { info: DashboardInfo }) {
  return (
    # Dashboard

    **Server Status:** <@StatusBadge status={info.serverStatus} type={info.ok ? 'success' : 'error'} />
  )
}
```

## Component Children

Components can accept child content:

```tsmd
function Card({ title, children }: { title: string; children: any }) {
  return (
      ## {{ title }}
      {{ children }}
  )
}

function layout() {
  return (
    # My Layout

    <@Card title="Getting Started">
      Welcome to our platform! Here's how to get started:
      - Step 1: Create account
      - Step 2: Set preferences
      - Step 3: Start using
    </@Card>

    <@Card title="Pro Tips">
      Here are some advanced tips to improve your workflow.
    </@Card>
  )
}
```

## Best Practices

### Use Descriptive Names

```tsmd
// Good - clear purpose
function ProductCard({ product }: { product: Product }) {
  return (
    **{{ product.name }}** - ${{ product.price }}
    Description: {{ product.description }}
  )
}
```

### Handle Optional Props

```tsmd
function OptionalCard({ title, subtitle, children }: {
  title: string;
  subtitle?: string;
  children: any
}) {
  return (
    ## {{ title }}

    {{ subtitle && (
    **{{ subtitle }}**
    ) }}

    {{ children }}
  )
}
```

## Advanced Examples

### Nested Components

```tsmd
function Header({ user }: { user: User }) {
  return (
    # Welcome {{ user.name }}!

    <@UserMenu user={user} />
  )
}

function UserMenu({ user }: { user: User }) {
  return (
    <@UserAvatar user={user} />
    <@UserDropdown user={user} />
  )
}

function PageLayout({ user, content }: { user: User, content: string }) {
  return (
    <@Header user={user} />

    {{ content }}
  )
}
```

### Dynamic Component Lists

```tsmd
function FeatureList({ features }: { features: Feature[] }) {
  return (
    ## Features

    {{ features.map(feature => (
      <@FeatureCard feature={feature} />
    )) }}
  )
}

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div style="border: 1px solid #ddd; padding: 16px; margin: 10px 0;">
      ### {{ feature.title }}

      {{ feature.description }}

      {{ feature.isNew && (
        New!
      ) }}
    </div>
  )
}
```

## Performance Considerations


### Conditional Components

```tsmd
function optionalComponents({ user }: { user: User }) {
  return (
    # Dashboard

    <@Header user={user} />

    {{ user.isAdmin && (
      <@AdminPanel user={user} />
    ) }}

    <@UserProfile user={user} />

    {{ user.hasNotifications && (
      <@NotificationCenter user={user} />
    ) }}
  )
}
```

## Common Patterns

### Data Display Components

```tsmd
function DataTable({ data, columns }: { data: any[]; columns: string[] }) {
  return (
    | {{ columns.join(' | ') }} |
    | {{ columns.map(() => '---').join(' | ') }} |
    {{ data.map(row => (
      | {{ columns.map(col => row[col] || '').join(' | ') }} |
    )) }}
  )
}

function report(data: ReportData) {
  return (
    # Sales Report

    <@DataTable
      data={data.sales}
      columns={['Product', 'Units', 'Revenue', 'Date']}
    />
  )
}
```


### Component Fallbacks

```typescript
function withFallbacks(data: Data) {
  return (
    # Report

    {{ data.items?.length > 0 ? (
      <@DataTable data={data.items} />
    ) : (
      <@EmptyState message="No data available" />
    ) }}
  )
}
```

## Next Steps

Now that you understand components, explore:

1. **[Best Practices](best-practices)** - Optimize your TSM code
2. **[Syntax Guide](syntax-guide)** - Complete reference
3. **[Dynamic Content](dynamic-content)** - Advanced variable usage

**Pro Tip**: Use components to break down complex layouts into manageable, reusable pieces. This makes your code easier to maintain and your content more consistent.

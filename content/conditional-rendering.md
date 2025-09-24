---
title: Conditional Rendering
description: Show or hide content based on conditions in TS Markdown
date: 2024-01-15
author: TS Markdown Team
tags: [syntax, conditional-rendering, logic, control-flow]
---

TS Markdown's conditional rendering lets you **show or hide content** based on data conditions. Use familiar JavaScript syntax like ternary operators (`? :`) and logical operators (`&&`, `||`) to control what content appears.

## Basic Conditional Rendering

The most common pattern is the **ternary operator**:

```typescript
function statusMessage(user: User) {
  return (
    # Welcome {{ user.name }}!

    {{ user.isActive ? (
      You're all set! ✅ Ready to continue.
    ) : (
      Please activate your account to get started.
    ) }}
  )
}
```

## Ternary Operator (`? :`)

Use `condition ? trueContent : falseContent` to choose between two options:

```typescript
function userProfile(user: User) {
  return (
    # {{ user.name }}'s Profile

    **Account Type:** {{ user.isPremium ? 'Premium' : 'Free' }}
    **Status:** {{ user.isActive ? 'Active' : 'Inactive' }}

    {{ user.isPremium ? (
      ## Premium Features
      - Advanced analytics
      - Priority support
      - Unlimited exports
    ) : (
      ## Free Features
      - Basic analytics
      - Community support
      - 5 exports/month
    ) }}
  )
}
```

## Logical AND (`&&`)

Show content only when a condition is true:

```typescript
function optionalContent(user: User) {
  return (
    # Dashboard

    ## Recent Activity
    - Latest login: {{ user.lastLogin }}

    {{ user.hasNotifications && (
      ## Notifications
      - You have {{ user.notificationCount }} unread messages
      - Last notification: {{ user.lastNotification }}
    ) }}

    {{ user.isAdmin && (
      ## Admin Panel
      - Manage users
      - View reports
      - System settings
    ) }}
  )
}
```

## Logical OR (`||`)

Show content when either condition is true (less common but useful):

```typescript
function flexibleMessage(user: User) {
  return (
    # Hello {{ user.name }}!

    {{ user.isNew || user.hasUpdates ? (
      Check out what's new!
    ) : (
      Welcome back!
    ) }}
  )
}
```

## Nested Conditions

Combine multiple conditions for complex logic:

```typescript
function complexLayout(user: User, data: Data) {
  return (
    # {{ user.name }}

    {{ user.isPremium ? (
      {{ data.items.length > 10 ? (
        ## Premium Dashboard (Full)
        You have {{ data.items.length }} items
        {{ data.items.slice(0, 5).map(item => `- ${item.name}`) }}
      ) : (
        ## Premium Dashboard (Compact)
        You have {{ data.items.length }} items
      ) }}
    ) : (
      {{ data.items.length > 5 ? (
        ## Standard Dashboard (Limited)
        Showing first 5 of {{ data.items.length }} items
      ) : (
        ## Standard Dashboard
        Your items: {{ data.items.length }}
      ) }}
    ) }}
  )
}
```

## Best Practices

### Keep It Readable

```typescript
// Good - clear structure
function userStatus(user: User) {
  return (
    {{ user.isActive ? (
      ## Active User
      Welcome back! You have full access.
    ) : (
      ## Inactive User
      Your account needs activation.
    ) }}
  )
}

// Avoid - nested and hard to read
function messyStatus(user: User) {
  return ({{user.isActive?(
    ## Active User\nWelcome back! You have full access.
  ):(
    ## Inactive User\nYour account needs activation.
  )}})
}
```

### Use Meaningful Conditions

```typescript
// Good - clear what each condition represents
function featureAccess(user: User, features: Feature[]) {
  return (
    {{ user.isPremium && features.length > 0 ? (
      ## Available Features
      {{ features.map(f => `- ${f.name}`) }}
    ) : user.isPremium ? (
      ## Premium Account
      No features available yet.
    ) : (
      ## Free Account
      Upgrade to access features.
    ) }}
  )
}

// Avoid - unclear conditions
function unclearAccess(a: any, b: any) {
  return ({{a.x&&b.length?('Features:'+b.map(f=>f.name)):a.x?('No features'):('Upgrade')}})
}
```

### Handle Edge Cases

```typescript
function safeConditions(data: Data | null) {
  return (
    {{ data ? (
      {{ data.user.isActive ? (
        Welcome active user!
      ) : (
        Account inactive.
      ) }}
    ) : (
      No data available.
    ) }}
  )
}
```

## Advanced Examples

### Multiple Conditions

```typescript
function multiCondition(user: User, settings: Settings, features: Feature[]) {
  return (
    # Hello {{ user.name }}!

    {{ user.isActive && settings.theme === 'dark' ? (
      ## Dark Mode Active
      Your dark theme is enabled with {{ features.filter(f => f.enabled).length }} features.
    ) : user.isActive ? (
      ## Account Active
      Switch to dark mode for a better experience.
    ) : (
      ## Account Inactive
      Please activate your account.
    ) }}
  )
}
```

### Dynamic Lists with Conditions

```typescript
function filteredList(items: Item[], filter: Filter) {
  const filteredItems = items.filter(item => {
    if (filter.type === 'active') return item.isActive
    if (filter.type === 'completed') return item.completed
    return true
  })

  return (
    ## {{ filter.type === 'active' ? 'Active' : filter.type === 'completed' ? 'Completed' : 'All' }} Items

    {{ filteredItems.length > 0 ? (
      {{ filteredItems.map(item => (
        - **{{ item.name }}**: {{ item.description }}
          {{ filter.showDetails && (
            ({{ item.details }})
          ) }}
      )) }}
    ) : (
      No items match your filter.
    ) }}
  )
}
```


## Performance Tips

### Avoid Expensive Calculations in Conditions

```typescript
// Good - calculate once, use multiple times
function report(data: Data) {
  const hasData = data && data.items.length > 0
  const isComplete = hasData && data.items.every(item => item.completed)

  return (
    # Report Status

    {{ hasData ? (
      {{ isComplete ? (
        🎉 All items completed!
      ) : (
        📊 Progress: {{ data.items.filter(i => i.completed).length }}/{{ data.items.length }}
      ) }}
    ) : (
      No data available.
    ) }}
  )
}

// Avoid - calculating the same thing multiple times
function badReport(data: Data) {
  return (
    {{ data && data.items.length > 0 ? (
      {{ data.items.every(item => item.completed) ? (
        🎉 All items completed!
      ) : (
        📊 Progress: {{ data.items.filter(i => i.completed).length }}/{{ data.items.length }}
      ) }}
    ) : (
      No data available.
    ) }}
  )
}
```

### Handle Async Operations

```typescript
// Good - handle loading, error, and success states
function asyncUserProfile(userId: string) {
  const userData = fetchUserData(userId) // Assume this returns { loading: boolean, error: string | null, user: User | null }

  return (
    # User Profile

    {{ userData.loading ? (
      ⏳ Loading user data...
    ) : userData.error ? (
      ❌ Error: {{ userData.error }}
    ) : userData.user ? (
      ## Welcome {{ userData.user.name }}!
      - Email: {{ userData.user.email }}
      - Status: {{ userData.user.isActive ? 'Active' : 'Inactive' }}
    ) : (
      User not found.
    ) }}
  )
}

// Alternative - using direct async/await pattern
function asyncContent(dataPromise: Promise<Data>) {
  // In real usage, you'd handle the promise resolution
  // This is a conceptual example
  return (
    # Async Content

    {{ /* Handle different states based on promise status */ }}
    {{ dataPromise.status === 'pending' ? (
      ⏳ Loading...
    ) : dataPromise.status === 'fulfilled' ? (
      ✅ Data loaded: {{ dataPromise.value.title }}
    ) : (
      ❌ Error loading data
    ) }}
  )
}
```

### Use Early Returns for Simple Cases

```typescript
// Good - early return for simple case
function simpleMessage(user: User | null) {
  if (!user) {
    return (# User not found)
  }

  return (
    # Welcome {{ user.name }}!

    {{ user.isActive ? (
      You're active!
    ) : (
      Please activate.
    ) }}
  )
}

// Avoid - nested conditions for simple cases
function complexMessage(user: User | null) {
  return (
    {{ user ? (
      # Welcome {{ user.name }}!

      {{ user.isActive ? (
        You're active!
      ) : (
        Please activate.
      ) }}
    ) : (
      # User not found
    ) }}
  )
}
```

## Common Patterns

### User Permissions

```typescript
function permissionBasedContent(user: User, content: Content) {
  return (
    # {{ content.title }}

    {{ content.isPublic ? (
      {{ content.description }}
    ) : user.hasAccess ? (
      {{ content.description }}
      {{ content.premiumContent }}
    ) : (
      This content requires special access.
    ) }}
  )
}
```

### Feature Flags

```typescript
function featureFlaggedUI(user: User, flags: FeatureFlags) {
  return (
    # Dashboard

    ## Core Features
    - User profile
    - Settings

    {{ flags.showAdvanced && (
      ## Advanced Features
      - Analytics
      - Reports
      - Export tools
    ) }}

    {{ flags.showBeta && (
      ## Beta Features
      - New dashboard
      - AI suggestions
      - Advanced filters
    ) }}
  )
}
```

### Data-Driven Content

```typescript
function dataDrivenReport(data: ReportData) {
  return (
    # {{ data.title }}

    {{ data.status === 'success' ? (
      ✅ Report generated successfully
    ) : data.status === 'error' ? (
      ❌ Error generating report
    ) : (
      ⏳ Generating report...
    ) }}

    {{ data.status === 'success' && (
      **Total Records:** {{ data.records.length }}
      **Processing Time:** {{ data.processingTime }}ms
    ) }}
  )
}
```

## Next Steps

Now that you understand conditional rendering, explore:

1. **[Components](components)** - Create reusable components
2. **[Best Practices](best-practices)** - Optimize your TSM code
3. **[Syntax Guide](syntax-guide)** - Complete reference

**Pro Tip**: Use conditional rendering to create personalized, dynamic content that adapts to your users' data and permissions. Start simple and add complexity as needed.

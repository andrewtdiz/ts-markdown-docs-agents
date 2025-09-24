# Component Examples

This page demonstrates TS Markdown components with practical examples that save you time by keeping everything in TypeScript.

## Basic Components

### Alert Components

```typescript
// Define alert component
function Alert({ type, title, children }: {
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  children: any;
}) {
  const colors = {
    info: '#e3f2fd',
    warning: '#fff3e0',
    error: '#ffebee',
    success: '#e8f5e8'
  }

  return (
    <div style="border-left: 4px solid {{ colors[type] }}; padding: 16px; background: {{ colors[type] }}20; margin: 16px 0;">
      ## {{ title }}

      {{ children }}
    </div>
  )
}

// Use the component
function page() {
  return (
    # Component Examples

    <@Alert type="info" title="Information">
      This is an informational alert with important details.
    </@Alert>

    <@Alert type="success" title="Success!">
      Your setup is complete and ready to use.
    </@Alert>

    <@Alert type="warning" title="Warning">
      Always backup your data before making major changes.
    </@Alert>

    <@Alert type="error" title="Error">
      Something went wrong. Please check your configuration.
    </@Alert>
  )
}
```

### Card Components

```typescript
function Card({ title, children }: { title: string; children: any }) {
  return (
    <div style="border: 1px solid #ddd; border-radius: 8px; padding: 20px; margin: 16px 0; background: white;">
      ## {{ title }}

      {{ children }}
    </div>
  )
}

function FeatureCard({ feature }: { feature: { name: string; description: string; icon: string } }) {
  return (
    <div style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 16px; margin: 12px 0;">
      ### {{ feature.icon }} {{ feature.name }}

      {{ feature.description }}
    </div>
  )
}

function layout() {
  return (
    # Features

    <@Card title="Getting Started">
      Welcome to TS Markdown! Here's how to get started:
      - Install the package
      - Create your first template
      - Start building
    </@Card>

    <@FeatureCard feature={{
      name: "Type Safety",
      description: "Built with TypeScript for better development experience",
      icon: "🔒"
    }} />

    <@FeatureCard feature={{
      name: "Dynamic Content",
      description: "Insert variables and logic directly in your markdown",
      icon: "⚡"
    }} />
  )
}
```

## Interactive Components

### Button Components

```typescript
function Button({ label, onClick, variant }: {
  label: string;
  onClick: string;
  variant?: 'primary' | 'secondary';
}) {
  const colors = {
    primary: '#007bff',
    secondary: '#6c757d'
  }

  return (
    <button
      style="background: {{ colors[variant || 'primary'] }}; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin: 4px;"
      onClick="{{ onClick }}"
    >
      {{ label }}
    </button>
  )
}

function toolbar() {
  return (
    # Actions

    <@Button label="Save" onClick="handleSave()" variant="primary" />
    <@Button label="Cancel" onClick="handleCancel()" variant="secondary" />
    <@Button label="Delete" onClick="handleDelete()" />
  )
}
```

### Form Components

```typescript
function Input({ label, type, value, onChange }: {
  label: string;
  type?: string;
  value: string;
  onChange: string;
}) {
  return (
    <div style="margin: 12px 0;">
      <label style="display: block; margin-bottom: 4px; font-weight: bold;">
        {{ label }}
      </label>
      <input
        type="{{ type || 'text' }}"
        value="{{ value }}"
        onChange="{{ onChange }}"
        style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;"
      />
    </div>
  )
}

function contactForm() {
  return (
    # Contact Form

    <@Input label="Name" value={formData.name} onChange="updateName()" />
    <@Input label="Email" type="email" value={formData.email} onChange="updateEmail()" />
    <@Input label="Message" value={formData.message} onChange="updateMessage()" />

    <div style="margin-top: 16px;">
      <@Button label="Submit" onClick="handleSubmit()" variant="primary" />
      <@Button label="Cancel" onClick="handleCancel()" variant="secondary" />
    </div>
  )
}
```

## Data Display Components

### Table Components

```typescript
function Table({ headers, rows }: { headers: string[]; rows: any[] }) {
  return (
    | {{ headers.join(' | ') }} |
    | {{ headers.map(() => '---').join(' | ') }} |
    {{ rows.map(row => (
      | {{ headers.map(header => row[header] || '').join(' | ') }} |
    )) }}
  )
}

function userTable(users: User[]) {
  return (
    # Users

    <@Table
      headers={['Name', 'Email', 'Status', 'Role']}
      rows={users.map(user => ({
        Name: user.name,
        Email: user.email,
        Status: user.isActive ? 'Active' : 'Inactive',
        Role: user.role
      }))}
    />
  )
}
```


## Component Composition

```typescript
function Header({ user }: { user: User }) {
  return (
    <div style="background: #f8f9fa; padding: 20px; border-bottom: 1px solid #ddd;">
      # Welcome {{ user.name }}!

      <div style="float: right;">
        <@UserMenu user={user} />
      </div>
    </div>
  )
}

function UserMenu({ user }: { user: User }) {
  return (
    <div style="display: flex; align-items: center; gap: 12px;">
      <@Badge variant="outline">{{ user.role }}</@Badge>
      <@Button label="Profile" onClick="showProfile()" variant="secondary" />
      <@Button label="Logout" onClick="handleLogout()" variant="primary" />
    </div>
  )
}

function pageLayout(user: User, content: any) {
  return (
    <@Header user={user} />

    <div style="padding: 20px;">
      {{ content }}
    </div>

    <div style="background: #f8f9fa; padding: 16px; text-align: center; border-top: 1px solid #ddd;">
      © {{ new Date().getFullYear() }} MyApp
    </div>
  )
}
```

## Performance Tips

### Compile Components Once

```typescript
// Good - compile once
const parser = new TSMParser()
const compiledCard = compileTSM(parser.parse(Card.toString()))

function renderCards(items: Item[]) {
  return (
    # Items

    {{ items.map(item => (
      {{ executeTSMTemplate(compiledCard, { title: item.name, children: item.description }) }}
    )) }}
  )
}

// Avoid - compiling every time
function badRenderCards(items: Item[]) {
  return (
    # Items

    {{ items.map(item => (
      <@Card title={item.name}>
        {{ item.description }}
      </@Card>
    )) }}
  )
}
```

### Lazy Loading

```typescript
function LazyComponent({ name, data }: { name: string; data: any }) {
  const component = loadComponent(name)

  return (
    <@DynamicComponent component={component} data={data} />
  )
}
```

## Summary

Components in TS Markdown let you:

- **Create reusable UI elements** with the `<@ComponentName />` syntax
- **Pass props** using standard JavaScript object syntax
- **Compose complex layouts** by nesting components
- **Handle interactivity** with event handlers
- **Maintain type safety** with TypeScript interfaces

**Pro Tip**: Start with simple components and gradually build more complex ones. This approach keeps your code maintainable and your content consistent.

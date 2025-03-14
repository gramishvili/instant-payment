# Modern Dashboard

A modern dashboard application built with Angular, following clean architecture principles, SOLID design principles, and DRY (Don't Repeat Yourself) principles.

## Features

- **Dashboard Page**: Displays key metrics, recent transactions, and quick send panel
- **Transactions Page**: Lists transactions with filtering capabilities
- **Settings Page**: Manages certificates and application settings
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

## Architecture

This project follows Clean Architecture principles, separating the application into distinct layers:

### Core Layer

The core layer contains the business logic and domain models of the application. It is independent of any external frameworks or libraries.

- **Domain Models**: Represent the business entities (Transaction, Bank, etc.)
- **Use Cases**: Implement the business logic
- **Repository Interfaces**: Define contracts for data access

### Infrastructure Layer

The infrastructure layer provides implementations for the interfaces defined in the core layer.

- **Repositories**: Implement data access logic
- **API Services**: Handle communication with external services
- **External Services**: Integrate with third-party services

### Presentation Layer

The presentation layer handles the UI and user interactions.

- **Components**: Implement the UI
- **Pages**: Represent the different pages of the application
- **Layouts**: Define the structure of the application

## SOLID Principles

- **Single Responsibility Principle**: Each class has a single responsibility
- **Open/Closed Principle**: Classes are open for extension but closed for modification
- **Liskov Substitution Principle**: Subtypes can be substituted for their base types
- **Interface Segregation Principle**: Clients should not depend on interfaces they don't use
- **Dependency Inversion Principle**: High-level modules depend on abstractions, not concrete implementations

## DRY Principles

- **Don't Repeat Yourself**: Code duplication is minimized through abstraction and reuse
- **Common Components**: Shared UI elements are extracted into reusable components
- **Utility Functions**: Common functionality is extracted into utility functions

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- Angular CLI (v19 or higher)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   ng serve
   ```
4. Open your browser and navigate to `http://localhost:4200`

### Running Tests

- Run unit tests:
  ```
  ng test
  ```
- Run end-to-end tests:
  ```
  ng e2e
  ```

## Project Structure

```
modern-dashboard/
├── src/
│   ├── app/
│   │   ├── core/                  # Core layer
│   │   │   ├── domain/            # Domain models
│   │   │   ├── interfaces/        # Repository interfaces
│   │   │   └── use-cases/         # Business logic
│   │   ├── infrastructure/        # Infrastructure layer
│   │   │   ├── api/               # API services
│   │   │   ├── repositories/      # Repository implementations
│   │   │   └── services/          # External services
│   │   ├── presentation/          # Presentation layer
│   │   │   ├── layouts/           # Layout components
│   │   │   ├── pages/             # Page components
│   │   │   └── shared/            # Shared components
│   │   ├── app.component.ts       # Root component
│   │   ├── app.routes.ts          # Application routes
│   │   └── app.config.ts          # Application configuration
│   ├── assets/                    # Static assets
│   ├── environments/              # Environment configuration
│   ├── styles.scss                # Global styles
│   └── main.ts                    # Application entry point
├── angular.json                   # Angular configuration
├── package.json                   # Dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # Project documentation
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

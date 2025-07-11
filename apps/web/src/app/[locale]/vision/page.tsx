import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Vision = () => {
  return (
    <div className="prose dark:prose-invert max-w-4xl mx-auto p-6">
      <h1>Our Vision</h1>

      <h2>Introduction</h2>
      <p>
        Shaddy is an open-source initiative dedicated to empowering frontend
        developers worldwide by providing a free, collaborative hub of
        practical, high-quality resources. Our mission is to make frontend
        development accessible and efficient for every engineer, regardless of
        experience. We're starting with a focus on React.js, Next.js, and
        TypeScript, building a foundation of reusable, type-safe tools that
        developers can rely on. Our vision is to grow into a comprehensive
        resource for the entire frontend ecosystem and, with community support,
        all of software engineering.
      </p>

      <h2>What We're Currently Building</h2>
      <p>
        Shaddy is a developer-driven platform, created by frontend engineers for
        frontend engineers. We're kicking things off with a focus on reusable
        React hooks, designed to be type-safe, well-documented, and
        production-ready. These hooks aim to simplify common tasks like state
        management, API calls, and side effects, saving you time and effort.
      </p>

      <h2>What's Coming Next</h2>
      <p>
        While we're starting with React hooks, our roadmap is ambitious. Here's
        what we plan to bring to Shaddy in the near future:
      </p>
      <ul>
        <li>
          <strong>Reusable Components</strong>: Type-safe, customizable
          components like forms (integrated with Zod for schema validation) and
          tables, allowing you to focus on design while we handle the logic.
        </li>
        <li>
          <strong>Frontend Patterns</strong>: Practical guides on React.js and
          Next.js best practices, including scalable architecture and design
          patterns.
        </li>
        <li>
          <strong>Engineering Concepts</strong>: Resources on performance
          optimization, SOLID principles, system design, and frontend best
          practices.
        </li>
        <li>
          <strong>Broader Software Engineering Topics</strong>: As we grow, we
          aim to cover SDLC, design patterns, and more, creating a holistic
          resource for developers.
        </li>
        <li>
          <strong>Community-Driven Content</strong>: A platform where anyone can
          contribute code, tutorials, or ideas to shape Shaddy's future.
        </li>
      </ul>

      <h2>Our Vision</h2>
      <p>
        Shaddy aspires to be the ultimate open-source hub for frontend
        developers, starting with React.js, Next.js, and TypeScript. We want to
        provide a one-stop shop for tools, patterns, and knowledge that make
        building modern web applications easier and more efficient. As our
        community grows, we envision expanding beyond frontend to become a
        comprehensive resource for all software engineering disciplines.
      </p>
      <p>
        We believe in the power of open-source collaboration. Shaddy is a
        community effort - every hook, bug fix, or idea you contribute helps us
        get closer to our goal of making frontend development accessible to all.
      </p>

      <h2>How You Can Help</h2>
      <p>
        Shaddy is just getting started, and we need your support to make it
        great. Here's how you can contribute:
      </p>
      <ul>
        <li>
          <strong>Contribute Code</strong>: Share your solution, fix bugs, or
          improve our existing codebase.
        </li>
        <li>
          <strong>Share Ideas</strong>: Suggest any frontend ideas or topics
          you'd like us to cover.
        </li>
        <li>
          <strong>Provide Feedback</strong>: Point out issues, suggest
          improvements, or share insights to help us refine Shaddy.
        </li>
        <li>
          <strong>Spread the Word</strong>: Tell other developers about Shaddy
          to grow our community.
        </li>
        <li>
          <strong>Support Us</strong>: If you're able, consider{' '}
          <span className="underline inline-flex items-center">
            <Link
              href="https://coff.ee/rijvi.mahmud"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              <ExternalLink className="size-4" />
              donating
            </Link>
          </span>{' '}
          to help us maintain and expand our resources.
        </li>
      </ul>

      <h2>Why Shaddy?</h2>
      <p>
        Frontend development is fast-paced and challenging, with new tools and
        techniques emerging constantly. Shaddy aims to simplify this by offering
        a growing collection of reusable, type-safe React hooks and, soon,
        components and patterns. By focusing on React.js, Next.js, and
        TypeScript, we ensure our resources align with modern industry
        standards.
      </p>
      <p>
        As an open-source project, Shaddy is free, transparent, and
        community-driven. We're here to help you build better applications
        faster, and we're excited to grow with your support.
      </p>

      <h2>Join Us</h2>
      <p>
        Shaddy is a new project with a big vision. We're starting with React
        hooks, but with your help, we can become the go-to resource for frontend
        developers and beyond. Whether you're a seasoned React developer or just
        starting out, your contributions (code, ideas, or feedback) can shape
        Shaddy's future.
      </p>
      <p>
        Let's build something great together. Join us today and help make Shaddy
        the ultimate resource for frontend engineers!
      </p>
    </div>
  )
}

export default Vision

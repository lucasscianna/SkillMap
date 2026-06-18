import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ResourceCard from '../components/ResourceCard';

describe('ResourceCard Component', () => {
  it('renders resource title, type badge, and external link correctly', () => {
    const mockResource = {
      title: 'Advanced React Course',
      type: 'course',
      skill: 'React',
      url: 'https://react.dev/learn',
    };

    render(<ResourceCard resource={mockResource} />);

    // Check title and skill tags
    expect(screen.getByText('Advanced React Course')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();

    // Check resource type badge
    expect(screen.getByText('COURSE')).toBeInTheDocument();

    // Check external link attributes
    const linkElement = screen.getByRole('link', { name: /explore/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', 'https://react.dev/learn');
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('handles project type badge styling correctly', () => {
    const mockResource = {
      title: 'Build a Dockerized App',
      type: 'project',
      skill: 'Docker',
      url: 'https://github.com/project',
    };

    render(<ResourceCard resource={mockResource} />);

    expect(screen.getByText('PROJECT')).toBeInTheDocument();
  });
});

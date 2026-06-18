import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RoadmapDisplay from '../components/RoadmapDisplay';

describe('RoadmapDisplay Component', () => {
  const mockGaps = [
    { skill: 'Docker', priority: 'high' },
    { skill: 'Redis', priority: 'medium' },
    { skill: 'Git', priority: 'low' },
  ];

  const mockRoadmap = [
    { skill: 'Docker', duration: '3 weeks', order: 1 },
    { skill: 'Redis', duration: '2 weeks', order: 2 },
    { skill: 'Git', duration: '1 week', order: 3 },
  ];

  it('renders target role and gap summaries correctly', () => {
    render(<RoadmapDisplay targetRole="Senior Dev" gaps={mockGaps} roadmap={mockRoadmap} />);

    expect(screen.getByText('Senior Dev')).toBeInTheDocument();
    expect(screen.getByText('1 High Gaps')).toBeInTheDocument();
    expect(screen.getByText('1 Medium Gaps')).toBeInTheDocument();
    expect(screen.getByText('1 Low Gaps')).toBeInTheDocument();
  });

  it('renders roadmap steps and prioritizes classes', () => {
    const { container } = render(
      <RoadmapDisplay targetRole="Senior Dev" gaps={mockGaps} roadmap={mockRoadmap} />
    );

    // Verify step names render
    expect(screen.getByText('Docker')).toBeInTheDocument();
    expect(screen.getByText('Redis')).toBeInTheDocument();
    expect(screen.getByText('Git')).toBeInTheDocument();

    // Verify priority class names (red, yellow, green borders)
    const cards = container.querySelectorAll('.border-l-4');
    expect(cards.length).toBe(3);

    // Docker is high priority -> border-red
    expect(cards[0].className).toContain('border-red');
    
    // Redis is medium priority -> border-yellow
    expect(cards[1].className).toContain('border-yellow');

    // Git is low priority -> border-green
    expect(cards[2].className).toContain('border-green');
  });
});

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import AnalysisTable from '../components/AnalysisTable';
import './WeekModule.css';

interface WeekModuleProps {}

const weekContent = {
  1: {
    title: 'Introduction to Embodied Narration',
    description: 'Learn the foundations of using physical cues to reveal character',
    objectives: [
      'Understand what "embodied narration" means in literature',
      'Identify physical cues in Tolstoy\'s writing',
      'Recognize the connection between body language and character development'
    ],
    analysisData: [
      {
        id: 1,
        character: 'Pierre Bezukhov',
        text: 'When he smiled, suddenly, instantaneously, his serious, even rather sullen, face vanished completely, and a quite different face appeared, childish, good-humoured, even rather stupid, that seemed to beg indulgence.',
        analysis: 'This shows how Pierre\'s true nature - innocent and vulnerable - emerges through his physical expression, contrasting with his attempts to appear intellectually formidable.',
        technique: 'Facial Transformation',
        location: 'During political debate scene, approximately Chapter III'
      },
      {
        id: 2,
        character: 'Prince Vassily',
        text: 'He was wearing an embroidered court uniform, stockings and slippers, and had stars on his breast, and a bright smile on his flat face.',
        analysis: 'The "bright smile on his flat face" reveals the superficial nature of court social interactions - the smile is performative, not genuine, matching his "flat" personality.',
        technique: 'Superficial Expression',
        location: 'Early in Chapter I, first salon scene'
      },
      {
        id: 3,
        character: 'Anna Pavlovna Scherer',
        text: 'The affected smile which played continually about Anna Pavlovna\'s face, out of keeping as it was with her faded looks, expressed a spoilt child\'s continual consciousness of a charming failing.',
        analysis: 'The physical description of her "affected smile" being "out of keeping" with her aging appearance reveals her desperate attempt to maintain social charm despite her fading beauty.',
        technique: 'Incongruent Expression',
        location: 'Chapter I, character introduction'
      }
    ]
  },
  2: {
    title: 'Contrasts in Body Language',
    description: 'Explore how opposing gestures create narrative tension',
    objectives: [
      'Identify contrasting physical behaviors between characters',
      'Analyze how physical contrasts reveal personality differences',
      'Practice writing scenes with contrasting body language'
    ],
    analysisData: [
      {
        id: 4,
        character: 'Princess Ellen (Helene)',
        text: 'Not looking directly at any one, but smiling at every one, as it were courteously allowing to all the right to admire the beauty of her figure, her full shoulders, her bosom and back, which were extremely exposed in the mode of the day.',
        analysis: 'Her deliberate avoidance of direct eye contact while displaying her body shows her manipulative use of beauty as a social weapon.',
        technique: 'Calculated Display',
        location: 'During the vicomte\'s story scene'
      },
      {
        id: 5,
        character: 'Prince Ippolit',
        text: 'His eyes, his nose, his mouth — everything was, as it were, puckered up in one vacant, bored grimace, while his arms and legs always fell into the most grotesque attitudes.',
        analysis: 'The physical description reveals his intellectual emptiness and social awkwardness - his body language betrays his mental limitations.',
        technique: 'Grotesque Posturing',
        location: 'During salon gathering description'
      }
    ]
  }
};

const WeekModule: React.FC<WeekModuleProps> = () => {
  const { weekNumber } = useParams<{ weekNumber: string }>();
  const week = parseInt(weekNumber || '1');
  const content = weekContent[week as keyof typeof weekContent];

  if (!content) {
    return (
      <div className="week-module">
        <h2>Module Not Found</h2>
        <Link to="/">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="week-module">
      <div className="module-header">
        <Link to="/" className="back-link">← Back to Course Overview</Link>
        <div className="week-badge">Week {week}</div>
      </div>

      <div className="module-content">
        <h1>{content.title}</h1>
        <p className="module-description">{content.description}</p>

        <section className="learning-objectives">
          <h2>Learning Objectives</h2>
          <ul>
            {content.objectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
        </section>

        {content.analysisData && content.analysisData.length > 0 && (
          <section className="tolstoy-analysis">
            <AnalysisTable 
              passages={content.analysisData}
              title={`Week ${week}: ${content.title} - Tolstoy Examples`}
            />
          </section>
        )}

        <section className="practice-section">
          <h2>Your Turn</h2>
          <div className="writing-prompt">
            <h3>Writing Exercise</h3>
            <p>Write a short paragraph describing a character using only physical cues. What can you reveal about their personality through their posture, gestures, or facial expressions?</p>
            <textarea 
              placeholder="Type your response here..."
              rows={8}
              className="writing-area"
            />
            <button className="submit-btn">Save Progress</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WeekModule;
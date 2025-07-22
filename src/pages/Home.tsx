import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const courseModules = [
  { week: 1, title: 'Introduction to Embodied Narration', description: 'Discover how Tolstoy uses physical cues to reveal character' },
  { week: 2, title: 'Contrasts in Body Language', description: 'Analyze opposing gestures and their narrative power' },
  { week: 3, title: 'Physical Cues and Inner Life', description: 'Connect external movements to internal emotions' },
  { week: 4, title: 'Repeated Motifs and Characterization', description: 'Track recurring physical patterns in character development' },
  { week: 5, title: 'Embodied Social Dynamics', description: 'Explore how posture and gesture reveal social relationships' },
  { week: 6, title: 'Physicality and Thematic Meaning', description: 'Understand how physical description serves larger themes' },
  { week: 7, title: 'Revision and Peer Review', description: 'Refine your own embodied narration techniques' },
  { week: 8, title: 'Synthesis and Showcase', description: 'Present and celebrate your mastery of embodied narration' }
];

const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <h2>Master the Art of Embodied Narration</h2>
        <p>
          Learn to write vivid, character-revealing prose using Leo Tolstoy's masterful techniques 
          from War and Peace. This 8-week course teaches high school students how to use physical 
          cues—gesture, gait, facial expression, posture—to illuminate character and scene.
        </p>
      </div>

      <div className="course-overview">
        <h3>Course Modules</h3>
        <div className="modules-grid">
          {courseModules.map((module) => (
            <Link 
              key={module.week} 
              to={`/week/${module.week}`} 
              className="module-card"
            >
              <div className="module-header">
                <span className="week-number">Week {module.week}</span>
              </div>
              <h4>{module.title}</h4>
              <p>{module.description}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="navigation-links">
        <Link to="/characters" className="nav-button">Character Dossiers</Link>
        <Link to="/submissions" className="nav-button">Student Submissions</Link>
      </div>
    </div>
  );
};

export default Home;
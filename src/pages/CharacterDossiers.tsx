import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CharacterDossiers.css';

interface PhysicalMotif {
  description: string;
  frequency: number;
  significance: string;
}

interface Character {
  name: string;
  description: string;
  keyMotifs: PhysicalMotif[];
  color: string;
}

const characterData: Character[] = [
  {
    name: 'Prince Andrei Bolkonsky',
    description: 'A disillusioned aristocrat seeking meaning through war and personal relationships.',
    color: '#2c3e50',
    keyMotifs: [
      {
        description: 'Frowning brows',
        frequency: 12,
        significance: 'Indicates his critical, judgmental nature and inner turmoil'
      },
      {
        description: 'Compressed lips',
        frequency: 8,
        significance: 'Shows his tendency to suppress emotions and maintain stoic control'
      },
      {
        description: 'Erect military bearing',
        frequency: 15,
        significance: 'Reflects his discipline and sense of duty, even in civilian settings'
      }
    ]
  },
  {
    name: 'Natasha Rostova',
    description: 'A vivacious young woman whose physical expressiveness reveals her emotional journey.',
    color: '#e74c3c',
    keyMotifs: [
      {
        description: 'Animated gestures',
        frequency: 23,
        significance: 'Demonstrates her natural enthusiasm and emotional openness'
      },
      {
        description: 'Dancing movements',
        frequency: 7,
        significance: 'Symbolizes her joy, youth, and connection to life\'s rhythms'
      },
      {
        description: 'Radiant smile',
        frequency: 18,
        significance: 'Represents her ability to bring light and warmth to others'
      }
    ]
  },
  {
    name: 'Pierre Bezukhov',
    description: 'An awkward, searching soul whose physical clumsiness mirrors his spiritual journey.',
    color: '#27ae60',
    keyMotifs: [
      {
        description: 'Awkward movements',
        frequency: 19,
        significance: 'Reflects his social discomfort and inner uncertainty'
      },
      {
        description: 'Adjusting spectacles',
        frequency: 14,
        significance: 'Symbolic of his constant search for clarity and understanding'
      },
      {
        description: 'Hesitant gestures',
        frequency: 11,
        significance: 'Shows his thoughtful nature and reluctance to act impulsively'
      }
    ]
  }
];

const CharacterDossiers: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  return (
    <div className="character-dossiers">
      <div className="dossier-header">
        <Link to="/" className="back-link">← Back to Course Overview</Link>
        <h1>Character Dossiers</h1>
        <p>Explore how Tolstoy uses recurring physical motifs to develop his characters</p>
      </div>

      <div className="dossier-content">
        <div className="character-list">
          {characterData.map((character, index) => (
            <div 
              key={index} 
              className={`character-card ${selectedCharacter === character ? 'selected' : ''}`}
              onClick={() => setSelectedCharacter(character)}
              style={{ borderLeftColor: character.color }}
            >
              <h3>{character.name}</h3>
              <p>{character.description}</p>
              <div className="motif-count">
                {character.keyMotifs.length} Key Motifs
              </div>
            </div>
          ))}
        </div>

        {selectedCharacter && (
          <div className="character-details">
            <div className="character-header" style={{ backgroundColor: selectedCharacter.color }}>
              <h2>{selectedCharacter.name}</h2>
            </div>
            
            <div className="motifs-analysis">
              <h3>Physical Motifs Analysis</h3>
              {selectedCharacter.keyMotifs.map((motif, index) => (
                <div key={index} className="motif-card">
                  <div className="motif-header">
                    <h4>{motif.description}</h4>
                    <span className="frequency-badge">
                      Appears {motif.frequency} times
                    </span>
                  </div>
                  <p className="motif-significance">{motif.significance}</p>
                </div>
              ))}
            </div>

            <div className="export-section">
              <button className="export-btn">Export Character Analysis</button>
            </div>
          </div>
        )}

        {!selectedCharacter && (
          <div className="placeholder">
            <h3>Select a Character</h3>
            <p>Click on a character card to view their detailed physical motif analysis.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterDossiers;
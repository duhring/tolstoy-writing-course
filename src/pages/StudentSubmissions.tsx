import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './StudentSubmissions.css';

interface Submission {
  id: string;
  studentName: string;
  weekNumber: number;
  title: string;
  content: string;
  dateSubmitted: string;
  comments: Comment[];
  status: 'draft' | 'submitted' | 'reviewed';
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  type: 'peer' | 'instructor';
}

const sampleSubmissions: Submission[] = [
  {
    id: '1',
    studentName: 'Emma Thompson',
    weekNumber: 1,
    title: 'Character Study: The Nervous Executive',
    content: 'She tapped her pen against the mahogany desk in rapid succession, each click echoing through the silent boardroom. Her shoulders hunched forward as she leaned over the quarterly reports, and her free hand unconsciously smoothed her hair behind her ear every few seconds. When the door creaked open, her head snapped up with the alertness of a startled deer, her eyes wide and searching.',
    dateSubmitted: '2024-01-15',
    status: 'reviewed',
    comments: [
      {
        id: '1',
        author: 'Marcus Chen',
        content: 'Great use of repetitive gestures! The pen tapping really shows her anxiety.',
        timestamp: '2024-01-16',
        type: 'peer'
      },
      {
        id: '2',
        author: 'Ms. Rodriguez',
        content: 'Excellent work connecting the physical cues to emotional state. The deer metaphor is particularly effective.',
        timestamp: '2024-01-17',
        type: 'instructor'
      }
    ]
  },
  {
    id: '2',
    studentName: 'Jackson Williams',
    weekNumber: 2,
    title: 'Contrasting Characters: The Interview',
    content: 'She sat with perfect posture, her hands folded neatly in her lap, chin lifted with quiet confidence. Across from her, he slouched in his chair, one leg bouncing rhythmically while his fingers drummed against his thigh. Her steady gaze met the interviewer\'s questions directly, while his eyes darted between the window, the floor, and anywhere but forward.',
    dateSubmitted: '2024-01-22',
    status: 'submitted',
    comments: []
  }
];

const StudentSubmissions: React.FC = () => {
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = () => {
    if (newComment.trim() && selectedSubmission) {
      // In a real app, this would save to a backend
      console.log('New comment:', newComment);
      setNewComment('');
    }
  };

  return (
    <div className="student-submissions">
      <div className="submissions-header">
        <Link to="/" className="back-link">← Back to Course Overview</Link>
        <h1>Student Submissions</h1>
        <p>Review and provide feedback on student writing exercises</p>
      </div>

      <div className="submissions-content">
        <div className="submissions-list">
          <div className="upload-section">
            <h3>Submit New Work</h3>
            <div className="upload-form">
              <input type="file" accept=".txt,.docx,.pdf" className="file-input" />
              <button className="upload-btn">Upload Submission</button>
            </div>
          </div>

          <div className="submissions-grid">
            <h3>Recent Submissions</h3>
            {sampleSubmissions.map((submission) => (
              <div 
                key={submission.id}
                className={`submission-card ${selectedSubmission?.id === submission.id ? 'selected' : ''}`}
                onClick={() => setSelectedSubmission(submission)}
              >
                <div className="submission-header">
                  <h4>{submission.title}</h4>
                  <span className={`status-badge status-${submission.status}`}>
                    {submission.status}
                  </span>
                </div>
                <div className="submission-meta">
                  <span>By {submission.studentName}</span>
                  <span>Week {submission.weekNumber}</span>
                  <span>{new Date(submission.dateSubmitted).toLocaleDateString()}</span>
                </div>
                <div className="submission-preview">
                  {submission.content.substring(0, 100)}...
                </div>
                <div className="comment-count">
                  {submission.comments.length} comments
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedSubmission && (
          <div className="submission-details">
            <div className="submission-full">
              <div className="submission-title-area">
                <h2>{selectedSubmission.title}</h2>
                <div className="submission-info">
                  <span>By {selectedSubmission.studentName}</span>
                  <span>Week {selectedSubmission.weekNumber}</span>
                  <span>{new Date(selectedSubmission.dateSubmitted).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="submission-text">
                <p>{selectedSubmission.content}</p>
              </div>

              <div className="comments-section">
                <h3>Feedback & Comments</h3>
                
                {selectedSubmission.comments.map((comment) => (
                  <div key={comment.id} className={`comment ${comment.type}`}>
                    <div className="comment-header">
                      <span className="comment-author">{comment.author}</span>
                      <span className="comment-type">{comment.type}</span>
                      <span className="comment-time">
                        {new Date(comment.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="comment-content">{comment.content}</p>
                  </div>
                ))}

                <div className="add-comment">
                  <h4>Add Feedback</h4>
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Provide constructive feedback on the use of physical cues and embodied narration..."
                    rows={4}
                    className="comment-input"
                  />
                  <button 
                    onClick={handleCommentSubmit}
                    className="comment-submit-btn"
                    disabled={!newComment.trim()}
                  >
                    Submit Feedback
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {!selectedSubmission && (
          <div className="placeholder">
            <h3>Select a Submission</h3>
            <p>Click on a submission to view the full text and provide feedback.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentSubmissions;
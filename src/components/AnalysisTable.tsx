import React, { useState } from 'react';
import './AnalysisTable.css';

interface Passage {
  id: number;
  character: string;
  text: string;
  analysis: string;
  technique: string;
  location: string;
}

interface AnalysisTableProps {
  passages: Passage[];
  title: string;
}

const AnalysisTable: React.FC<AnalysisTableProps> = ({ passages, title }) => {
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [exportFormat, setExportFormat] = useState<'csv' | 'sheets'>('csv');

  const toggleRow = (id: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const expandAll = () => {
    setExpandedRows(new Set(passages.map(p => p.id)));
  };

  const collapseAll = () => {
    setExpandedRows(new Set());
  };

  const exportData = () => {
    if (exportFormat === 'csv') {
      exportToCSV();
    } else {
      exportToSheets();
    }
  };

  const exportToCSV = () => {
    const headers = ['Character', 'Technique', 'Passage', 'Analysis', 'Location'];
    const csvContent = [
      headers.join(','),
      ...passages.map(passage => 
        [
          `"${passage.character}"`,
          `"${passage.technique}"`,
          `"${passage.text}"`,
          `"${passage.analysis}"`,
          `"${passage.location}"`
        ].join(',')
      )
    ].join('\\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${title.replace(/\\s+/g, '_')}_analysis.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const exportToSheets = () => {
    // Create a formatted string for Google Sheets
    const sheetsData = passages.map(passage => 
      `${passage.character}\\t${passage.technique}\\t${passage.text}\\t${passage.analysis}\\t${passage.location}`
    ).join('\\n');
    
    navigator.clipboard.writeText('Character\\tTechnique\\tPassage\\tAnalysis\\tLocation\\n' + sheetsData);
    alert('Data copied to clipboard! You can now paste it into Google Sheets.');
  };

  return (
    <div className="analysis-table">
      <div className="table-header">
        <h3>{title}</h3>
        <div className="table-controls">
          <button onClick={expandAll} className="control-btn expand">
            Expand All
          </button>
          <button onClick={collapseAll} className="control-btn collapse">
            Collapse All
          </button>
          <div className="export-controls">
            <select 
              value={exportFormat} 
              onChange={(e) => setExportFormat(e.target.value as 'csv' | 'sheets')}
              className="export-select"
            >
              <option value="csv">CSV File</option>
              <option value="sheets">Google Sheets</option>
            </select>
            <button onClick={exportData} className="export-btn">
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="table-content">
        {passages.map((passage) => (
          <div key={passage.id} className="passage-row">
            <div 
              className="passage-header"
              onClick={() => toggleRow(passage.id)}
            >
              <div className="passage-info">
                <span className="character-name">{passage.character}</span>
                <span className="technique-tag">{passage.technique}</span>
              </div>
              <div className="expand-icon">
                {expandedRows.has(passage.id) ? '−' : '+'}
              </div>
            </div>
            
            {expandedRows.has(passage.id) && (
              <div className="passage-details">
                <div className="passage-text">
                  <h4>Passage</h4>
                  <blockquote>"{passage.text}"</blockquote>
                </div>
                <div className="passage-analysis">
                  <h4>Analysis</h4>
                  <p>{passage.analysis}</p>
                </div>
                <div className="passage-location">
                  <h4>Location in Text</h4>
                  <p>{passage.location}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="table-summary">
        <p>
          Showing {passages.length} examples of embodied narration techniques. 
          Click on any row to expand and view the detailed analysis.
        </p>
      </div>
    </div>
  );
};

export default AnalysisTable;
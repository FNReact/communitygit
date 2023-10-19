import React, { useState, useEffect } from 'react';

const LinkPreview = ({ url }) => {
  const [linkData, setLinkData] = useState(null);

  useEffect(() => {
    // Create a function to fetch data from the URL and parse it manually
    const fetchLinkPreview = async () => {
      try {
        const response = await fetch(`https://your-api-endpoint.com/?url=${url}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLinkData(data);
      } catch (error) {
        console.error('Error fetching link preview data:', error);
      }
    };

    fetchLinkPreview();
  }, [url]);

  if (!linkData) {
    return null; // Loading state
  }

  return (
    <div className="link-preview">
      <h2>{linkData.title}</h2>
      {linkData.description && <p>{linkData.description}</p>}
      {linkData.image && <img src={linkData.image} alt="Link Preview" />}
      <a href={url} target="_blank" rel="noopener noreferrer">
        Read more
      </a>
    </div>
  );
};

export default LinkPreview;

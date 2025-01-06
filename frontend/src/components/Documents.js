import React, { useState, useEffect } from 'react';

const Documents = () => {
    const [documents, setDocuments] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const response = await fetch('/api/documents'); 
            if (!response.ok) throw new Error('Failed to fetch documents');
            const docs = await response.json();
            setDocuments(docs); 
        } catch (error) {
            console.error('Error fetching documents:', error);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await fetch(`/api/documents/search?query=${searchQuery}`);
            if (!response.ok) throw new Error('Failed to fetch search results');
            const results = await response.json();
            setDocuments(results); 
        } catch (error) {
            console.error('Error searching documents:', error);
        }
    };

    return (
        <div>
            <h1>Documents</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search documents"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                <button onClick={handleSearch} className="search-button">
                    Search
                </button>
            </div>

            <ul className="document-list">
                {documents.map((doc) => (
                    <li key={doc.id}>
                        <span>{doc.title}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Documents;


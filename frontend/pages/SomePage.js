// SomePage.js (or any page where you want to show the document form)
import React from 'react';
import DocumentForm from './DocumentForm';

function SomePage() {
    return (
        <div>
            <h1>Documents Dashboard</h1>
            <DocumentForm />
            {/* Optionally, display existing documents or other content here */}
        </div>
    );
}

export default SomePage;

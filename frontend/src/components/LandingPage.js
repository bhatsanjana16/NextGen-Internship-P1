import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="container text-center mt-5">
            <div className="jumbotron bg-light p-5">
                <h1 className="display-4">Welcome to CollabTool</h1>
                <p className="lead">
                CollabTool is your ultimate platform for seamless collaboration, empowering you to create, share, and communicate effortlessly with your team in real-time.
                </p>
                <hr className="my-4" />
                <p>
                Whether you're brainstorming with your team or structuring your personal tasks, CollabTool equips you with the perfect features to enhance productivity and keep you organized.
                </p>
                <div className="mt-4 button-group">
                    <Link to="/register" className="btn btn-primary">Register</Link>
                    <Link to="/login" className="btn btn-secondary">Login</Link>
                </div>


            </div>
        </div>
    );
};

export default LandingPage;

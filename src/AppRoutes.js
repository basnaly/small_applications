import React from "react";
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from "react-router-dom";

import AppNumberGame from "./NumberGame/AppNumberGame";
import AppWordGame from "./WordGame/AppWordGame";
import AppCalc from './TipCalculator/AppCalc';
import MeComponent from "./MeComponent";
import AppCalculator from "./Calculator/AppCalculator";
import AppLearnWords from "./LearnWords/AppLearnWords";
import AppMarkdownPreviewer from "./MarkdownPreviewer/AppMarkdownPreviewer";

const styles = {
    home: {
        position: 'absolute',
        margin: '10px',
        top: '10px',
        left: '10px',
        fontSize: '18px',
        backgroundImage: 'url("/app.jpg")',
        backgroundSize: 'cover',
        width: '100vw',
        height: '100vh',
    },
    link: {
        position: 'absolute',
        margin: '10px',
        top: '10px',
        left: '10px',
        fontSize: '18px',
    }
}

const Home = () => {
    return (
        <div style={ styles.home }>
            <ul>
                <li>
                    <Link to='/app-number-game'>NumberGame</Link>
                </li>
                <li>
                    <Link to='/app-tip-calc'>TipCalculator</Link>
                </li>
                <li>
                    <Link to='/app-word-game'>WordGame</Link>
                </li>
                <li>
                    <Link to='/app-calculator'>AppCalculator</Link>
                </li>
                <li>
                    <Link to='/app-learn-words'>AppLearnWords</Link>
                </li>
                <li>
                    <Link to='/app-markdown-previewer'>AppMarkdownPreviewer</Link>
                </li>
            </ul>
        </div>
    )
}

const AppRoutes = () => {

    return (
        <Router>
            <div>
                <Routes>
                    <Route path='/home' element='' />
                    <Route path="*" element={<Link style={ styles.link }
                                            to='/home'>Home</Link>} />
                </Routes>
            </div>
            <div>
                <Routes>
                    <Route path='/home' element={ <Home /> } />
                    <Route path='/app-number-game' element={ <AppNumberGame /> } />
                    <Route path='/app-tip-calc' element={ <AppCalc /> } />
                    <Route path='/app-word-game' element={ <AppWordGame /> } />
                    <Route path='/app-calculator' element={ <AppCalculator /> } />
                    <Route path='/app-learn-words' element={ <AppLearnWords /> } />
                    <Route path='/app-markdown-previewer' element={ <AppMarkdownPreviewer /> } />
                    <Route exact path="*" element={ <Navigate replace to="/home" /> } />
                </Routes>
            </div>
            <MeComponent />
        </Router>
    );
}

export default AppRoutes;
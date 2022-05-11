import React from "react";

import LearnWordsComponent from "./LearnWordsComponent";
import MeComponent from './MeComponent';

const styles = {
    parent: {
    backgroundImage: 'url("/img/alphabet.jpeg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    },
}

const AppLearnWords = () => {

    return (
        <div style={ styles.parent }>
            <LearnWordsComponent />
            <MeComponent />
        </div>
    )
}

export default AppLearnWords;
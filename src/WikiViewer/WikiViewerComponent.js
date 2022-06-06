import React, { useState, useEffect } from "react";
import axios from "axios";

import { FcSearch } from 'react-icons/fc';
import { CloseButton } from "react-bootstrap";
import { Paper } from "@mui/material";

const styles = {
    parent: {
        fontSize: '24px',
        backgroundColor: 'cadetblue',
        color: 'greenyellow',
    },
    random: {
        cursor: 'pointer',
        textDecoration: 'none',
        color: 'greenyellow',
        margin: '5px',
    },
    input: {
        border: '3px solid royalblue',
        borderRadius: '20px',
        backgroundColor: 'honeydew',
        color: 'royalblue',
        margin: '5px',
        fontSize: '20px',
        textAlign: 'center',
    },
    button: {
        fontSize: '16px',
        color: 'royalblue',
        position: 'absolute',
        right: '15px',
        top: '12px',
    },
    title: {
        fontWeight: 'bold',
        fontSize: '20px',
    },
    article: {
        fontSize: '18px',
    },
    paper: {
        backgroundColor: 'honeydew',    
    }
}

const AppWikiViewerComponent = () => {

    const [search, setSearch] = useState(true);
    const [input, setInput] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const changeSearch = () => {
        setSearch(prev => !prev) //toggle
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            requestWikipedia()
        }
    }

    const requestWikipedia = () => {
        setLoading(true)

        const requestURL = `https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&list=search&srsearch=${input}`

        axios.get(requestURL, {

            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(result => {
                setData(result.data.query.search)
                console.log(result.data.query.search)
                setLoading(false)
            })
    }
    
    const link = pageid => {
        let linked = `https://en.wikipedia.org/?curid=${pageid}`;
        window.open(linked, "_blank");
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100"
            style={styles.parent}>
            <div>
                <a className="d-flex flex-column align-items-center"
                    style={styles.random}
                    href='https://en.wikipedia.org/wiki/Special:Random'
                    target='_blank'>
                    Click here for a random article
                </a>
            </div>
            <div>
                {
                    search ? <FcSearch onClick={ changeSearch } />
                        :
                        <div className="position-relative">
                            <input type='text' style={styles.input} value={input}
                                onChange={ e => setInput(e.target.value) }
                                autoFocus
                                onKeyDown={ handleKeyDown } />
                            <CloseButton style={styles.button}
                                onClick={ changeSearch } />
                        </div>
                }
            </div>
            <div>Click icon to search</div>
            <div className="container overflow-auto">
                {
                    !loading &&
                    data.map(el =>
                        <Paper className="p-2 my-2" 
                            key={ el.pageid }
                            style={styles.paper}>
                            <div style={styles.title}>
                                { el.title }
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: el.snippet}} // HTML to text
                                style={styles.article}
                                onClick={ () => link(el.pageid) }>
                            </div>
                        </Paper>
                    )
                }
            </div>
            
        </div>
    )
}

export default AppWikiViewerComponent;
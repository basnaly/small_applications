const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem('postAppAuth')}` }
};

export default config;
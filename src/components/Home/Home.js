import React from 'react';
import { Link } from 'react-router-dom';

import Auth from "../Auth/Auth";
function Home() {
    return (
        <div>
            Home
            <Link to="/createRoom">Create Room</Link>
            <Auth />
        </div>
    )
}

export default Home;
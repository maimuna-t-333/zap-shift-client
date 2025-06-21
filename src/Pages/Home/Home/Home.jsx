import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Servieces/Services';
import ClientLogosMarquee from '../ClientLogosMarquee/ClientLogosMarquee';
import Benefits from '../Benefits/Benefits';
import BeMarchant from '../BeMarchant/BeMarchant';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Services></Services>
            <ClientLogosMarquee></ClientLogosMarquee>
            <Benefits></Benefits>
            <BeMarchant></BeMarchant>
        </div>
    );
};

export default Home;
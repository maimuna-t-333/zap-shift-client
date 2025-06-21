import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Servieces/Services';
import ClientLogosMarquee from '../ClientLogosMarquee/ClientLogosMarquee';
import Benefits from '../Benefits/Benefits';
import BeMarchant from '../BeMarchant/BeMarchant';
import HowDoesItWork from '../HowDoesItWork/HowDoesItWork';
import Swipper from '../Swipper/Swipper';
import FAQ from '../FAQ/FAQ';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowDoesItWork></HowDoesItWork>
            <Services></Services>
            <ClientLogosMarquee></ClientLogosMarquee>
            <Benefits></Benefits>
            <div className="divider"></div>
            <BeMarchant></BeMarchant>
            <Swipper></Swipper>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;
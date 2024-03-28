import React from 'react';
import CarouselSection from '../../components/forWeb/CarouselSection';
import FeatureSection from '../../components/forWeb/FeatureSection';
import NewInformationSection from '../../components/forWeb/NewInformationSection';
import SectionImg from '../../components/forWeb/SectionImg';


function Home() {
    return (
        <React.Fragment>
            <SectionImg />
            <NewInformationSection />
            <FeatureSection />
            <CarouselSection />
        </React.Fragment >
    );
}

export default Home;

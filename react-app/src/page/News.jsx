import React from 'react';
import CarouselSection from '../components/CarouselSection';
import FeatureSection from '../components/FeatureSection';
import NewInformationSection from '../components/NewInformationSection';
import SectionImg from '../components/SectionImg';


function News() {
    return (
        <React.Fragment>
            <CarouselSection />
            <FeatureSection />
            <NewInformationSection />
            <SectionImg />
        </React.Fragment >
    );
}

export default News;

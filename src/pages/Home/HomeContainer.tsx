import React from 'react';
import homeData from '@/data/home.json';
import HomeView from '@/pages/Home/HomeView';
import { HomeContent } from '@/types/Home';

const content = homeData as unknown as HomeContent;

const HomeContainer = () => {
    return (
        <HomeView
            researchItems={[]}
            content={content}
        />
    );
};

export default HomeContainer;
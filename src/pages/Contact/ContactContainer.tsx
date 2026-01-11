import React from 'react';
import ContactView from '@/pages/Contact/ContactView';
import { ContactInfo } from '@/types/Base';
import infoData from '@/data/contact/info.json';
import contentsData from '@/data/contact/contents.json';

const ContactContainer = () => {
    // Combine data from JSON files
    const contactData: ContactInfo = {
        ...infoData,
        ...contentsData
    };

    return (
        <ContactView contactData={contactData} />
    );
};

export default ContactContainer;
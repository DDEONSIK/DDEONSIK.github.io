import React from 'react';
import { Mail, MapPin, Phone, Users, Brain, Coffee } from 'lucide-react';
import { ContactInfo } from '@/types/Base';
import './Contact.css';

interface ContactViewProps {
    contactData: ContactInfo;
}

const ContactView: React.FC<ContactViewProps> = ({ contactData }) => {
    return (
        <div className="contact-page">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="contact-header">
                    <div className="contact-title-container">
                        <h1 className="contact-title">
                            Get in Touch
                        </h1>
                        <div className="contact-title-underline"></div>
                    </div>
                </div>

                <div className="contact-grid">
                    {/* LEFT COLUMN: Main Info */}
                    <div className="contact-left-column">
                        {/* Section 1: Recruitment */}
                        <div className="contact-card">
                            <div className="contact-card-header">
                                <div className="contact-icon-wrapper bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                    <Users size={24} />
                                </div>
                                <h2 className="contact-card-title">{contactData.recruitment.title}</h2>
                            </div>
                            <p className="contact-text">
                                {contactData.recruitment.description}
                            </p>
                        </div>

                        {/* Section 2: Research */}
                        <div className="contact-card delay-100">
                            <div className="contact-card-header">
                                <div className="contact-icon-wrapper bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                                    <Brain size={24} />
                                </div>
                                <h2 className="contact-card-title">{contactData.research.title}</h2>
                            </div>
                            <div className="pl-12 space-y-3 text-slate-600 dark:text-slate-400 leading-relaxed">
                                <p dangerouslySetInnerHTML={{ __html: contactData.research.description[0] }} />
                                <p className="contact-note">
                                    {contactData.research.note}
                                </p>
                                <p>
                                    {contactData.research.description[1]}
                                </p>
                            </div>
                        </div>

                        {/* Section 3: Lab Life */}
                        <div className="contact-card delay-200">
                            <div className="contact-card-header">
                                <div className="contact-icon-wrapper bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                                    <Coffee size={24} />
                                </div>
                                <h2 className="contact-card-title">{contactData.labLife.title}</h2>
                            </div>
                            <p className="contact-text">
                                {contactData.labLife.description}
                            </p>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Map + Contact */}
                    <div className="contact-right-column">
                        {/* Map Section */}
                        <div className="map-container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d789.9388194616715!2d127.07534906962253!3d37.63144389825137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357cbb712d44f303%3A0xf74585f86bbdbe48!2z7ISc7Jq46rO87ZWZ6riw7Iig64yA7ZWZ6rWQIO2UhOuhoO2LsOyWtOq0gA!5e0!3m2!1sko!2skr!4v1765526663887!5m2!1sko!2skr"
                                width="100%"
                                height="100%"
                                style={{ border: 0, borderRadius: '1.2rem' }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>

                        {/* Section 4: Contact Instruction & Details */}
                        <div className="contact-card delay-300">
                            <div className="contact-card-header">
                                <div className="contact-icon-wrapper bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400">
                                    <Mail size={24} />
                                </div>
                                <h2 className="contact-card-title">{contactData.contactInstruction.title}</h2>
                            </div>
                            <p 
                                className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm mb-6 pl-12 transition-colors duration-300"
                                dangerouslySetInnerHTML={{ __html: contactData.contactInstruction.description }}
                            />

                            {/* Compact Contact Details Cards */}
                            <div className="contact-details-container">
                                {/* Location */}
                                <div className="contact-detail-item">
                                    <MapPin className="contact-detail-icon" size={18} />
                                    <div>
                                        <p className="contact-detail-label">Location</p>
                                        <p className="contact-detail-value">{contactData.address.university}</p>
                                        <p className="contact-detail-subvalue">{contactData.address.room}</p>
                                    </div>
                                </div>
                                {/* Phone */}
                                <div className="contact-detail-item">
                                    <Phone className="contact-detail-icon" size={18} />
                                    <div>
                                        <p className="contact-detail-label">Phone</p>
                                        <p className="contact-detail-value">{contactData.phone}</p>
                                    </div>
                                </div>
                                {/* Email */}
                                <div className="contact-detail-item">
                                    <Mail className="contact-detail-icon" size={18} />
                                    <div>
                                        <p className="contact-detail-label">Email</p>
                                        <a href={`mailto:${contactData.email}`} className="contact-email-link">{contactData.email}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactView;
import React from 'react';
import resumePdf from '../assets/Backend_Dev_Resume.pdf';

const Resume = () => {
    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            backgroundColor: '#111827',
            display: 'flex',
            flexDirection: 'column',
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
            overflow: 'hidden',
            fontFamily: 'sans-serif'
        }}>

            {/* Top Header Bar */}
            <div style={{
                display: 'flex',
                justifyContent: 'between',
                alignItems: 'center',
                backgroundColor: '#1f2937',
                padding: '12px 24px',
                borderBottom: '1px solid #374151',
                justifyContent: 'space-between'
            }}>
                <div>
                    <h1 style={{ color: '#ffffff', margin: 0, fontSize: '1.25rem', fontWeight: 'bold' }}>
                        SEM BUNLY
                    </h1>
                    <p style={{ color: '#60a5fa', margin: '2px 0 0 0', fontSize: '0.85rem' }}>
                        Backend Developer Resume View
                    </p>
                </div>
                <a
                    href={resumePdf}
                    download="Sem_Bunly_Backend_Resume.pdf"
                    style={{
                        backgroundColor: '#2563eb',
                        color: '#ffffff',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}
                >
                    Download PDF
                </a>
            </div>
            <div style={{ flexGrow: 1, width: '100%', height: '100%' }}>
                <iframe
                    src={`${resumePdf}#view=FitH`}
                    title="Sem Bunly Backend Dev Resume"
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        display: 'block'
                    }}
                />
            </div>

        </div>
    );
};

export default Resume;
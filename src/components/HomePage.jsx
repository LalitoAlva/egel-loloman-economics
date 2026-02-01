import React from 'react';
import { modules } from '../data/courseContent';

const HomePage = ({ onSelectModule }) => {
    return (
        <div className="container fade-in">
            <header style={{ marginBottom: '40px', textAlign: 'center', paddingTop: '40px' }}>
                <h1 style={{ fontSize: '3rem', background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '10px' }}>
                    EGEL Prep
                </h1>
                <p style={{ fontSize: '1.2rem' }}>Domina Economía y Contaduría con el Método Socrático</p>
            </header>

            <div className="module-grid">
                {modules.map((mod, index) => (
                    <div
                        key={mod.id}
                        className="slide-card clickable-card fade-in"
                        style={{
                            animationDelay: `${index * 100}ms`,
                            borderLeft: `8px solid ${mod.color}`,
                            padding: '30px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}
                        onClick={() => onSelectModule(mod)}
                    >
                        <div>
                            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{mod.icon}</div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff', marginBottom: '10px' }}>{mod.title}</h3>
                            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '0' }}>{mod.desc}</p>
                        </div>

                        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.9rem', color: mod.color, fontWeight: 'bold' }}>
                                {mod.topics.length} Temas
                            </span>
                            <span style={{ opacity: 0.5 }}>→</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;

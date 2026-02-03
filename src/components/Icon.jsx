import React from 'react';

/**
 * Icon component that renders either Font Awesome icons or emoji fallbacks
 * Usage: <Icon name="fa-solid fa-home" /> or <Icon name="📚" />
 */
const Icon = ({ name, size = '1em', color, className = '', style = {} }) => {
    // Check if it's a Font Awesome class (starts with 'fa')
    const isFontAwesome = name && name.startsWith('fa');

    if (isFontAwesome) {
        return (
            <i
                className={`${name} ${className}`}
                style={{
                    fontSize: size,
                    color: color,
                    ...style
                }}
            />
        );
    }

    // Fallback to emoji/text
    return (
        <span
            className={className}
            style={{
                fontSize: size,
                color: color,
                ...style
            }}
        >
            {name}
        </span>
    );
};

// Common icon mappings for easy reference
export const Icons = {
    // Navigation & Actions
    home: 'fa-solid fa-house',
    back: 'fa-solid fa-arrow-left',
    forward: 'fa-solid fa-arrow-right',
    close: 'fa-solid fa-xmark',
    menu: 'fa-solid fa-bars',
    settings: 'fa-solid fa-gear',
    search: 'fa-solid fa-magnifying-glass',

    // User & Auth
    user: 'fa-solid fa-user',
    users: 'fa-solid fa-users',
    login: 'fa-solid fa-right-to-bracket',
    logout: 'fa-solid fa-right-from-bracket',
    key: 'fa-solid fa-key',
    lock: 'fa-solid fa-lock',
    unlock: 'fa-solid fa-lock-open',

    // Content & Learning
    book: 'fa-solid fa-book',
    bookOpen: 'fa-solid fa-book-open',
    lesson: 'fa-solid fa-chalkboard-user',
    quiz: 'fa-solid fa-clipboard-question',
    question: 'fa-solid fa-circle-question',
    brain: 'fa-solid fa-brain',
    graduation: 'fa-solid fa-graduation-cap',
    certificate: 'fa-solid fa-certificate',

    // Media
    play: 'fa-solid fa-play',
    pause: 'fa-solid fa-pause',
    stop: 'fa-solid fa-stop',
    audio: 'fa-solid fa-headphones',
    volume: 'fa-solid fa-volume-high',
    volumeMute: 'fa-solid fa-volume-xmark',
    image: 'fa-solid fa-image',
    video: 'fa-solid fa-video',

    // Files & Documents
    file: 'fa-solid fa-file',
    fileLines: 'fa-solid fa-file-lines',
    filePdf: 'fa-solid fa-file-pdf',
    folder: 'fa-solid fa-folder',
    clipboard: 'fa-solid fa-clipboard-list',

    // Actions
    add: 'fa-solid fa-plus',
    edit: 'fa-solid fa-pen-to-square',
    delete: 'fa-solid fa-trash',
    save: 'fa-solid fa-floppy-disk',
    check: 'fa-solid fa-check',
    xmark: 'fa-solid fa-xmark',
    refresh: 'fa-solid fa-rotate',
    download: 'fa-solid fa-download',
    upload: 'fa-solid fa-upload',

    // Status
    success: 'fa-solid fa-circle-check',
    error: 'fa-solid fa-circle-exclamation',
    warning: 'fa-solid fa-triangle-exclamation',
    info: 'fa-solid fa-circle-info',
    loading: 'fa-solid fa-spinner fa-spin',

    // Modules (for EGEL)
    chartLine: 'fa-solid fa-chart-line',
    chartBar: 'fa-solid fa-chart-simple',
    globe: 'fa-solid fa-globe',
    calculator: 'fa-solid fa-calculator',
    scale: 'fa-solid fa-scale-balanced',
    magnifyingGlass: 'fa-solid fa-magnifying-glass-chart',
    coins: 'fa-solid fa-coins',
    landmark: 'fa-solid fa-landmark',

    // Misc
    star: 'fa-solid fa-star',
    starHalf: 'fa-solid fa-star-half-stroke',
    heart: 'fa-solid fa-heart',
    trophy: 'fa-solid fa-trophy',
    medal: 'fa-solid fa-medal',
    crown: 'fa-solid fa-crown',
    fire: 'fa-solid fa-fire',
    bolt: 'fa-solid fa-bolt',
    clock: 'fa-solid fa-clock',
    calendar: 'fa-solid fa-calendar',
    bell: 'fa-solid fa-bell',
    envelope: 'fa-solid fa-envelope',
    comment: 'fa-solid fa-comment',
    lightbulb: 'fa-solid fa-lightbulb',
    rocket: 'fa-solid fa-rocket',
    target: 'fa-solid fa-bullseye',
    flag: 'fa-solid fa-flag',
    eye: 'fa-solid fa-eye',
    eyeSlash: 'fa-solid fa-eye-slash',
};

export default Icon;

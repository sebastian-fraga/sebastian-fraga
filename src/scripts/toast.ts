
const successIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" style="width: 20px; height: 20px;">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
`;

const errorIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" style="width: 20px; height: 20px;">
        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
`;

const getOrCreateContainer = (): HTMLElement => {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        Object.assign(container.style, {
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            zIndex: '9999',
            pointerEvents: 'none'
        });
        document.body.appendChild(container);
    }
    return container;
};

export const showToast = (type: 'success' | 'error', message: string): void => {
    const container = getOrCreateContainer();
    const toast = document.createElement('div');

    const bgColor = type === 'success' ? '#10B981' : '#EF4444';

    Object.assign(toast.style, {
        backgroundColor: bgColor,
        color: '#FFFFFF',
        padding: '12px 18px',
        borderRadius: '12px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        fontFamily: 'system-ui, sans-serif',
        fontSize: '14px',
        fontWeight: '500',
        alignItems: 'center',     
        gap: '10px',              
        pointerEvents: 'auto',
        opacity: '0',
        transform: 'translateY(20px)',
        transition: 'all 0.3s ease',
    });

    const iconSvg = type === 'success' ? successIcon : errorIcon;

    toast.innerHTML = `${iconSvg} <span>${message}</span>`;

    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';
        toast.addEventListener('transitionend', () => toast.remove());
    }, 1800);
};
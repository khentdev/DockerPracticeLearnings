import { prisma } from '../../prisma/prisma.extended.js';

export const gracefulShutdown = async (signal: string) => {
    console.info(`${signal} received: shutting down gracefully...`);
    try {
        await prisma.$disconnect();
        console.info('Prisma disconnected.');
    } catch (err) {
        console.error('Error during prisma disconnect', err);
    }
    process.exit(0);
};

export const registerShutdownHandlers = () => {
    const signals = ['SIGINT', 'SIGTERM', 'SIGUSR2'];

    signals.forEach((signal) => {
        process.once(signal, () => gracefulShutdown(signal));
    });

    process.on('unhandledRejection', (reason) => {
        console.error({ reason }, 'Unhandled promise rejection');
        gracefulShutdown('UNHANDLED_REJECTION');
    });

    process.on('uncaughtException', (err) => {
        console.error({ err }, 'Uncaught exception');
        gracefulShutdown('UNCAUGHT_EXCEPTION');
    });
};

import 'dotenv/config';

const getEnvVar = (key: string, defaultValue?: string): string => {
    const value = process.env[key];
    if (value !== undefined) return value
    if (defaultValue !== undefined) return defaultValue
    throw new Error(`Environment variable ${key} is missing`);
};

export const config = {
    PORT: parseInt(getEnvVar('SERVER_PORT', '3000'), 10),
    NODE_ENV: getEnvVar('NODE_ENV', 'development'),
    DATABASE_URL: getEnvVar('DATABASE_URL', ''),
};

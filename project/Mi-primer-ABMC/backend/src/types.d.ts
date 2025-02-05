declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      MONGODB_URI?: string;
      REDIS_PORT?: number;
      REDIS_HOST?: string;
      EMAIL_USER?: string;
      EMAIL_PASS?: string;
    }
  }
}

export { };

export interface Configuration {
  nest: NestConfig;
  cors: CorsConfig;
  security: SecurityConfig;
}

export interface NestConfig {
  port: number;
}

export interface CorsConfig {
  enabled: boolean;
}

export interface SecurityConfig {
  bcryptSaltOrRound: string | number;
  expiresIn: string;
  refreshIn: string;
}

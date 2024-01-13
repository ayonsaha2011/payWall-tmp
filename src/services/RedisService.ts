import { Injectable } from "@tsed/di";
import { redisClient } from '../Server';

@Injectable()
export class RedisService {
    static async get(key: string) {
        try {
            const value = await redisClient.get(key);
            return value;

        } catch (error) {
            console.error('RedisService.get error', error);
        }
    }

    static async set(key: string, value: string) {
        try {
            await redisClient.set(key, value);
        } catch (error) {
            console.error('RedisService.set error', error);
        }
    }

    static async del(key: string) {
        try {
            await redisClient.del(key);
        } catch (error) {
            console.error('RedisService.del error', error);
        }
    }

    static async expire(key: string, seconds: number) {
        try {
            await redisClient.expire(key, seconds);
        } catch (error) {
            console.error('RedisService.expire error', error);
        }
    }

    static async ttl(key: string) {
        try {
            const ttl = await redisClient.ttl(key);
            return ttl;
        } catch (error) {
            console.error('RedisService.ttl error', error);
        }
    }

    static async keys(pattern: string) {
        try {
            const keys = await redisClient.keys(pattern);
            return keys;
        } catch (error) {
            console.error('RedisService.keys error', error);
        }
    }

    static async getFlashMessages(key: string) {
        try {
            const valueStr = await redisClient.get(key);
            await redisClient.del(key);
            if (!valueStr) return null;
            const { message, status, type, value } = JSON.parse(valueStr);
            return { message, status, type, value };

        } catch (error) {
            console.error('RedisService.getFlashMessages error', error);
        }
    }

    static async setFlashMessages(key: string, message: string, status: string = 'ERROR', value: any = null) {
        try {
            const type = status === 'ERROR' ? 'danger' : status.toLowerCase();
            const valueStr = JSON.stringify({ message, status, type, value });
            await redisClient.set(key, valueStr);
            await redisClient.expire(key, 10); // 10 seconds
        } catch (error) {
            console.error('RedisService.setFlashMessages error', error);
        }
    }

    static async getJson(key: string) {
        try {
            const value = await redisClient.get(key);
            if (!value) return null;
            return JSON.parse(value);

        } catch (error) {
            console.error('RedisService.getJson error', error);
        }
    }

    static async setJson(key: string, value: any) {
        try {
            await redisClient.set(key, JSON.stringify(value));
        } catch (error) {
            console.error('RedisService.setJson error', error);
        }
    }

}

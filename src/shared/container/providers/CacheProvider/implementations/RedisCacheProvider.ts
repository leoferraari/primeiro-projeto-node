import Redis, { Redis as RedisClient } from 'ioredis';
import ICacheProvider from "../models/ICacheProvider";
import cacheConfig from '@config/cache';

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    console.log('asd');
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: string): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async invalidate(key: string): Promise<void> {

  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }
}


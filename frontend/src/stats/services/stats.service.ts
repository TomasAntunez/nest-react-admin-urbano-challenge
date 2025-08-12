import { httpService } from '../../shared/services';
import { Stats } from '../entities';

class StatsService {
  async getStats(): Promise<Stats> {
    const { data } = await httpService.get<Stats>('/api/stats');
    return data;
  }
}

export const statsService = new StatsService();

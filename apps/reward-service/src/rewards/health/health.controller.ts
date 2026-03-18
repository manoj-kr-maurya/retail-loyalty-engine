import { Controller, Get } from '@nestjs/common';

@Controller('rewards')
export class HealthController {
  @Get('health')
  getVersionInfo() {
    return { version: '1.0.0', name: 'reward-engine-api', status: 'ok' };
  }
}

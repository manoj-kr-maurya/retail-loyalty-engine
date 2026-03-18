import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PendingSalesService } from './pending-sales.service';
import type { UpdatePendingSaleDto } from '@shared/dtos';

@Controller('rewards/pending-sales')
export class PendingSalesController {
  constructor(private readonly pendingSalesService: PendingSalesService) {}

  @Post()
  addPendingSale(@Body() dto: UpdatePendingSaleDto) {
    return this.pendingSalesService.addOrUpdatePendingSale(dto);
  }

  @Put()
  updatePendingSale(@Body() dto: UpdatePendingSaleDto) {
    return this.pendingSalesService.addOrUpdatePendingSale(dto);
  }

  @Get()
  listPendingSales() {
    return this.pendingSalesService.listPendingSales();
  }

  @Get('by-ref/:ref')
  fetchPendingSaleByRef(@Param('ref') ref: string) {
    return this.pendingSalesService.getPendingSaleByReference(ref);
  }

  @Get(':id')
  fetchPendingSaleById(@Param('id') id: string) {
    return this.pendingSalesService.getPendingSaleById(id);
  }
}

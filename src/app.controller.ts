import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Body,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ReportType } from './data';
import { AppService } from 'src/app.service';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(@Param('type') type: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getAllReports(reportType);
  }

  @Get(':id')
  getReportById(
    @Param('type') type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.appService.getReportById(reportType, id);
  }

  @Post()
  createReport(
    @Body() body: { source: string; amount: number },
    @Param('type') type: string,
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.appService.createReport(reportType, body);
  }

  @Put(':id')
  updateReport(
    @Param('type') type: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: { amount: number; source: string },
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.appService.updateReport(reportType, id, body);
  }
  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    this.appService.deleteReport(id);
  }
}

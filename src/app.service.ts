import { Injectable } from '@nestjs/common';
import { ReportType, data } from 'src/data';
import { v4 as uuid } from 'uuid';

interface ReportData {
  amount: number;
  source: string;
}

@Injectable()
export class AppService {
  getAllReports(type: ReportType) {
    return data.report.filter((report) => report.type === type);
  }

  getReportById(type: ReportType, id: string) {
    return data.report.find(
      (report) => report.type === type && report.id === id,
    );
  }

  createReport(type: ReportType, { amount, source }: ReportData) {
    const newReport = {
      id: uuid(),
      source: source,
      amount: amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };

    data.report.push(newReport);
    return newReport;
  }

  updateReport(type: ReportType, id: string, body: ReportData) {
    const reportToUpdate = data.report.find(
      (report) => report.type === type && report.id === id,
    );
    if (!reportToUpdate) return;

    const reportIndex = data.report.findIndex(
      (report) => reportToUpdate.id === report.id,
    );
    data.report[reportIndex] = {
      ...reportToUpdate,
      ...body,
      updated_at: new Date(),
    };
    return data.report[reportIndex];
  }

  deleteReport(id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);
    if (reportIndex === -1) return;
    data.report.splice(reportIndex, 1);
  }
}

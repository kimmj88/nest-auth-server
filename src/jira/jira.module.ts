import { JiraService } from './jira.service';
import { Module } from '@nestjs/common';
import { JiraController } from './jira.controller';

@Module({
  controllers: [JiraController],
  providers: [JiraService],
  exports: [JiraService],
})
export class JiraModule {}

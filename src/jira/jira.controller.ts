import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { JiraService } from "./jira.service";
import { AuthenticatedGuard } from "src/auth/auth.guard";

@Controller("/jira")
export class JiraController {
  constructor(private readonly jiraService: JiraService) {}

  @UseGuards(AuthenticatedGuard)
  @Get("issues")
  async getJiraIssues(@Query("projectKey") projectKey: string) {
    if (!projectKey) {
      throw new Error("Project key is required");
    }
    return this.jiraService.getJiraIssues(projectKey);
  }
}

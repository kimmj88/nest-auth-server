import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class JiraService {
  private readonly jiraDomain = "auto-jira.atlassian.net";
  private readonly email = "mj_kim@autocrypt.io";
  private readonly apiToken = "111";

  async getJiraIssues(projectKey: string, maxResults = 10): Promise<any> {
    try {
      const response = await axios.get(
        `https://${this.jiraDomain}/rest/api/3/search`,
        {
          headers: {
            Authorization: `Basic ${Buffer.from(`${this.email}:${this.apiToken}`).toString("base64")}`,
            Accept: "application/json",
          },
          params: {
            jql: `project = ${projectKey}`,
            fields: "summary",
            maxResults: maxResults,
          },
        }
      );

      return response.data.issues.map((issue) => ({
        id: issue.id,
        key: issue.key,
        summary: issue.fields.summary,
      }));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error("Unauthorized: Check your API token and email.");
      }
      throw new Error("Error fetching Jira issues");
    }
  }
}

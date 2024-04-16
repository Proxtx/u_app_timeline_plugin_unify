import { clients, refreshClients } from "../../private/clients.js";

export class App {
  constructor(config) {
    this.config = config;
  }

  async registerTimelineEvent(unifyUrl, appName, method, pArguments) {
    if (!this.client) await this.findClient();
    if (!this.client) return;

    return await this.client.request("http", "request", [
      "POST",
      this.config.url + "/api/plugin/timeline_plugin_unify/unify_action",
      JSON.stringify({
        password: this.config.pwd,
        request: {
          unifyUrl,
          method,
          appName,
          arguments: pArguments,
        },
      }),
      "application/json",
    ]);
  }

  async findClient() {
    await refreshClients();
    if (clients[this.config.client]) this.client = clients[this.config.client];
  }
}

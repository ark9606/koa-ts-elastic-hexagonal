import {injectable} from "inversify";
import {ElasticPort} from "../../../core/ports/ElasticPort";
import {Client} from "@elastic/elasticsearch";
import {StoryEntity} from "../../../core/story/Story.entity";




@injectable()
export class ElasticAdapter implements ElasticPort {
  private client: Client;
  constructor() {
    this.client = new Client({
      node: process.env.ELASTICSEARCH_URL,
      // auth: {
      //   apiKey: process.env.ELASTICSEARCH_API_KEY,
      // }
    });
  }
  public async putStories(stories: StoryEntity[]): Promise<void> {
    const res = await this.client.helpers.bulk({
      datasource: stories,
      onDocument: (doc) => ({ index: { _index: 'stories' }}),
    });
    console.log(res);
  }



}
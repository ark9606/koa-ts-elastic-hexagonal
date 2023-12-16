import {injectable} from "inversify";
import {ElasticPort, SearchStoriesInput} from "../../../core/ports/ElasticPort";
import {Client} from "@elastic/elasticsearch";
import {StoryEntity} from "../../../core/story/Story.entity";




@injectable()
export class ElasticAdapter implements ElasticPort {
  private client: Client;
  constructor() {
    this.client = new Client({
      node: process.env.ELASTICSEARCH_URL,
    });
  }
  public async putStories(stories: StoryEntity[]): Promise<void> {
    const res = await this.client.helpers.bulk({
      datasource: stories,
      onDocument: (doc) => ({ index: { _index: 'stories' }}),
    });
  }

  public async searchStories(params: SearchStoriesInput): Promise<{id: string }[]> {
    const res = await this.client.search({
      query: {
        multi_match: {
          query: params.search,
          fields: ['title^2', 'description', 'fullText'],
          minimum_should_match: 2,
        }
      },
      track_total_hits: true,
    });
    return res as any;
  }




}
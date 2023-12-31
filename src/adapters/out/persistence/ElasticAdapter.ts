import {injectable} from "inversify";
import {ElasticPort, SearchStoriesInput} from "../../../core/ports/ElasticPort.js";
import {Client} from "@elastic/elasticsearch";
import {StoryEntity} from "../../../core/story/Story.entity.js";



@injectable()
export class ElasticAdapter implements ElasticPort {
  private client: Client;

  private readonly storiesIndex = 'stories';

  constructor() {
    this.client = new Client({
      node: process.env.ELASTICSEARCH_URL,
    });
  }
  public async putStories(stories: StoryEntity[]): Promise<void> {
    const res = await this.client.helpers.bulk({
      datasource: stories,
      onDocument: (doc) => ({ index: { _index: this.storiesIndex }}),
    });
  }

  public async createIndex(): Promise<void> {
    const res = await this.client.indices.create({
      index: this.storiesIndex,
      mappings: {
        "properties": {
          "authorId": {
            "type": "keyword",
            "fields": {
              "keyword": {
                "type": "keyword",
                "ignore_above": 256
              }
            }
          },
          "category": {
            "type": "keyword",
            "fields": {
              "keyword": {
                "type": "keyword",
                "ignore_above": 256
              }
            }
          },
          "createdAt": {
            "type": "date"
          },
          "description": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword",
                "ignore_above": 256
              }
            }
          },
          "fullText": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword",
                "ignore_above": 256
              }
            }
          },
          "id": {
            "type": "keyword",
            "fields": {
              "keyword": {
                "type": "keyword",
                "ignore_above": 256
              }
            }
          },
          "liked": {
            "type": "integer"
          },
          "photoUrl": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword",
                "ignore_above": 256
              }
            }
          },
          "title": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword",
                "ignore_above": 256
              }
            }
          }
        }
      }
    });
  }


  public async searchStories(params: SearchStoriesInput): Promise<{id: string }[]> {
    // this.client.reindex()
    const res = await this.client.search({
      index: this.storiesIndex,
      query: {
        multi_match: {
          query: params.search,
          fields: ['title^2', 'description', 'fullText'],
          // type: 'phrase',
          // minimum_should_match: 2,
        }
      },
      track_total_hits: true,
    });
    return res as any;
  }

  public async getTopCategories(count: number): Promise<any> {
    const res = await this.client.search({
      index: this.storiesIndex,
      size: 0,
      aggs: {
        by_category: {
          terms: {
            field: "category",
            size: count
          }
        }
      }
    })
    const agg = res?.aggregations?.by_category;
    return (agg as any)?.buckets;
  }

  public async popularInCategory(category: string): Promise<any> {
    const res = await this.client.search({
      index: this.storiesIndex,
      size: 0,
      query: {
        match: {
          category: category,
        }
      },
      aggs: {
        popular_in_category: {
          significant_text: {
            field: "title",
          }
        }
      }
    })
    const agg = res?.aggregations?.popular_in_category;
    return (agg as any)?.buckets;
  }

  public async storiesByMonths(): Promise<any> {
    const res = await this.client.search({
      index: this.storiesIndex,
      size: 0,
      aggs: {
        stories_by_months: {
          date_histogram: {
            field: "createdAt",
            calendar_interval: "1M",
            order: {
              _count: "desc"
            }
          }
        }
      }
    })
    const agg = res?.aggregations?.stories_by_months;
    return (agg as any)?.buckets;
  }






}
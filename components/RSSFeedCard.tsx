import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { extractImageURL } from '@/lib/rss';
export type RSSFeedCardProps = {
  title: string;
  description: string;
  content: string;
  url: string;
  isoDate: string;
  guid: string;
  tags: string[];
};
export const RSSFeedCard = async (props: RSSFeedCardProps) => {
  const imageUrl = await extractImageURL(props.url);
  const date = new Date(props.isoDate);
  return (
    <Card className="h-[26rem] border-secondary/30 bg-secondary/15">
      <CardHeader className="py-4 pt-5">
        <div className="flex h-16 items-end">
          <CardTitle className="line-clamp-2 text-[22px]">
            <a href={props.guid}>{props.title}</a>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-2 mt-3">{props.description}</CardDescription>
        <div className="mb-5 flex h-12 flex-wrap items-start gap-2">
          {props.tags.map((tag, index) => (
            <div key={index} className="flex items-center">
              <Badge variant="outline">{tag}</Badge>
            </div>
          ))}
        </div>
        <div className="flex h-[10rem] justify-start">
          {imageUrl ? (
            <img className="rounded-lg" src={imageUrl} alt={props.title} />
          ) : (
            <div className="h-full w-full items-center justify-center bg-gray-200">
              <span>No Image Available</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs">{date.toDateString()}</p>
      </CardFooter>
    </Card>
  );
};

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { badgeVariants } from '@/components/ui/badge';
import { extractImageURL } from '@/lib/rss';
export type RSSFeedCardProps = {
  title: string;
  description: string;
  content: string;
  url: string;
  tags: string[];
};
export const RSSFeedCard = async (props: RSSFeedCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {props.tags.map((tag, index) => (
          <div key={index}>
            <h1 className={badgeVariants({ variant: 'outline' })}>{tag}</h1>
          </div>
        ))}
        <img src={(await extractImageURL(props.url)) ?? ''} />
      </CardContent>
    </Card>
  );
};

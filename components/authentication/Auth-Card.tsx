import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import BackButton from './BackButton';
import Socials from './Socials';

type AuthCardProps = {
  children: React.ReactNode;
  cardTitle: string;
  backButtonHref: string;
  backButtonLabel: string;
  showSocials?: boolean;
};

export const AuthCard = ({
  children,
  cardTitle,
  backButtonHref,
  backButtonLabel,
  showSocials,
}: AuthCardProps) => {
  return (
    <Card className="mx-auto w-full max-w-[22rem] scale-90 sm:max-w-lg sm:scale-100 md:max-w-xl lg:max-w-2xl">
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocials && (
        <CardFooter>
          <Socials />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
};

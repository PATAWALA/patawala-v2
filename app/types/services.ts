export interface ServiceData {
  title: string;
  shortDesc: string;
  description: string;
  ctaText: string;
  pricing: {
    startingAt: string;
    currency: string;
    type?: 'horaire' | 'mensuel' | 'hourly' | 'monthly';
  };
  features: string[];
  popular?: boolean;
}

export interface ServicesData {
  services: {
    [key: string]: ServiceData;
  };
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  filters: {
    all: string;
    web: string;
    mobile: string;
    design: string;
    consulting: string;
    ecommerce: string;
    maintenance: string;
    description: {
      [key: string]: string;
    };
  };
  card: {
    popular: string;
    from: string;
    hourly: string;
    monthly: string;
    features: {
      more: string;
    };
  };
  faq: {
    title: string;
    subtitle: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  cta: {
    title: string;
    button: string;
  };
  disclaimer: string;
}
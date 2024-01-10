import { createParam } from 'solito';

type Params = {
  id: string;
  day?: number;
};

const { useParam } = createParam<Params>();

export { useParam };

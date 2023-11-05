export enum ActivityType {
  random = '',
  education = 'education',
  recreational = 'education',
  social = 'social',
  diy = 'diy',
  charity = 'charity',
  cooking = 'cooking',
  relaxation = 'relaxation',
  music = 'music',
  busywork = 'busywork',
}

export interface BoredActivity {
  accessibility: number
  activity: string
  key: string
  link: string
  participants: number
  price: number
  type: string
}

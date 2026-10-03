export type Choice = {
  label: string
  desc: string
  type: string
}

export const choices: Choice[] = [
  {
    label: 'I have a new software idea',
    desc: 'Turn a concept into a usable product.',
    type: 'New software product',
  },
  {
    label: 'I need to replace manual work',
    desc: 'Move paper, Excel or disconnected tasks into one system.',
    type: 'Business management system',
  },
  {
    label: 'I need a mobile app',
    desc: 'Give customers or staff a focused mobile experience.',
    type: 'Mobile application',
  },
  {
    label: 'I already have software',
    desc: 'Improve its design, architecture or workflow.',
    type: 'Improve existing software',
  },
]

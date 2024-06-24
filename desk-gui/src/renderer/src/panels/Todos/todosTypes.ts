type IndvEntry = {
  uuid?: string
  label: string
  isComplete: boolean
}

type ParentEntry = IndvEntry & {
  children: IndvEntry[]
  isFrog: boolean
}

type Entries = ParentEntry[]

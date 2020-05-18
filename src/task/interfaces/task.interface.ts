import { Document } from 'mongoose';

export interface Task extends Document {
  readonly title: string;
  readonly description: string;
  readonly author: string;
  readonly executor: string;
  readonly completed: boolean;
}

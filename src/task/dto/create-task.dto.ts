export class CreateTaskDto {
  readonly title: string;
  readonly description: string;
  readonly author: string;
  readonly executor: string;
  readonly completed: boolean;
}

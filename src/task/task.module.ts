import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './schemas/task.schema';

@Module({
  imports: [MongooseModule.forFeature([{collection: 'Task',  name: 'Task', schema: TaskSchema }])],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}

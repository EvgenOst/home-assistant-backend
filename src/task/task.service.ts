import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './interfaces/task.interface';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {

    constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) { }

    async getTasks(): Promise<Task[]> {
        const tasks = await this.taskModel.find().exec();
        return tasks;
    }

    async getTask(taskID): Promise<Task> {
        const task = await this.taskModel
            .findById(taskID)
            .exec();
        return task;
    }

    async addTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const newTask = await this.taskModel(createTaskDto);
        return newTask.save();
    }

    async editTask(taskID, createTaskDto: CreateTaskDto): Promise<Task> {
        const editedTask = await this.taskModel
            .findByIdAndUpdate(taskID, createTaskDto, { new: true });
        return editedTask;
    }

    async deleteTask(taskID): Promise<any> {
        const deletedTask = await this.taskModel
            .findByIdAndRemove(taskID);
        return deletedTask;
    }

}

import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  NotFoundException,
  Post,
  Body,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ValidateObjectId } from '../shared/pipes/validate-object-id.pipes';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  async getPosts(@Res() res) {
    const tasks = await this.taskService.getTasks();
    return res.status(HttpStatus.OK).json(tasks);
  }

  @Get(':taskID')
  async getPost(@Res() res, @Param('taskID', new ValidateObjectId()) taskID) {
    const task = await this.taskService.getTask(taskID);
    if (!task) throw new NotFoundException('Post does not exist!');
    return res.status(HttpStatus.OK).json(task);
  }

  @Post()
  async addPost(@Res() res, @Body() createTaskDto: CreateTaskDto) {
    const newTask = await this.taskService.addTask(createTaskDto);
    return res.status(HttpStatus.OK).json({
      message: 'Post has been submitted successfully!',
      task: newTask,
    });
  }

  @Put('/edit')
  async editPost(
    @Res() res,
    @Query('taskID', new ValidateObjectId()) taskID,
    @Body() createTaskDTO: CreateTaskDto,
  ) {
    const editedPost = await this.taskService.editTask(taskID, createTaskDTO);
    if (!editedPost) throw new NotFoundException('Post does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Post has been successfully updated',
      post: editedPost,
    });
  }

  @Delete('/delete')
  async deletePost(
    @Res() res,
    @Query('taskID', new ValidateObjectId()) taskID,
  ) {
    const deletedPost = await this.taskService.deleteTask(taskID);
    if (!deletedPost) throw new NotFoundException('Post does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'Post has been deleted!',
      post: deletedPost,
    });
  }
}

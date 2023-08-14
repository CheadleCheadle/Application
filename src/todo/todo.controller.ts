import { Controller } from '@nestjs/common';
import { Get, Post, Body, Param } from '@nestjs/common';
import { TodoCreateDto } from './dto/create-dto.dto';
import { TodoDto } from './dto/todo.dto';
import { TodoService } from './todo.service';

@Controller('api/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TodoDto> {
    return await this.todoService.getOneTodo(id);
  }

  @Post()
  async create(@Body() todoCreateDto: TodoCreateDto): Promise<TodoDto> {
    return await this.todoService.createTodo(todoCreateDto);
  }
}

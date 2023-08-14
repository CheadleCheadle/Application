import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { todos } from 'src/mock/todos.mock';
import { v4 } from 'uuid';
import { Repository } from 'typeorm';
import { TodoEntity } from './entity/todo.entity';
import { TodoDto } from './dto/todo.dto';
import { toPromise } from 'src/shared/utils';
import { TodoCreateDto } from './dto/create-dto.dto';
import { toTodoDto } from 'src/shared/mapper';

@Injectable()
export class TodoService {
    todos: TodoEntity[] = todos;
    async getOneTodo(id: string): Promise<TodoDto> {
        const todo = this.todos.find(todo => todo.id === id);

        if (!todo) {
            throw new HttpException(`Todo item doesn't exist`, HttpStatus.BAD_REQUEST);
        }

        return toPromise(toTodoDto(todo));
    }

    async createTodo(todoDto: TodoCreateDto): Promise<TodoDto> {
        const { name, description } = todoDto;

        const todo: TodoEntity = {
            id: v4(),
            name,
            description,
        };

        this.todos.push(todo);
        return toPromise(toTodoDto(todo));
    }

}







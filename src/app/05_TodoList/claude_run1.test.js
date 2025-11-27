import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent, Todo } from './todo-list.component';
import { By } from '@angular/platform-browser';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
  });

  describe('rendering', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should not render todo list when todos array is empty', () => {
      component.todos = [];
      fixture.detectChanges();

      const todoList = fixture.debugElement.query(By.css('[data-testid="todo-list"]'));
      expect(todoList).toBeNull();
    });

    it('should render todo list when todos array has items', () => {
      component.todos = [
        { id: '1', title: 'Test Todo', completed: false },
      ];
      fixture.detectChanges();

      const todoList = fixture.debugElement.query(By.css('[data-testid="todo-list"]'));
      expect(todoList).toBeTruthy();
    });

    it('should render correct number of todo items', () => {
      component.todos = [
        { id: '1', title: 'Todo 1', completed: false },
        { id: '2', title: 'Todo 2', completed: true },
        { id: '3', title: 'Todo 3', completed: false },
      ];
      fixture.detectChanges();

      const todoItems = fixture.debugElement.queryAll(By.css('.todo-list li'));
      expect(todoItems.length).toBe(3);
    });

    it('should render todo title correctly', () => {
      component.todos = [
        { id: '1', title: 'My Test Todo', completed: false },
      ];
      fixture.detectChanges();

      const label = fixture.debugElement.query(By.css('label'));
      expect(label.nativeElement.textContent).toBe('My Test Todo');
    });

    it('should render checkbox as checked for completed todo', () => {
      component.todos = [
        { id: '1', title: 'Completed Todo', completed: true },
      ];
      fixture.detectChanges();

      const checkbox = fixture.debugElement.query(By.css('.toggle'));
      expect(checkbox.nativeElement.checked).toBe(true);
    });

    it('should render checkbox as unchecked for incomplete todo', () => {
      component.todos = [
        { id: '1', title: 'Incomplete Todo', completed: false },
      ];
      fixture.detectChanges();

      const checkbox = fixture.debugElement.query(By.css('.toggle'));
      expect(checkbox.nativeElement.checked).toBe(false);
    });

    it('should apply completed class to completed todo item', () => {
      component.todos = [
        { id: '1', title: 'Completed Todo', completed: true },
      ];
      fixture.detectChanges();

      const todoItem = fixture.debugElement.query(By.css('.todo-list li'));
      expect(todoItem.nativeElement.classList.contains('completed')).toBe(true);
    });

    it('should not apply completed class to incomplete todo item', () => {
      component.todos = [
        { id: '1', title: 'Incomplete Todo', completed: false },
      ];
      fixture.detectChanges();

      const todoItem = fixture.debugElement.query(By.css('.todo-list li'));
      expect(todoItem.nativeElement.classList.contains('completed')).toBe(false);
    });

    it('should render destroy button for each todo', () => {
      component.todos = [
        { id: '1', title: 'Todo 1', completed: false },
        { id: '2', title: 'Todo 2', completed: true },
      ];
      fixture.detectChanges();

      const destroyButtons = fixture.debugElement.queryAll(By.css('.destroy'));
      expect(destroyButtons.length).toBe(2);
    });
  });

  describe('user interactions', () => {
    it('should call toggleTodo when checkbox is clicked', () => {
      const todo: Todo = { id: '1', title: 'Test Todo', completed: false };
      component.todos = [todo];
      fixture.detectChanges();

      const toggleSpy = jest.spyOn(component, 'toggleTodo');
      const checkbox = fixture.debugElement.query(By.css('.toggle'));
      checkbox.nativeElement.click();

      expect(toggleSpy).toHaveBeenCalledWith(todo);
    });

    it('should call removeTodo when destroy button is clicked', () => {
      const todo: Todo = { id: '1', title: 'Test Todo', completed: false };
      component.todos = [todo];
      fixture.detectChanges();

      const removeSpy = jest.spyOn(component, 'removeTodo');
      const destroyButton = fixture.debugElement.query(By.css('.destroy'));
      destroyButton.nativeElement.click();

      expect(removeSpy).toHaveBeenCalledWith(todo);
    });

    it('should toggle correct todo when multiple todos exist', () => {
      const todo1: Todo = { id: '1', title: 'Todo 1', completed: false };
      const todo2: Todo = { id: '2', title: 'Todo 2', completed: true };
      component.todos = [todo1, todo2];
      fixture.detectChanges();

      const toggleSpy = jest.spyOn(component, 'toggleTodo');
      const checkboxes = fixture.debugElement.queryAll(By.css('.toggle'));
      checkboxes[1].nativeElement.click();

      expect(toggleSpy).toHaveBeenCalledWith(todo2);
    });

    it('should remove correct todo when multiple todos exist', () => {
      const todo1: Todo = { id: '1', title: 'Todo 1', completed: false };
      const todo2: Todo = { id: '2', title: 'Todo 2', completed: true };
      component.todos = [todo1, todo2];
      fixture.detectChanges();

      const removeSpy = jest.spyOn(component, 'removeTodo');
      const destroyButtons = fixture.debugElement.queryAll(By.css('.destroy'));
      destroyButtons[0].nativeElement.click();

      expect(removeSpy).toHaveBeenCalledWith(todo1);
    });
  });

  describe('toggleTodo method', () => {
    it('should toggle completed from false to true', () => {
      const todo: Todo = { id: '1', title: 'Test Todo', completed: false };
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      component.toggleTodo(todo);

      expect(todo.completed).toBe(true);
      expect(consoleSpy).toHaveBeenCalledWith('Toggled todo:', todo);

      consoleSpy.mockRestore();
    });

    it('should toggle completed from true to false', () => {
      const todo: Todo = { id: '1', title: 'Test Todo', completed: true };
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      component.toggleTodo(todo);

      expect(todo.completed).toBe(false);
      expect(consoleSpy).toHaveBeenCalledWith('Toggled todo:', todo);

      consoleSpy.mockRestore();
    });

    it('should update the view when todo is toggled', () => {
      component.todos = [
        { id: '1', title: 'Test Todo', completed: false },
      ];
      fixture.detectChanges();

      const checkbox = fixture.debugElement.query(By.css('.toggle'));
      checkbox.nativeElement.click();
      fixture.detectChanges();

      const todoItem = fixture.debugElement.query(By.css('.todo-list li'));
      expect(todoItem.nativeElement.classList.contains('completed')).toBe(true);
    });
  });

  describe('removeTodo method', () => {
    it('should log the todo being removed', () => {
      const todo: Todo = { id: '1', title: 'Test Todo', completed: false };
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      component.removeTodo(todo);

      expect(consoleSpy).toHaveBeenCalledWith('Removing todo:', todo);

      consoleSpy.mockRestore();
    });

    it('should log todo with all properties', () => {
      const todo: Todo = { id: '123', title: 'Complete Task', completed: true };
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      component.removeTodo(todo);

      expect(consoleSpy).toHaveBeenCalledWith('Removing todo:', {
        id: '123',
        title: 'Complete Task',
        completed: true,
      });

      consoleSpy.mockRestore();
    });
  });

  describe('props and state', () => {
    it('should have default empty todos array', () => {
      expect(component.todos).toEqual([]);
    });

    it('should accept todos as input', () => {
      const todos: Todo[] = [
        { id: '1', title: 'Todo 1', completed: false },
        { id: '2', title: 'Todo 2', completed: true },
      ];
      component.todos = todos;
      fixture.detectChanges();

      expect(component.todos).toEqual(todos);
    });

    it('should handle todos without id property', () => {
      component.todos = [
        { title: 'Todo without id', completed: false },
      ];
      fixture.detectChanges();

      const todoList = fixture.debugElement.query(By.css('[data-testid="todo-list"]'));
      expect(todoList).toBeTruthy();

      const label = fixture.debugElement.query(By.css('label'));
      expect(label.nativeElement.textContent).toBe('Todo without id');
    });

    it('should update view when todos input changes', () => {
      component.todos = [
        { id: '1', title: 'Initial Todo', completed: false },
      ];
      fixture.detectChanges();

      let todoItems = fixture.debugElement.queryAll(By.css('.todo-list li'));
      expect(todoItems.length).toBe(1);

      component.todos = [
        { id: '1', title: 'Initial Todo', completed: false },
        { id: '2', title: 'New Todo', completed: true },
      ];
      fixture.detectChanges();

      todoItems = fixture.debugElement.queryAll(By.css('.todo-list li'));
      expect(todoItems.length).toBe(2);
    });

    it('should hide list when all todos are removed', () => {
      component.todos = [
        { id: '1', title: 'Only Todo', completed: false },
      ];
      fixture.detectChanges();

      let todoList = fixture.debugElement.query(By.css('[data-testid="todo-list"]'));
      expect(todoList).toBeTruthy();

      component.todos = [];
      fixture.detectChanges();

      todoList = fixture.debugElement.query(By.css('[data-testid="todo-list"]'));
      expect(todoList).toBeNull();
    });
  });

  describe('edge cases', () => {
    it('should handle todo with empty title', () => {
      component.todos = [
        { id: '1', title: '', completed: false },
      ];
      fixture.detectChanges();

      const label = fixture.debugElement.query(By.css('label'));
      expect(label.nativeElement.textContent).toBe('');
    });

    it('should handle todo with special characters in title', () => {
      component.todos = [
        { id: '1', title: '<script>alert("xss")</script>', completed: false },
      ];
      fixture.detectChanges();

      const label = fixture.debugElement.query(By.css('label'));
      expect(label.nativeElement.textContent).toBe('<script>alert("xss")</script>');
    });

    it('should handle large number of todos', () => {
      const largeTodoList: Todo[] = Array.from({ length: 100 }, (_, i) => ({
        id: String(i),
        title: `Todo ${i}`,
        completed: i % 2 === 0,
      }));
      component.todos = largeTodoList;
      fixture.detectChanges();

      const todoItems = fixture.debugElement.queryAll(By.css('.todo-list li'));
      expect(todoItems.length).toBe(100);
    });

    it('should correctly display mixed completed and incomplete todos', () => {
      component.todos = [
        { id: '1', title: 'Incomplete 1', completed: false },
        { id: '2', title: 'Complete 1', completed: true },
        { id: '3', title: 'Incomplete 2', completed: false },
        { id: '4', title: 'Complete 2', completed: true },
      ];
      fixture.detectChanges();

      const todoItems = fixture.debugElement.queryAll(By.css('.todo-list li'));
      
      expect(todoItems[0].nativeElement.classList.contains('completed')).toBe(false);
      expect(todoItems[1].nativeElement.classList.contains('completed')).toBe(true);
      expect(todoItems[2].nativeElement.classList.contains('completed')).toBe(false);
      expect(todoItems[3].nativeElement.classList.contains('completed')).toBe(true);
    });
  });
});
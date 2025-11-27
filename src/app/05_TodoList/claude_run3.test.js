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

    it('should render todo titles correctly', () => {
      component.todos = [
        { id: '1', title: 'First Todo', completed: false },
        { id: '2', title: 'Second Todo', completed: true },
      ];
      fixture.detectChanges();

      const labels = fixture.debugElement.queryAll(By.css('.todo-list li label'));
      expect(labels[0].nativeElement.textContent).toBe('First Todo');
      expect(labels[1].nativeElement.textContent).toBe('Second Todo');
    });

    it('should apply completed class to completed todos', () => {
      component.todos = [
        { id: '1', title: 'Incomplete Todo', completed: false },
        { id: '2', title: 'Completed Todo', completed: true },
      ];
      fixture.detectChanges();

      const todoItems = fixture.debugElement.queryAll(By.css('.todo-list li'));
      expect(todoItems[0].nativeElement.classList.contains('completed')).toBe(false);
      expect(todoItems[1].nativeElement.classList.contains('completed')).toBe(true);
    });

    it('should render checkbox with correct checked state', () => {
      component.todos = [
        { id: '1', title: 'Incomplete Todo', completed: false },
        { id: '2', title: 'Completed Todo', completed: true },
      ];
      fixture.detectChanges();

      const checkboxes = fixture.debugElement.queryAll(By.css('.toggle'));
      expect(checkboxes[0].nativeElement.checked).toBe(false);
      expect(checkboxes[1].nativeElement.checked).toBe(true);
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

    it('should toggle the correct todo when multiple todos exist', () => {
      const todo1: Todo = { id: '1', title: 'Todo 1', completed: false };
      const todo2: Todo = { id: '2', title: 'Todo 2', completed: true };
      component.todos = [todo1, todo2];
      fixture.detectChanges();

      const toggleSpy = jest.spyOn(component, 'toggleTodo');
      const checkboxes = fixture.debugElement.queryAll(By.css('.toggle'));
      checkboxes[1].nativeElement.click();

      expect(toggleSpy).toHaveBeenCalledWith(todo2);
    });

    it('should remove the correct todo when multiple todos exist', () => {
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

  describe('state changes', () => {
    it('should toggle completed state from false to true', () => {
      const todo: Todo = { id: '1', title: 'Test Todo', completed: false };
      component.todos = [todo];
      fixture.detectChanges();

      component.toggleTodo(todo);

      expect(todo.completed).toBe(true);
    });

    it('should toggle completed state from true to false', () => {
      const todo: Todo = { id: '1', title: 'Test Todo', completed: true };
      component.todos = [todo];
      fixture.detectChanges();

      component.toggleTodo(todo);

      expect(todo.completed).toBe(false);
    });

    it('should log when toggling todo', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      const todo: Todo = { id: '1', title: 'Test Todo', completed: false };
      component.todos = [todo];
      fixture.detectChanges();

      component.toggleTodo(todo);

      expect(consoleSpy).toHaveBeenCalledWith('Toggled todo:', todo);
      consoleSpy.mockRestore();
    });

    it('should log when removing todo', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      const todo: Todo = { id: '1', title: 'Test Todo', completed: false };
      component.todos = [todo];
      fixture.detectChanges();

      component.removeTodo(todo);

      expect(consoleSpy).toHaveBeenCalledWith('Removing todo:', todo);
      consoleSpy.mockRestore();
    });

    it('should update view when todo is toggled via click', () => {
      const todo: Todo = { id: '1', title: 'Test Todo', completed: false };
      component.todos = [todo];
      fixture.detectChanges();

      const checkbox = fixture.debugElement.query(By.css('.toggle'));
      checkbox.nativeElement.click();
      fixture.detectChanges();

      const todoItem = fixture.debugElement.query(By.css('.todo-list li'));
      expect(todoItem.nativeElement.classList.contains('completed')).toBe(true);
    });
  });

  describe('props and inputs', () => {
    it('should have empty todos array by default', () => {
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

    it('should handle todo without id property', () => {
      const todo: Todo = { title: 'No ID Todo', completed: false };
      component.todos = [todo];
      fixture.detectChanges();

      const todoItems = fixture.debugElement.queryAll(By.css('.todo-list li'));
      expect(todoItems.length).toBe(1);
      expect(todoItems[0].query(By.css('label')).nativeElement.textContent).toBe('No ID Todo');
    });

    it('should update when todos input changes', () => {
      component.todos = [{ id: '1', title: 'Initial Todo', completed: false }];
      fixture.detectChanges();

      let todoItems = fixture.debugElement.queryAll(By.css('.todo-list li'));
      expect(todoItems.length).toBe(1);

      component.todos = [
        { id: '1', title: 'Todo 1', completed: false },
        { id: '2', title: 'Todo 2', completed: true },
      ];
      fixture.detectChanges();

      todoItems = fixture.debugElement.queryAll(By.css('.todo-list li'));
      expect(todoItems.length).toBe(2);
    });

    it('should hide list when todos becomes empty', () => {
      component.todos = [{ id: '1', title: 'Test Todo', completed: false }];
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
    it('should handle todos with empty title', () => {
      component.todos = [{ id: '1', title: '', completed: false }];
      fixture.detectChanges();

      const label = fixture.debugElement.query(By.css('.todo-list li label'));
      expect(label.nativeElement.textContent).toBe('');
    });

    it('should handle todos with special characters in title', () => {
      component.todos = [{ id: '1', title: '<script>alert("xss")</script>', completed: false }];
      fixture.detectChanges();

      const label = fixture.debugElement.query(By.css('.todo-list li label'));
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

    it('should handle rapid toggle clicks', () => {
      const todo: Todo = { id: '1', title: 'Test Todo', completed: false };
      component.todos = [todo];
      fixture.detectChanges();

      const checkbox = fixture.debugElement.query(By.css('.toggle'));
      
      checkbox.nativeElement.click();
      expect(todo.completed).toBe(true);
      
      checkbox.nativeElement.click();
      expect(todo.completed).toBe(false);
      
      checkbox.nativeElement.click();
      expect(todo.completed).toBe(true);
    });
  });
});
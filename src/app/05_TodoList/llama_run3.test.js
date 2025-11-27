import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TodoListComponent } from './todo-list.component';
import { Todo } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log');
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not render todo list when todos is empty', () => {
    component.todos = [];
    fixture.detectChanges();
    const todoList = fixture.debugElement.query(By.css('[data-testid="todo-list"]'));
    expect(todoList).toBeNull();
  });

  it('should render todo list when todos is not empty', () => {
    component.todos = [
      { id: '1', title: 'Todo 1', completed: false },
      { id: '2', title: 'Todo 2', completed: true },
    ];
    fixture.detectChanges();
    const todoList = fixture.debugElement.query(By.css('[data-testid="todo-list"]'));
    expect(todoList.nativeElement.children.length).toBe(2);
  });

  it('should call toggleTodo on checkbox click', () => {
    component.todos = [
      { id: '1', title: 'Todo 1', completed: false },
    ];
    fixture.detectChanges();
    const todoCheckbox = fixture.debugElement.query(By.css('input[type="checkbox"]'));
    todoCheckbox.nativeElement.click();
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith('Toggled todo:', { id: '1', title: 'Todo 1', completed: true });
  });

  it('should call removeTodo on button click', () => {
    component.todos = [
      { id: '1', title: 'Todo 1', completed: false },
    ];
    fixture.detectChanges();
    const todoButton = fixture.debugElement.query(By.css('button.destroy'));
    todoButton.nativeElement.click();
    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith('Removing todo:', { id: '1', title: 'Todo 1', completed: false });
  });
});
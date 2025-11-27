import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TodoListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
  });

  it('renders todo list when todos are provided', () => {
    component.todos = [
      { id: '1', title: 'Todo 1', completed: false },
      { id: '2', title: 'Todo 2', completed: true },
    ];
    fixture.detectChanges();
    const todoListElement = fixture.debugElement.query(By.css('[data-testid="todo-list"]'));
    expect(todoListElement.nativeElement.childElementCount).toBe(2);
  });

  it('does not render todo list when todos are empty', () => {
    component.todos = [];
    fixture.detectChanges();
    const todoListElement = fixture.debugElement.query(By.css('[data-testid="todo-list"]'));
    expect(todoListElement).toBeNull();
  });

  it('calls toggleTodo on checkbox click', () => {
    component.todos = [
      { id: '1', title: 'Todo 1', completed: false },
    ];
    fixture.detectChanges();
    const checkboxElement = fixture.debugElement.query(By.css('.toggle'));
    const toggleTodoSpy = jest.spyOn(component, 'toggleTodo');
    checkboxElement.nativeElement.click();
    expect(toggleTodoSpy).toHaveBeenCalledTimes(1);
  });

  it('calls removeTodo on destroy button click', () => {
    component.todos = [
      { id: '1', title: 'Todo 1', completed: false },
    ];
    fixture.detectChanges();
    const destroyButtonElement = fixture.debugElement.query(By.css('.destroy'));
    const removeTodoSpy = jest.spyOn(component, 'removeTodo');
    destroyButtonElement.nativeElement.click();
    expect(removeTodoSpy).toHaveBeenCalledTimes(1);
  });
});
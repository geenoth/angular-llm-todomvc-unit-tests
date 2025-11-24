// add-todo-input.component.spec.ts
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AddTodoInputComponent } from './add-todo-input.component';
import { FormsModule } from '@angular/forms';

describe('AddTodoInputComponent', () => {
  let component;
  let fixture;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [AddTodoInputComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTodoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders correctly', () => {
    const inputElement = fixture.nativeElement.querySelector('[data-testid="add-todo-input"]');
    expect(inputElement).toBeTruthy();
  });

  it('updates title on input change', () => {
    const inputElement = fixture.nativeElement.querySelector('[data-testid="add-todo-input"]');
    inputElement.value = 'New todo title';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.title).toBe('New todo title');
  });

  it('calls addTodo on enter key press', () => {
    const inputElement = fixture.nativeElement.querySelector('[data-testid="add-todo-input"]');
    inputElement.value = 'New todo title';
    inputElement.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, cancelable: true, keyCode: 13 }));
    expect(console.log).toHaveBeenCalledTimes(1);
    expect(component.title).toBe('');
  });

  it('does not call addTodo on empty input', () => {
    const inputElement = fixture.nativeElement.querySelector('[data-testid="add-todo-input"]');
    inputElement.value = '';
    inputElement.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, cancelable: true, keyCode: 13 }));
    expect(console.log).not.toHaveBeenCalled();
  });
});
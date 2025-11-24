// add-todo-input.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTodoInputComponent } from './add-todo-input.component';
import { By } from '@angular/platform-browser';

describe('AddTodoInputComponent', () => {
  let fixture;
  let component;
  let inputEl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTodoInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTodoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    inputEl = fixture.debugElement.query(
      By.css('[data-testid="add-todo-input"]')
    ).nativeElement;
  });

  test('should render input correctly', () => {
    expect(inputEl).toBeTruthy();
    expect(inputEl.placeholder).toBe('What needs to be done?');
    expect(inputEl.classList.contains('new-todo')).toBe(true);
  });

  test('should bind input value to component title', () => {
    inputEl.value = 'Buy milk';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.title).toBe('Buy milk');
  });

  test('should call addTodo and clear input on Enter when title is valid', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    inputEl.value = 'New Todo';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    inputEl.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
    fixture.detectChanges();

    expect(consoleSpy).toHaveBeenCalledWith('Todo added:', 'New Todo');
    expect(component.title).toBe('');
    expect(inputEl.value).toBe('');

    consoleSpy.mockRestore();
  });

  test('should NOT call addTodo when title is empty or whitespace', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    inputEl.value = '   ';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    inputEl.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
    fixture.detectChanges();

    expect(consoleSpy).not.toHaveBeenCalled();
    expect(component.title).toBe('   ');
    expect(inputEl.value).toBe('   ');

    consoleSpy.mockRestore();
  });
});

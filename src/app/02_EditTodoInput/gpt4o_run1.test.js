import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { EditTodoInputComponent } from './edit-todo-input.component';

describe('EditTodoInputComponent', () => {
  let component;
  let fixture;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, EditTodoInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditTodoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render input with correct initial value', () => {
    component.initialValue = 'Test Todo';
    fixture.detectChanges();

    const inputElement = fixture.debugElement.query(By.css('[data-testid="edit-todo-input"]')).nativeElement;
    expect(inputElement.value).toBe('Test Todo');
  });

  it('should update "editTitle" when input value changes', async () => {
    const inputElement = fixture.debugElement.query(By.css('[data-testid="edit-todo-input"]')).nativeElement;

    inputElement.value = 'Updated title';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.editTitle).toBe('Updated title');
  });

  it('should call "updateTodo" method on pressing Enter', () => {
    const updateTodoSpy = jest.spyOn(component, 'updateTodo');
    const inputElement = fixture.debugElement.query(By.css('[data-testid="edit-todo-input"]')).nativeElement;

    inputElement.value = 'Another Todo';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const event = new KeyboardEvent('keyup', { key: 'Enter' });
    inputElement.dispatchEvent(event);

    expect(updateTodoSpy).toHaveBeenCalled();
  });

  it('should log "Todo updated" when "updateTodo" is called with a non-empty input', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    component.editTitle = 'Valid Todo';
    component.updateTodo();

    expect(consoleSpy).toHaveBeenCalledWith('Todo updated:', 'Valid Todo');

    consoleSpy.mockRestore();
  });

  it('should not log anything when "updateTodo" is called with an empty input', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    component.editTitle = '   ';
    component.updateTodo();

    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('should call "handleBlur" method on blur event', () => {
    const handleBlurSpy = jest.spyOn(component, 'handleBlur');
    const inputElement = fixture.debugElement.query(By.css('[data-testid="edit-todo-input"]')).nativeElement;

    inputElement.dispatchEvent(new Event('blur'));

    expect(handleBlurSpy).toHaveBeenCalled();
  });

  it('should log "Edit finished" when "handleBlur" is called', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    component.handleBlur();

    expect(consoleSpy).toHaveBeenCalledWith('Edit finished');

    consoleSpy.mockRestore();
  });
});
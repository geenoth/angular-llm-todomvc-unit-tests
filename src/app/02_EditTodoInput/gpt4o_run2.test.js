import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { EditTodoInputComponent } from './edit-todo-input.component';
import { By } from '@angular/platform-browser';

describe('EditTodoInputComponent', () => {
  let component;
  let fixture;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [EditTodoInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditTodoInputComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render input with correct initial value', () => {
    component.initialValue = 'Test Todo';
    fixture.detectChanges();

    const inputElement = fixture.debugElement.query(By.css('.edit')).nativeElement;
    expect(inputElement.value).toBe('Test Todo');
  });

  it('should update the editTitle when the input value is changed', () => {
    const inputElement = fixture.debugElement.query(By.css('.edit')).nativeElement;

    inputElement.value = 'Updated Todo';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.editTitle).toBe('Updated Todo');
  });

  it('should call updateTodo() and log "Todo updated" on Enter key', () => {
    const inputElement = fixture.debugElement.query(By.css('.edit')).nativeElement;
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    component.editTitle = 'Updated Todo';
    fixture.detectChanges();

    inputElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
    fixture.detectChanges();

    expect(consoleLogSpy).toHaveBeenCalledWith('Todo updated:', 'Updated Todo');
    consoleLogSpy.mockRestore();
  });

  it('should call handleBlur() and log "Edit finished" when input is blurred', () => {
    const inputElement = fixture.debugElement.query(By.css('.edit')).nativeElement;
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    inputElement.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(consoleLogSpy).toHaveBeenCalledWith('Edit finished');
    consoleLogSpy.mockRestore();
  });

  it('should not call updateTodo() if editTitle is empty or whitespace', () => {
    const inputElement = fixture.debugElement.query(By.css('.edit')).nativeElement;
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    component.editTitle = '   ';
    fixture.detectChanges();

    inputElement.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
    fixture.detectChanges();

    expect(consoleLogSpy).not.toHaveBeenCalledWith('Todo updated:', '   ');
    consoleLogSpy.mockRestore();
  });
});
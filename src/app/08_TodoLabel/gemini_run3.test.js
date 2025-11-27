import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TodoLabelComponent } from './todo-label.component';

describe('TodoLabelComponent', () => {
  let component: TodoLabelComponent;
  let fixture: ComponentFixture<TodoLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoLabelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoLabelComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the label with default empty text', () => {
    fixture.detectChanges();
    const labelElement = fixture.debugElement.query(By.css('[data-testid="todo-label"]'));
    expect(labelElement.nativeElement.textContent.trim()).toBe('');
  });

  it('should display the text passed as input', () => {
    const testText = 'My Todo Item';
    component.text = testText;
    fixture.detectChanges();
    const labelElement = fixture.debugElement.query(By.css('[data-testid="todo-label"]'));
    expect(labelElement.nativeElement.textContent.trim()).toBe(testText);
  });

  it('should not have the "completed" class when isCompleted is false', () => {
    component.isCompleted = false;
    fixture.detectChanges();
    const labelElement = fixture.debugElement.query(By.css('[data-testid="todo-label"]'));
    expect(labelElement.nativeElement.classList.contains('completed')).toBe(false);
  });

  it('should have the "completed" class when isCompleted is true', () => {
    component.isCompleted = true;
    fixture.detectChanges();
    const labelElement = fixture.debugElement.query(By.css('[data-testid="todo-label"]'));
    expect(labelElement.nativeElement.classList.contains('completed')).toBe(true);
  });

  it('should call startEdit on double-click', () => {
    jest.spyOn(component, 'startEdit');
    const labelElement = fixture.debugElement.query(By.css('[data-testid="todo-label"]'));
    labelElement.triggerEventHandler('dblclick', null);
    fixture.detectChanges();
    expect(component.startEdit).toHaveBeenCalled();
  });

  it('should log to console when startEdit is called', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    component.startEdit();
    expect(consoleSpy).toHaveBeenCalledWith('Edit started');
  });
});
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoLabelComponent } from './todo-label.component';
import { By } from '@angular/platform-browser';

describe('TodoLabelComponent', () => {
  let component: TodoLabelComponent;
  let fixture: ComponentFixture<TodoLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoLabelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the label with the provided text', () => {
    component.text = 'Test Label';
    fixture.detectChanges();

    const labelElement = fixture.debugElement.query(
      By.css('[data-testid="todo-label"]')
    );
    expect(labelElement.nativeElement.textContent.trim()).toBe('Test Label');
  });

  it('should apply completed class when isCompleted is true', () => {
    component.isCompleted = true;
    fixture.detectChanges();

    const labelElement = fixture.debugElement.query(
      By.css('[data-testid="todo-label"]')
    );
    expect(labelElement.nativeElement.classList).toContain('completed');
  });

  it('should not apply completed class when isCompleted is false', () => {
    component.isCompleted = false;
    fixture.detectChanges();

    const labelElement = fixture.debugElement.query(
      By.css('[data-testid="todo-label"]')
    );
    expect(labelElement.nativeElement.classList).not.toContain('completed');
  });

  it('should call startEdit and log when label is double-clicked', () => {
    const spy = jest.spyOn(component, 'startEdit');
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    const labelElement = fixture.debugElement.query(
      By.css('[data-testid="todo-label"]')
    );
    labelElement.nativeElement.dispatchEvent(new MouseEvent('dblclick'));
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith('Edit started');

    consoleSpy.mockRestore();
  });

  it('should handle empty text input gracefully', () => {
    component.text = '';
    fixture.detectChanges();

    const labelElement = fixture.debugElement.query(
      By.css('[data-testid="todo-label"]')
    );
    expect(labelElement.nativeElement.textContent.trim()).toBe('');
  });
});
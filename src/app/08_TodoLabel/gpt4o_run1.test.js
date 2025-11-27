import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoLabelComponent } from './todo-label.component';
import { By } from '@angular/platform-browser';

describe('TodoLabelComponent', () => {
  let component: TodoLabelComponent;
  let fixture: ComponentFixture<TodoLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoLabelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the label with the correct text', () => {
    component.text = 'Sample Todo';
    fixture.detectChanges();

    const label = fixture.debugElement.query(By.css('[data-testid="todo-label"]'));
    expect(label).toBeTruthy();
    expect(label.nativeElement.textContent.trim()).toBe('Sample Todo');
  });

  it('should apply the "completed" class when isCompleted is true', () => {
    component.isCompleted = true;
    fixture.detectChanges();

    const label = fixture.debugElement.query(By.css('[data-testid="todo-label"]'));
    expect(label.nativeElement.classList).toContain('completed');
  });

  it('should not have the "completed" class when isCompleted is false', () => {
    component.isCompleted = false;
    fixture.detectChanges();

    const label = fixture.debugElement.query(By.css('[data-testid="todo-label"]'));
    expect(label.nativeElement.classList).not.toContain('completed');
  });

  it('should call startEdit method when label is double-clicked', () => {
    jest.spyOn(component, 'startEdit');
    const label = fixture.debugElement.query(By.css('[data-testid="todo-label"]'));

    label.nativeElement.dispatchEvent(new MouseEvent('dblclick'));
    expect(component.startEdit).toHaveBeenCalled();
  });

  it('should log "Edit started" when startEdit is called', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    component.startEdit();

    expect(consoleSpy).toHaveBeenCalledWith('Edit started');
    consoleSpy.mockRestore();
  });
});
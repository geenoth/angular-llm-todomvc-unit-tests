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
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the label with correct text', () => {
    component.text = 'Test Todo Label';
    fixture.detectChanges();

    const labelElement = fixture.debugElement.query(By.css('[data-testid="todo-label"]')).nativeElement;
    expect(labelElement.textContent).toBe('Test Todo Label');
  });

  it('should apply "completed" class if isCompleted is true', () => {
    component.isCompleted = true;
    fixture.detectChanges();

    const labelElement = fixture.debugElement.query(By.css('[data-testid="todo-label"]')).nativeElement;
    expect(labelElement.classList).toContain('completed');
  });

  it('should not apply "completed" class if isCompleted is false', () => {
    component.isCompleted = false;
    fixture.detectChanges();

    const labelElement = fixture.debugElement.query(By.css('[data-testid="todo-label"]')).nativeElement;
    expect(labelElement.classList).not.toContain('completed');
  });

  it('should call startEdit() and log "Edit started" on double-click', () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    fixture.detectChanges();

    const labelElement = fixture.debugElement.query(By.css('[data-testid="todo-label"]')).nativeElement;
    labelElement.dispatchEvent(new Event('dblclick'));
    fixture.detectChanges();

    expect(consoleLogSpy).toHaveBeenCalledWith('Edit started');
    consoleLogSpy.mockRestore();
  });
});
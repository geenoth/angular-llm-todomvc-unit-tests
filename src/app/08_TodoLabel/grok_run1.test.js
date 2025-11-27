import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoLabelComponent } from './todo-label.component';

describe('TodoLabelComponent', () => {
  let component: TodoLabelComponent;
  let fixture: ComponentFixture<TodoLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoLabelComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the provided text', () => {
    component.text = 'Test Todo';
    fixture.detectChanges();
    const labelElement = fixture.nativeElement.querySelector('[data-testid="todo-label"]');
    expect(labelElement.textContent.trim()).toBe('Test Todo');
  });

  it('should apply completed class when isCompleted is true', () => {
    component.isCompleted = true;
    fixture.detectChanges();
    const labelElement = fixture.nativeElement.querySelector('[data-testid="todo-label"]');
    expect(labelElement.classList).toContain('completed');
  });

  it('should not apply completed class when isCompleted is false', () => {
    component.isCompleted = false;
    fixture.detectChanges();
    const labelElement = fixture.nativeElement.querySelector('[data-testid="todo-label"]');
    expect(labelElement.classList).not.toContain('completed');
  });

  it('should call startEdit on double click', () => {
    jest.spyOn(component, 'startEdit');
    const labelElement = fixture.nativeElement.querySelector('[data-testid="todo-label"]');
    labelElement.dispatchEvent(new Event('dblclick'));
    expect(component.startEdit).toHaveBeenCalled();
  });

  it('should log message when startEdit is called', () => {
    jest.spyOn(console, 'log');
    component.startEdit();
    expect(console.log).toHaveBeenCalledWith('Edit started');
  });
});
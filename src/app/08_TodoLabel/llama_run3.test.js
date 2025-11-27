import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TodoLabelComponent } from './todo-label.component';

describe('TodoLabelComponent', () => {
  let component: TodoLabelComponent;
  let fixture: ComponentFixture<TodoLabelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TodoLabelComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoLabelComponent);
    component = fixture.componentInstance;
  });

  it('renders label correctly', () => {
    component.text = 'Todo label';
    component.isCompleted = false;
    fixture.detectChanges();
    const labelElement = fixture.debugElement.query(By.css('[data-testid="todo-label"]'));
    expect(labelElement.nativeElement.textContent).toBe('Todo label');
  });

  it('adds completed class when isCompleted is true', () => {
    component.text = 'Todo label';
    component.isCompleted = true;
    fixture.detectChanges();
    const labelElement = fixture.debugElement.query(By.css('[data-testid="todo-label"]'));
    expect(labelElement.nativeElement.classList.contains('completed')).toBe(true);
  });

  it('calls startEdit on double click', () => {
    component.text = 'Todo label';
    fixture.detectChanges();
    const labelElement = fixture.debugElement.query(By.css('[data-testid="todo-label"]'));
    const startEditSpy = jest.spyOn(component, 'startEdit');
    labelElement.nativeElement.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
    expect(startEditSpy).toHaveBeenCalledTimes(1);
  });
});
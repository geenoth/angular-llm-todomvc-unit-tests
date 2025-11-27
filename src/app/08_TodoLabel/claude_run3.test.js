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
    fixture.detectChanges();
  });

  describe('rendering', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should render the label element with data-testid', () => {
      const labelElement = fixture.debugElement.query(By.css('[data-testid="todo-label"]'));
      expect(labelElement).toBeTruthy();
    });

    it('should render empty text by default', () => {
      const labelElement = fixture.debugElement.query(By.css('[data-testid="todo-label"]'));
      expect(labelElement.nativeElement.textContent.trim()).toBe('');
    });

    it('should render the provided text', () => {
      component.text = 'Buy groceries';
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(By.css('[data-testid="todo-label"]'));
      expect(labelElement.nativeElement.textContent.trim()).toBe('Buy groceries');
    });

    it('should render different text values', () => {
      component.text = 'Complete homework';
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(By.css('[data-testid="todo-label"]'));
      expect(labelElement.nativeElement.textContent.trim()).toBe('Complete homework');
    });
  });

  describe('props/inputs', () => {
    it('should have default text as empty string', () => {
      expect(component.text).toBe('');
    });

    it('should have default isCompleted as false', () => {
      expect(component.isCompleted).toBe(false);
    });

    it('should accept text input', () => {
      component.text = 'Test todo item';
      expect(component.text).toBe('Test todo item');
    });

    it('should accept isCompleted input as true', () => {
      component.isCompleted = true;
      expect(component.isCompleted).toBe(true);
    });

    it('should accept isCompleted input as false', () => {
      component.isCompleted = false;
      expect(component.isCompleted).toBe(false);
    });
  });

  describe('CSS class binding', () => {
    it('should not have completed class when isCompleted is false', () => {
      component.isCompleted = false;
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(By.css('[data-testid="todo-label"]'));
      expect(labelElement.nativeElement.classList.contains('completed')).toBe(false);
    });

    it('should have completed class when isCompleted is true', () => {
      component.isCompleted = true;
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(By.css('[data-testid="todo-label"]'));
      expect(labelElement.nativeElement.classList.contains('completed')).toBe(true);
    });

    it('should toggle completed class based on isCompleted changes', () => {
      const labelElement = fixture.debugElement.query(By.css('[data-testid="todo-label"]'));

      component.isCompleted = false;
      fixture.detectChanges();
      expect(labelElement.nativeElement.classList.contains('completed')).toBe(false);

      component.isCompleted = true;
      fixture.detectChanges();
      expect(labelElement.nativeElement.classList.contains('completed')).toBe(true);

      component.isCompleted = false;
      fixture.detectChanges();
      expect(labelElement.nativeElement.classList.contains('completed')).toBe(false);
    });
  });

  describe('user interactions', () => {
    it('should call startEdit on double click', () => {
      const startEditSpy = jest.spyOn(component, 'startEdit');
      const labelElement = fixture.debugElement.query(By.css('[data-testid="todo-label"]'));

      labelElement.triggerEventHandler('dblclick', null);

      expect(startEditSpy).toHaveBeenCalled();
      expect(startEditSpy).toHaveBeenCalledTimes(1);
    });

    it('should log "Edit started" when startEdit is called', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      component.startEdit();

      expect(consoleSpy).toHaveBeenCalledWith('Edit started');
      consoleSpy.mockRestore();
    });

    it('should call startEdit multiple times on multiple double clicks', () => {
      const startEditSpy = jest.spyOn(component, 'startEdit');
      const labelElement = fixture.debugElement.query(By.css('[data-testid="todo-label"]'));

      labelElement.triggerEventHandler('dblclick', null);
      labelElement.triggerEventHandler('dblclick', null);
      labelElement.triggerEventHandler('dblclick', null);

      expect(startEditSpy).toHaveBeenCalledTimes(3);
    });
  });

  describe('state changes', () => {
    it('should update displayed text when text input changes', () => {
      const labelElement = fixture.debugElement.query(By.css('[data-testid="todo-label"]'));

      component.text = 'First task';
      fixture.detectChanges();
      expect(labelElement.nativeElement.textContent.trim()).toBe('First task');

      component.text = 'Updated task';
      fixture.detectChanges();
      expect(labelElement.nativeElement.textContent.trim()).toBe('Updated task');
    });

    it('should handle empty string text', () => {
      component.text = '';
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(By.css('[data-testid="todo-label"]'));
      expect(labelElement.nativeElement.textContent.trim()).toBe('');
    });

    it('should handle text with special characters', () => {
      component.text = '<script>alert("xss")</script>';
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(By.css('[data-testid="todo-label"]'));
      expect(labelElement.nativeElement.textContent.trim()).toBe('<script>alert("xss")</script>');
    });

    it('should handle text with whitespace', () => {
      component.text = '  Task with spaces  ';
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(By.css('[data-testid="todo-label"]'));
      expect(labelElement.nativeElement.textContent).toContain('Task with spaces');
    });
  });

  describe('combined scenarios', () => {
    it('should display completed todo correctly', () => {
      component.text = 'Completed task';
      component.isCompleted = true;
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(By.css('[data-testid="todo-label"]'));
      expect(labelElement.nativeElement.textContent.trim()).toBe('Completed task');
      expect(labelElement.nativeElement.classList.contains('completed')).toBe(true);
    });

    it('should display incomplete todo correctly', () => {
      component.text = 'Incomplete task';
      component.isCompleted = false;
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(By.css('[data-testid="todo-label"]'));
      expect(labelElement.nativeElement.textContent.trim()).toBe('Incomplete task');
      expect(labelElement.nativeElement.classList.contains('completed')).toBe(false);
    });

    it('should allow double click on completed todo', () => {
      component.isCompleted = true;
      fixture.detectChanges();

      const startEditSpy = jest.spyOn(component, 'startEdit');
      const labelElement = fixture.debugElement.query(By.css('[data-testid="todo-label"]'));

      labelElement.triggerEventHandler('dblclick', null);

      expect(startEditSpy).toHaveBeenCalled();
    });

    it('should allow double click on incomplete todo', () => {
      component.isCompleted = false;
      fixture.detectChanges();

      const startEditSpy = jest.spyOn(component, 'startEdit');
      const labelElement = fixture.debugElement.query(By.css('[data-testid="todo-label"]'));

      labelElement.triggerEventHandler('dblclick', null);

      expect(startEditSpy).toHaveBeenCalled();
    });
  });
});
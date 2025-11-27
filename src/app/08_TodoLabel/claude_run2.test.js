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

    it('should render a label element with data-testid', () => {
      const labelElement = fixture.debugElement.query(
        By.css('[data-testid="todo-label"]')
      );
      expect(labelElement).toBeTruthy();
    });

    it('should render with default empty text', () => {
      const labelElement = fixture.debugElement.query(
        By.css('[data-testid="todo-label"]')
      );
      expect(labelElement.nativeElement.textContent.trim()).toBe('');
    });

    it('should render the text input correctly', () => {
      component.text = 'Buy groceries';
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(
        By.css('[data-testid="todo-label"]')
      );
      expect(labelElement.nativeElement.textContent.trim()).toBe('Buy groceries');
    });

    it('should render different text values', () => {
      const testTexts = ['Task 1', 'Complete project', 'Call mom', ''];
      
      testTexts.forEach((text) => {
        component.text = text;
        fixture.detectChanges();

        const labelElement = fixture.debugElement.query(
          By.css('[data-testid="todo-label"]')
        );
        expect(labelElement.nativeElement.textContent.trim()).toBe(text);
      });
    });
  });

  describe('props and state', () => {
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

  describe('CSS classes', () => {
    it('should not have completed class when isCompleted is false', () => {
      component.isCompleted = false;
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(
        By.css('[data-testid="todo-label"]')
      );
      expect(labelElement.nativeElement.classList.contains('completed')).toBe(false);
    });

    it('should have completed class when isCompleted is true', () => {
      component.isCompleted = true;
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(
        By.css('[data-testid="todo-label"]')
      );
      expect(labelElement.nativeElement.classList.contains('completed')).toBe(true);
    });

    it('should toggle completed class based on isCompleted changes', () => {
      const labelElement = fixture.debugElement.query(
        By.css('[data-testid="todo-label"]')
      );

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
      
      const labelElement = fixture.debugElement.query(
        By.css('[data-testid="todo-label"]')
      );
      labelElement.triggerEventHandler('dblclick', null);

      expect(startEditSpy).toHaveBeenCalled();
      expect(startEditSpy).toHaveBeenCalledTimes(1);
    });

    it('should log message when startEdit is called', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      component.startEdit();

      expect(consoleSpy).toHaveBeenCalledWith('Edit started');
      
      consoleSpy.mockRestore();
    });

    it('should call startEdit multiple times on multiple double clicks', () => {
      const startEditSpy = jest.spyOn(component, 'startEdit');
      
      const labelElement = fixture.debugElement.query(
        By.css('[data-testid="todo-label"]')
      );
      
      labelElement.triggerEventHandler('dblclick', null);
      labelElement.triggerEventHandler('dblclick', null);
      labelElement.triggerEventHandler('dblclick', null);

      expect(startEditSpy).toHaveBeenCalledTimes(3);
    });

    it('should trigger dblclick event on the native element', () => {
      const startEditSpy = jest.spyOn(component, 'startEdit');
      
      const labelElement = fixture.debugElement.query(
        By.css('[data-testid="todo-label"]')
      );
      
      const event = new MouseEvent('dblclick', {
        bubbles: true,
        cancelable: true,
      });
      labelElement.nativeElement.dispatchEvent(event);

      expect(startEditSpy).toHaveBeenCalled();
    });
  });

  describe('component integration', () => {
    it('should render correctly with both text and completed status', () => {
      component.text = 'Completed task';
      component.isCompleted = true;
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(
        By.css('[data-testid="todo-label"]')
      );
      
      expect(labelElement.nativeElement.textContent.trim()).toBe('Completed task');
      expect(labelElement.nativeElement.classList.contains('completed')).toBe(true);
    });

    it('should render correctly with text and not completed status', () => {
      component.text = 'Pending task';
      component.isCompleted = false;
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(
        By.css('[data-testid="todo-label"]')
      );
      
      expect(labelElement.nativeElement.textContent.trim()).toBe('Pending task');
      expect(labelElement.nativeElement.classList.contains('completed')).toBe(false);
    });

    it('should handle special characters in text', () => {
      component.text = '<script>alert("xss")</script>';
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(
        By.css('[data-testid="todo-label"]')
      );
      
      expect(labelElement.nativeElement.textContent.trim()).toBe('<script>alert("xss")</script>');
    });

    it('should handle unicode characters in text', () => {
      component.text = '日本語テスト 🎉';
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(
        By.css('[data-testid="todo-label"]')
      );
      
      expect(labelElement.nativeElement.textContent.trim()).toBe('日本語テスト 🎉');
    });

    it('should handle long text', () => {
      const longText = 'A'.repeat(1000);
      component.text = longText;
      fixture.detectChanges();

      const labelElement = fixture.debugElement.query(
        By.css('[data-testid="todo-label"]')
      );
      
      expect(labelElement.nativeElement.textContent.trim()).toBe(longText);
    });
  });
});